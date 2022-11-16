import express, { json } from "express";
import { v4 as uuid } from "uuid";
import session from "express-session"; // express-session is a middleware that allows us to manage sessions in express applications
// import FileStore from 'session-file-store';
import bodyParser from "body-parser";
import passport from "passport"; // passport is a middleware that allows us to manage authentication in express applications
import { Strategy as LocalStrategy } from "passport-local"; //strategy is a way to authenticate a user in passport by using a username and password
import bcrypt from "bcrypt"; //bcrypt is a library that allows us to hash passwords
import axios from "axios"; //axios is a library that allows us to make http requests
import cors from "cors";
import router from "./routes/routes.js";
//cors is a library that allows us to make cross origin requests and avoid cors errors

let id: string = uuid();
// let fileStoreOptions = FileStore(session);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

//create server
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //we ate using extended: false because we are not using nested objects in our request body
app.use(cors());
app.use(json());
app.use(router);

//configuring passport middleware to use local strategy(Username and password)
passport.use(
    new LocalStrategy(
        //here we are telling passport to use usernameField and passwordField from the request body to authenticate the user

        { usernameField: "username", passwordField: "password" },
        (username, password, done) => {
            console.log("inside local strategy");
            axios
                .get(`http://localhost:8000/users?username=${username}`) //here we are making a get request to our users api to get the user with the email that was sent in the request body
                .then((res: { data: any[] }) => {
                    const user = res.data[0]; //here we are getting the user from the response data
                    if (!user) {
                        return done(null, false, {
                            message: "Invalid credentials.\n",
                        });
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        //here we are comparing the password that was sent in the request body with the hashed password of the user that we got from the database
                        return done(null, false, {
                            message: "Invalid credentials.\n",
                        });
                    }
                    return done(null, user);
                })
                .catch((error: any) => done(error));
        }
    )
);

//here we are telling passport how to serialize the user for the session
passport.serializeUser((user: any, done) => {
    //serializeUser determines which data of the user object should be stored in the session
    console.log(
        "inside local serializeUser. User id is save to the session file store here"
    );
    done(null, user.id); //here we are saving the user id to the session
});

passport.deserializeUser((id, done) => {
    //here we are telling passport how to deserialize the user. deserializeUser is a method that is called when a user is authenticated
    axios
        .get(`http://localhost:8000/users/${id}`) //here we are making a get request to our users api to get the user with the id that was saved in the session
        .then((res: any) => done(null, res.data)) //here we are getting the user from the response data and passing it to the done method
        .catch((error: any) => done(error, false)); //here we are passing the error to the done method
});

app.use(
    session({
        //here we are configuring express-session
        genid: (req) => {
            // genid is a function that generates a new session ID for a new session and stores it in the cookie that is sent to the client in the response to the request.
            console.log("Inside the session middleware genid");
            console.log(
                `Request object sessionID from client: ${req.sessionID}`
            ); // sessionID is a property that contains the session ID of the current session.
            return id;
        },
        // store: new fileStoreOptions(), // store is a property that contains the session store instance, defaults to a new MemoryStore instance.
        secret: "keyboard cat", //secret is a string that is used to sign the session ID cookie.
        resave: false, //resave is a boolean that forces the session to be saved back to the session store, even if the session was never modified during the request.
        saveUninitialized: true, //saveUninitialized is a boolean that forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
    })
);
app.use(passport.initialize()); //here we are initializing passport middleware
app.use(passport.session()); //here we are telling passport to use the session that we configured above to manage the user session

app.listen(8000, () => console.log("rodando na porta 8000"));
