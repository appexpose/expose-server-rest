DROP TABLE IF EXISTS userComments;

CREATE TABLE userComments
(
ID int IDENTITY(1,1) PRIMARY KEY,
commentKey varchar(255) NOT NULL,
parentKey varchar(255) NOT NULL,
userKey varchar(255) NOT NULL,
phone varchar(255),
rating int NOT NULL,
content varchar(255) NOT NULL,
reported bit NOT NULL,
created int NOT NULL
);

INSERT INTO comments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('1','','1','0034000000002',2,'Comentario de dos hecho por uno',0,10000);
INSERT INTO comments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('2','','1','0034000000003',3,'Comentario de tres hecho por uno',0,10001);
INSERT INTO comments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('3','','1','0034000000004',4,'Comentario de cuatro hecho por uno',0,10002);
INSERT INTO comments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('4','','2','0034000000001',1,'Comentario de uno hecho por dos',0,10003);
INSERT INTO comments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('5','','3','0034000000001',1,'Comentario de uno hecho por tres',0,10004);
INSERT INTO comments (commentKey,parentKey,userKey,phone,rating,content,reported,created) VALUES ('6','','4','0034000000001',1,'Comentario de uno hecho por cuatro',0,10005);

DROP TABLE IF EXISTS userContacts;

CREATE TABLE userContacts
(
ID int IDENTITY(1,1) PRIMARY KEY,
userKey varchar(255) NOT NULL,
fullName varchar(255) NOT NULL,
phone varchar(255) NOT NULL,
notify bit NOT NULL
);

INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('1','Contacto dos de uno','0034000000002',1);
INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('1','Contacto tres de uno','0034000000003',1);
INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('1','Contacto cuatro de uno','0034000000004',0);
INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('2','Contacto uno de dos','0034000000001',1);
INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('3','Contacto uno de tres','0034000000001',1);
INSERT INTO userContacts (userKey,fullName,phone,notify) VALUES ('4','Contacto uno de cuatro','0034000000001',1);

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
ID int IDENTITY(1,1) PRIMARY KEY,
deviceKey varchar(255) NOT NULL,
userKey varchar(255) NOT NULL,
fullName varchar(255),
prefix varchar(255),
phone varchar(255),
system varchar(255) NOT NULL,
version varchar(255) NOT NULL,
created int NOT NULL,
lastConnection int NOT NULL
);

INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('1','1','Usuario uno','0034000000001','ios','1.0',10000,10010);
INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('2','2','Usuario dos','0034000000002','ios','1.0',10001,10011);
INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('3','3','Usuario tres','0034000000003','ios','1.0',10002,10012);
INSERT INTO users (deviceKey,userKey,fullName,prefix,phone,system,version,created,lastConnection) VALUES ('4','4','Usuario cuatro','0034000000004','ios','1.0',10003,10013);
