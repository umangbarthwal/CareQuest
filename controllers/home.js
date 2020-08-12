/**
 * GET /
 * Home page.
 */
const mongoose = require("mongoose");
const Esri = require("../models/esri.js");

exports.index = (req, res) => {
    res.render('about.ejs', {
      title: 'About'
    });
  };
//GET /map
exports.getMap = (req, res)=>{
  res.render("index.ejs");
};
exports.aboutDev = (req, res) => {
    res.render('AboutProject.ejs', {
      title: 'About Developers'
    });
  };
  //Get /login
  exports.getLogin = (req, res) => {
    res.render('login.ejs', {
      title: 'Login'
    });
  };
  // GET /dashboard
  exports.getDashboard = (req, res ,next) => {
    res.render('dashboard.ejs', {
      title: 'DashBoard'
    });
  };
  // GET /index_plasma
  exports.getStatistics = (req, res) => {
    res.render('index_plasma.ejs', {
      title: 'Plasma Statistics'
    });
  };
  //GET /amenities
  exports.getAmenities = (req, res) => {
    res.render('amenities.ejs', {
      title: 'Amenities'
    });
  };
  //GET /form_donor
  exports.getDonorForm = (req, res) => {
    res.render('form_donor.ejs', {
      title: 'Donor Form'
    });
  };
  //GET /form_patient
  exports.getPatientForm = (req, res) => {
    res.render('form_patient.ejs', {
      title: 'Patient Form'
    });
  };
  //GET /common__pool
  exports.getCommonPool = (req, res) => {
    res.render('common_pool.ejs', {
      title: 'Pool Page'
    });
  };
  //GET /plasma_bank
  exports.getPlasmaBank = (req, res) => {
    res.render('plasma_bank.ejs', {
      title: 'Plasma Bank'
    });
  };