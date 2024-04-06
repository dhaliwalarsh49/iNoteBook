const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "thisisasecrettobeusedforjsonwebtoken";

// **** Endpoint for creating a user
router.post('/createuser',
    [
        body('name', "Name must not be empty").notEmpty(),
        body('email', "Email should be valid").isEmail(),
        body('password', "Password must be minimum of 4 characters").isLength({ min: 4 })
    ], async (req, res) => {

        let success = false;

        // **** Cheching for any validation errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({success, errors: result.array() });
        }

        try {

            // **** Checking if email already registered
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.json({success, "error": "Email already registerd with another account" })
            }

            // **** Hashing the password before storing it in database
            const salt = bcrypt.genSaltSync(10);
            const securedPassword = bcrypt.hashSync(req.body.password, salt);

            // **** Creating user if no errors
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword
            });


            // **** Creating web token and sending it to user on successful user creation
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, "authToken": authToken });

        } catch (err) {
            console.log(err)
            res.send({success, "error": "Internal Server Error" })
        }
    })


// **** Endpoint for authenticating the credentials of user
router.post('/login',
    [
        body('email', "Email is incorrect").isEmail(),
        body('password', "Password is incorrect").exists()
    ], async (req, res) => {
        let success = false;
        
        // **** Cheching for any validation errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({success, errors: result.array() });
        }

        const { email, password } = req.body;
        try {

            // **** Checking if user exists with given email
            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(404).json({success, error: "Try to login with correct credentials" })
            }

            // **** Checking if password in database(hashed password) matches with the password entered
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (!passwordMatch) {
                return res.status(404).json({success, error: "Try to login with correct credentials" })
            }

            // **** Creating web token and sending it to user on successful login
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, "authToken": authToken });

        } catch (err) {
            console.log(err)
            res.send({success, "error": "Internal Server Error" })
        }
    })

// **** Endpoint for getting the information of loggedin user
router.post('/getuser', fetchuser, async (req, res) => {
        let success = false;
        try{
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            success = true;
            res.send({success, user})

        } catch(err){
            console.log(err)
            res.send({success,  "error": "Internal Server Error" })
        }
    })

module.exports = router;