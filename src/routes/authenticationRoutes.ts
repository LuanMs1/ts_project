import express from 'express';
import passport from 'passport'; // passport is a middleware that allows us to manage authentication in express applications 

const auth = express();

// testing the homepage route at '/'
auth.get('/', (req, res) => {
    console.log("Inside the homepage callback function", req.sessionID); //here we are using the sessionID property of the request object to get the session ID of the current session
    res.send(`Página rodando.`);
});

auth.get('/login', (req, res) => {
    console.log("Inside GET /login callback function");
    console.log(req.sessionID);
    res.send(`You got the login page!\n`);
});

auth.post('/login', (req, res, next) => {
    console.log("Inside POST /login callback function");
    passport.authenticate('local', (err, user, info) => { //local is the name of the strategy that we configured in the passport.use() method
        if (info) {
            return res.send(info.message);
        } //here we are checking if there is a message property in the info object and sending it to the client if there is one
        if (err) {
            return next(err);
        } //here we are checking if there is an error and passing it to the next middleware if there is one
        if (!user) {
            return res.redirect('/login');
        } //here we are checking if there is a user and redirecting to the login page if there is none
        req.login(user, (err) => {
            if (err) {
                return next(err);
            } //here we are checking if there is an error and passing it to the next middleware if there is one 
            return res.redirect('/authrequired'); //here we are redirecting to the authrequired route if there is no error
        });
    })(req, res, next); //here we are calling the authenticate method that we configured above and passing the request, response and next objects to it 
});

auth.get('/authrequired', (req, res) => { 
    //authrequired is a route that is only accessible to authenticated users, if a user that is not authenticated tries to access this route, he will be redirected to the login page
    console.log('Inside GET /authrequired callback');
    console.log(`User authenticated? ${req.isAuthenticated()}`); //here we are using the isAuthenticated method to check if the user is authenticated and sending the result to the client 
    if (req.isAuthenticated()) { //here we are checking if the user is authenticated
        res.send('you hit the authentication endpoint\n');
    }
    else {
        res.redirect('/');
    }
});

export default auth;