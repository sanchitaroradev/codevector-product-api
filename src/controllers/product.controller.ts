import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";
import { encodeCursor, decodeCursor } from "../utils/pagination";
import { FilterQuery } from "mongoose";

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { category, cursor, limit } = req.query;

    const pageSize =
      typeof limit === "string"
        ? Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100)
        : 20;

    const filter: { category?: string } = {};

    if (category && typeof category === "string") {
      filter.category = category;
    }

    const query: FilterQuery<IProduct> = {
      ...filter,
    };

    if (cursor && typeof cursor === "string") {
      try {
        const decodedCursor = decodeCursor(cursor);

        query.$or = [
          {
            updatedAt: {
              $lt: new Date(decodedCursor.updatedAt),
            },
          },
          {
            updatedAt: new Date(decodedCursor.updatedAt),
            _id: {
              $lt: decodedCursor._id,
            },
          },
        ];
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Invalid cursor",
        });

        return;
      }
    }

    const products = await Product.find(query)
      .sort({
        updatedAt: -1,
        _id: -1,
      })
      .limit(pageSize)
      .lean();

    let nextCursor: string | null = null;

    if (products.length > 0) {
      const lastProduct = products[products.length - 1];

      nextCursor = encodeCursor({
        updatedAt: lastProduct.updatedAt.toISOString(),
        _id: String(lastProduct._id),
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
