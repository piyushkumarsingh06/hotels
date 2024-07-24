const express = require('express');
const router = express.Router();
const Person = require('../Models/menuItem');


router.post('/',async(req,res)=>{
    try {
        const data = req.body;

        const Menu = new menuItem(data);

        const response = await Menu.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'});
    }
})


router.get('/',async(req,res)=>{
    try {
        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'});
    }
})

//comment added for testing purposes
module.exports = router;