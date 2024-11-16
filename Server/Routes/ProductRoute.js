import express from 'express'
import {GetAllProducts, GetMyProducts, 
    CreateProduct, UpdateProduct, DeleteProduct} from "../Controllers/ProductController.js";
import auth from "../Middleware/Auth.js";

//router object
const ProductRouter = express.Router();

//routes

// GET || all blogs
ProductRouter.get("/all-products", GetAllProducts);

//GET || SIngle Blog Details
ProductRouter.get("/my-products", auth, GetMyProducts);

//POST || create blog
ProductRouter.post("/create-product", auth, CreateProduct);

//PUT || update blog
ProductRouter.put("/update-product/:product", auth, UpdateProduct);

//DELETE || delete blog
ProductRouter.delete("/delete-product/:product", auth, DeleteProduct);

export default ProductRouter;