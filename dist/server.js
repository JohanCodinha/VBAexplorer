/* eslint-disable */
let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();

/* Redirect http to https */
app.get('*', function(req,res,next) {
  if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
    res.redirect('https://'+req.hostname+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
});

app.use(serveStatic(__dirname));
let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);