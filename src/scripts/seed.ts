import dotenv from "dotenv";
import connectDB from "../config/db";
import Product from "../models/product.model";
import mongoose from "mongoose";

dotenv.config();

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 10000;

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Home",
  "Sports",
  "Beauty",
  "Toys",
  "Groceries",
];

function generateProduct(index: number) {
  const category = categories[Math.floor(Math.random() * categories.length)];

  return {
    name: `${category} Product ${index + 1}`,
    category,
    price: Math.floor(Math.random() * 4901) + 100,
  };
}

async function seedProducts(): Promise<void> {
  try {
    await connectDB();

    console.log("Clearing existing products...");
    await Product.deleteMany({});

    console.log("Starting product generation...");

    for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
      const products: Array<ReturnType<typeof generateProduct>> = [];

      for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_PRODUCTS; j++) {
        products.push(generateProduct(i + j));
      }

      await Product.insertMany(products);

      console.log(`Batch ${i / BATCH_SIZE + 1}: Inserted ${products.length} products (Total: ${i + products.length}/${TOTAL_PRODUCTS})`);
    }

    mongoose.connection.close();

    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedProducts();
