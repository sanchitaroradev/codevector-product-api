import mongoose , { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  updatedAt: -1,
  _id: -1,
});

productSchema.index({
  category: 1,
  updatedAt: -1,
  _id: -1,
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;