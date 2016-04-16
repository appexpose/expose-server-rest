/ [Home](Home) / ServerREST
***

<pre>
http://expose-server-rest.azurewebsites.net
</pre>

# Admin

### [GET] /admins/:adminApiKey/users
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
&#09;&#09;}...
&#09;],
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_adminapikey","db_exception","adminapiket_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

### [GET] /admins/:adminApiKey/users/contacts
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
&#09;&#09;&#09;<b>notify</b>: bit
&#09;&#09;}...
&#09;],
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_adminapikey","db_exception","adminapiket_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>


### [GET] /admins/:adminApiKey/users/comments
Lista los comentarios de Expose

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
&#09;&#09;&#09;<b>commentKey</b>: varchar,
&#09;&#09;&#09;<b>parentKey</b>: varchar,
&#09;&#09;&#09;<b>userKey</b>: varchar,
&#09;&#09;&#09;<b>phone</b>: varchar,
&#09;&#09;&#09;<b>rating</b>: int,
&#09;&#09;&#09;<b>content</b>: ntext,
&#09;&#09;&#09;<b>reported</b>: bit,
&#09;&#09;&#09;<b>created</b>: int
&#09;&#09;}...
&#09;],
}
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("missing_adminapikey","db_exception","adminapiket_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

### [GET] /admins/:adminApiKey/log
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
&#09;&#09;}...
&#09;],
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

### [POST] /users
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
&#09;&#09;<b>ID</b>: int,
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


### [PUT] /users/:userKey/login
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

### [GET] /users/:userKey/account
Devuelve los datos de la cuenta del usuario

<b>Input</b>
<pre>
none
</pre>

<b>Response Error</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> ("db_exception","userkey_not_valid"),
&#09;<b>message:</b> varchar
}
</pre>

<b>Response Success</b>
<pre>
<b>response</b>:{
&#09;<b>code:</b> "user_logged",
&#09;<b>message:</b> "The user had been logged."
}
</pre>

### [PUT] /users/:userKey/account
Actualiza los datos de la cuenta del usuario

### [DELETE] /users/:userKey
Da de baja el usuario
