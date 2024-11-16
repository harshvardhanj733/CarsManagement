import User from '../Models/UserModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.KEY

const auth = async (req, res, next) => {
    try {
        const encryptedToken = req.header("Authorization").split(' ')[1];
        console.log("Auth Token " + encryptedToken);
        if(!encryptedToken){
            return res.status(404).send({message: "Forbidden"});
        }
        // const encryptedToken = req.cookie('token');
        const username = jwt.verify(encryptedToken, key);
        console.log(username)
        if (!username) {
            return res.status(404).send({ message: "Forbidden" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: "Forbidden" });
        }
        req.user = user;
        next();

    } catch (err) {
        return res.status(500).send(err);
    }
}

export default auth;