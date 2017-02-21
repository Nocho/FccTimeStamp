// always port 8080
const express = require('express'); //not used
const http = require('http'); 
const url = require('url');


// should all of this logic be attached to any old request event?
// maybe want routing, or some type of condition, maybe express route with
// a route parameter
const app = express();
const server = http.createServer(function(req, res){
    //req = http.IncomingMessage
    //parse URL components... returns object
    var urlo = url.parse(req.url);
    console.log('urlo: ', urlo);
    
    //decode and cache urlo.pathname, slice '/' from beginning,
    //pathnameo is date string "Jan 22 2015" or unix string "2312312313"
    var pathnameo = decodeURI(urlo.pathname.slice(1));
    console.log('pathname: ', pathnameo);
    
    //return value, to be JSON-ified
    var dates = {};
    
    //  We want to determine the intent of the client's request.
    //  Did they mean to enter a unix time or a 'Feb dd yyyy' datestring?
    // -> check if the first character is a digit, 
    // -> create new Date(+pathnameo) or new Date(pathnameo),
    // -> set var type..
    
    var re = /^\d/; 
    var dateObj; 
    var type; 
    
    //pathnameo.match(re) will return an array with the match or null..
    if (pathnameo.match(re) != null){
        dateObj = new Date(+pathnameo);
        type = 'unix';
    }
    else {
        dateObj = new Date(pathnameo);
        type = 'natural';
    }

    //we have dateObj, but it may be invalid date...
    // if invalid date,
    // else if unix date,
    // else if natural date
    // else none of the above.. 
    
    if (isNaN(dateObj.getDate())){
        dates.unix = null;
        dates.natural = null;
    } else if (type === 'unix'){
        dates.unix = +pathnameo;
        dates.natural = dateObj.toDateString().slice(4)
    } else if (type === 'natural'){
        dates.unix = dateObj.getTime();
        dates.natural = pathnameo;
    } else {
        dates.unix = null;
        dates.natural = null;
    }

    res.write(JSON.stringify(dates));
    res.end();
})

server.listen(process.env.PORT || 8080); // don't hard-code the port