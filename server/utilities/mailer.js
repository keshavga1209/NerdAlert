import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from "../config/constants.js";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
    },
});

// const subject = "Verify your Email";
const text = ""

const getHtml = (token) => {
    return (`
    <h1>Hello World, we are just getting started</h1>
    <h2>here is your OTP: ${token}</h2>
    `)
    // return (`
    //     <h2>Kindly click on the link to verify your email address<h2><br>
    //     <a href="http://localhost:3000/verify/${token}"><h1>Verify</h1></a><br>
    //     <br>
    //     <h2>Please do NOT reply to this email</h2>
    // `)
}

export const sendEmail = async (subject, email, html) => {
    let mailOptions = {
        from: NODEMAILER_EMAIL,
        to: email,
        subject,
        text,
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}

export const sendMail = async (subject, email, token) => {
    let mailOptions = {
        from: NODEMAILER_EMAIL,
        to: email,
        subject,
        text,
        html: getHtml(token),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}