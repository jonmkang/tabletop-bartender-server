# Tabletop Bartender Server

This contains scripts to set up a database using Postgres and sets up a server to be used with API requests.

## Set up

Clone this repository to your local machine `git clone tabletop-bartender-server`<br>
cd into the cloned repository <br>
Make a fresh start of the git history for this project with rm -rf .git && git init

Install the node dependencies `npm install`

Create a database to create tables in using Postgres.
Sample script: `psql CREATE DATABASE database_name`
 
Create .env file in the main path folder and add `DATABASE_URL="postgresql://username@localhost/database_name"` to path the server to the correct database.

From here, you can run `npm run migrate`, and it will create tables inside the database you created.

To seed the table, you must run the command `psql -U username -d database_name -f ./seed/seed.tabletop_bartender.sql`

This finishes the set up of the database on the local server.

## Scripts
Start the server with `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.


## API Documentation

### /cocktails 
When a GET request is made, it will return all cocktails in the database.
When a post request is made, it will clear all cross scripting problems and add the cocktail to the database.

### /ingredients
When a GET request is made, it will return all ingredients in the database.

### /flavors
When a GET request is made, it will return all flavors in the database.

### /users
When a POST request is made, it will add the user's information to the database given all the required fields are filled in and abide by the password requirements.  Passwords are encrypted before adding it to the database. This will allow the user to add cocktails to the database when logged in.

### /auth/login
When a POST request is made, it validates the user's email and password and checks to see if there exists a user with the same hashed password in the database.  If the request made is okay, an authToken is sent back to the user allowing them to access the addCocktail page.
