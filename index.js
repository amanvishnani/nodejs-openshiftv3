var express = require('express');
var app = new express();
var mongoose = require('mongoose');
var MongoService = process.env.DATABASE_SERVICE_NAME;
app.set('MongoService',process.env.DATABASE_SERVICE_NAME.toUpperCase());
app.set('MongoHost',process.env[app.get('MongoService') + '_SERVICE_HOST']);
app.set('MongoPort',parseInt(process.env[app.get('MongoService') + '_SERVICE_PORT']));
app.set('MongoUser',process.env.USER);
app.set('MongoPass',process.env.PASSWORD);
app.set('DbName', process.env.DATABASE);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT|| 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP ||process.env.IP|| '0.0.0.0');


var mongoURL = 'mongodb://'+app.get('MongoUser')+':'+app.get('MongoPass')+'@'+app.get('MongoHost')+':'+app.get('MongoPort')+'/'+app.get('DbName');


var SEND = "Not Connected";
// mongoose.connect(mongoURL,(err)=>{
//     if(err) console.log(err);
//     else SEND='Connected';
//     SEND +='<br/>';
//     SEND +=mongoURL;
//     SEND +='<br/> Hello World';
// });
SEND +='<br/>';
SEND +=app.get('MongoService');
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

