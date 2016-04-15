var version = "1.0.1";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');


var server = require('http').createServer(app);

var port = process.env.PORT || 8080;

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
      "fullName":mssql_escape(req.body.fullName),
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
        console.log("[Add User Contact] Error "+response.code+" "+response.message+" ("+err+")");

      } else {
        var response={
          "contact":contact
        };
        res.status(200).jsonp(response);
        console.log("[Add User Contact] Success");
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
      "content":mssql_escape(req.body.content),
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












function mssql_escape (str) {
  if(!((typeof str == 'undefined')||(str==''))){
    return str.replace(/'/g, "''");
  }else{
    return str;
  }

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
