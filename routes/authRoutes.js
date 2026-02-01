const express = require('express')
const { register, login, getUser, logout,updateProfile  } = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')
const upload = require("../middlewares/upload");


const authRouter = express.Router()


authRouter.post("/register", upload.single("image"), register);
authRouter.post("/login",login)
authRouter.get("/user",verifyToken,getUser)
authRouter.get("/logout",logout)
authRouter.put("/update-profile", verifyToken, upload.single("image"), updateProfile); 


module.exports = authRouter