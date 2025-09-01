import mongoose from "mongoose";
import dotenv from "dotenv";
import kbArticle from "./Model/kbarticalModel.js"; // adjust path if needed

dotenv.config();

// your KB seed data
const seedData = [
  {
    title: "How to update payment method",
    body: "Step 1: Go to your billing settings...\nStep 2: Update payment info...",
    tags: ["billing", "payments"],
    status: "published",
  },
  {
    title: "Troubleshooting 500 errors",
    body: "If you see a 500 error, check server logs, restart the service...",
    tags: ["tech", "errors"],
    status: "published",
  },
  {
    title: "Tracking your shipment",
    body: "Enter your order ID in the tracking page to view status...",
    tags: ["shipping", "delivery"],
    status: "published",
  },
];

async function seedKB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/SmartHelpDesk");

    console.log("✅ Connected to MongoDB");

    // clear old data (optional)
    await kbArticle.deleteMany({});
    console.log("🗑️ Old KB articles removed");

    // insert new data
    await kbArticle.insertMany(seedData);
    console.log("🚀 KB seed data inserted");

    process.exit(); // exit after done
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seedKB();
