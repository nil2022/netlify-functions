const express = require("express"); 
const serverless =require("serverless-http");
const mongoose = require('mongoose');
const {DB_URL} = require('./src/configs/db.config');
const PORT = process.env.PORT || 8001;


const app = express();

app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.json({ limit: '16kb' })) // parse JSON data & add it to the request.body object

try {
    mongoose.connect(DB_URL)
    .then((connect) => {
        console.log(`MongoDB Connected to Host: ${connect.connection.host}`)
        app.listen(PORT, () => {
            console.log(`Listening all requests on port ${PORT}`)
        })
        })
        .catch((error) => {
        console.log("Can't connect to DB:", error.message)
        })
    
    app.get('/health', (req, res) => {
        res.status(200).send({
            success: true,
            message: 'Backend is up and running!'
        })
    })
} catch (error) {
    console.log("Can't connect to DB:", error.message)
}

const authRoutes = require('./src/routes/auth.routes')
const bookRoutes = require('./src/routes/book.routes')
authRoutes(app)
bookRoutes(app)

// const router = Router();
// // router.get("/hello", (req, res) => res.send("Hello World!"));
// api.get("/hello", (req, res) => {
//     res.send("Hello World!");
//     console.log("Hello World!");
// })


// api.use("/", router);


module.exports = {
    handler: serverless(app),
} 
// const handler = serverless(app);