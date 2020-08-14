const mongoose = require("mongoose");
const Esri = require("../models/esri.js");

//========THIS API GETS ALL THE DATA===========//
exports.getAll = (req,res)=>{
    Esri.find({},function(err,data){
		if(err){
			res.send(err);
		} else {
			res.send(data);
		}
	}).limit(1000);
};
//========THIS SEARCHES FOR A SPECIFIC MONGO ID==========//
exports.getId = (req,res)=>{
    var _id = req.query._id;
	Esri.findById(_id,function(err,data){
		if(err){
			res.send(err);
		} else {
			res.send(data);
		}
	});
}
//===========THIS API Route Searches and Updates the document ============//
exports.updateId = (req,res)=>{
    Esri.findByIdAndUpdate(req.body._id,req.body,{upsert:false,new:true},function(err,updatedObject){
		if(err){
			console.log(err);
		} else {
			res.send(updatedObject);
		}
	})
}
//=================THIS API Creates New Documents================//
exports.createHospital = (req,res)=>{
    var newEsri = new Esri({
        X:req.body.X,
        Y:req.body.Y,
        FID:req.body.FID,
        HOSPITAL_NAME:req.body.HOSPITAL_NAME,
        HOSPITAL_TYPE:req.body.HOSPITAL_TYPE,
        HQ_ADDRESS:req.body.HQ_ADDRESS,
        HQ_CITY:req.body.HQ_CITY,
        HQ_STATE:req.body.HQ_STATE,
        HQ_ZIP_CODE:req.body.HQ_ZIP_CODE,
        COUNTY_NAME:req.body.COUNTY_NAME,
        STATE_NAME:req.body.STATE_NAME,
        FIPS:req.body.FIPS,
        NUM_LICENSED_BEDS:req.body.NUM_LICENSED_BEDS,
        NUM_STAFFED_BEDS:req.body.NUM_STAFFED_BEDS,
        NUM_ICU_BEDS:req.body.NUM_ICU_BEDS,
        ADULT_ICU_BEDS:req.body.ADULT_ICU_BEDS,
        PEDI_ICU_BEDS:req.body.PEDI_ICU_BEDS,
        BED_UTILIZATION:req.body.BED_UTILIZATION,
        Potential_Increase_In_Bed_Capac:req.body.Potential_Increase_In_Bed_Capac,
        AVG_VENTILATOR_USAGE:req.body.AVG_VENTILATOR_USAGE	
        });
        newEsri.save(function(err,obj){
            if(err){
                console.log(err);
            } else {
                res.send(obj);
            }
        });
}
//==================DELELTE BY ID=============//
exports.deleteHospital = (req,res)=>{
    Esri.findByIdAndRemove(req.body._id,function(err,deletedObj){
		if(err){
			console.log(err);
		} else {
			res.send(deletedObj);
		}
	})
}
//=============Fuzzy Search based on raw data ==========//
exports.fuzzySearch = (req,res)=>{
    var COUNTY_NAME = req.query.COUNTY_NAME;
	var STATE_NAME = req.query.STATE_NAME;
	var HOSPITAL_NAME = req.query.HOSPITAL_NAME;
	var HQ_CITY = req.query.HQ_CITY;
	Esri.find({STATE_NAME:{$regex:STATE_NAME,$options:"$i"},COUNTY_NAME:{$regex:COUNTY_NAME,$options:"$i"},HOSPITAL_NAME:{$regex:HOSPITAL_NAME,$options:"$i"},HQ_CITY:{$regex:HQ_CITY,$options:"$i"}},function(err,data){
		if(err){
			res.send(err);
		} else {
			res.send(data);
		}
	}).limit(100);
}
