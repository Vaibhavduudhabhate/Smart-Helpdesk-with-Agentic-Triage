import mongoose from "mongoose";
import dotenv from "dotenv";
import tickets from "./Model/tickets.js";

dotenv.config();

// your KB seed data
const seedData = [
  {
    "title":"Refund for double charge",
    "description":"I was charged twice for order #1234",
    "category":"other",
    "userId":"68a801d50654f676ea048f3a"
},
{
    "title":"App shows 500 on login",
    "description":"Stack trace mentions auth module",
    "category":"other",
    "userId":"68a801d50654f676ea048f3a"

},
{
    "title":"Where is my package?",
    "description":"Shipment delayed 5 days",
    "category":"other",
    "userId":"68a801d50654f676ea048f3a"
}
];

async function seedtickets() {
  try {
    await mongoose.connect("mongodb://localhost:27017/SmartHelpDesk");

    console.log("✅ Connected to MongoDB");

    // clear old data (optional)
    await tickets.deleteMany({});
    console.log("🗑️ Old tickets articles removed");

    // insert new data
    await tickets.insertMany(seedData);
    console.log("🚀 tickets seed data inserted");

    process.exit(); // exit after done
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seedtickets();
