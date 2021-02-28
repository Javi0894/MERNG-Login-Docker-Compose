const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const {setGraphQLMiddleware} = require("./server-files/graphql/middleware");
const {router} = require("./server-files/api");

const app = express();
app.use("/api", router);
app.use(express.static(__dirname + "/build/"))
setGraphQLMiddleware(app);
mongoose.Promise = global.Promise;
//First initialize the mongodb docker container
// mongoose.connect("mongodb://mongo:27017/app_database", 
mongoose.connect("mongodb://localhost:27017/app_database", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection with the App Database was successful")
});

app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));    
});

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => console.log(`Listening to http://localhost:${PORT}`));

