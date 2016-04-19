var version = "1.0.62";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var port = process.env.PORT || 80;

var sha1 = require('sha1');
var sql_connection;
var status={
  "server":"stopped",
  "sql":"not connected",
  "database-server":"converfit.database.windows.net",
};
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlconfig = require('./sql.config');
var twilio = require('twilio')(accountSid, authToken);

var twilioconfig = require('./twilio.config');
var twilio = require('twilio')(twilioconfig.accountSid, twilioconfig.authToken);

server.listen(port, function () {});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//
// Get Version
//
app.get('/version',function(req,res){
  var response={
    "version":version
  }

  res.status(200).jsonp(response);connection.close();
});

//
// Create Tables
//
app.get('/tables',function(req,res){
  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{
      var query = "";
      query += "DROP TABLE IF EXISTS userComments;";
      query += "";
      query += "CREATE TABLE userComments";
      query += "(";
      query += "ID int IDENTITY(1,1) PRIMARY KEY,";
      query += "commentKey varchar(255) NOT NULL,";
      query += "parentKey varchar(255) NOT NULL,";
      query += "userKey varchar(255) NOT NULL,";
      query += "phone varchar(255),";
      query += "rating int NOT NULL,";
      query += "content ntext NOT NULL,";
      query += "reported bit NOT NULL,";
      query += "created int NOT NULL";
      query += ");";
      query += "";
      query += "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('1','','1','0034000000002',2,'Comentario de dos hecho por uno',0,10000);";
      query += "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('2','','1','0034000000003',3,'Comentario de tres hecho por uno',0,10001);";
      query += "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('3','','1','0034000000004',4,'Comentario de cuatro hecho por uno',0,10002);";
      query += "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('4','','2','0034000000001',1,'Comentario de uno hecho por dos',0,10003);";
      query += "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('5','','3','0034000000001',1,'Comentario de uno hecho por tres',0,10004);";
      query += "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('6','','4','0034000000001',1,'Comentario de uno hecho por cuatro',0,10005);";
      query += "";
      query += "DROP TABLE IF EXISTS userContacts;";
      query += "";
      query += "CREATE TABLE userContacts";
      query += "(";
      query += "ID int IDENTITY(1,1) PRIMARY KEY,";
      query += "userKey varchar(255) NOT NULL,";
      query += "fullName varchar(255) NOT NULL,";
      query += "phone varchar(255) NOT NULL,";
      query += "notify bit NOT NULL";
      query += ");";
      query += "";
      query += "INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('1','Contacto dos de uno','0034000000002',1);";
      query += "INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('1','Contacto tres de uno','0034000000003',1);";
      query += "INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('1','Contacto cuatro de uno','0034000000004',0);";
      query += "INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('2','Contacto uno de dos','0034000000001',1);";
      query += "INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('3','Contacto uno de tres','0034000000001',1);";
      query += "INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('4','Contacto uno de cuatro','0034000000001',1);";
      query += "";
      query += "DROP TABLE IF EXISTS users;";
      query += "";
      query += "CREATE TABLE users";
      query += "(";
      query += "ID int IDENTITY(1,1) PRIMARY KEY,";
      query += "deviceKey varchar(255) NOT NULL,";
      query += "userKey varchar(255) NOT NULL,";
      query += "fullName varchar(255),";
      query += "prefix varchar(255),";
      query += "phone varchar(255),";
      query += "system varchar(255) NOT NULL,";
      query += "version varchar(255) NOT NULL,";
      query += "created int NOT NULL,";
      query += "lastConnection int NOT NULL";
      query += ");";
      query += "";
      query += "INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('1','1','Usuario uno','0034','0034000000001','ios','1.0',10000,10010);";
      query += "INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('2','2','Usuario dos','0034','0034000000002','ios','1.0',10001,10011);";
      query += "INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('3','3','Usuario tres','0034','0034000000003','ios','1.0',10002,10012);";
      query += "INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('4','4','Usuario cuatro','0034','0034000000004','ios','1.0',10003,10013);";
      query += "";
      query += "DROP TABLE IF EXISTS log;";
      query += "";
      query += "CREATE TABLE log";
      query += "(";
      query += "ID int IDENTITY(1,1) PRIMARY KEY,";
      query += "userKey varchar(255) NOT NULL,";
      query += "action varchar(255) NOT NULL,";
      query += "created int NOT NULL";
      query += ");";
      query += "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('1','login',10010);";
      query += "";
      query += "DROP TABLE IF EXISTS smsAlerts;";
      query += "";
      query += "CREATE TABLE smsAlerts";
      query += "(";
      query += "ID int IDENTITY(1,1) PRIMARY KEY,";
      query += "phone varchar(255) NOT NULL,";
      query += "created int NOT NULL";
      query += ");";
      query += "";
      query += "INSERT INTO smsAlerts (phone,created) VALUES ('0034000000002',10000,10010);";
      query += "";
      query += "DROP TABLE IF EXISTS admins;";
      query += "";
      query += "CREATE TABLE admins";
      query += "(";
      query += "ID int IDENTITY(1,1) PRIMARY KEY,";
      query += "adminKey varchar(255) NOT NULL,";
      query += "adminApiKey varchar(255) NOT NULL,";
      query += "fullName varchar(255),";
      query += "email varchar(255) NOT NULL,";
      query += "password varchar(255) NOT NULL,";
      query += "created int NOT NULL,";
      query += "lastConnection int NOT NULL";
      query += ");";
      query += "";
      query += "INSERT INTO admins (adminKey,adminApiKey,fullName,email,password,created,lastConnection) VALUES ('1','1','Admin uno','adminuno@appexpose.com','nopassword',10000,10010);";
      query += "";

      console.log(query);

      connection.execSql(new Request(query, function(err) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).jsonp(response);connection.close();
          console.log(err);

        } else {
          var response={
            "code":"Tables created",
            "message":"The tables had been created."
          };
          res.status(200).jsonp(response);connection.close();
        }
      }));
    }
  });
});

app.get('/tables/smsalets/',function(req,res){
  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{
      var query = "";
      query += "CREATE TABLE smsAlerts";
      query += "(";
      query += "ID int IDENTITY(1,1) PRIMARY KEY,";
      query += "phone varchar(255) NOT NULL,";
      query += "created int NOT NULL";
      query += ");";
      query += "";

      console.log(query);

      connection.execSql(new Request(query, function(err) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).jsonp(response);connection.close();
          console.log(err);

        } else {
          var response={
            "code":"Tables created",
            "message":"The tables had been created."
          };
          res.status(200).jsonp(response);connection.close();
        }
      }));
    }
  });
});

app.get('/tables/smsalets/data',function(req,res){
  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{
      var query = "";
      query += "INSERT INTO smsAlerts (phone,created) VALUES ('0034000000002',10000,10010);";

      console.log(query);

      connection.execSql(new Request(query, function(err) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).jsonp(response);connection.close();
          console.log(err);

        } else {
          var response={
            "code":"Tables created",
            "message":"The tables had been created."
          };
          res.status(200).jsonp(response);connection.close();
        }
      }));
    }
  });
});




//
// ADMINS
//

//
// List Users
//
app.get('/admins/:adminApiKey/users',function(req,res){
  console.log("[Admin - List Users] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);


  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      checkAdminApi(connection,req,res,function(err,adminKey){
        if(!err){

          var query = "SELECT * FROM users";
          var rows=[];
          console.log(query);
          connection.execSql(new Request(query, function(err) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).jsonp(response);connection.close();
                console.log("[Admin - List Users] Error "+response.code+" "+response.message+" ("+err+")");

              }else{
                var response={
                  "users":rows
                };

                console.log("[Admin - List Users] Success");
                res.status(200).jsonp(response);connection.close();
              }
            })
            .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
          );

        }
      });



    }
  });


});

//
// List UserContacts
//
app.get('/admins/:adminApiKey/users/contacts',function(req,res){
  console.log("[Admin - List User Contacts] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      checkAdminApi(connection,req,res,function(err,adminKey){
        if(!err){

          var query = "";
          /*query += "SELECT userContacts.*, SUM(userComments.rating)/COUNT(userComments.ID) as rating, COUNT(userComments.ID) as commentsAmount ";
          query += "FROM userContacts ";
          query += "INNER JOIN userComments ";
          query += "ON userComments.phone=userContacts.phone ";
          query += "GROUP BY";
          query += " userContacts.ID,";
          query += " userContacts.userKey,";
          query += " userContacts.fullName,";
          query += " userContacts.phone,";
          query += " userContacts.notify";*/

          query += "SELECT userContacts.*, 0 as rating, 0 as commentsAmount ";
          query += "FROM userContacts ";

          var rows=[];
          console.log(query);
          connection.execSql(new Request(query, function(err) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).jsonp(response);connection.close();
                console.log("[Admin - List User Contacts] Error "+response.code+" "+response.message+" ("+err+")");

              }else{
                var response={
                  "contacts":rows
                };

                console.log("[Admin - List User Contacts] Success");
                res.status(200).jsonp(response);connection.close();
              }
            })
            .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
          );

        }
      });

    }
  });



});

//
// List Comments
//
app.get('/admins/:adminApiKey/users/comments',function(req,res){
  console.log("[Admin - List User Comments] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{


      checkAdminApi(connection,req,res,function(err,adminKey){
        if(!err){

          var query = "SELECT * FROM userComments";
          var rows=[];
          console.log(query);
          connection.execSql(new Request(query, function(err) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).jsonp(response);connection.close();
                console.log("[Admin - List User Comments] Error "+response.code+" "+response.message+" ("+err+")");

              }else{
                var response={
                  "comments":rows
                };

                console.log("[Admin - List User Comments] Success");
                res.status(200).jsonp(response);connection.close();
              }
            })
            .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
          );

        }
      });


    }
  });



});

//
// List Log
//
app.get('/admins/:adminApiKey/log',function(req,res){
  console.log("[Admin - List Log] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);


  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{


      checkAdminApi(connection,req,res,function(err,adminKey){
        if(!err){

          var query = "SELECT * FROM log";
          var rows=[];
          console.log(query);
          connection.execSql(new Request(query, function(err) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).jsonp(response);connection.close();
                console.log("[Admin - List Log] Error "+response.code+" "+response.message+" ("+err+")");

              }else{
                var response={
                  "log":rows
                };

                console.log("[Admin - List Log] Success");
                res.status(200).jsonp(response);connection.close();
              }
            })
            .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
          );

        }
      });


    }
  });



});

//
// List Stats
//
app.get('/stats',function(req,res){
  console.log("[Get Stats] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{


      var query = "";
      query += "SELECT ";

      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*29))+") AS users_0,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*28))+") AS users_1,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*27))+") AS users_2,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*26))+") AS users_3,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*25))+") AS users_4,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*24))+") AS users_5,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*23))+") AS users_6,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*22))+") AS users_7,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*21))+") AS users_8,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*20))+") AS users_9,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*19))+") AS users_10,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*18))+") AS users_11,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*17))+") AS users_12,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*16))+") AS users_13,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*15))+") AS users_14,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*14))+") AS users_15,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*13))+") AS users_16,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*12))+") AS users_17,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*11))+") AS users_18,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*10))+") AS users_19,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*9))+") AS users_20,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*8))+") AS users_21,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*7))+") AS users_22,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*6))+") AS users_23,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*5))+") AS users_24,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*4))+") AS users_25,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*3))+") AS users_26,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*2))+") AS users_27,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*1))+") AS users_28,";
      query += "(SELECT COUNT(ID) FROM users WHERE created<"+(timestamp-(86400*0))+") AS users_29,";

      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*29))+") AS comments_0,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*28))+") AS comments_1,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*27))+") AS comments_2,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*26))+") AS comments_3,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*25))+") AS comments_4,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*24))+") AS comments_5,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*23))+") AS comments_6,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*22))+") AS comments_7,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*21))+") AS comments_8,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*20))+") AS comments_9,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*19))+") AS comments_10,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*18))+") AS comments_11,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*17))+") AS comments_12,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*16))+") AS comments_13,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*15))+") AS comments_14,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*14))+") AS comments_15,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*13))+") AS comments_16,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*12))+") AS comments_17,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*11))+") AS comments_18,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*10))+") AS comments_19,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*9))+") AS comments_20,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*8))+") AS comments_21,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*7))+") AS comments_22,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*6))+") AS comments_23,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*5))+") AS comments_24,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*4))+") AS comments_25,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*3))+") AS comments_26,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*2))+") AS comments_27,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*1))+") AS comments_28,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+(timestamp-(86400*0))+") AS comments_29,";

      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*30))+" AND created<"+(timestamp-(86400*29))+" ) AS active_users_0,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*29))+" AND created<"+(timestamp-(86400*28))+" ) AS active_users_1,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*28))+" AND created<"+(timestamp-(86400*27))+" ) AS active_users_2,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*27))+" AND created<"+(timestamp-(86400*26))+" ) AS active_users_3,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*26))+" AND created<"+(timestamp-(86400*25))+" ) AS active_users_4,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*25))+" AND created<"+(timestamp-(86400*24))+" ) AS active_users_5,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*24))+" AND created<"+(timestamp-(86400*23))+" ) AS active_users_6,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*23))+" AND created<"+(timestamp-(86400*22))+" ) AS active_users_7,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*22))+" AND created<"+(timestamp-(86400*21))+" ) AS active_users_8,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*21))+" AND created<"+(timestamp-(86400*20))+" ) AS active_users_9,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*20))+" AND created<"+(timestamp-(86400*19))+" ) AS active_users_10,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*19))+" AND created<"+(timestamp-(86400*18))+" ) AS active_users_11,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*18))+" AND created<"+(timestamp-(86400*17))+" ) AS active_users_12,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*17))+" AND created<"+(timestamp-(86400*16))+" ) AS active_users_13,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*16))+" AND created<"+(timestamp-(86400*15))+" ) AS active_users_14,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*15))+" AND created<"+(timestamp-(86400*14))+" ) AS active_users_15,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*14))+" AND created<"+(timestamp-(86400*13))+" ) AS active_users_16,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*13))+" AND created<"+(timestamp-(86400*12))+" ) AS active_users_17,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*12))+" AND created<"+(timestamp-(86400*11))+" ) AS active_users_18,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*11))+" AND created<"+(timestamp-(86400*10))+" ) AS active_users_19,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*10))+" AND created<"+(timestamp-(86400*9))+" ) AS active_users_20,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*9))+" AND created<"+(timestamp-(86400*8))+" ) AS active_users_21,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*8))+" AND created<"+(timestamp-(86400*7))+" ) AS active_users_22,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*7))+" AND created<"+(timestamp-(86400*6))+" ) AS active_users_23,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*6))+" AND created<"+(timestamp-(86400*5))+" ) AS active_users_24,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*5))+" AND created<"+(timestamp-(86400*4))+" ) AS active_users_25,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*4))+" AND created<"+(timestamp-(86400*3))+" ) AS active_users_26,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*3))+" AND created<"+(timestamp-(86400*2))+" ) AS active_users_27,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*2))+" AND created<"+(timestamp-(86400*1))+" ) AS active_users_28,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-(86400*1))+" AND created<"+(timestamp-(86400*0))+" ) AS active_users_29,";

      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*30))+" AND created<"+(timestamp-(86400*29))+" ) AS searchs_0,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*29))+" AND created<"+(timestamp-(86400*28))+" ) AS searchs_1,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*28))+" AND created<"+(timestamp-(86400*27))+" ) AS searchs_2,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*27))+" AND created<"+(timestamp-(86400*26))+" ) AS searchs_3,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*26))+" AND created<"+(timestamp-(86400*25))+" ) AS searchs_4,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*25))+" AND created<"+(timestamp-(86400*24))+" ) AS searchs_5,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*24))+" AND created<"+(timestamp-(86400*23))+" ) AS searchs_6,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*23))+" AND created<"+(timestamp-(86400*22))+" ) AS searchs_7,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*22))+" AND created<"+(timestamp-(86400*21))+" ) AS searchs_8,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*21))+" AND created<"+(timestamp-(86400*20))+" ) AS searchs_9,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*20))+" AND created<"+(timestamp-(86400*19))+" ) AS searchs_10,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*19))+" AND created<"+(timestamp-(86400*18))+" ) AS searchs_11,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*18))+" AND created<"+(timestamp-(86400*17))+" ) AS searchs_12,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*17))+" AND created<"+(timestamp-(86400*16))+" ) AS searchs_13,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*16))+" AND created<"+(timestamp-(86400*15))+" ) AS searchs_14,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*15))+" AND created<"+(timestamp-(86400*14))+" ) AS searchs_15,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*14))+" AND created<"+(timestamp-(86400*13))+" ) AS searchs_16,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*13))+" AND created<"+(timestamp-(86400*12))+" ) AS searchs_17,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*12))+" AND created<"+(timestamp-(86400*11))+" ) AS searchs_18,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*11))+" AND created<"+(timestamp-(86400*10))+" ) AS searchs_19,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*10))+" AND created<"+(timestamp-(86400*9))+" ) AS searchs_20,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*9))+" AND created<"+(timestamp-(86400*8))+" ) AS searchs_21,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*8))+" AND created<"+(timestamp-(86400*7))+" ) AS searchs_22,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*7))+" AND created<"+(timestamp-(86400*6))+" ) AS searchs_23,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*6))+" AND created<"+(timestamp-(86400*5))+" ) AS searchs_24,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*5))+" AND created<"+(timestamp-(86400*4))+" ) AS searchs_25,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*4))+" AND created<"+(timestamp-(86400*3))+" ) AS searchs_26,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*3))+" AND created<"+(timestamp-(86400*2))+" ) AS searchs_27,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*2))+" AND created<"+(timestamp-(86400*1))+" ) AS searchs_28,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-(86400*1))+" AND created<"+(timestamp-(86400*0))+" ) AS searchs_29";


      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Get Stats] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            var response={
              "stats":rows[0]
            };

            console.log("[Get Stats] Success");
            res.status(200).jsonp(response);connection.close();
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );


    }
  });




});

//
// Get Stats
//
app.get('/stats/:timestamp',function(req,res){
  console.log("[Get Stats] START");


  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);console.log("[Get Stats] Error "+response.code+" "+response.message+" ("+err+")");connection.close();}else{


      var timestamp = req.params.timestamp;

      var query = "";
      query += "SELECT ";

      query += "(SELECT COUNT(ID) FROM users WHERE created<"+timestamp+") AS users,";
      query += "(SELECT COUNT(ID) FROM userComments WHERE created<"+timestamp+") AS comments,";
      query += "(SELECT COUNT(DISTINCT UserKey) FROM log WHERE action LIKE 'login' AND created>"+(timestamp-86400)+" AND created<"+timestamp+" ) AS active_users,";
      query += "(SELECT COUNT(ID) FROM log WHERE action LIKE 'listUserComment%' AND created>"+(timestamp-86400)+" AND created<"+timestamp+" ) AS searchs";

      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Get Stats] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            var response={
              "stats":rows[0]
            };

            console.log("[Get Stats] Success");
            res.status(200).jsonp(response);connection.close();
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );


    }
  });




});


//
// USERS
//

//
// Signup User
//
app.post('/users',function(req,res){
  console.log("[Signup] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      if(
        (typeof req.body.deviceKey == 'undefined')||(req.body.deviceKey=='')||
        (typeof req.body.prefix == 'undefined')||(req.body.prefix=='')||
        (typeof req.body.system == 'undefined')||(req.body.system=='')||
        (typeof req.body.version == 'undefined')||(req.body.version=='')
      ){
        var response={
          "code":"missing_parameter",
          "message":"You need to provide: ("
        };
        if((typeof req.body.deviceKey == 'undefined')||(req.body.deviceKey=='')){response.message+=" deviceKey ";}
        if((typeof req.body.prefix == 'undefined')||(req.body.prefix=='')){response.message+=" prefix ";}
        if((typeof req.body.system == 'undefined')||(req.body.system=='')){response.message+=" system ";}
        if((typeof req.body.version == 'undefined')||(req.body.version=='')){response.message+=" version ";}
        response.message+=")";
        res.status(400).jsonp(response);connection.close();
        console.log("[Signup] Error "+response.code+" "+response.message);

      }else{
        var user={
          "deviceKey":mssql_escape(req.body.deviceKey),
          "userKey":sha1("userKey"+rand(0,999999)+req.body.deviceKey+timestamp),
          "fullName":mssql_escape(req.body.fullName),
          "prefix":req.body.prefix,
          "phone":req.body.phone,
          "system":req.body.system,
          "version":req.body.version,
          "created":timestamp,
          "lastConnection":timestamp
        }

        if((typeof req.body.fullName == 'undefined')||(req.body.fullName=='')){user.fullName="";}
        if((typeof req.body.phone == 'undefined')||(req.body.phone=='')){user.phone="";}

        var query = "";
        query += "INSERT INTO log (userKey,action,created) VALUES ('"+user.userKey+"','signup',"+timestamp+");";
        query += "INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES";
        query += " ('"+user.deviceKey+"', '"+user.userKey+"', '"+user.fullName+"', '"+user.prefix+"', '"+user.phone+"', '"+user.system+"', '"+user.version+"', "+user.created+", "+user.lastConnection+")";
        console.log(query);

        connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Signup] Error "+response.code+" "+response.message+" ("+err+")");

          } else {
            var response={
              "user":user
            };

            res.status(200).jsonp(response);connection.close();
            console.log("[Signup] Success");
          }
        }));
      }


    }
  });



});

//
// Login User
//
app.put('/users/:userKey/login',function(req,res){
  console.log("[Login] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','login',"+timestamp+");";
      query += "UPDATE users SET lastConnection = "+timestamp+" WHERE userKey='"+req.params.userKey+"'";
      console.log(query);

      connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).jsonp(response);connection.close();
          console.log("[Login] Error "+response.code+" "+response.message+" ("+err+")");

        } else {

          if(rowsCount==1){
            var response={
              "code":"userkey_not_valid",
              "message":"The userKey is not valid."
            };
            res.status(400).jsonp(response);connection.close();
            console.log("[Login] Error "+response.code+" "+response.message);

          }else{
            var response={
              "code":"user_logged",
              "message":"The user had been logged."
            };
            res.status(200).jsonp(response);connection.close();
            console.log("[Login] Success");
          }
        }
      }));

    }
  });



});

//
// Get Account
//
app.get('/users/:userKey/account',function(req,res){
  console.log("[Get Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','getAccount',"+timestamp+");";
      query += "SELECT * FROM users WHERE userKey='"+req.params.userKey+"'";
      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Get Account] Error "+response.code+" "+response.message+" ("+err+")");

          }else{

            if(rowsCount==1){
              var response={
                "code":"userkey_not_valid",
                "message":"The userKey is not valid."
              };
              res.status(400).jsonp(response);connection.close();
              console.log("[Login] Error "+response.code+" "+response.message);

            }else{
              var response={
                "user":rows[0]
              };

              console.log("[Get Account] Success");
              res.status(200).jsonp(response);connection.close();
            }
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );



    }
  });


});

//
// Update Account
//
app.put('/users/:userKey/account',function(req,res){
  console.log("[Update Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var user={};
      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','updateAccount',"+timestamp+");";
      query += "UPDATE users SET ";
      var data_to_update=false;
      var coma=" ";

      if(!((typeof req.body.deviceKey == 'undefined')||(req.body.deviceKey==''))){
        user.deviceKey=req.body.deviceKey;
        query += coma+"deviceKey='"+user.deviceKey+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
        user.fullName=mssql_escape(req.body.fullName);
        query += coma+"fullName='"+user.fullName+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.prefix == 'undefined')||(req.body.prefix==''))){
        user.prefix=req.body.prefix;
        query += coma+"prefix='"+user.prefix+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.phone == 'undefined')||(req.body.phone==''))){
        user.phone=req.body.phone;
        query += coma+"phone='"+user.phone+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.system == 'undefined')||(req.body.system==''))){
        user.system=req.body.system;
        query += coma+"system='"+user.system+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.version == 'undefined')||(req.body.version==''))){
        user.version=req.body.version;
        query += coma+"version='"+user.version+"' ";
        data_to_update=true;
        coma=",";
      }


      if(data_to_update){
        query += "WHERE userKey='"+req.params.userKey+"'";
        var rows = [];
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).jsonp(response);connection.close();
              console.log("[Update Account] Error "+response.code+" "+response.message+" ("+err+")");
            }else{
              if(rowsCount==1){
                var response={
                  "code":"userkey_not_valid",
                  "message":"The userKey is not valid our you are Unauthorized."
                };
                res.status(400).jsonp(response);connection.close();
                console.log("[Update Account] Error "+response.code+" "+response.message);

              }else{
                var response={
                  "code":"user_updated",
                  "message":"The user had been updated."
                };
                res.status(200).jsonp(response);connection.close();
                console.log("[Update Account] Success");

              }
            }
          })
        );
      }else{
        var response={
          "code":"no_data_to_update",
          "message":"There is no data to update."
        };
        res.status(400).jsonp(response);connection.close();
        console.log("[Update Account] Error "+response.code+" "+response.message+" ("+err+")");

      }



    }
  });


});


//
// Delete Account
//
app.delete('/users/:userKey',function(req,res){
  console.log("[Delete Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','deleteAccount',"+timestamp+");";
      query += "DELETE FROM users WHERE userKey='"+req.params.userKey+"';";
      query += "DELETE FROM userContacts WHERE userKey='"+req.params.userKey+"';";
      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Delete Account] Error "+response.code+" "+response.message+" ("+err+")");
          }else{
            if(rowsCount==1){
              var response={
                "code":"userkey_not_valid",
                "message":"The userKey is not valid our you are Unauthorized."
              };
              res.status(400).jsonp(response);connection.close();
              console.log("[Delete Account] Error "+response.code+" "+response.message);
            }else{
              var response={
                "code":"user_deleted",
                "message":"The user account had been deleted."
              };
              res.status(200).jsonp(response);connection.close();
              console.log("[Delete Account] Success");

            }
          }
        })
      );

    }
  });

});


//
// Add Contact
//
app.post('/users/:userKey/contacts',function(req,res){
  console.log("[Add User Contact] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      if(
        (typeof req.body.phone == 'undefined')||(req.body.phone=='')
      ){
        var response={
          "code":"missing_parameter",
          "message":"You need to provide: ("
        };
        if((typeof req.body.phone == 'undefined')||(req.body.phone=='')){response.message+=" phone ";}
        response.message+=")";
        res.status(400).jsonp(response);connection.close();
        console.log("[Add User Contact] Error "+response.code+" "+response.message);

      }else{
        var contact={
          "userKey":req.params.userKey,
          "fullName":mssql_escape(req.body.fullName),
          "phone":req.body.phone,
          "notify":req.body.notify
        }

        if((typeof req.body.fullName == 'undefined')||(req.body.fullName=='')){contact.fullName="";}
        if((typeof req.body.notify == 'undefined')||(req.body.notify=='')){contact.notify=1;}

        var query = "";
        query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','addUserContact',"+timestamp+");";
        query += "DELETE FROM userContacts WHERE phone='"+contact.phone+"' AND userKey='"+contact.userKey+"';";
        query += "INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES";
        query += " ('"+contact.userKey+"', '"+contact.fullName+"', '"+contact.phone+"', "+contact.notify+");";
        console.log(query);

        connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Add User Contact] Error "+response.code+" "+response.message+" ("+err+")");

          } else {
            var response={
              "contact":contact
            };
            res.status(200).jsonp(response);connection.close();
            console.log("[Add User Contact] Success");
          }
        }));
      }



    }
  });


});

//
// List Contacts
//
app.get('/users/:userKey/contacts',function(req,res){
  console.log("[List User Contacts] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','listUserContacts',"+timestamp+");";
      /*query += "SELECT userContacts.*, SUM(userComments.rating)/COUNT(userComments.ID) as rating, COUNT(userComments.ID) as commentsAmount ";
      query += "FROM userContacts ";
      query += "INNER JOIN userComments ";
      query += "ON userComments.phone=userContacts.phone ";
      query += "WHERE userContacts.userKey='"+req.params.userKey+"' ";
      query += "GROUP BY";
      query += " userContacts.ID,";
      query += " userContacts.userKey,";
      query += " userContacts.fullName,";
      query += " userContacts.phone,";
      query += " userContacts.notify";*/

      query += "SELECT userContacts.*, 0 as rating, 0 as commentsAmount ";
      query += "FROM userContacts ";
      query += "WHERE userContacts.userKey='"+req.params.userKey+"' ";

      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[List User Contacts] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            var response={
              "contacts":rows
            };
            console.log("[List User Contacts] Success");
            res.status(200).jsonp(response);connection.close();
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );

    }
  });


});

//
// Delete Contact
//
app.delete('/users/:userKey/contacts/',function(req,res){
  console.log("[Delete Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','deleteUserContacts',"+timestamp+");";
      query += "DELETE FROM userContacts WHERE userKey='"+req.params.userKey+"'";
      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Delete Account] Error "+response.code+" "+response.message+" ("+err+")");
          }else{
            if(rowsCount==1){
              var response={
                "code":"userkey_not_valid_or_not_contacts",
                "message":"The userKey is not valid our you there is not contacts."
              };
              res.status(400).jsonp(response);connection.close();
              console.log("[Delete Account] Error "+response.code+" "+response.message);
            }else{
              var response={
                "code":"contacts_deleted",
                "message":"The contacts had been deleted."
              };
              res.status(200).jsonp(response);connection.close();
              console.log("[Delete Account] Success");

            }
          }
        })
      );

    }
  });

});

//
// Get Contact
//
app.get('/users/:userKey/contacts/:phone',function(req,res){
  console.log("[Get User Contact] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','getUserContact',"+timestamp+");";

      /*query += "SELECT userContacts.*, SUM(userComments.rating)/COUNT(userComments.ID) as rating, COUNT(userComments.ID) as commentsAmount ";
      query += "FROM userContacts ";
      query += "INNER JOIN userComments ";
      query += "ON userComments.phone=userContacts.phone ";
      query += "WHERE userContacts.phone='"+req.params.phone+"' AND userContacts.userKey='"+req.params.userKey+"' ";
      query += "GROUP BY";
      query += " userContacts.ID,";
      query += " userContacts.userKey,";
      query += " userContacts.fullName,";
      query += " userContacts.phone,";
      query += " userContacts.notify";*/

      query += "SELECT userContacts.*, 0 as rating, 0 as commentsAmount ";
      query += "FROM userContacts ";
      query += "WHERE userContacts.phone='"+req.params.phone+"' AND userContacts.userKey='"+req.params.userKey+"' ";


      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Get User Contact] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            var response={
              "contact":rows[0]
            };
            console.log("[Get User Contact] Success");
            res.status(200).jsonp(response);connection.close();
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );



    }
  });



});

//
// Update Contact
//
app.put('/users/:userKey/contacts/:phone',function(req,res){
  console.log("[Update Contact] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var contact={};
      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','updateUserContact',"+timestamp+");";
      query += "UPDATE userContacts SET ";
      var data_to_update=false;
      var coma=" ";

      if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
        user.fullName=mssql_escape(req.body.fullName);
        query += coma+"fullName='"+contact.fullName+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.notify == 'undefined')||(req.body.notify==''))){
        user.phone=req.body.phone;
        query += coma+"notify='"+contact.notify+"' ";
        data_to_update=true;
        coma=",";
      }

      if(data_to_update){
        query += "WHERE phone='"+req.params.phone+"' AND serKey='"+req.params.userKey+"'";
        var rows = [];
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).jsonp(response);connection.close();
              console.log("[Update Contact] Error "+response.code+" "+response.message+" ("+err+")");
            }else{
              if(rowsCount==1){
                var response={
                  "code":"userkey_or_phone_not_valid",
                  "message":"The userKey or phone is not valid our you are Unauthorized."
                };
                res.status(400).jsonp(response);connection.close();
                console.log("[Update Contact] Error "+response.code+" "+response.message);

              }else{
                var response={
                  "code":"contact_updated",
                  "message":"The contact had been updated."
                };
                res.status(200).jsonp(response);connection.close();
                console.log("[Update Contact] Success");

              }
            }
          })
        );
      }else{
        var response={
          "code":"no_data_to_update",
          "message":"There is no data to update."
        };
        res.status(400).jsonp(response);connection.close();
        console.log("[Update Account] Error "+response.code+" "+response.message+" ("+err+")");

      }



    }
  });



});

//
// Delete Contact
//
app.delete('/users/:userKey/contacts/:phone',function(req,res){
  console.log("[Delete Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{


      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','deleteUserContact',"+timestamp+");";
      query += "DELETE FROM userContacts WHERE phone='"+req.params.phone+"' AND userKey='"+req.params.userKey+"'";
      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Delete Account] Error "+response.code+" "+response.message+" ("+err+")");
          }else{
            if(rowsCount==1){
              var response={
                "code":"userkey_or_phone_not_valid",
                "message":"The userKey or phone is not valid our you are Unauthorized."
              };
              res.status(400).jsonp(response);connection.close();
              console.log("[Delete Account] Error "+response.code+" "+response.message);
            }else{
              var response={
                "code":"contact_deleted",
                "message":"The contact account had been deleted."
              };
              res.status(200).jsonp(response);connection.close();
              console.log("[Delete Account] Success");

            }
          }
        })
      );


    }
  });



});

//
// List Contacts Comments
//
app.get('/users/:userKey/comments',function(req,res){
  console.log("[List Contacts Comments] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','listUserComments',"+timestamp+");";
      query += "SELECT * FROM userComments WHERE phone IN ";
      query += "(SELECT phone FROM userContacts WHERE userKey='"+req.params.userKey+"') ";
      query += "ORDER BY created DESC";

      if(!((typeof req.query.limit == 'undefined')||(req.query.limit==''))){
        limit=req.query.limit;
        offset=0;
        if(!((typeof req.query.offset == 'undefined')||(req.query.offset==''))){
          offset=req.query.offset;
        }
        query += " OFFSET "+offset+" ROWS FETCH NEXT "+limit+" ROWS ONLY"
      }

      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[List Contacts Comments] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            var response={
              "comments":[]
            };
            rows.forEach(function(comment){
              if(comment.reported){
                comment.content="";
              }
              response.comments.push(comment);
            });
            console.log("[List Contacts Comments] Success");
            res.status(200).jsonp(response);connection.close();
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );



    }
  });


});

//
// List Contact Comments
//
app.get('/users/:userKey/contacts/:phone/comments',function(req,res){
  console.log("[List User Comments] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{


      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','listUserComments',"+timestamp+");";
      query += "SELECT * FROM userComments WHERE phone='"+req.params.phone+"' ORDER BY created DESC";

      if(!((typeof req.query.limit == 'undefined')||(req.query.limit==''))){
        limit=req.query.limit;
        offset=0;
        if(!((typeof req.query.offset == 'undefined')||(req.query.offset==''))){
          offset=req.query.offset;
        }
        query += " OFFSET "+offset+" ROWS FETCH NEXT "+limit+" ROWS ONLY"
      }

      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[List User Comments] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            var response={
              "comments":[]
            };
            rows.forEach(function(comment){
              if(comment.reported){
                comment.content="";
              }
              response.comments.push(comment);
            });
            console.log("[List User Comments] Success");
            res.status(200).jsonp(response);connection.close();
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );


    }
  });


});

//
// Add Contact Comment
//
app.post('/users/:userKey/contacts/:phone/comments',function(req,res){


  console.log("[Add Comment] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      if(
        (typeof req.body.rating == 'undefined')||(req.body.rating=='')||
        (typeof req.body.content == 'undefined')||(req.body.content=='')
      ){
        var response={
          "code":"missing_parameter",
          "message":"You need to provide: ("
        };
        if((typeof req.body.rating == 'undefined')||(req.body.rating=='')){response.message+=" rating ";}
        if((typeof req.body.content == 'undefined')||(req.body.content=='')){response.message+=" content ";}
        response.message+=")";
        res.status(400).jsonp(response);connection.close();
        console.log("[Add Comment] Error "+response.code+" "+response.message);

      }else{

        var comment={
          "commentKey":sha1("commentKey"+rand(0,999999)+req.body.userKey+req.body.phone+timestamp),
          "parentKey":req.body.parentKey,
          "userKey":req.params.userKey,
          "phone":req.params.phone,
          "rating":req.body.rating,
          "content":mssql_escape(req.body.content),
          "reported":0,
          "created":timestamp
        }

        if((typeof req.body.parentKey == 'undefined')||(req.body.parentKey=='')){comment.parentKey="";}

        var query = "";
        query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','addUserComment',"+timestamp+");";
        query += "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES";
        query += " ('"+comment.commentKey+"', '"+comment.parentKey+"', '"+comment.userKey+"', '"+comment.phone+"', '"+comment.rating+"', '"+comment.content+"', '"+comment.reported+"', "+comment.created+")";
        console.log(query);

        connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Add Comment] Error "+response.code+" "+response.message+" ("+err+")");

          } else {
            var response={
              "comment":comment
            };

            twilio.messages.create({
            	to: comment.phone,
            	from: "+34932202908",
            	body: "Este n&#250;mero ha sido expuesto, visita www.appexpose.com",
            }, function(err, message) {
            	console.log(message.sid);
            });

            res.status(200).jsonp(response);connection.close();
            console.log("[Add Comment] Success");
          }
        }));
      }



    }
  });



});

//
// Get Contact Comment
//
app.get('/users/:userKey/contacts/:phone/comments/:commentKey',function(req,res){
  console.log("[Get User Comment] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','getUserComments',"+timestamp+");";
      query += "SELECT * FROM userComments WHERE commentKey='"+req.params.commentKey+"' AND phone='"+req.params.phone+"'";
      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);connection.close();
            console.log("[Get User Comment] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            if(rowsCount==1){
              var response={
                "code":"commentkey_or_phone_not_valid",
                "message":"The commentKey or phone is not valid."
              };
              res.status(400).jsonp(response);connection.close();
              console.log("[Report Comment] Error "+response.code+" "+response.message);

            }else{
              var response={
                "comment":[]
              };
              comment=rows[0];
              if(comment.reported){
                comment.content="";
              }
              response.comment.push(comment);

              console.log("[Get User Comment] Success");
              res.status(200).jsonp(response);connection.close();
            }
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );


    }
  });


});

//
// Report Contact Comment
//
app.put('/users/:userKey/contacts/:phone/comments/:commentKey/report',function(req,res){
  console.log("[Report Comment] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var connection = new Connection(sqlconfig);
  connection.on('connect', function(err) {
    if(err){var response={"code":"db_exception","message":"An internal error has occured on our server."};res.status(500).jsonp(response);connection.close();}else{

      var query = "";
      query += "INSERT INTO log (userKey,action,created) VALUES ('"+req.params.userKey+"','reportUserComment',"+timestamp+");";
      query += "UPDATE userComments SET reported = 1 WHERE commentKey='"+req.params.commentKey+"'";
      console.log(query);

      connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).jsonp(response);connection.close();
          console.log("[Report Comment] Error "+response.code+" "+response.message+" ("+err+")");

        } else {

          if(rowsCount==1){
            var response={
              "code":"commentkey_or_phone_not_valid",
              "message":"The commentKey or phone is not valid."
            };
            res.status(400).jsonp(response);connection.close();
            console.log("[Report Comment] Error "+response.code+" "+response.message);

          }else{
            var response={
              "code":"comment_reported",
              "message":"The comment had been reported."
            };
            res.status(200).jsonp(response);connection.close();
            console.log("[Report Comment] Success");
          }
        }
      }));



    }
  });



});












function mssql_escape (str) {
  if(!((typeof str == 'undefined')||(str==''))){
    return str.replace(/'/g, "''");
  }else{
    return str;
  }

}


function checkAdminApi(connection,req,res,callback){
  console.log("[checkAdminApi] START");
  console.log("[checkAdminApi] adminApiKey: "+req.params.adminApiKey);
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  if((typeof req.params.adminApiKey == 'undefined')||(req.params.adminApiKey=='')){
    var response={"code":"missing_adminapikey","message":"You didn't provide an apiKey."};res.status(400).jsonp(response);connection.close();
    console.log("missing_adminapikey");
    callback(true);
  }else{
    var apicheck_query = "SELECT adminKey FROM admins WHERE adminApiKey='"+req.params.adminApiKey+"'";
    console.log(apicheck_query);
    var apicheck_rows = [];
    connection.execSql(new Request(apicheck_query, function(apicheck_err,apicheck_rowsCount) {
      if (apicheck_err) {
        var response={"code":"db_exception","message":"An internal error has occured on our server."};
        res.status(500).jsonp(response);connection.close();
        console.log("db_exception");
        callback(true);
      }else{
        if(apicheck_rowsCount==0){
          var response={"code":"adminapiket_not_valid","message":"The adminApiKey you entered is not valid."};
          res.status(401).jsonp(response);connection.close();
          console.log("adminapiket_not_valid");
          callback(true);
        }else{
          var adminKey = apicheck_rows[0].brandKey;
          callback(false,adminKey);
        }
      }
    })
    .on('row', function(apicheck_columns) {var apicheck_row={};apicheck_columns.forEach(function(apicheck_column) {apicheck_row[apicheck_column.metadata.colName]=apicheck_column.value;});apicheck_rows.push(apicheck_row);})
    );
  }
}


function rand (min,max) {
    return parseInt(Math.random() * (max - min) + max);
}
