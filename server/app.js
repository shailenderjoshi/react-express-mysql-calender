const express = require('express');

var cors = require('cors');
var userRouter = require('./routes/user');
var calenderRouter = require('./routes/calenderEvent');

const app = express();
app.use(express.json());
app.use(cors());



app.use('/api/login', userRouter);
app.use('/api/calender', calenderRouter);


// Handle 404 Error
app.use( (req, res) => {
    res.status(404).send('Unknown Request');
});



const port = process.env.PORT || 3001;
app.listen( port, () => console.log(`Listening on port ${port}`));