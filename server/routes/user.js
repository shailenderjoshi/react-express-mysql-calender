require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../connection');

// Import utility functions
const util = require('../utilityFunctions');


router.post("/", (req, res) => { 

    const username = req.body.username.trim();
    const password = req.body.pwd.trim();

    // Apply validation on backend
    if (!username ){
        res.json({ status: 'ERROR', msg: "Username can not be empty" });
        return;
    }
    if (!password ){
        res.json({ status: 'ERROR', msg: "Password can not be empty" });
        return;
    }

    // Query database to verify user match
    const sqlSelect = "SELECT * FROM users WHERE username = ? AND password = ?";
    mysqlConnection.query(sqlSelect, [username, password], (err, rows, fields) => {
        
        if(!err){
            if( rows.length == 0){
                res.json({ status: 'ERROR', msg: "username or password is not valid" });
                return;
            } else {
                // Create payload data which you want to wrap inside token
                const userPayload = { id: rows[0].id, name : username };
                // Generate Token and return
                const generatedToken = util.generateAccessToken(userPayload);
                res.json({ status: 'SUCCESS', token: generatedToken, msg: "SUCCESS" });
                return;

                // Generate token asynchronously
                // jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, (err, generatedToken) => {
                //     res.json({ status: 200, token: generatedToken, msg: "SUCCESS" });
                // });
            }
        } else {
            res.json({ status: 'ERROR', msg: JSON.stringify(err) });
        }
    });
});

module.exports = router;