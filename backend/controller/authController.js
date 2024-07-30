const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.handleUserRegister = async (req, res) => {
	try {
		const {email, password, confirmPassword,name,bio,penName,role} = req.body;
		const match = await userModel.findOne({$or:[{email:email}]});
		if(match) return res.status(400).json({success:false, message:"email already exists"});
		if(password !== confirmPassword){
			return res.status(400).json({success:false, message:"passwords do not match"}); 
		}
		const hash = await bcrypt.hash(password, 10);
		const user = new userModel({
			email,
			password:hash,
      profile:{
        name:name,
        bio:bio,
        penName:penName
      },
			role:role
		});
		await user.save();
		res.status(200).json({success:true, message:"user registered successfully"})
	} catch (error) {
		console.log(error);
		res.status(500).json({success:false, message:error.message, error})
	}
}

exports.handleUserLogin = async (req, res) => {
	try {
		const {email, password} = req.body;
		const match = await userModel.findOne({email});
		if(!match) {
			req.flash("login-message", {success:false, message:"Oops! Email and/or password are incorrect."})
			return res.redirect("/api/v1/manage/auth");
		}
		if(await bcrypt.compare(password, match.password)){
			const access_token = jwt.sign({email, roles:match.roles}, process.env.ACCESS_TOKEN_SECRET);
			match.access_token = access_token;
			match.status = true;
			req.session.access_token = access_token;
			await match.save();
			res.redirect("/api/v1/manage/about");
		} else {
			req.flash("login-message", {success:false, message:"Oops! Email and/or password are incorrect."})
			res.redirect("/api/v1/manage/auth");
		}
	} catch (error) {
		req.flash("login-message", {success:false, message:error.message})
		res.status(200).json({success:false, error:error.message})
	}
}