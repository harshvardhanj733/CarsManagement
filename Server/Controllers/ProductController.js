const mongoose = require("mongoose");
import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/UserModel.js";

//Get All Products
exports.GetAllProducts = async (req, res) => {
  try {

  } catch (error) {
    
  }
};

//Get a User's Products
exports.GetMyProducts = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

//Create a New Product
exports.CreateProduct = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};


//SIngle Blog
exports.UpdateProduct = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

//Delete Blog
exports.DeleteProduct = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

const auth = async (req, res, next) => {
    try {
        const encryptedToken = req.header("Authorization").split(' ')[1];
        // const encryptedToken = req.cookie('token');
        const username = jwt.verify(encryptedToken, key);
        if (!username) {
            return res.status(404).send({ message: "Forbidden" });
        }

        const user = await Signup.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: "Forbidden" });
        }
        req.user = username;
        next();

    } catch (err) {
        return res.status(500).send({ err });
    }
}

app.get('/api/todos/dashboard', auth, async (req, res) => {
    const username = req.user;
    try {

        const token = req.header("Authorization").split(' ')[1];
        const data = await ToDos.find({ username });
        return res.status(200).send({data});

    } catch (err) {
        return res.status(500).send({ err });
    }
})

app.post('/api/todos/newTodo', auth, async (req, res) => {
    let username = req.user;
    let { title, description, status } = req.body;

    try {

        const data = new ToDos({ username, title, description, status });
        await data.save();
        return res.status(200).send({data});

    } catch (err) {
        return res.status(500).send({ err });
    }
})

app.delete('/api/todos/deleteTodo/:todo', auth, async (req, res) => {
    try {
        const deletedToDo = await ToDos.findByIdAndDelete(req.params.todo);

        if (!deletedToDo) {
            // If `deletedToDo` is null, the document with the specified ID was not found
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.status(200).send({ deletedToDo });

    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/todos/updateTodo/:todo', auth, async (req, res)=>{
    try {
        
        const updatedToDo = await ToDos.findByIdAndUpdate(req.params.todo, req.body, {new: true});

        if(!updatedToDo){
            return res.status(404).send({error: 'ToDo not found'});
        }

        return res.status(200).send({updatedToDo});

    } catch (error) {

        return res.status(500).json({error});
        
    }
})

app.patch('/api/todos/statusTodo/:todo', auth, async (req, res) => {
    try {
        const statusToDo = await ToDos.findByIdAndUpdate(req.params.todo, { $set: { status: !req.body.status } }, {new: true});
        if(!statusToDo){
            return res.status(404).send({error: 'ToDo not found'});
        }
        return res.status(200).send({statusToDo});
    } 
    catch (error) {
        return res.status(500).json({error});
    }
})