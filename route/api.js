const router = require("express").Router()
const listSchema = require("../models/platpluslist")

router.get("/getlist",async (req,res)=>{
    const list = await listSchema.find({}).select("-_id")
    res.status(200).send(list)
})


module.exports = router