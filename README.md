# nodejs-jwt-authenticate
A startup nodejs server with JWT authentication. This project can be used as start whenever you're building a ```client <-> server``` NodeJS app with user authentication.
The application uses JSON Web Tokens to authenticate users against a Mongo database. These JWTs are stateless and should be used in all further calls after authentication by the client.
The token should be included in the ```Authorization``` HTTP header in the following format: ```Authorization: JWT <Token>```

### Usage
1. ```npm install```
2. ```mongod```
3. ```npm start```
