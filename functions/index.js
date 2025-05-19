const {onSchedule} = require("firebase-functions/v2/scheduler");
const {onDocumentUpdated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const axios = require("axios");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

exports.setAdminHttp = functions.https.onRequest(async (req, res) => {
  // only allow POST
  if (req.method !== "POST") {
    return res.status(405).send("Please POST JSON {uid}");
  }

  const {uid} = req.body;
  try {
    await admin.auth().setCustomUserClaims(uid, {admin: true});
    return res.json({success: true});
  } catch (err) {
    console.error("Error setting custom claim:", err);
    return res.status(500).send(err.message);
  }
});
/**
 * Scheduled Cloud Function: fetches la
 * writes rawPrice + lastFetched to Firestore,
 * then propagates to `price` for non-admin docs.
 */
exports.refreshPrices = onSchedule(
    {schedule: "every 2 hours", region: "asia-southeast1"},
    async () => {
      const frozenIds = [
        "bitcoin",
        "ethereum",
        "tether",
        "binancecoin",
        "solana",
        "usd-coin",
        "ripple",
        "staked-ether",
        "dogecoin",
        "cardano",
        "avalanche-2",
        "tron",
        "shiba-inu",
        "polkadot",
        "wrapped-bitcoin",
        "chainlink",
        "polygon",
        "toncoin",
        "bitcoin-cash",
        "internet-computer",
        "litecoin",
        "uniswap",
        "dai",
        "leo-token",
        "ethereum-classic",
        "aptos",
        "stellar",
        "arbitrum",
        "render-token",
        "near",
        "okb",
        "vechain",
        "mantle",
        "filecoin",
        "monero",
        "injective-protocol",
        "cosmos",
        "hedera-hashgraph",
        "maker",
        "dogwifhat",
        "kaspa",
        "sui",
        "the-graph",
        "quant-network",
        "fetch-ai",
        "theta-token",
        "bitget-token",
        "eos",
        "algorand",
        "elrond-erd-2",
      ];

      try {
        // 1) Fetch raw market data
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
              params: {
                vs_currency: "usd",
                ids: frozenIds.join(","),
              },
            },
        );

        // 2) Batch write rawPrice + lastFetched
        const batchRaw = db.batch();
        response.data.forEach((coin) => {
          const docRef = db.collection("coinPrices").doc(coin.id);

          batchRaw.set(
              docRef,
              {
                rawPrice: coin.current_price,
                lastFetched: admin.firestore.FieldValue.serverTimestamp(),
                name: coin.name,
                symbol: coin.symbol,
                change: coin.price_change_percentage_24h,
              },
              {merge: true},
          );
        });

        await batchRaw.commit();

        // 3) Propagate rawPrice → price
        const snapshot = await db.collection("coinPrices").get();
        const batchPropagate = db.batch();
        snapshot.docs.forEach((document) => {
          const data = document.data();
          batchPropagate.update(
              document.ref,
              {
                price: data.rawPrice,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
                source: "coingecko",
                change: data.change,
              },
          );
        });

        await batchPropagate.commit();

        console.log(
            `refreshPrices: updated ${response.data.length}`+
            `coins successfully.`,
        );
      } catch (error) {
        console.error("refreshPrices: failed to update prices", error);
      }

      return null;
    },
);

exports.logAdminOverride = onDocumentUpdated(
    {document: "coinPrices/{coinId}", region: "asia-southeast1"},
    async (event) => {
      const changeData = event.data;

      if (!changeData || !changeData.before || !changeData.after) {
        console.log("Skipping log: missing before/after");
        return;
      }

      const beforeSnap = changeData.before;
      const afterSnap = changeData.after;

      const before = beforeSnap.data();
      const after = afterSnap.data();

      if (after.source === "admin" && before.price !== after.price) {
        await db.collection("coinPriceLogs").add({
          coinId: event.params.coinId,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          beforePrice: before.price,
          afterPrice: after.price,
          adminEmail: after.adminEmail || "unknown@domain.com",
        });
      }
    },
);
