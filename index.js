var express = require('express');
var app = new express();
var mongoose = require('mongoose');

var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
      mongoUser = process.env[mongoServiceName + '_USER'];
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT|| 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP ||process.env.IP|| '0.0.0.0');


var mongoURL = 'mongodb://'+mongoUser+':'+mongoPassword+'@'+mongoHost+':'+mongoPort+'/'+mongoDatabase;


var SEND = "Not Connected";
// mongoose.connect(mongoURL,(err)=>{
//     if(err) console.log(err);
//     else SEND='Connected';
//     SEND +='<br/>';
//     SEND +=mongoURL;
//     SEND +='<br/> Hello World';
// });
SEND +='<br/>';
SEND +=mongoServiceName;
SEND +='<br/>';
SEND +=mongoURL;

app.get('/', function (req, res) {
  res.send(SEND);
});
try{
    app.listen(app.get('port'), app.get('ip'),function () {
  console.log('Example app listening on port '+app.get('port'));
})
}catch(e){
    console.log(e);
    console.error(e);
}

