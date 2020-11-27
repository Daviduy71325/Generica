const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('.././model/User');
const key = require('../config/keys').secret;

module.exports = {
    register : async (req, res, next) => {
        let { 
            name, 
            contact_number,
            address,
            username,
            password
        } =  req.body;

        const foundUser = await User.findOne({ "username": username});
        if(foundUser){ return res.status(400).json({ error : 'username is already in use'})};

        const foundName = await User.findOne({ "name": name});
        if(foundName){ return res.status(400).json({ error : 'name is already in use'})};
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({  
            name, 
            contact_number,
            address,
            username,
            password : passwordHash,
            date_updated : Date.now()
        });

        await newUser.save();

        res.status(200).json(newUser);
    },

    logIn : async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if(!user) { return res.status(400).json({msg : 'username not found', success : false})};

        const checkPassword = await bcrypt.compare(password, user.password);
     
        if(!checkPassword) { return res.status(400).json({
            msg : 'password incorrect',
            success : false
        })};

        const payload = { 
            id : user.id,
            name : user.name,
            username : user.username
        }

        const token = await jwt.sign({
            // iss: 'DavidUy',
            sub: payload,
            iat: new Date().getTime(),
            expiresIn: 604800
        }, key);
        
        res.status(200).json({
                    success : true,
                    token : `Bearer ${token}`,
                    user : user,
                    msg: 'you got your token'
                });

      

    }
}
