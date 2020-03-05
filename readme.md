# myFlix Database (myFlixDB)
This project is designed to create a database and API system. The process taken creates a database of movies and users and allows any user to add themselves to the list of users, and then edit a list of favorite movies to be under their user ID. This is done with mainly through the use of node.js, express, and mongoose. 

---

# Getting Started
To get started, you need to download the repository in GitHub. This will give you the framework for the API system and the functionality behind the URL endpoints. If you have a online database (like MongoDB Atlas), replace 'process.env.atlas_connect' on line 36 of index.js with the connection string. You can also use the code written to connect to a local database. To do so, comment out line 36 of index.js and uncomment line 34. This will use a local MongoDB to run the application. If you do not have the local MongoDB and would like to use that, see the [official site](https://docs.mongodb.com/manual/administration/install-community/) for details on how to download on Window, Mac, or Linux. 

---

# Prerequisites
In your terminal, you will need to have node installed. To download, simply type `sudo apt install nodejs`. After this has downloaded, check the version of npm by typing `npm -v`. If this is not up to date automatically, follow the prompts, otherwise use npm to download the required dependencies. Note There are 14 in all and all but `express-generator` needs to be installed in the directory you are building the application in. I recommend, for simplicity, be in the directory downloaded from GitHub when running every command due to the `--global` key installing `express-generator` in the correct folder.
```
npm install --global express-generator
npm install bcrypt body-parser cors
npm install express express-validator
npm install jsonwebtoken lodash mongoose
npm install morgan uuid
npm install passport passport-jwt passport-local
```
Note: for a list of all dependencies and the current version please see the package.json file on this repository.

---

# Walk through
## Set up
After downloading the required code from this GitHub repository and the dependencies listed above, ensure your database is running. If using the local MongoDB database, use the command `mongod` in the terminal. This will start the database on your local computer. This is all that terminal will be doing while the program runs, so open a second terminal for the rest of the steps.

In the second terminal, simply navigate to the directory in your terminal with the code and run the following command:
```
node index.js
```
This will start application. Once the application is running, the terminal will display where the code is listening. This will look something like this:
```
Listening on Port 8080
```
At this point, you will be able to navigate to the 'localhost' at the port listed in the terminal. In this example, you would navigate to: *http://localhost:8080/* or *http://127.0.0.1:8080/* for the application to run. Both of these will navigate you to the main page. This page will have a link to the documentation of the endpoints, but you may also directly navigate here through *http://localhost:8080/documentation.html*

## Running the tests
This application is currently running without any client-side interface, so all testing must be done in an API test environment. All examples and documentation will be using *Postman*. If you need to download, please visit this [link](https://www.postman.com/downloads).

Inside Postman, start a new collection. From here, click on the dropdown menu in your new collection and click *Add Request*. I would recommend a different request for each endpoint, although you can simply edit a singular request if you would like. 

In the */documentation.html* endpoint, all other endpoints and HTTP requests will be listed, but for example I will walk through how to create an account, login, and obtain a list of all movies available on your database. Note: I will be using localhost as the URL domain of the API and the application running on port 8080.

### Creating an account (index.js)
In Postman, create a new URL request. Change the HTTP request to *POST*. Then enter the /accounts endpoint into the URL request. Example: **127.0.0.1:8080/accounts**. Before making the request, you will also need to enter the information for the account in the body of the request. To do so, go to *Body*, then change the format to *raw* and the type in the drop-down box to *JSON*. The request will only be accepted if formatted as shown below:
```
{
    "Username" : "desiredUsername",
    "Password" : "yourPassword",
    "Email" : "email@site.com",
    "Birthday" : "optional"
}
```
If done correctly, when you send this request, you should get a 201 response and the params window will display the input information plus a _id specific to this login. Please note: all keys (username, password, ex) must have a capital letter to work properly.


### Login to new account (auth.js)
After you have a username and password, make another new URl request. This will still be a *POST* request, but under the endpoint /login. Example **localhost:8080/login**. This will need your login information created in the step above. You can do this either directly in the URL request like so: **localhost:8080/login?Username=desiredUsername&Password=yourPassword** or by using the Query Params entering *Username* and *Password* as the two keys and your username and password as the values. Please note again, Username and Password are both capitalized. If the login is successful, your user account will be returned with a new field *token*. This token is how you can access the rest of the application. See below for example on how.

### Using other endpoints to access the database (index.js)
After you have the token for your login, you can use it to access other endpoints of the application. (If you do not have a token, see above section on how to get one.) See documentation.html for a full list of endpoints and HTTP request types to navigate the API and database, but for this example, we will be navigating to the list of movies. 

Create another new URL request in Postman to *GET* *localhost:8080/movies*. Before sending the request, go to *Authorization* and change the type of *Bearer Token*. In the text box to the left, copy and paste the token created previously. Send the request and you will see the movies in the database. Same process can be used for any endpoint with the *POST* endpoints needing a body request similar to the one shown in *Creating and Account*.

---

# Built With
* MongoDB - Database used (MongoDB Atlas for online use)
* Express - Web application framework used
* Node.js - Script interpreter used
* Please see *Prerequisites* above or the package.json file for dependencies used

---

# Authors
Dominick Rapuano

---

# Acknowledgments 
Built with the help of:
* Trey Fletcher
* Jay Quach
* CareerFoundry