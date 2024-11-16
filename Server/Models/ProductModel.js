import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    tags: {
        type: [String],
        required: [true, "Atleast One Tag is Required"]
    },
    images: {
      type: [String],
    //   required: [true, "Atleast One Image is Required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User Id is required"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product