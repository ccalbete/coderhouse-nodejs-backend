const express = require("express"); 
const router = express.Router();
const { usersModel } = require('./../models/users.js');



router.get('/', async (req, res) => {
    try{
        let users = await usersModel.find()
        res.send({rersult: 'success', payload:users})
    }catch(error){
        console.log('Cannot get users with mongoose: '+ error)
    }
})

module.exports = router;