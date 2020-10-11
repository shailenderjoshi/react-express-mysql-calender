const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

// Import utility functions
const util = require('../utilityFunctions');

router.get("/getevent", util.verifyToken, (req, res, next) => {
   // Query database to verify user match
   const sqlSelect = "SELECT id, title, start, end, allday FROM events WHERE userid = ?";
   mysqlConnection.query(sqlSelect, req.userPayload.id, (err, rows, fields) => {
       
       if(!err){
           if( rows.length == 0){
               res.json({ status: "SUCCESS", data: 0, msg: "No event found!" });
               return;
            } else {
               res.json({ status: "SUCCESS", data: rows, msg: "SUCCESS" });
               return;
            }
       } else {
           res.json({ status: 'ERROR', msg: JSON.stringify(err) });
       }
   });
});

router.post("/addevent", util.verifyToken, (req, res, next) => {
    // Query database to insert Event
    const sqlSelect = "INSERT INTO events (title, start, end, allday, userid) VALUES (?, ?, ?, ?, ?) ";
    let allday = (req.body.allDay)? "true" : "false";
    mysqlConnection.query(sqlSelect, [req.body.title, req.body.start, req.body.end, allday, req.userPayload.id], (err, rows, fields) => {
        if(!err){
            res.json({ status: "SUCCESS", data: rows, msg: "Event added successfully" });
            return;
        } else {
            res.json({ status: 'ERROR', msg: JSON.stringify(err) });
            return;
        }
    });
 });

router.post("/deleteEvent", util.verifyToken, (req, res, next) => {
    // Query database to DELETE Event
    const sqlSelect = "DELETE FROM events WHERE id = ? AND userid = ?";
    mysqlConnection.query(sqlSelect, [req.body.id, req.userPayload.id], (err, rows, fields) => {
        if(!err){
            res.json({ status: "SUCCESS", data: rows, msg: "Event deleted successfully" });
            return;
        } else {
            res.json({ status: 'ERROR', msg: JSON.stringify(err) });
            return;
        }
    });
 });

 router.post("/updateEvent", util.verifyToken, (req, res, next) => {
    // Query database to update Event
    const sqlSelect = "UPDATE events SET start = ?, end = ?, allday = ? WHERE id = ? AND userid = ?";
    mysqlConnection.query(sqlSelect, [req.body.start, req.body.end, req.body.allday, req.body.id, req.userPayload.id], (err, rows, fields) => {
        if(!err){
            res.json({ status: "SUCCESS", data: rows, msg: "Event updated successfully" });
            return;
        } else {
            res.json({ status: 'ERROR', msg: JSON.stringify(err) });
            return;
        }
    });
 }); 

router.post("/", util.verifyToken, (req, res, next) => {
    res.json({ kk :"calender api called..."});
    return;
});




module.exports = router;