/**
 * Module dependencies.
 */

const express = require("express");
const compression = require("compression");
const session = require("client-sessions");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const expressStatusMonitor = require('express-status-monitor');
const lusca = require('lusca');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const passport = require('passport');
const nodemailer = require('nodemailer')
// const Esri = require("./models/esri.js")
const { functionsIn, forEach } = require("lodash");
const admin = require("firebase-admin");
const shell = require('shelljs');

const app = express();
//==========================
//SOME OTHER PACKAGES CONFIG
//==========================
//setting view engines to ejs
app.set("view engine","ejs");
app.set("view engine","pug");
app.use(expressStatusMonitor());
app.use(compression());

//serving custom resources
app.use(express.static(__dirname + '/public'));

//using bodyparser so recieve req object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Express Session
// app.use(session({
// 	cookieName: "session",
// 	secret: process.env.SESSION_SECRET,
// 	duration:30*60*1000,
// 	activeDuration:5*60*1000,
// 	httpOnly:true, //don't let any JS code access this cookie
// 	secure:true, //only set cookies over https
// 	ephemeral:true //destroys cookies on browser close
// }))
//PASSPORT=> INITISLISE , SESSION


//lusca for security
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
//to remove the webserver identification
app.disable('x-powered-by');

//========================//
//LISTENER PROCESS
var port = process.env.PORT || 31000
app.listen(port,process.env.IP,function(){
	console.log("Server started at port:"+port ,chalk.green('✓'));
	console.log('  Press CTRL-C to stop');
});
