# Hack Tank
## Database
* Uses MySQL
* Dump of database is in ./dbscripts/hacktank.dump.sql

### Running MySQL locally
* Download MySQL server and install
* create a database called hacktank.
* Import the dump of the database into the hacktank database.
* Create a file in the root directory called `.env`
* Add the following environmental variable to the `.env` file:
```properties
HACKDB_URL=mysql://<user>:<password>@<host>:<port>/hacktank?ssl-mode=REQUIRED
```

**DO NOT COMMIT THE .env FILE!**

## Run locally
The following command runs both the node server and react client.
```shell
npm run dev
```

## Resources
* [Heroku getting started](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
* [BezKoder: React + Node.js Express: User Authentication with JWT example](https://www.bezkoder.com/react-express-authentication-jwt/)
* [Create React App](https://create-react-app.dev/)
* [React Bootstrap](https://react-bootstrap.netlify.app/)
* [Getting Started with Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
* [Canva Free Online AI Image Generator](https://www.canva.com/ai-image-generator/)