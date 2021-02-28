const router = require("express").Router();
const Test = require("./db-models/test");

router.get("/test", async (_, res) => {
    try{
        const tests = await Test.find();
        res.status(200).send(tests);
    } catch(e){
        console.log(e);
    }

});

module.exports = { router }
