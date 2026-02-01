require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoutes')
const connectDb = require('./config/db')
const cartRouter = require('./routes/cartRoutes')
const path = require("path")
const app = express()
const port = process.env.PORT || 3000


connectDb()

app.use(express.json())
// app.use(cors({
//     origin:[process.env.ORIGIN,'https://shopping-cart-gourav.vercel.app'],
//     credentials:true
// }))

app.use(cors({
  origin: true,
  credentials: true
}))


app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/cart",cartRouter)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)

})





