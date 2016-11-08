var express = require('express');

var app = express();

app.get('/', function(req, res) {
    var lang = null,
        software = null,
        ip = null;
    
    if (req.headers['x-forwarded-for'] !== undefined)
        ip = req.headers['x-forwarded-for'];
    
    if (req.headers['accept-language'] !== undefined) {
        lang = req.headers['accept-language'];
        if (lang.indexOf(',') !== -1)
            lang = lang.split(',')[0];
    }
    
    var re = /\((.+?)\)/;
    if (re.test(req.headers['user-agent']))
        software = re.exec(req.headers['user-agent'])[1];

    res.send(JSON.stringify({
        ipaddress: ip,
        language: lang,
        software: software
    }));
});

app.listen(process.env.PORT, function() {
    console.log('Listening on port ' + process.env.PORT);
});