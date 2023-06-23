import jwt from "jsonwebtoken";
import { sendEmail } from '../../utilities/mailer.js'
import Tokens from '../../models/Tokens.js'
import Users from '../../models/User.js'
import db from '../../scripts/mongoose.js'
import { getHtmlEmailverification, sendUpdatedPreferences } from "../../scripts/email.js";
import axios from 'axios'
import { pingAllUsers } from "../../scripts/pingUsers.js";

export default function (io) {
    const home = async function (req, res) {
        res.send("User Router is working");
    };

    const createUser = async function (req, res) {
        try {
            const { name, email, password } = req.body
            // console.log(req.body.email);

            const prevToken = await Tokens.findOne({ email }).select({ '_id': 1 });

            const userCheck = await Users.findOne({ email }).select({ '_id': 1 });

            if (userCheck) {
                return res.status(200).send({
                    success: false,
                    message: "User already exists",
                });
            }
            const subject = "Verify your Email";

            if (prevToken) {
                let html = getHtmlEmailverification(prevToken._id.toString());
                sendEmail(subject, email, html);

                return res.status(201).send({
                    success: true,
                    message: "Mail already sent, check your email",
                    email,
                });
            }

            const token = await Tokens.create({
                name,
                email,
                password,
            });

            let html = getHtmlEmailverification(token._id.toString());
            sendEmail(subject, email, html);
            // console.log(email);

            return res.status(201).send({
                success: true,
                message: "Please check your email",
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    };

    const login = async function (req, res) {
        try {
            let user = await Users.findOne({ email: req.body.email });
            // no user found
            if (!user) {
                return res.status(200).send({
                    success: false,
                    message: "Could not find the user",
                });
            }
            // Incorrect Password
            if (req.body.password != user.password) {
                return res.status(201).send({
                    success: false,
                    message: "Password Invalid",
                });
            }

            const payload = {
                user_email: user.email,
                id: user._id,
            };

            const token = jwt.sign(payload, "Random Baniyaan", { expiresIn: "1d" });

            return res.status(201).send({
                success: true,
                message: "Logged In Successfully",
                token: "Bearer " + token,
                user: user,
            });
        } catch (err) {
            return res.status(401).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    };

    const verifyEmail = async function (req, res) {
        let session = null;

        db.startSession().then((_session) => {
            session = _session;

            session.startTransaction();
            return Tokens.findOneAndDelete({ _id: req.body.token }).session(session);
        }).then((userData) => {
            if (!userData) throw Error("Invalid token");

            return Users.create([{
                name: userData.name,
                password: userData.password,
                email: userData.email
            }], { session });
            // pause
        }).then(() => {
            return session.commitTransaction()
        }).then(() => {
            return res.status(201).send({
                success: true,
                message: `Your email is verified, Please login again`,
            });
        }).catch((err) => {
            res.status(400).send({
                success: false,
                message: `Bhay error aara: ${err}`,
            });
            return session.abortTransaction();
        }).finally(() => {
            return session.endSession()
        })
    };

    const setPreferences = async function (req, res) {
        try {
            await Users.findOneAndUpdate({ email: req.body.email }, { preferences: req.body.preferences });
            const user = await Users.findOne({ email: req.body.email });
            let html = sendUpdatedPreferences(user.name, req.body.preferences);
            sendEmail("Your Preferences Updated", req.body.email, html);

            return res.status(201).send({
                success: true,
                message: "Your Preferences are updated 😉",
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    }

    const getUserInfo = async function (req, res) {
        try {
            const user = await Users.findOne({ email: req.body.email });
            if (!user) {
                return res.status(200).send({
                    success: false,
                    message: "No such user",
                });
            }

            const data = {
                name: user.name,
                preferences: user.preferences
            }

            return res.status(201).send({
                success: true,
                message: "Here's your User 🫳",
                user: data
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    }

    const getAllUsers = async function (req, res) {
        try {

            const success = await pingAllUsers();
            if (success == false) throw Error("pinging failed");

            return res.status(201).send({
                success,
                message: "Pinged All Users",
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    }

    return {
        home,
        createUser,
        verifyEmail,
        login,
        setPreferences,
        getAllUsers,
        getUserInfo
    };
}

