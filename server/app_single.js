require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
var cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

//var userRouter = require('./routes/user');
//var calenderRouter = require('./routes/calenderEvent');

const mysqlConnection = require('./connection');

//app.use('/api/login', userRouter);
//app.use('/api/calender', calenderRouter);

app.post('/api/login', (req, res) => {
    
    const username = req.body.username.trim();
    const password = req.body.pwd.trim();

    // Query database to verify user match
    const sqlSelect = "SELECT * FROM users WHERE username = ? AND password = ?";
    mysqlConnection.query(sqlSelect, [username, password], (err, rows, fields) => {
        
        if(!err){
            if( rows.length == 0){
                res.json({ status: 400, msg: "username or password is not valid" });
                return;
            } else {
                //if user match then create JWT token and return token
                const userPayload = { id: rows[0].id, name : username };
                jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, (err, generatedToken) => {
                    res.json({ status: 200, token: generatedToken, msg: "SUCCESS" });
                });
            }
        } else {
            console.log(err);
        }
    });
});

app.post('/api/calender', ensureToken, (req, res) => { 

    jwt.verify( req.token, process.env.ACCESS_TOKEN_SECRET, function(error, data){
        if(error){ 
            res.sendStatus(403);
        } else {
            res.json({data : data}); return;
        }   
    })
    
});

// Handle 404 Error
app.post( (req, res) => {
    res.status(404).send('Unknown Request');
});

function verifyToken(req, res, next) {
    // get auth header value
    const authHeader = req.headers['authorization'];

    // check header is defined
    const token = authHeader && authHeader.split(' ')[1];
    // Forbidden Error
    if( token == null ) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCECC_TOKEN_SECRET, (error, userPayload) => { console.log("myyyyyyyyyyy"+token);
        if(error) return res.sendStatus(403);
        req.user = userPayload;
        next();
    })
}

function ensureToken(req, res, next) {
    // get Authorization Bearer Token from header
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }

}

const port = process.env.PORT || 3001;
app.listen( port, () => console.log(`Listening on port ${port}`));