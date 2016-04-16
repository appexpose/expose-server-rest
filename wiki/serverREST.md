/ [Home](Home) / ServerREST
***

<pre>
http://expose-server-rest.azurewebsites.net
</pre>

# Admin

## Admin - List Users
#### [GET] /admins/:adminApiKey/users
Lista los usuarios de Expose

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>ursers:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>deviceKey</b>: varchar,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>fullName</b>: varchar,
&#09;&#09;&#09;<b>prefix</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>system</b>: varchar,
&#09;&#09;&#09;<b>version</b>: varchar,
&#09;&#09;&#09;<b>created</b>: int,
&#09;&#09;&#09;<b>lastConnection</b>: int,
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_adminapikey","db_exception","adminapiket_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Admin - List Contacts
#### [GET] /admins/:adminApiKey/users/contacts
Lista los contactos de Expose

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>contacts:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>fullName</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>notify</b>: bit,
&#09;&#09;&#09;<b>rating</b>: int
&#09;&#09;&#09;<b>commentsAmount</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_adminapikey","db_exception","adminapiket_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Admin - List Comments
#### [GET] /admins/:adminApiKey/users/comments
Lista los comentarios de Expose

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>comments:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>commentKey</b>: varchar,
&#09;&#09;&#09;<b>parentKey</b>: varchar,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>rating</b>: int,
&#09;&#09;&#09;<b>content</b>: ntext,
&#09;&#09;&#09;<b>reported</b>: bit,
&#09;&#09;&#09;<b>created</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_adminapikey","db_exception","adminapiket_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Admin - List Log
#### [GET] /admins/:adminApiKey/log
Devuelve el log del sistema

<b>Input</b>
<pre>
<b>limit</b>: int,
<b>offset</b>: int,
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>contacts:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>action</b>: varchar,
&#09;&#09;&#09;<b>created</b>: varchar
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_adminapikey","db_exception","adminapiket_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>


# User

## Signup
#### [POST] /users
Da de alta un nuevo usuario


<b>Input</b>
<pre>
<b>deviceKey*</b>: varchar,
<b>prefix*</b>: varchar,
<b>system*</b>: varchar,
<b>version*</b>: varchar,
<b>fullName</b>: varchar
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>urser:</b> {
&#09;&#09;<b>deviceKey</b>: varchar,
&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;<b>fullName</b>: varchar,
&#09;&#09;<b>prefix</b>: varchar,
&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;<b>system</b>: varchar,
&#09;&#09;<b>version</b>: varchar,
&#09;&#09;<b>created</b>: int,
&#09;&#09;<b>lastConnection</b>: int,
&#09;}
}
</pre>



<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_parameter","db_exception"),
&#09;<b>message:</b> varchar
}
</pre>

## Login
#### [PUT] /users/:userKey/login
Hace login del usuario en el sistema

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "user_logged",
&#09;<b>message:</b> "The userKey is not valid."
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","userkey_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Get Acoount
#### [GET] /users/:userKey/account
Devuelve los datos de la cuenta del usuario

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "user_logged",
&#09;<b>message:</b> "The user had been logged."
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","userkey_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Update Account
#### [PUT] /users/:userKey/account
Actualiza los datos de la cuenta del usuario

<b>Input</b>
<pre>
<b>deviceKey</b>: varchar,
<b>prefix</b>: varchar,
<b>system</b>: varchar,
<b>version</b>: varchar,
<b>fullName</b>: varchar
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "user_updated",
&#09;<b>message:</b> "The user had been updated."
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","no_data_to_update","userkey_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Delete Account
#### [DELETE] /users/:userKey
Da de baja el usuario

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "user_deleted",
&#09;<b>message:</b> "The user account had been deleted."
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","no_data_to_update","userkey_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>


# Contacts

## Add Contact
#### [POST] /users/:userKey/contacts
Da de alta un nuevo contacto de un usuario


<b>Input</b>
<pre>
<b>phone*</b>: varchar,
<b>fullName</b>: varchar
<b>notify</b>: varchar
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>contact:</b> {
&#09;&#09;<b>ID</b>: int,
&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;<b>fullName</b>: varchar,
&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;<b>notify</b>: bit
&#09;}
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","missing_parameter"),
&#09;<b>message:</b> varchar
}
</pre>


## List Contacts
#### [GET] /users/:userKey/contacts
Lista todos los contactos de un usuario

<b>Input</b>
<pre>
none
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>contacts:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>fullName</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>notify</b>: bit,
&#09;&#09;&#09;<b>rating</b>: int
&#09;&#09;&#09;<b>commentsAmount</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","no_data_to_update"),
&#09;<b>message:</b> varchar
}
</pre>

## Delete All Contacts
#### [DELETE] /users/:userKey/contacts
Borra todos los contactos de un usuario

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "contacts_deleted",
&#09;<b>message:</b> "The contacts had been deleted."
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","userkey_not_valid_or_not_contacts"),
&#09;<b>message:</b> varchar
}
</pre>



## Get Contact
#### [GET] /users/:userKey/contacts/:phone
Devuele los datos del contacto de un usuario

<b>Input</b>
<pre>
none
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>contacts:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>fullName</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>notify</b>: bit,
&#09;&#09;&#09;<b>rating</b>: int
&#09;&#09;&#09;<b>commentsAmount</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception"),
&#09;<b>message:</b> varchar
}
</pre>


## Update Contact
#### [PUT] /users/:userKey/contacts/:phone
Actualiza el contacto de un usuario

<b>Input</b>
<pre>
<b>fullName</b>: varchar,
<b>notify</b>: varchar
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "contact_updated",
&#09;<b>message:</b> "The contact had been updated"
}
</pre>


<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","no_data_to_update","userkey_or_phone_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Delete Contact
#### [DELETE] /users/:userKey/contacts/:phone
Borra un contactos de un usuario

<b>Input</b>
<pre>
none
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "contact_deleted",
&#09;<b>message:</b> "The contact had been deleted."
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","userkey_or_phone_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>




# Comments

## List All Comments
#### [GET] /users/:userKey/comments
Lista todos los comentarios de los contactos de un usuario

<b>Input</b>
<pre>
<b>offset</b>: int,
<b>limit</b>: int
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>comments:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>commentKey</b>: varchar,
&#09;&#09;&#09;<b>parentKey</b>: varchar,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>rating</b>: int,
&#09;&#09;&#09;<b>content</b>: ntext,
&#09;&#09;&#09;<b>reported</b>: bit,
&#09;&#09;&#09;<b>created</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","no_data_to_update"),
&#09;<b>message:</b> varchar
}
</pre>


## List Contact Comments
#### [GET] /users/:userKey/contacts/:phone/comments
Lista todos los comentarios de un contacto de un usuario

<b>Input</b>
<pre>
<b>offset</b>: int,
<b>limit</b>: int
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>comments:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>commentKey</b>: varchar,
&#09;&#09;&#09;<b>parentKey</b>: varchar,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>rating</b>: int,
&#09;&#09;&#09;<b>content</b>: ntext,
&#09;&#09;&#09;<b>reported</b>: bit,
&#09;&#09;&#09;<b>created</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception"),
&#09;<b>message:</b> varchar
}
</pre>

## Add Contact Comments
#### [POST] /users/:userKey/contacts/:phone/comments
Añade un comentario a contacto de un usuario


<b>Input</b>
<pre>
<b>rating*</b>: int,
<b>content*</b>: ntext
<b>parentKey</b>: varchar
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>comment:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>commentKey</b>: varchar,
&#09;&#09;&#09;<b>parentKey</b>: varchar,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>rating</b>: int,
&#09;&#09;&#09;<b>content</b>: ntext,
&#09;&#09;&#09;<b>reported</b>: bit,
&#09;&#09;&#09;<b>created</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","missing_parameter"),
&#09;<b>message:</b> varchar
}
</pre>

## Get Contact Comments
#### [GET] /users/:userKey/contacts/:phone/comments/:commentKey
Devuelve el comentario de un contacto de un usuario

<b>Input</b>
<pre>
none
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>comment:</b> [
&#09;&#09;{
&#09;&#09;&#09;<b>ID</b>: int,
&#09;&#09;&#09;<b>commentKey</b>: varchar,
&#09;&#09;&#09;<b>parentKey</b>: varchar,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>rating</b>: int,
&#09;&#09;&#09;<b>content</b>: ntext,
&#09;&#09;&#09;<b>reported</b>: bit,
&#09;&#09;&#09;<b>created</b>: int
&#09;&#09;},...
&#09;]
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","commentkey_or_phone_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

## Report Contact Comments
#### [PUT] /users/:userKey/contacts/:phone/comments/:commentKey/report
Denuncia el comentario de un contacto de un usuario

<b>Input</b>
<pre>
none
</pre>


<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "comment_reported",
&#09;<b>message:</b> "The comment had been reported."
}
</pre>


<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","commentkey_or_phone_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>
