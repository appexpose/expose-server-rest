var version = "1.0.1";

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

var sqlconfig = require('./sql.config');

var connection = new Connection(sqlconfig);


connection.on('connect', function(err) {
  if(err){
    sql_connection=false;
    console.log("Azure SQL Conneciont [error]");
  }else{
    sql_connection=true;
    console.log("Azure SQL Conneciont [ok]");
    status.sql="connected";
  }
  server.listen(port, function () {
    status.server="running";
  });
});


var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key");
  next();
});

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/status',function(req,res){

  res.status(200).jsonp(status);

});


app.get('/version',function(req,res){

  res.status(200).jsonp(version);

});




//
// Crate Tables
//
app.get('/tables',function(req,res){
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
        "sql":query,
        "err":err,
        "message":"An internal error has occured on our server."
      };
      res.status(500).send(response);
      console.log(err);

    } else {
      var response={
        "code":"Tables created",
        "message":"The tables had been created."
      };
      res.status(200).jsonp(response);
    }
  }));
});


//
// ADMINS
//

//
// List Users
//

app.get('/admin/:adminApiKey/users',function(req,res){
  console.log("[Admin - List Users] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  checkAdminApi(req,res,function(err,adminKey){
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
            res.status(500).jsonp(response);
            console.log("[Admin - List Users] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            var response={
              "users":rows
            };

            console.log("[Admin - List Users] Success");
            res.status(200).jsonp(response);
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );

    }
  });
});

//
// List UserContacts
//

app.get('/admin/:adminApiKey/users/contacts',function(req,res){
  console.log("[Admin - List User Contacts] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  checkAdminApi(req,res,function(err,adminKey){
    if(!err){

      var query = "SELECT * FROM userContacts";
      var rows=[];
      console.log(query);
      connection.execSql(new Request(query, function(err) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).jsonp(response);
            console.log("[Admin - List User Contacts] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            console.log("[Admin - List User Contacts] Success");
            res.status(200).jsonp(rows);
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
      );

    }
  });
});

//
// List Comments
//

app.get('/admin/:adminApiKey/users/comments',function(req,res){
  console.log("[Admin - List User Comments] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  checkAdminApi(req,res,function(err,adminKey){
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
            res.status(500).jsonp(response);
            console.log("[Admin - List User Comments] Error "+response.code+" "+response.message+" ("+err+")");

          }else{
            console.log("[Admin - List User Comments] Success");
            res.status(200).jsonp(rows);
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

app.post('/users',function(req,res){
  console.log("[Signup] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

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
    res.status(400).jsonp(response);
    console.log("[Signup] Error "+response.code+" "+response.message);

  }else{
    var user={
      "deviceKey":req.body.deviceKey,
      "userKey":sha1("userKey"+rand(0,999999)+req.body.deviceKey+timestamp),
      "fullName":req.body.fullName,
      "prefix":req.body.prefix,
      "phone":req.body.phone,
      "system":req.body.system,
      "version":req.body.version,
      "created":timestamp,
      "lastConnection":timestamp
    }

    if((typeof req.body.fullName == 'undefined')||(req.body.fullName=='')){user.fullName="";}
    if((typeof req.body.phone == 'undefined')||(req.body.phone=='')){user.phone="";}

    var query = "INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES";
    query += " ('"+user.deviceKey+"', '"+user.userKey+"', '"+user.fullName+"', '"+user.prefix+"', '"+user.phone+"', '"+user.system+"', '"+user.version+"', "+user.created+", "+user.lastConnection+")";
    console.log(query);

    connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[Signup] Error "+response.code+" "+response.message+" ("+err+")");

      } else {
        res.status(200).jsonp(user);
        console.log("[Signup] Success");
      }
    }));
  }
});

app.put('/users/:userKey/login',function(req,res){
  console.log("[Login] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "UPDATE users SET lastConnection = "+timestamp+" WHERE userKey='"+req.params.userKey+"'";
  console.log(query);

  connection.execSql(new Request(query, function(err,rowsCount) {
    if (err) {
      var response={
        "code":"db_exception",
        "message":"An internal error has occured on our server."
      };
      res.status(500).jsonp(response);
      console.log("[Login] Error "+response.code+" "+response.message+" ("+err+")");

    } else {

      if(rowsCount==0){
        var response={
          "code":"userkey_not_valid",
          "message":"The userKey is not valid."
        };
        res.status(400).jsonp(response);
        console.log("[Login] Error "+response.code+" "+response.message);

      }else{
        var response={
          "code":"user_logged",
          "message":"The user had been logged."
        };
        res.status(200).jsonp(response);
        console.log("[Login] Success");
      }
    }
  }));
});

app.get('/users/:userKey/account',function(req,res){
  console.log("[Get Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "SELECT * FROM users WHERE userKey='"+req.params.userKey+"'";
  var rows=[];
  console.log(query);
  connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[Get Account] Error "+response.code+" "+response.message+" ("+err+")");

      }else{
        console.log("[Get Account] Success");
        res.status(200).jsonp(rows[0]);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

app.put('/users/:userKey/account',function(req,res){
  console.log("[Update Account] START");

  var user={};
  var query = "UPDATE users SET ";
  var data_to_update=false;
  var coma=" ";

  if(!((typeof req.body.deviceKey == 'undefined')||(req.body.deviceKey==''))){
    user.deviceKey=req.body.deviceKey;
    query += coma+"deviceKey='"+user.deviceKey+"' ";
    data_to_update=true;
    coma=",";
  }
  if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
    user.fullName=req.body.fullName;
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
          res.status(500).jsonp(response);
          console.log("[Update Account] Error "+response.code+" "+response.message+" ("+err+")");
        }else{
          if(rowsCount==0){
            var response={
              "code":"userkey_not_valid",
              "message":"The userKey is not valid our you are Unauthorized."
            };
            res.status(400).jsonp(response);
            console.log("[Update Account] Error "+response.code+" "+response.message);

          }else{
            var response={
              "code":"user_updated",
              "message":"The user had been updated."
            };
            res.status(200).jsonp(response);
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
    res.status(400).send(response);
    console.log("[Update Account] Error "+response.code+" "+response.message+" ("+err+")");

  }

});

app.delete('/users/:userKey',function(req,res){
  console.log("[Delete Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "";
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
        res.status(500).jsonp(response);
        console.log("[Delete Account] Error "+response.code+" "+response.message+" ("+err+")");
      }else{
        if(rowsCount==0){
          var response={
            "code":"userkey_not_valid",
            "message":"The userKey is not valid our you are Unauthorized."
          };
          res.status(400).jsonp(response);
          console.log("[Delete Account] Error "+response.code+" "+response.message);
        }else{
          var response={
            "code":"user_deleted",
            "message":"The user account had been deleted."
          };
          res.status(200).send(response);
          console.log("[Delete Account] Success");

        }
      }
    })
  );

});




app.post('/users/:userKey/contacts',function(req,res){
  console.log("[Add User Contact] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  if(
    (typeof req.body.phone == 'undefined')||(req.body.phone=='')
  ){
    var response={
      "code":"missing_parameter",
      "message":"You need to provide: ("
    };
    if((typeof req.body.phone == 'undefined')||(req.body.phone=='')){response.message+=" phone ";}
    response.message+=")";
    res.status(400).jsonp(response);
    console.log("[Add User Contact] Error "+response.code+" "+response.message);

  }else{
    var contact={
      "userKey":req.params.userKey,
      "fullName":req.body.fullName,
      "phone":req.body.phone,
      "notify":req.body.notify
    }

    if((typeof req.body.fullName == 'undefined')||(req.body.fullName=='')){contact.fullName="";}
    if((typeof req.body.notify == 'undefined')||(req.body.notify=='')){contact.notify=1;}

    var query = "";
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
        res.status(500).jsonp(response);
        console.log("[Signup] Error "+response.code+" "+response.message+" ("+err+")");

      } else {
        var response={
          "contact":contact
        };
        res.status(200).jsonp(response);
        console.log("[Signup] Success");
      }
    }));
  }
});

app.get('/users/:userKey/contacts',function(req,res){
  console.log("[List User Contacts] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "SELECT * FROM userContacts WHERE userKey='"+req.params.userKey+"'";
  var rows=[];
  console.log(query);
  connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[List User Contacts] Error "+response.code+" "+response.message+" ("+err+")");

      }else{
        var response={
          "contacts":rows
        };
        console.log("[List User Contacts] Success");
        res.status(200).jsonp(response);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

app.delete('/users/:userKey/contacts/',function(req,res){
  console.log("[Delete Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "DELETE FROM userContacts WHERE userKey='"+req.params.userKey+"'";
  var rows=[];
  console.log(query);
  connection.execSql(new Request(query, function(err,rowsCount) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[Delete Account] Error "+response.code+" "+response.message+" ("+err+")");
      }else{
        if(rowsCount==0){
          var response={
            "code":"userkey_not_valid_or_not_contacts",
            "message":"The userKey is not valid our you there is not contacts."
          };
          res.status(400).jsonp(response);
          console.log("[Delete Account] Error "+response.code+" "+response.message);
        }else{
          var response={
            "code":"user_deleted",
            "message":"The user account had been deleted."
          };
          res.status(200).send(response);
          console.log("[Delete Account] Success");

        }
      }
    })
  );

});

app.get('/users/:userKey/contacts/:phone',function(req,res){
  console.log("[Get User Contact] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "";

  query += "SELECT userContacts.*, SUM(userComments.rating)/COUNT(userComments.ID) as rating, COUNT(userComments.ID) as commentsAmount ";
  query += "FROM userContacts ";
  query += "INNER JOIN userComments ";
  query += "ON userComments.phone=userContacts.phone ";
  query += "WHERE userContacts.phone='"+req.params.phone+"' AND userContacts.userKey='"+req.params.userKey+"' ";
  query += "GROUP BY";
  query += " userContacts.ID,";
  query += " userContacts.userKey,";
  query += " userContacts.fullName,";
  query += " userContacts.phone,";
  query += " userContacts.notify";

  var rows=[];
  console.log(query);
  connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[Get User Contact] Error "+response.code+" "+response.message+" ("+err+")");

      }else{
        var response={
          "contact":rows[0]
        };
        console.log("[Get User Contact] Success");
        res.status(200).jsonp(response);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

app.put('/users/:userKey/contacts/:phone',function(req,res){
  console.log("[Update Contact] START");

  var contact={};
  var query = "UPDATE userContacts SET ";
  var data_to_update=false;
  var coma=" ";

  if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
    user.fullName=req.body.fullName;
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
          res.status(500).jsonp(response);
          console.log("[Update Contact] Error "+response.code+" "+response.message+" ("+err+")");
        }else{
          if(rowsCount==0){
            var response={
              "code":"userkey_or_phone_not_valid",
              "message":"The userKey or phone is not valid our you are Unauthorized."
            };
            res.status(400).jsonp(response);
            console.log("[Update Contact] Error "+response.code+" "+response.message);

          }else{
            var response={
              "code":"user_updated",
              "message":"The user had been updated."
            };
            res.status(200).jsonp(response);
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
    res.status(400).send(response);
    console.log("[Update Account] Error "+response.code+" "+response.message+" ("+err+")");

  }

});

app.delete('/users/:userKey/contacts/:phone',function(req,res){
  console.log("[Delete Account] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "DELETE FROM userContacts WHERE phone='"+req.params.phone+"' AND userKey='"+req.params.userKey+"'";
  var rows=[];
  console.log(query);
  connection.execSql(new Request(query, function(err,rowsCount) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[Delete Account] Error "+response.code+" "+response.message+" ("+err+")");
      }else{
        if(rowsCount==0){
          var response={
            "code":"userkey_or_phone_not_valid",
            "message":"The userKey or phone is not valid our you are Unauthorized."
          };
          res.status(400).jsonp(response);
          console.log("[Delete Account] Error "+response.code+" "+response.message);
        }else{
          var response={
            "code":"user_deleted",
            "message":"The user account had been deleted."
          };
          res.status(200).send(response);
          console.log("[Delete Account] Success");

        }
      }
    })
  );

});


app.get('/users/:userKey/contacts/:phone/comments',function(req,res){
  console.log("[List User Comments] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "SELECT * FROM userComments WHERE phone='"+req.params.phone+"' ORDER BY created DESC";

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
        res.status(500).jsonp(response);
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
        res.status(200).jsonp(response);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});


app.post('/users/:userKey/contacts/:phone/comments',function(req,res){


  console.log("[Add Comment] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);


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
    res.status(400).jsonp(response);
    console.log("[Add Comment] Error "+response.code+" "+response.message);

  }else{

    var comment={
      "commentKey":sha1("commentKey"+rand(0,999999)+req.body.userKey+req.body.phone+timestamp),
      "parentKey":req.body.parentKey,
      "userKey":req.params.userKey,
      "phone":req.params.phone,
      "rating":req.body.rating,
      "content":req.body.content,
      "reported":0,
      "created":timestamp
    }

    if((typeof req.body.parentKey == 'undefined')||(req.body.parentKey=='')){comment.parentKey="";}

    var query = "INSERT INTO userComments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES";
    query += " ('"+comment.commentKey+"', '"+comment.parentKey+"', '"+comment.userKey+"', '"+comment.phone+"', '"+comment.rating+"', '"+comment.content+"', '"+comment.reported+"', "+comment.created+")";
    console.log(query);

    connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[Add Comment] Error "+response.code+" "+response.message+" ("+err+")");

      } else {
        var response={
          "comment":comment
        };
        res.status(200).jsonp(response);
        console.log("[Add Comment] Success");
      }
    }));
  }


});



app.get('/users/:userKey/contacts/:phone/comments/:commentKey',function(req,res){
  console.log("[Get User Comment] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "SELECT * FROM userComments WHERE commentKey='"+req.params.commentKey+"' AND phone='"+req.params.phone+"'";
  var rows=[];
  console.log(query);
  connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).jsonp(response);
        console.log("[Get User Comment] Error "+response.code+" "+response.message+" ("+err+")");

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
        res.status(200).jsonp(response);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

app.put('/users/:userKey/contacts/:phone/comments/:commentKey/report',function(req,res){
  console.log("[Report Comment] START");

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  var query = "UPDATE userComments SET reported = 1 WHERE commentKey='"+req.params.commentKey+"'";
  console.log(query);

  connection.execSql(new Request(query, function(err,rowsCount) {
    if (err) {
      var response={
        "code":"db_exception",
        "message":"An internal error has occured on our server."
      };
      res.status(500).jsonp(response);
      console.log("[Report Comment] Error "+response.code+" "+response.message+" ("+err+")");

    } else {

      if(rowsCount==0){
        var response={
          "code":"commentkey_or_phone_not_valid",
          "message":"The commentKey or phone is not valid."
        };
        res.status(400).jsonp(response);
        console.log("[Report Comment] Error "+response.code+" "+response.message);

      }else{
        var response={
          "code":"comment_reported",
          "message":"The comment had been reported."
        };
        res.status(200).jsonp(response);
        console.log("[Report Comment] Success");
      }
    }
  }));

});






//
//
//

//
// Listar Administradores
// - Cambiar a sólo ver los admins de la marca
//
app.get('/admins',function(req,res){
  if(!sql_connection){
    var response={
      "code":"No Database Connection",
      "message":"There isn't connection to our database."
    };
    res.status(500).send(response);

  }else{
    var query;
    query = "SELECT * FROM admins";
    var rows=[];
    connection.execSql(new Request(query, function(err) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
        }else{
          res.status(200).jsonp(rows);
        }
      })
      .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
    );

  }
});


//
// Signin Admin
//
app.post('/admins',function(req,res){
  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);
  if(
    (typeof req.body.brandKey == 'undefined')||(req.body.brandKey=='')||
    (typeof req.body.email == 'undefined')||(req.body.email=='')||
    (typeof req.body.password == 'undefined')||(req.body.password=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{

    var query = "SELECT * FROM admins a WHERE a.email='"+req.body.email+"'";
    connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
          console.log(err);
        }else{
          if(rowsCount!=0){
            var response={
              "code":"Signup Error",
              "message":"Email already in use."
            };
            res.status(400).send(response);
          }else{
            var data={
              "adminKey":sha1("adminKey"+req.body.brandKey+req.body.password+req.body.fullName+req.body.email+req.body.password+timestamp),
              "apiKey":sha1("apiKey"+req.body.brandKey+req.body.password+req.body.fullName+req.body.email+req.body.password+timestamp),
              "brandKey":req.body.brandKey,
              "fullName":req.body.fullName,
              "email":req.body.email,
              "active":0,
              "password":sha1(req.body.password),
              "created":timestamp
            }

            var query = "INSERT INTO admins (adminKey,apiKey,brandKey,fullName,email,password,active,created) VALUES";
            query += " ('"+data.adminKey+"', '"+data.apiKey+"', '"+data.brandKey+"', '"+data.fullName+"', '"+data.email+"', '"+data.password+"', "+data.active+", "+data.created+")";
            console.log(query);

            connection.execSql(new Request(query, function(err) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).send(response);
                console.log(err);

              } else {
                var response={
                  "code":"Account created",
                  "message":"Your account had been created, please check your email to active your account."
                };
                var email = new sendgrid.Email();
                email.addTo(data.email);
                email.addTo("lucia@converfit.com");
                email.setFrom("lucia@converfit.com");
                email.setSubject("Welcome to Converfit! Please confirm your email address ("+data.email+")");
                email.setHtml("<p>Hello!</p><p>You need to confirm your email address opening the link:</p><p><a href='http://converfit-server-rest.azurewebsites.net/admins/"+data.adminKey+"/activation'>http://converfit-server-rest.azurewebsites.net/admins/"+data.adminKey+"/activation</a></p><p>By clicking on the following link, you are confirming you email address and agreeing to Converfit's <a href='http://www.converfit.com/old/es/info/terms_of_service/'>Terms of Service</a>.</small></p>");
                //sendgrid.send(email);
                res.status(200).jsonp(response);
                console.log(response);

              }
            }));
          }
        }
      })
    );
  }
});


//
// Login Admin
//
app.post('/admins/authenticate',function(req,res){

  console.log("[POST][authenticate] START");

  if(
    (typeof req.body.email == 'undefined')||(req.body.email=='')||
    (typeof req.body.password == 'undefined')||(req.body.password=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{
    var query = "SELECT * FROM admins a WHERE a.email='"+req.body.email+"' AND a.password='"+sha1(req.body.password)+"' AND a.active=1";
    var rows = [];
    console.log(query);

    connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
          console.log(err);
        }else{
          if(rowsCount==0){
            var response={
              "code":"Unauthorized",
              "message":"The email address or password you entered is not valid, or your account is inactive."
            };
            res.status(401).send(response);
          }else{
            var response={
              "brandKey":rows[0].brandKey,
              "apiKey":rows[0].apiKey
            };
            res.status(200).jsonp(response);
          }
        }
      })
      .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
    );
  }

});


//
// Recover Password Admin
// - Hacer
//
app.post('/admins/forgotpassword',function(req,res){
  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  console.log("[POST][forgotpassword]");

  if(
    (typeof req.body.email == 'undefined')||(req.body.email=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{


    var query = "SELECT * FROM admins WHERE email='"+req.body.email+"'";
    var rows = [];
    connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
          console.log(err);
        }else{
          if(rowsCount==0){
            var response={
              "code":"Recover Error",
              "message":"Email not in use."
            };
            res.status(401).send(response);
          }else{
            var admin={
              "adminKey":rows[0].adminKey,
              "email":rows[0].email
            };

            var email = new sendgrid.Email();
            email.addTo(admin.email);
            email.addTo("pablo@converfit.com");
            email.setFrom("pablo@converfit.com");
            email.setSubject("Recuperación de contraseña ("+admin.email+")");
            email.setHtml("<p>Hola!</p><p>Para crear una nueva contraseña, accede al siguiente link:</p><p><a href='http://converfit-manager.azurewebsites.net/angular/#/access/set-password/"+admin.adminKey+"'>http://converfit-manager.azurewebsites.net/angular/#/access/set-password/"+admin.adminKey+"</a></p>");
            sendgrid.send(email);

            console.log("[POST][forgotpassword] http://converfit-manager.azurewebsites.net/angular/#/access/set-password/"+admin.adminKey+"");
            console.log("[POST][forgotpassword] Email Sent");


            var response={
              "code":"Recover Success",
              "message":"Email sent."
            };
            res.status(200).jsonp(response);

          }
        }
      })
      .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
    );
  }
});






//
// Set Password Admin
// - Hacer
//
app.post('/admins/:adminKey/setpassword',function(req,res){

  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  console.log("[POST][setpassword] START");

  if(
    (typeof req.params.adminKey == 'undefined')||(req.params.adminKey=='')||
    (typeof req.body.password == 'undefined')||(req.body.password=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{

    var query = "UPDATE admins SET password='"+sha1(req.body.password)+"' WHERE adminKey='"+req.params.adminKey+"'";
    console.log(query);
    connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
          console.log(err);
        }else{
          if(rowsCount==0){
            var response={
              "code":"Error",
              "message":"There adminKey is not valid."
            };
            res.status(400).send(response);
          }else{
            var response={
              "code":"Password updated",
              "message":"The password had been updated."
            };

            console.log("[POST][setpassword] Password updated");

            res.status(200).send(response);
          }
        }
      })
    );

  }

});

//
// Activate Admin
//
app.get('/admins/:adminKey/activation',function(req,res){
  var timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);

  console.log("[GET][activation]");


  var query = "SELECT * FROM admins WHERE active=0 AND adminKey='"+req.params.adminKey+"'";
  console.log(query);
  connection.execSql(new Request(query, function(err,rowsCount) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
        console.log(err);
      }else{
        if(rowsCount==0){
          var response={
            "code":"Activation Error",
            "message":"Activation code not valid."
          };
          res.status(400).send(response);
        }else{
          var query = "UPDATE admins SET active=1 WHERE adminKey='"+req.params.adminKey+"'";
          console.log(query);
          connection.execSql(new Request(query, function(err,rowsCount) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).send(response);
                console.log(err);
              }else{
                if(rowsCount==0){
                  var response={
                    "code":"Error",
                    "message":"There adminKey is not valid."
                  };
                  res.status(400).send(response);
                }else{
                  var response={
                    "code":"Account active",
                    "message":"Your account had been actived."
                  };
                  res.status(200).send(response);
                }
              }
            })
          );

        }
      }
    })
  );

});

//
// Block Admin
//
app.post('/admins/:adminKey/block',function(req,res){
  console.log("[get][activation]");
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      var query = "UPDATE admins SET active=0 WHERE adminKey='"+req.params.adminKey+"' AND brandKey='"+apiBrandKey+"'";
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).send(response);
            console.log(err);
          }else{
            if(rowsCount==0){
              var response={
                "code":"Error",
                "message":"The adminKey is not valid our you are Unauthorized."
              };
              res.status(400).send(response);
            }else{
              var response={
                "code":"Account blocked",
                "message":"The account had been blocked."
              };
              res.status(200).send(response);
            }
          }
        })
      );
    }
  });
});




//
// Update Admin
//
app.put('/admins/:adminKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      var data={};
      var query = "UPDATE admins SET ";
      var data_to_update=false;
      var coma=" ";

      if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
        data.fullName=req.body.fullName;
        query += coma+"fullName='"+data.fullName+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.email == 'undefined')||(req.body.email==''))){
        data.email=req.body.email;
        query += coma+"email='"+data.email+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.password == 'undefined')||(req.body.password==''))){
        data.password=req.body.password;
        query += coma+"password='"+sha1(data.password)+"' ";
        data_to_update=true;
        coma=",";
      }
      if(data_to_update){
        query += "WHERE adminKey='"+req.params.adminKey+"' AND brandKey='"+apiBrandKey+"'";
        var rows = [];
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The adminKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"Admin Updated",
                  "message":"The admin had been updated."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }else{
        var response={
          "code":"Missing parameter",
          "message":"You didn't provide a required parameter."
        };
        res.status(400).send(response);
      }
    }
  });
});

//
// Delete Admin
//
app.delete('/admins/:adminKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      var query = "DELETE FROM admins WHERE adminKey='"+req.params.adminKey+"' AND brandKey='"+apiBrandKey+"'";
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).send(response);
            console.log(err);
          }else{
            if(rowsCount==0){
              var response={
                "code":"Error",
                "message":"The adminKey is not valid our you are Unauthorized."
              };
              res.status(400).send(response);
            }else{
              var response={
                "code":"Admin deleted",
                "message":"The admin account had been deleted."
              };
              res.status(200).send(response);
            }
          }
        })
      );
    }
  });
});


//
// Get Admin
//
app.get('/admins/:adminKey',function(req,res){

  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      var query = "SELECT adminKey,brandKey,fullName,email,created FROM admins WHERE adminKey='"+req.params.adminKey+"' AND brandKey='"+apiBrandKey+"'";
      var rows = [];
      console.log(query);
      connection.execSql(new Request(query, function(err,rowsCount) {
          if (err) {
            var response={
              "code":"db_exception",
              "message":"An internal error has occured on our server."
            };
            res.status(500).send(response);
            console.log(err);
          }else{
            if(rowsCount==0){
              var response={
                "code":"Error",
                "message":"The adminKey is not valid our you are Unauthorized."
              };
              res.status(400).send(response);
            }else{
              res.status(200).send(rows[0]);
            }
          }
        })
        .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})

      );
    }
  });


});





//
// BRANDS
//

//
// Add Brand
//
app.post('/brands',function(req,res){

  console.log("[POST][brands] START");
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  if(
    (typeof req.body.fullName == 'undefined')||(req.body.fullName=='')||
    (typeof req.body.url == 'undefined')||(req.body.url=='')||
    (typeof req.body.subscription == 'undefined')||(req.body.subscription=='')||
    (typeof req.body.email == 'undefined')||(req.body.email=='')||
    (typeof req.body.password == 'undefined')||(req.body.password=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{


    brandKey = sha1("brandKey"+req.body.fullName+timestamp);

    var query = "SELECT * FROM admins WHERE email='"+req.body.email+"'";
    connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
          console.log(err);
        }else{
          if(rowsCount!=0){
            var response={
              "code":"Signup Error",
              "message":"Email already in use."
            };
            res.status(400).send(response);
          }else{
            var brand={
              "brandKey":brandKey,
              "fullName":req.body.fullName,
              "url":req.body.url,
              "subscription":req.body.subscription,
              "active":1,
              "created":timestamp
            };
            var query ="";

            query += "INSERT INTO brands (brandKey,fullName,url,subscription,active,created) VALUES";
            query += " ('"+brand.brandKey+"', '"+brand.fullName+"', '"+brand.url+"', '"+brand.subscription+"', "+brand.active+", "+brand.created+");";

            var admin={
              "adminKey":sha1("adminKey"+brand.brandkey+req.body.password+req.body.email+req.body.password+timestamp),
              "apiKey":sha1("apiKey"+req.body.brandKey+req.body.password+req.body.email+req.body.password+timestamp),
              "brandKey":brand.brandkey,
              "fullName":"Admin "+req.body.fullName,
              "email":req.body.email,
              "active":0,
              "password":sha1(req.body.password),
              "created":timestamp
            }

            var query = "INSERT INTO admins (adminKey,apiKey,brandKey,fullName,email,password,active,created) VALUES";
            query += " ('"+admin.adminKey+"', '"+admin.apiKey+"', '"+brand.brandKey+"', '"+admin.fullName+"', '"+admin.email+"', '"+admin.password+"', "+admin.active+", "+admin.created+");";


            query += "INSERT INTO brands (brandKey,fullName,url,subscription,active,created) VALUES";
            query += " ('"+brand.brandKey+"', '"+brand.fullName+"', '"+brand.url+"', '"+brand.subscription+"', "+brand.active+", "+brand.created+");";
            console.log(query);

            connection.execSql(new Request(query, function(err) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).send(response);
                console.log(err);

              } else {
                var email = new sendgrid.Email();
                email.addTo(admin.email);
                email.addTo("pablo@converfit.com");
                email.setFrom("pablo@converfit.com");
                email.setSubject("Bienvenido a Converfit! Por favor confirma tu dirección de correo ("+admin.email+")");
                email.setHtml("<p>Hola!</p><p>Es necesario que confirmes tu dirección de correo en el siguiente link:</p><p><a href='http://converfit-manager.azurewebsites.net/angular/#/access/activation/"+admin.adminKey+"'>http://converfit-manager.azurewebsites.net/angular/#/access/activation/"+admin.adminKey+"</a></p><p>Haciendo click en el link, estás confirmando que quieres activar tu cuenta de Converfit y estás de acuerdo con los <a href='http://converfit-manager.azurewebsites.net/angular/#/info/terms/'>términos y condiciones</a> de nuestro servicio.</small></p>");
                sendgrid.send(email);

                var response={
                  "brandKey":brand.brandKey
                };
                res.status(200).jsonp(response);
              }
            }));
          }
        }
      })
    );
  }
});


//
// Listar Brands
// - Cambiar a sólo ver los admins de la marca
//
app.get('/brands',function(req,res){
  if(!sql_connection){
    var response={
      "code":"No Database Connection",
      "message":"There isn't connection to our database."
    };
    res.status(500).send(response);

  }else{
    var query;
    query = "SELECT * FROM brands";
    var rows=[];
    connection.execSql(new Request(query, function(err) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
        }else{
          res.status(200).jsonp(rows);
        }
      })
      .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
    );

  }
});

//
// Get Brand
//
app.get('/brands/:brandKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var query = "SELECT * FROM brands WHERE brandKey='"+req.params.brandKey+"'";
        var rows = [];
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The brandKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                res.status(200).send(rows[0]);
              }
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });

});

//
// Update Brand
//
app.put('/brands/:brandKey',function(req,res){

  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      var data={};
      var query = "UPDATE brands SET ";
      var data_to_update=false;
      var coma=" ";

      if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
        data.fullName=req.body.fullName;
        query += coma+"fullName='"+data.fullName+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.url == 'undefined')||(req.body.url==''))){
        data.url=req.body.url;
        query += coma+"url='"+data.url+"' ";
        data_to_update=true;
        coma=",";
      }
      if(!((typeof req.body.subscription == 'undefined')||(req.body.subscription==''))){
        data.subscription=req.body.subscription;
        query += coma+"subscription='"+data.subscription+"' ";
        data_to_update=true;
        coma=",";
      }
      if(data_to_update){
        query += "WHERE brandKey='"+req.params.brandKey+"'";
        var rows = [];
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The brandKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"Brand Updated",
                  "message":"The brand had been updated."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }else{
        var response={
          "code":"Missing parameter",
          "message":"You didn't provide a required parameter."
        };
        res.status(400).send(response);
      }
    }
  });


});

//
// Delete Brand
//
app.delete('/brands/:brandKey',function(req,res){

  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var query = "DELETE FROM brands WHERE brandKey='"+req.params.brandKey+"'";
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "sql":query,
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The brandKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"Brand Deleted",
                  "message":"The brand had been deleted."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }
    }
  });

});




//
// CAMPAIGNS
//

//
// Add Campaign
//
app.post('/:apiKey/brands/:brandKey/campaigns',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  console.log("[POST][Add Campaign] START");
  console.log("[POST][Add Campaign] brandKey: "+req.params.brandKey);
  console.log("[POST][Add Campaign] apiKey: "+req.params.apiKey);
  console.log("[POST][Add Campaign] fullName: "+req.body.fullName);
  console.log("[POST][Add Campaign] campaignTrigger: "+req.body.campaignTrigger);
  console.log("[POST][Add Campaign] campaignFilter: "+req.body.campaignFilter);
  console.log("[POST][Add Campaign] startTimestamp: "+req.body.startTimestamp);
  console.log("[POST][Add Campaign] endTimestamp: "+req.body.endTimestamp);
  console.log("[POST][Add Campaign] active: "+req.body.active);

  if(
    (typeof req.body.fullName == 'undefined')||(req.body.fullName=='')||
    (typeof req.body.type == 'undefined')||(req.body.type=='')||
    (typeof req.body.active == 'undefined')||(req.body.active=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
    console.log("[POST][Add Campaign] "+response.code);

  }else{
    checkApi(req,res,function(err,apiBrandKey){
      if(!err){
        if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
          campaignKey = sha1("campaignKey"+req.body.fullName+req.body.type+timestamp);
          if((typeof req.body.startTimestamp == 'undefined')||(req.body.startTimestamp=='')){
            req.body.startTimestamp=timestamp;
          }
          if((typeof req.body.endTimestamp == 'undefined')||(req.body.endTimestamp=='')){
            req.body.endTimestamp=-1;
          }
          if((typeof req.body.campaignTrigger == 'undefined')||(req.body.campaignTrigger=='')){
            req.body.campaignTrigger="";
          }
          if((typeof req.body.campaignFilter == 'undefined')||(req.body.campaignFilter=='')){
            req.body.campaignFilter="";
          }

          var data={
            "brandKey":apiBrandKey,
            "campaignKey":campaignKey,
            "fullName":req.body.fullName,
            "type":req.body.type,
            "campaignTrigger":mssql_escape(req.body.campaignTrigger),
            "campaignFilter":mssql_escape(req.body.campaignFilter),
            "startTimestamp":req.body.startTimestamp,
            "endTimestamp":req.body.endTimestamp,
            "active":req.body.active,
            "created":timestamp
          };

          var query = "INSERT INTO campaigns (brandKey,campaignKey,fullName,type,campaignTrigger,campaignFilter,startTimestamp,endTimestamp,active,created) VALUES";
          query += " ('"+data.brandKey+"', '"+data.campaignKey+"', '"+data.fullName+"', '"+data.type+"', '"+data.campaignTrigger+"', '"+data.campaignFilter+"', "+data.startTimestamp+", "+data.endTimestamp+", "+data.active+", "+data.created+")";
          console.log(query);
          connection.execSql(new Request(query, function(err) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log("[POST][Add Campaign] "+response.code);
              console.log("[POST][Add Campaign] "+err);

            } else {
              var response={
                "campaignKey":data.campaignKey,
              };
              res.status(200).jsonp(response);
              console.log("[POST][Add Campaign] Success");

            }
          }));
        }
      }
    });
  }

});

//
// List Campaign
//
app.get('/:apiKey/brands/:brandKey/campaigns',function(req,res){

  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  console.log("[GET][Campaigns] START");
  console.log("[GET][Campaigns] brandKey: "+req.params.brandKey);
  console.log("[GET][Campaigns] apiKey: "+req.params.apiKey);

  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM campaigns WHERE brandKey='"+req.params.brandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              var response={
                "campaigns":rows
              };
              res.status(200).jsonp(response);
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }

    }
  });

});

//
// Get Campaign
//
app.get('/:apiKey/brands/:brandKey/campaigns/:campaignKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM campaigns WHERE campaignKey='"+req.params.campaignKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The campaignKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "campaign":rows[0]
                }
                res.status(200).send(response);
              }
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});

//
// Update Campaign
//
app.put('/:apiKey/brands/:brandKey/campaigns/:campaignKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var data={};
        var query = "UPDATE campaigns SET ";
        var data_to_update=false;
        var coma=" ";

        if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
          data.fullName=req.body.fullName;
          query += coma+"fullName='"+data.fullName+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.type == 'undefined')||(req.body.type==''))){
          data.type=req.body.type;
          query += coma+"type='"+data.type+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.campaignTrigger == 'undefined')||(req.body.campaignTrigger==''))){
          data.campaignTrigger=req.body.campaignTrigger;
          query += coma+"campaignTrigger='"+data.campaignTrigger+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.campaignFilter == 'undefined')||(req.body.campaignFilter==''))){
          data.campaignFilter=req.body.campaignFilter;
          query += coma+"campaignFilter='"+data.campaignFilter+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.startTimestamp == 'undefined')||(req.body.startTimestamp==''))){
          data.startTimestamp=req.body.startTimestamp;
          query += coma+"startTimestamp='"+data.startTimestamp+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.endTimestamp == 'undefined')||(req.body.endTimestamp==''))){
          data.endTimestamp=req.body.endTimestamp;
          query += coma+"endTimestamp='"+data.endTimestamp+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.active == 'undefined')||(req.body.active==''))){
          data.active=req.body.active;
          query += coma+"active='"+data.active+"' ";
          data_to_update=true;
          coma=",";
        }
        if(data_to_update){
          query += "WHERE campaignKey='"+req.params.campaignKey+"' AND brandKey='"+apiBrandKey+"'";
          var rows = [];
          console.log(query);
          connection.execSql(new Request(query, function(err,rowsCount) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).send(response);
                console.log(err);
              }else{
                if(rowsCount==0){
                  var response={
                    "code":"Error",
                    "message":"The campaignKey is not valid our you are Unauthorized."
                  };
                  res.status(400).send(response);
                }else{
                  var response={
                    "code":"Campaign Updated",
                    "message":"The campaign had been updated."
                  };
                  res.status(200).send(response);
                }
              }
            })
          );
        }else{
          var response={
            "code":"Missing parameter",
            "message":"You didn't provide a required parameter."
          };
          res.status(400).send(response);
        }

      }

    }
  });
});

//
// Delete Campaign
//
app.delete('/:apiKey/brands/:brandKey/campaigns/:campaignKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var query = "DELETE FROM campaigns WHERE campaignKey='"+req.params.campaignKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The campaignKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"Campaign deleted",
                  "message":"The campaign had been deleted."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }
    }
  });
});




//
// GROUPS
//

//
// Add Group
//
app.post('/brands/:brandKey/groups',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);


  if(
    (typeof req.body.fullName == 'undefined')||(req.body.fullName=='')||
    (typeof req.body.active == 'undefined')||(req.body.active=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{
    checkApi(req,res,function(err,apiBrandKey){
      if(!err){
        if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
          groupKey = sha1("groupKey"+req.body.fullName+apiBrandKey+timestamp);
          if((typeof req.body.groupTrigger == 'undefined')||(req.body.groupTrigger=='')){
            req.body.groupTrigger="";
          }
          if((typeof req.body.groupFilter == 'undefined')||(req.body.groupFilter=='')){
            req.body.groupFilter="";
          }
          var data={
            "brandKey":apiBrandKey,
            "groupKey":groupKey,
            "fullName":req.body.fullName,
            "groupTrigger":req.body.groupTrigger,
            "groupFilter":req.body.groupFilter,
            "active":req.body.active,
            "created":timestamp
          };
          console.log("header"+typeof req.body.groupFilter);
          var query = "INSERT INTO groups (brandKey,groupKey,fullName,groupTrigger,groupFilter,active,created) VALUES";
          query += " ('"+data.brandKey+"', '"+data.groupKey+"', '"+data.fullName+"', '"+data.groupTrigger+"', '"+data.groupFilter+"', "+data.active+", "+data.created+")";
          console.log(query);
          connection.execSql(new Request(query, function(err) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);

            } else {
              var response={
                "groupKey":data.groupKey,
              };
              res.status(200).jsonp(response);
            }
          }));
        }
      }
    });
  }

});

//
// List Groups
//
app.get('/brands/:brandKey/groups',function(req,res){

  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM groups WHERE brandKey='"+req.params.brandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              res.status(200).jsonp(rows);
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }

    }
  });

});

//
// Get Group
//
app.get('/brands/:brandKey/groups/:groupKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM groups WHERE groupKey='"+req.params.groupKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The groupKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                res.status(200).send(rows[0]);
              }
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});

//
// Update Group
//
app.put('/brands/:brandKey/groups/:groupKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var data={};
        var query = "UPDATE groups SET ";
        var data_to_update=false;
        var coma=" ";

        if(!((typeof req.body.fullName == 'undefined')||(req.body.fullName==''))){
          data.fullName=req.body.fullName;
          query += coma+"fullName='"+data.fullName+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.campaignTrigger == 'undefined')||(req.body.campaignTrigger==''))){
          data.campaignTrigger=req.body.campaignTrigger;
          query += coma+"campaignTrigger='"+data.campaignTrigger+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.campaignFilter == 'undefined')||(req.body.campaignFilter==''))){
          data.campaignFilter=req.body.campaignFilter;
          query += coma+"campaignFilter='"+data.campaignFilter+"' ";
          data_to_update=true;
          coma=",";
        }
        if(!((typeof req.body.active == 'undefined')||(req.body.active==''))){
          data.active=req.body.active;
          query += coma+"active='"+data.active+"' ";
          data_to_update=true;
          coma=",";
        }
        if(data_to_update){
          query += "WHERE groupKey='"+req.params.groupKey+"' AND brandKey='"+apiBrandKey+"'";
          var rows = [];
          console.log(query);
          connection.execSql(new Request(query, function(err,rowsCount) {
              if (err) {
                var response={
                  "code":"db_exception",
                  "message":"An internal error has occured on our server."
                };
                res.status(500).send(response);
                console.log(err);
              }else{
                if(rowsCount==0){
                  var response={
                    "code":"Error",
                    "message":"The groupKey is not valid our you are Unauthorized."
                  };
                  res.status(400).send(response);
                }else{
                  var response={
                    "code":"Group Updated",
                    "message":"The group had been updated."
                  };
                  res.status(200).send(response);
                }
              }
            })
          );
        }else{
          var response={
            "code":"Missing parameter",
            "message":"You didn't provide a required parameter."
          };
          res.status(400).send(response);
        }

      }

    }
  });
});

//
// Delete Group
//
app.delete('/brands/:brandKey/groups/:groupKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var query = "DELETE FROM groups WHERE groupKey='"+req.params.groupKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The groupKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"Group deleted",
                  "message":"The group had been deleted."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }
    }
  });
});






//
// USERS
//

//
// Add Users
//
app.post('/users/',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  userKey = sha1("userKey"+rand(0,999999)+timestamp);
  var data={
    "userKey":userKey,
    "created":timestamp
  };
  var query = "INSERT INTO users (userKey,created) VALUES";
  query += " ('"+data.userKey+"', "+data.created+")";
  console.log(query);
  connection.execSql(new Request(query, function(err) {
    if (err) {
      var response={
        "code":"db_exception",
        "message":"An internal error has occured on our server."
      };
      res.status(500).send(response);
      console.log(err);

    } else {
      var response={
        "userKey":data.userKey,
      };
      res.status(200).jsonp(response);
    }
  }));
});

//
// List Users
//
app.get('/users/',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  query = "SELECT * FROM users";
  console.log(query);
  var rows=[];
  connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
      }else{
        res.status(200).jsonp(rows);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

//
// Get User
//
app.get('/users/:userKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  query = "SELECT * FROM users WHERE userKey='"+req.params.userKey+"'";
  console.log(query);
  var rows=[];
  connection.execSql(new Request(query, function(err,rowsCount) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
      }else{
        if(rowsCount==0){
          var response={
            "code":"Error",
            "message":"The userKey is not valid our you are Unauthorized."
          };
          res.status(400).send(response);
        }else{
          res.status(200).send(rows[0]);
        }
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

//
// Delete User
//
app.delete('/users/:userKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  var query = "DELETE FROM users WHERE userKey='"+req.params.userKey+"'";
  console.log(query);
  connection.execSql(new Request(query, function(err,rowsCount) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
        console.log(err);
      }else{
        if(rowsCount==0){
          var response={
            "code":"Error",
            "message":"The groupKey is not valid our you are Unauthorized."
          };
          res.status(400).send(response);
        }else{
          var response={
            "code":"User deleted",
            "message":"The user had been deleted."
          };
          res.status(200).send(response);
        }
      }
    })
  );
});




//
// USER SESSIONS
//

//
// List Users Sessions
//
app.get('/users/:userKey/sessions',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  query = "SELECT * FROM brandUserSessions WHERE userKey='"+req.params.userKey+"'";
  console.log(query);
  var rows=[];
  connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
      }else{
        res.status(200).jsonp(rows);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

//
// Get User Session
//
app.get('/users/:userKey/sessions/:sessionKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  query = "SELECT * FROM brandUserSessions WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"'";
  console.log(query);
  var rows=[];
  connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
      }else{
        res.status(200).jsonp(rows);
      }
    })
    .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
  );
});

//
// Delete User
//
app.delete('/users/:userKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  var query = "DELETE FROM users WHERE userKey='"+req.params.userKey+"'";
  console.log(query);
  connection.execSql(new Request(query, function(err,rowsCount) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
        console.log(err);
      }else{
        if(rowsCount==0){
          var response={
            "code":"Error",
            "message":"The groupKey is not valid our you are Unauthorized."
          };
          res.status(400).send(response);
        }else{
          var response={
            "code":"User deleted",
            "message":"The user had been deleted."
          };
          res.status(200).send(response);
        }
      }
    })
  );
});






//
// BRAND USERS
//

//
// Add Brand User
//
app.post('/brands/:brandKey/users',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  if(
    (typeof req.body.userKey == 'undefined')||(req.body.userKey=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{
    var data={
      "brandKey":req.params.brandKey,
      "userKey":req.body.userKey,
      "created":timestamp
    };
    var query = "";
    query += "IF NOT EXISTS(SELECT * FROM brandUsers WHERE brandKey='"+data.brandKey+"' AND userKey='"+data.userKey+"') ";
    query += "INSERT INTO brandUsers (brandKey,userKey,created) VALUES";
    query += " ('"+data.brandKey+"', '"+data.userKey+"', "+data.created+") ";
    query += "END IF";
    console.log(query);
    connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
        console.log(err);

      } else {
        var response={
          "userKey":data.userKey,
        };
        res.status(200).jsonp(response);
      }
    }));
  }
});

//
// List Brand Users
//
app.get('/brands/:brandKey/users',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM brandUsers WHERE brandKey='"+req.params.brandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              res.status(200).jsonp(rows);
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});

//
// Get Brand User
//
app.get('/brands/:brandKey/users/:userKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM brandUsers WHERE userKey='"+req.params.userKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The userKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                res.status(200).send(rows[0]);
              }
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});


//
// Delete Brand User
//
app.delete('/brands/:brandKey/users/:userKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var query = "DELETE FROM brandUsers WHERE userKey='"+req.params.userKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The userKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"User deleted",
                  "message":"The user had been deleted."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }
    }
  });
});





//
// BRAND USER SESSIONS
//

//
// Add Brand User Session
//
app.post('/brands/:brandKey/users/:userKey/sessions',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  sessionKey=sha1("sessionKey"+req.params.brandKey+req.params.userKey+rand(0,999999)+timestamp);

  var data={
    "brandKey":req.params.brandKey,
    "userKey":req.params.userKey,
    "sessionKey":sessionKey,
    "referrer":"",
    "leadScore":0,
    "screenWidth":0,
    "screenHeight":0,
    "navigatorAppCodeName":"",
    "navigatorAppName":"",
    "navigatorAppVersion":"",
    "navigatorPlatform":"",
    "navigatorProduct":"",
    "navigatorLanguage":"",
    "locationAs":"",
    "locationCity":"",
    "locationRegionName":"",
    "locationRegion":"",
    "locationCountry":"",
    "locationCountryCode":"",
    "locationIsp":"",
    "locationLat":"",
    "locationLon":"",
    "locationOrg":"",
    "locationQuery":"",
    "locationStatus":"",
    "locationTimezone":"",
    "locationZip":"",
    "created":timestamp
  };
  if(!((typeof req.body.referrer == 'undefined')||(req.body.referrer==''))){
    data.referrer= req.body.referrer;
  }
  if(!((typeof req.body.screenWidth == 'undefined')||(req.body.screenWidth==''))){
    data.screenWidth= req.body.screenWidth;
  }
  if(!((typeof req.body.screenHeight == 'undefined')||(req.body.screenHeight==''))){
    data.screenHeight= req.body.screenHeight;
  }
  if(!((typeof req.body.navigatorAppCodeName == 'undefined')||(req.body.navigatorAppCodeName==''))){
    data.navigatorAppCodeName = req.body.navigatorAppCodeName;
  }
  if(!((typeof req.body.navigatorAppName == 'undefined')||(req.body.navigatorAppName==''))){
    data.navigatorAppName = req.body.navigatorAppName;
  }
  if(!((typeof req.body.navigatorAppVersion == 'undefined')||(req.body.navigatorAppVersion==''))){
    data.navigatorAppVersion = req.body.navigatorAppVersion;
  }
  if(!((typeof req.body.navigatorPlatform == 'undefined')||(req.body.navigatorPlatform==''))){
    data.navigatorPlatform = req.body.navigatorPlatform;
  }
  if(!((typeof req.body.navigatorProduct == 'undefined')||(req.body.navigatorProduct==''))){
    data.navigatorProduct = req.body.navigatorProduct;
  }
  if(!((typeof req.body.navigatorLanguage == 'undefined')||(req.body.navigatorLanguage==''))){
    data.navigatorLanguage = req.body.navigatorLanguage;
  }
  if(!((typeof req.body.locationAs == 'undefined')||(req.body.locationAs==''))){
    data.locationAs = req.body.locationAs;
  }
  if(!((typeof req.body.locationCity == 'undefined')||(req.body.locationCity==''))){
    data.locationCity = req.body.locationCity;
  }
  if(!((typeof req.body.locationRegionName == 'undefined')||(req.body.locationRegionName==''))){
    data.locationRegionName = req.body.locationRegionName;
  }
  if(!((typeof req.body.locationRegion == 'undefined')||(req.body.locationRegion==''))){
    data.locationRegion = req.body.locationRegion;
  }
  if(!((typeof req.body.locationCountry == 'undefined')||(req.body.locationCountry==''))){
    data.locationCountry = req.body.locationCountry;
  }
  if(!((typeof req.body.locationCountryCode == 'undefined')||(req.body.locationCountryCode==''))){
    data.locationCountryCode = req.body.locationCountryCode;
  }
  if(!((typeof req.body.locationIsp == 'undefined')||(req.body.locationIsp==''))){
    data.locationIsp = req.body.locationIsp;
  }
  if(!((typeof req.body.locationLat == 'undefined')||(req.body.locationLat==''))){
    data.locationLat = req.body.locationLat;
  }
  if(!((typeof req.body.locationLon == 'undefined')||(req.body.locationLon==''))){
    data.locationLon = req.body.locationLon;
  }
  if(!((typeof req.body.locationOrg == 'undefined')||(req.body.locationOrg==''))){
    data.locationOrg = req.body.locationOrg;
  }
  if(!((typeof req.body.locationQuery == 'undefined')||(req.body.locationQuery==''))){
    data.locationQuery = req.body.locationQuery;
  }
  if(!((typeof req.body.locationStatus == 'undefined')||(req.body.locationStatus==''))){
    data.locationStatus = req.body.locationStatus;
  }
  if(!((typeof req.body.locationTimezone == 'undefined')||(req.body.locationTimezone==''))){
    data.locationTimezone = req.body.locationTimezone;
  }
  if(!((typeof req.body.locationZip == 'undefined')||(req.body.locationZip==''))){
    data.locationZip = req.body.locationZip;
  }
  var query = "";
  query += "INSERT INTO brandUserSessions (brandKey,userKey,sessionKey,referrer,leadScore,screenWidth,screenHeight,navigatorAppCodeName,navigatorAppName,navigatorAppVersion,navigatorPlatform,navigatorProduct,navigatorLanguage,locationAs,locationCity,locationRegionName,locationRegion,locationCountry,locationCountryCode,locationIsp,locationLat,locationLon,locationOrg,locationQuery,locationStatus,locationTimezone,locationZip,created) VALUES";
  query += " ('"+data.brandKey+"', '"+data.userKey+"', '"+data.sessionKey+"', '"+data.referrer+"', ";
  query += ""+data.leadScore+", "+data.screenWidth+", "+data.screenHeight+", '"+data.navigatorAppCodeName+"', ";
  query += "'"+data.navigatorAppName+"', '"+data.navigatorAppVersion+"', '"+data.navigatorPlatform+"', ";
  query += "'"+data.navigatorProduct+"', '"+data.navigatorLanguage+"', '"+data.locationAs+"', ";
  query += "'"+data.locationCity+"', '"+data.locationRegionName+"', '"+data.locationRegion+"', ";
  query += "'"+data.locationCountry+"', '"+data.locationCountryCode+"', '"+data.locationIsp+"', ";
  query += "'"+data.locationLat+"', '"+data.locationLon+"', '"+data.locationOrg+"', '"+data.locationQuery+"', ";
  query += "'"+data.locationStatus+"', '"+data.locationTimezone+"', '"+data.locationZip+"', "+data.created+") ";
  console.log(query);
  connection.execSql(new Request(query, function(err) {
    if (err) {
      var response={
        "code":"db_exception",
        "message":"An internal error has occured on our server."
      };
      res.status(500).send(response);
      console.log(err);

    } else {
      var response={
        "sessionKey":data.sessionKey,
      };
      res.status(200).jsonp(response);
    }
  }));
});

//
// List Brand User Sessions
//
app.get('/brands/:brandKey/users/:userKey/sessions',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM brandUserSessions WHERE userKey='"+req.params.userKey+"' AND brandKey='"+req.params.brandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              res.status(200).jsonp(rows);
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});

//
// Get Brand User Session
//
app.get('/brands/:brandKey/users/:userKey/sessions/:sessionKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM brandUserSessions WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The sessionKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                res.status(200).send(rows[0]);
              }
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});


//
// Update Brand User Session
//
app.put('/brands/:brandKey/users/:userKey/sessions/:sessionKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  var data={};
  var query = "UPDATE brandUserSessions SET ";
  var data_to_update=false;
  var coma=" ";
  if(!((typeof req.body.referrer == 'undefined')||(req.body.referrer==''))){
    data.referrer= req.body.referrer;
    query += coma+"referrer='"+data.referrer+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.leadScore == 'undefined')||(req.body.leadScore==''))){
    data.leadScore= req.body.leadScore;
    query += coma+"leadScore="+data.leadScore+" ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.screenWidth == 'undefined')||(req.body.screenWidth==''))){
    data.screenWidth= req.body.screenWidth;
    query += coma+"screenWidth="+data.screenWidth+" ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.screenHeight == 'undefined')||(req.body.screenHeight==''))){
    data.screenHeight= req.body.screenHeight;
    query += coma+"screenHeight="+data.screenHeight+" ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.navigatorAppCodeName == 'undefined')||(req.body.navigatorAppCodeName==''))){
    data.navigatorAppCodeName = req.body.navigatorAppCodeName;
    query += coma+"navigatorAppCodeName='"+data.navigatorAppCodeName+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.navigatorAppName == 'undefined')||(req.body.navigatorAppName==''))){
    data.navigatorAppName = req.body.navigatorAppName;
    query += coma+"navigatorAppName='"+data.navigatorAppName+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.navigatorAppVersion == 'undefined')||(req.body.navigatorAppVersion==''))){
    data.navigatorAppVersion = req.body.navigatorAppVersion;
    query += coma+"navigatorAppVersion='"+data.navigatorAppVersion+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.navigatorPlatform == 'undefined')||(req.body.navigatorPlatform==''))){
    data.navigatorPlatform = req.body.navigatorPlatform;
    query += coma+"navigatorPlatform='"+data.navigatorPlatform+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.navigatorProduct == 'undefined')||(req.body.navigatorProduct==''))){
    data.navigatorProduct = req.body.navigatorProduct;
    query += coma+"navigatorProduct='"+data.navigatorProduct+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.navigatorLanguage == 'undefined')||(req.body.navigatorLanguage==''))){
    data.navigatorLanguage = req.body.navigatorLanguage;
    query += coma+"navigatorLanguage='"+data.navigatorLanguage+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationAs == 'undefined')||(req.body.locationAs==''))){
    data.locationAs = req.body.locationAs;
    query += coma+"locationAs='"+data.locationAs+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationCity == 'undefined')||(req.body.locationCity==''))){
    data.locationCity = req.body.locationCity;
    query += coma+"locationCity='"+data.locationCity+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationRegionName == 'undefined')||(req.body.locationRegionName==''))){
    data.locationRegionName = req.body.locationRegionName;
    query += coma+"locationRegionName='"+data.locationRegionName+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationRegion == 'undefined')||(req.body.locationRegion==''))){
    data.locationRegion = req.body.locationRegion;
    query += coma+"locationRegion='"+data.locationRegion+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationCountry == 'undefined')||(req.body.locationCountry==''))){
    data.locationCountry = req.body.locationCountry;
    query += coma+"locationCountry='"+data.locationCountry+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationCountryCode == 'undefined')||(req.body.locationCountryCode==''))){
    data.locationCountryCode = req.body.locationCountryCode;
    query += coma+"locationCountryCode='"+data.locationCountryCode+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationIsp == 'undefined')||(req.body.locationIsp==''))){
    data.locationIsp = req.body.locationIsp;
    query += coma+"locationIsp='"+data.locationIsp+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationLat == 'undefined')||(req.body.locationLat==''))){
    data.locationLat = req.body.locationLat;
    query += coma+"locationLat='"+data.locationLat+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationLon == 'undefined')||(req.body.locationLon==''))){
    data.locationLon = req.body.locationLon;
    query += coma+"locationLon='"+data.locationLon+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationOrg == 'undefined')||(req.body.locationOrg==''))){
    data.locationOrg = req.body.locationOrg;
    query += coma+"locationOrg='"+data.locationOrg+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationQuery == 'undefined')||(req.body.locationQuery==''))){
    data.locationQuery = req.body.locationQuery;
    query += coma+"locationQuery='"+data.locationQuery+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationStatus == 'undefined')||(req.body.locationStatus==''))){
    data.locationStatus = req.body.locationStatus;
    query += coma+"locationStatus='"+data.locationStatus+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationTimezone == 'undefined')||(req.body.locationTimezone==''))){
    data.locationTimezone = req.body.locationTimezone;
    query += coma+"locationTimezone='"+data.locationTimezone+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.locationZip == 'undefined')||(req.body.locationZip==''))){
    data.locationZip = req.body.locationZip;
    query += coma+"locationZip='"+data.locationZip+"' ";
    data_to_update=true;coma=",";
  }
  if(data_to_update){
    query += "WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"' AND brandKey='"+req.params.brandKey+"'";
    var rows = [];
    console.log(query);
    connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
          console.log(err);
        }else{
          if(rowsCount==0){
            var response={
              "code":"Error",
              "message":"The sessionKey is not valid our you are Unauthorized."
            };
            res.status(400).send(response);
          }else{
            var response={
              "code":"Session Updated",
              "message":"The session had been updated."
            };
            res.status(200).send(response);
          }
        }
      })
    );
  }else{
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }

});

//
// Delete Brand User Session
//
app.delete('/brands/:brandKey/users/:userKey/sessions/:sessionKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var query = "DELETE FROM brandUserSessions WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The sessionKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"Session deleted",
                  "message":"The session had been deleted."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }
    }
  });
});



//
// BRAND USER Session ACTIONS
//

//
// Add Brand User Session Action
//
app.post('/brands/:brandKey/users/:userKey/sessions/:sessionKey/actions',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  if(
    (typeof req.body.action == 'undefined')||(req.body.action=='')
  ){
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }else{
    actionKey=sha1("actionKey"+req.params.brandKey+req.params.userKey+req.params.sessionKey+rand(0,999999)+timestamp);

    var data={
      "brandKey":req.params.brandKey,
      "userKey":req.params.userKey,
      "sessionKey":req.params.sessionKey,
      "actionKey":actionKey,
      "action":req.body.action,
      "data":"",
      "created":timestamp
    };
    if(!((typeof req.body.data == 'undefined')||(req.body.data==''))){
      data.data= req.body.data;
    }

    var query = "";
    query += "INSERT INTO brandUserActions (brandKey,userKey,sessionKey,actionKey,action,data,created) VALUES";
    query += " ('"+data.brandKey+"', '"+data.userKey+"', '"+data.sessionKey+"', '"+data.actionKey+"', '"+data.action+"', '"+mssql_escape(data.data)+"', "+data.created+") ";
    console.log(query);
    connection.execSql(new Request(query, function(err) {
      if (err) {
        var response={
          "code":"db_exception",
          "message":"An internal error has occured on our server."
        };
        res.status(500).send(response);
        console.log(err);

      } else {
        var response={
          "actionKey":data.actionKey,
        };
        res.status(200).jsonp(response);
      }
    }));

  }

});

//
// List Brand User Sessions Actions
//
app.get('/brands/:brandKey/users/:userKey/sessions/:sessionKey/actions',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM brandUserActions WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"' AND brandKey='"+req.params.brandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              res.status(200).jsonp(rows);
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});

//
// Get Brand User Session Action
//
app.get('/brands/:brandKey/users/:userKey/sessions/:sessionKey/actions/:actionKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        query = "SELECT * FROM brandUserActions WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"' AND actionKey='"+req.params.actionKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        var rows=[];
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The actionKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                res.status(200).send(rows[0]);
              }
            }
          })
          .on('row', function(columns) {var row={};columns.forEach(function(column) {row[column.metadata.colName]=column.value;});rows.push(row);})
        );
      }
    }
  });
});


//
// Update Brand User Actions
//
app.put('/brands/:brandKey/users/:userKey/sessions/:sessionKey/actions/:actionKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  var data={};
  var query = "UPDATE brandUserActions SET ";
  var data_to_update=false;
  var coma=" ";

  if(!((typeof req.body.action == 'undefined')||(req.body.action==''))){
    data.action= req.body.action;
    query += coma+"action='"+data.action+"' ";
    data_to_update=true;coma=",";
  }
  if(!((typeof req.body.data == 'undefined')||(req.body.data==''))){
    data.data= req.body.data;
    query += coma+"data='"+mssql_escape(data.data)+"' ";
    data_to_update=true;coma=",";
  }
  if(data_to_update){
    query += "WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"' AND actionKey='"+req.params.actionKey+"' AND brandKey='"+req.params.brandKey+"'";
    var rows = [];
    console.log(query);
    connection.execSql(new Request(query, function(err,rowsCount) {
        if (err) {
          var response={
            "code":"db_exception",
            "message":"An internal error has occured on our server."
          };
          res.status(500).send(response);
          console.log(err);
        }else{
          if(rowsCount==0){
            var response={
              "code":"Error",
              "message":"The actionKey is not valid our you are Unauthorized."
            };
            res.status(400).send(response);
          }else{
            var response={
              "code":"Session Updated",
              "message":"The session had been updated."
            };
            res.status(200).send(response);
          }
        }
      })
    );
  }else{
    var response={
      "code":"Missing parameter",
      "message":"You didn't provide a required parameter."
    };
    res.status(400).send(response);
  }

});

//
// Delete Brand User Session Action
//
app.delete('/brands/:brandKey/users/:userKey/sessions/:sessionKey/actions/:actionKey',function(req,res){
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);
  checkApi(req,res,function(err,apiBrandKey){
    if(!err){
      if(req.params.brandKey!=apiBrandKey){var response={"code":"Unauthorized","message":"The apiKey you entered is not valid."};res.status(401).send(response);console.log("Unauthorized");}else{
        var query = "DELETE FROM brandUserActions WHERE userKey='"+req.params.userKey+"' AND sessionKey='"+req.params.sessionKey+"' AND actionKey='"+req.params.actionKey+"' AND brandKey='"+apiBrandKey+"'";
        console.log(query);
        connection.execSql(new Request(query, function(err,rowsCount) {
            if (err) {
              var response={
                "code":"db_exception",
                "message":"An internal error has occured on our server."
              };
              res.status(500).send(response);
              console.log(err);
            }else{
              if(rowsCount==0){
                var response={
                  "code":"Error",
                  "message":"The actionKey is not valid our you are Unauthorized."
                };
                res.status(400).send(response);
              }else{
                var response={
                  "code":"Action deleted",
                  "message":"The action had been deleted."
                };
                res.status(200).send(response);
              }
            }
          })
        );
      }
    }
  });
});








function mssql_escape (str) {
  return str.replace(/'/g, "''");
}


function checkAdminApi(req,res,callback){
  console.log("[checkAdminApi] START");
  console.log("[checkAdminApi] adminApiKey: "+req.params.adminApiKey);
  var timestamp = new Date().getTime();timestamp = Math.floor(timestamp / 1000);

  if((typeof req.params.adminApiKey == 'undefined')||(req.params.adminApiKey=='')){
    var response={"code":"missing_adminapikey","message":"You didn't provide an apiKey."};res.status(400).send(response);
    console.log("missing_adminapikey");
    callback(true);
  }else{
    var apicheck_query = "SELECT adminKey FROM admins WHERE adminApiKey='"+req.params.adminApiKey+"'";
    console.log(apicheck_query);
    var apicheck_rows = [];
    connection.execSql(new Request(apicheck_query, function(apicheck_err,apicheck_rowsCount) {
      if (apicheck_err) {
        var response={"code":"db_exception","message":"An internal error has occured on our server."};
        res.status(500).send(response);
        console.log("db_exception");
        callback(true);
      }else{
        if(apicheck_rowsCount==0){
          var response={"code":"adminapiket_not_valid","message":"The adminApiKey you entered is not valid."};
          res.status(401).send(response);
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
