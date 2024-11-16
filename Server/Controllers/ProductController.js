import Product from "../Models/ProductModel.js";

//Get All Products
const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate("user");
        if (!products) {
          return res.status(200).send({
            success: false,
            message: "No Products Found",
          });
        }
        return res.status(200).send({
          success: true,
          ProductsCount: products.length,
          message: "All Products Lists",
          products,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error While Getting Blogs",
          error,
        });
      }
};

//Get a User's Products
const GetMyProducts = async (req, res) => {
    try {
        const user = req.user;
        // const token = req.header("Authorization").split(' ')[1];
        const products = await Product.find({ user });
        return res.status(200).send({
            success: true,
            ProductsCount: products.length,
            message: "My Products Lists",
            products,
          });

    } catch (err) {
        return res.status(500).send(err);
    }
};

//Create a New Product
const CreateProduct = async (req, res) => {
    try {
        let user = req.user;
        let { title, description, tags, images } = req.body;
        console.log(images)
        const product = new Product({ user, title, description, tags, images });
        await product.save();
        return res.status(200).send({
            success: true,
            message: "Product Added Successfully",
            product,
          });

    } catch (err) {
        return res.status(500).send({ err });
    }
};

//Update a Product
const UpdateProduct = async (req, res) => {
    try {
        const user = req.user;
        const updateProduct = await Product.findByIdAndUpdate(req.params.product, {title: req.body.title, description: req.body.description,
            tags: req.body.tags, images: req.body.images, user
        }, {new: true});
        if(!updateProduct){
            return res.status(404).send({ error: 'Product Not Found' });
        }
        return res.status(200).send({ updateProduct });

    } catch (error) {
        return res.status(500).json({ error: 'Server Error while Deleting Product. Kindly Try Again Later' });
    }
};

//Delete a Product
const DeleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.product);

        if (!deleteProduct) {
            // If `deletedToDo` is null, the document with the specified ID was not found
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).send({ deleteProduct, message: "Product Deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ error: 'Server Error while Deleting Product. Kindly Try Again Later' });
    }
};

export {GetAllProducts, GetMyProducts, CreateProduct, UpdateProduct, DeleteProduct};