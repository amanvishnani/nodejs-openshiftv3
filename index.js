var express = require('express');
var app = new express();
var mongoose = require('mongoose');

app.set('MongoService',process.env.DATABASE_SERVICE_NAME.toUpperCase());
app.set('MongoHost',process.env[app.get('MongoService') + '_SERVICE_HOST']);
app.set('MongoPort',parseInt(process.env[app.get('MongoService') + '_SERVICE_PORT']));
app.set('MongoUser',process.env[app.get('MongoService') + '_USER']);
app.set('MongoPass',process.env[app.get('MongoService') + '_PASSWORD']);
app.set('DbName', process.env[app.get('MongoService') + '_DATABASE']);
app.set('port', parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.env.PORT)|| 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP ||process.env.IP|| '127.0.0.1');


var mongoURL = 'mongodb://'+app.get('MongoUser')+':'+app.get('MongoPass')+'@'+app.get('MongoHost')+':'+app.get('MongoPort')+'/'+app.get('DbName');


var SEND = "Not Connected";
mongoose.connect(mongoURL,(err)=>{
    if(err) console.log(err);
    else SEND='Connected';
    SEND +='<br/>';
    SEND +=mongoURL;
    SEND +='<br/> Hello World';
});


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

