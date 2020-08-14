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
const Esri = require("./models/esri.js")
const { functionsIn, forEach } = require("lodash");
const admin = require("firebase-admin");
const shell = require('shelljs');

shell.exec('./faq.sh');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const apiController = require('./controllers/api');


admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
  	databaseURL: "https://here-maps-bitsians.firebaseio.com"
});

var hospital = admin.database().ref().child("mongo_hospital");
const app = express();

//==================
//MONGO CONFIGRATION
//===================
mongoose.connect(process.env.DATABASEURI,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true,
	useFindAndModify: false
}).then(()=>{
	console.log("Connected to Database",chalk.green('✓'));
}).catch(err =>{
	console.log('MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'),err.message);
});

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
app.use(session({
	cookieName: "session",
	secret: process.env.SESSION_SECRET,
	duration:30*60*1000,
	activeDuration:5*60*1000,
	httpOnly:true, //don't let any JS code access this cookie
	secure:true, //only set cookies over https
	ephemeral:true //destroys cookies on browser close
}))
//PASSPORT=> INITISLISE , SESSION


//lusca for security
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
//to remove the webserver identification
app.disable('x-powered-by');
//checking user session if doesnot exists then just call next otherwise search DB
//created the copy of request header and saved it in response header
app.use((req, res, next) => {
	if(!(req.session && req.session.userId)){
		return next();
	}
	admin
	.auth()
	.verifySessionCookie(req.session.userId, true /** checkRevoked */)
	.then((decodedClaims) => {
	  admin.auth().getUser(decodedClaims.sub).then(function(userRecord) {
		req.user = userRecord;
		res.locals.user = userRecord;
		next();
	  })
	})
	.catch((error) => {
	  res.redirect("/login2");
	});

  });

  function loginRequired(req,res,next){
	  if(!req.user){
		  return res.redirect("/login2");
	  }
	  next();
  }
  function isAdmin(req,res,next){
	if(req.user){
		hospital.on("value", function(snapshot) {
			snapshot.forEach(function(childsnapshot){
				if(childsnapshot.val().admin){
					if(req.user.uid == childsnapshot.val().user_id){
						res.locals.role = childsnapshot.val();
						next();
					} else {
						return res.send("NOT PRIVILAGED!");
					}
				}
				});
			});
	}

  }
//path protection middlewares

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
	// only use in development
	app.use(errorHandler());
  } else {
	app.use((err, req, res, next) => {
	  console.error(err);
	  res.status(500).send('Server Error');
	});
  }

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get("/map",homeController.getMap);
app.get("/AboutProject",homeController.aboutDev);
app.get("/login",homeController.getLogin);

// app.get('/dashboard',homeController.getDashboard);

// ======== plasma bank Routes ==========//
app.get("/index_plasma",homeController.getStatistics);
app.get("/amenities",homeController.getAmenities);
app.get("/form_donor",homeController.getDonorForm);
app.get("/form_patient",homeController.getPatientForm);
app.get("/common_pool",homeController.getCommonPool);
app.get("/plasma_bank",homeController.getPlasmaBank);

//========== BETA Feature ROUTES =========//
app.get("/beta_login",(req,res)=> {
	res.render("beta_login.ejs");
});
app.get("/beta_map",(req,res)=> {
	res.render("beta_map.ejs");
});

//========== AJAX TESTING ROUTES =========//

app.get("/login2",(req,res)=> {
	res.render("login2.ejs");
})
app.post("/sessionLogin", (req, res) => {
	const idToken = req.body.idToken.toString();

	const expiresIn = 60 * 60 * 24 * 5 * 1000;

	

	admin
	  .auth()
	  .createSessionCookie(idToken, { expiresIn })
	  .then(
		(sessionCookie) => {
		  req.session.userId = sessionCookie;
		  res.end(JSON.stringify({ status: "success" }));
		},
		(error) => {
		  res.status(401).send("UNAUTHORIZED REQUEST!");
		}
	  );
  });

  app.get("/profile",loginRequired,isAdmin, (req, res)=>{
		res.render("dashboard.pug");
  });
app.get("/sessionLogout", (req, res) => {
	res.clearCookie("session");
	res.redirect("/login");
  });
app.get("/test",function(req,res){
	res.render("test.ejs");
});
app.get("/faq",(req,res)=> {
	res.render("faq.ejs");
});

//=============ADMIN API===========//

app.get("/admin/findEmail",function(req,res){
	var id = req.query._id;
	var results = [];
	hospital.on("value",function(snapshot){
		snapshot.forEach(function(childsnapshot){
			if(childsnapshot.val().object_id == id){
				results.push(childsnapshot.val());
			}
		})
	})
	res.send(results);
});
app.get("/admin/getUser",function(req,res){
	var email = req.query.email;
	admin.auth().getUserByEmail(email)
		.then(function(userRecord){
			res.send(userRecord);
		})
		.catch(function(e){
			res.send(e);
		});
})
app.get("/admin/role",function(req,res){
	var uid = req.query.uid;
	hospital.on("value",function(snapshot){
		snapshot.forEach(function(childsnapshot){
			if(childsnapshot.val().user_id == uid){
				res.send(childsnapshot.val());
			}
		})
	});
})
app.get("/admin/createUser",function(req,res){
	var email = req.query.email;
	var password = req.query.password;
	admin.auth().createUser({
		email: email,
		emailVerified: false,
		password: password,
		disabled: false
	  })
		.then(function(userRecord) {
		  // See the UserRecord reference doc for the contents of userRecord.
		  res.send(userRecord);
		})
		.catch(function(error) {
		  res.send( error);
		});
});
app.get("/admin/updateUser",function(req,res){
	var uid = req.query.uid;
	var email = req.query.email;
	var phoneNumber = req.query.phoneNumber;
	var emailVerified = (req.query.emailVerified == 'true' ? true : false);
	var displayName = req.query.displayName;
	var disabled = (req.query.disabled == 'true' ? true : false);
	admin.auth().updateUser(uid, {
		email: email,
		phoneNumber: phoneNumber,
		emailVerified: emailVerified,
		displayName: displayName,
		disabled: disabled
	  })
		.then(function(userRecord) {
		  // See the UserRecord reference doc for the contents of userRecord.
		  res.send(userRecord.toJSON());
		})
		.catch(function(error) {
		  res.send(error);
		});
});
app.get("/admin/deleteUser",(req,res)=>{
	var uid = req.query.uid;
	admin.auth().deleteUser(uid)
	.then(function() {
	  res.send('Successfully deleted user');
	})
	.catch(function(error) {
	  res.send('Error deleting user:', error);
	});
});

app.post("/admin/userEdit",loginRequired,(req,res)=>{
	var email = req.body.email;
	admin.auth().getUserByEmail(email)
	.then(function(userRecord){
		res.render("userEdit.pug",{user:userRecord});
	})
	.catch(function(e){
		res.redirect("/profile");
	});
})

app.get("/admin/hEdit",loginRequired,(req,res)=>{
    var _id = req.query._id;
	Esri.findById(_id,function(err,data){
		if(err){
			res.render("404.ejs",{reason:err});
		} else {
			res.render("hEdit.ejs",{hospital:data});
		}
	});
})



//========API Routes============//

app.get("/api/getall",apiController.getAll);
app.get("/api/",apiController.getId);
app.put("/api/",apiController.updateId);
app.post("/api/",apiController.createHospital);
app.delete("/api/",apiController.deleteHospital);
app.get("/api/fuzzy",apiController.fuzzySearch);


//===============get request Fallback===========//

app.get("*", (req,res) => {
    res.render("404.ejs");
  });


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
app.post("/email",function(req,res){
	var email =  req.body.email;
	var name =  req.body.name;
	var number = req.body.number;
	var age = req.body.age;
	var gender = req.body.gender;
	var country = req.body.country;
	var state = req.body.state;
	var city = req.body.city;
	var bg = req.body.bg;
	/*console.log(email);
	sgMail.setApiKey("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");
	const msg = {
	to: email,
	from: 'pj.flux2001@gmail.com',
	subject: 'Team BITSians : Success',
	text: 'Dear '+name+', Your form has been successfully pushed into our database. It will expire in next 72 hours, hence take the required steps to comply with the same. The information that was pushed into this form : Age : <br>Gender : <br>Country : <br>State : <br>City : <br>Blood Group :'+ bg +' We will contact you @'+number+' in case of any emergency. Best Regards, Team BITSians ',
	html: 'Dear '+name+',<br><br>Your form has been successfully pushed into our database. It will expire in next <strong>72 hours</strong>, hence take the required steps to comply with the same.<br><br>The information that was pushed into this form :<br><p>Age : '+age+'<br>Gender : '+gender+'<br>Country : '+country+'<br>State : '+state+'<br>City : '+city+'<br>Blood Group : '+ bg +'<br></p>We will contact you @'+number+' in case of any emergency.<br><br> Best Regards,<br> Team BITSians',
	};
	sgMail.send(msg);*/
	let transport = nodemailer.createTransport({
		host: 'smtp.googlemail.com',
          port: 465,
          secure: true,
		auth: {
		  user: 'carequest69@gmail.com',
		  pass: 'CareQuest@69'
		}
	});
	const message1 = {
		from: 'CareQuest <carequest69@gmail.com>', // Sender address
		to: email,         // List of recipients
		subject: 'CareQuest : Form Submission Success', // Subject line
		html: 'Dear '+name+',<br><br>Your form has been successfully pushed into our database. It will expire in next <strong>72 hours</strong>, hence take the required steps to comply with the same.<br><br>The information that was pushed into this form :<br><p>Age : '+age+'<br>Gender : '+gender+'<br>Country : '+country+'<br>State : '+state+'<br>City : '+city+'<br>Blood Group : '+ bg +'<br></p>We will contact you @'+number+' in case of any emergency.<br><br> Best Regards,<br> Team CareQuest'// Plain text body
	};
	transport.sendMail(message1, function(err, info) {
		if (err) {
		  console.log(err)
		} else {
		  console.log(info);
		}
	});
	res.render("common_pool.ejs");
})

//========================//
//LISTENER PROCESS
var port = process.env.PORT || 31000
app.listen(port,process.env.IP,function(){
	console.log("Server started at port:"+port ,chalk.green('✓'));
	console.log('  Press CTRL-C to stop');
});
