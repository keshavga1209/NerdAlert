import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from "../config/constants.js";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
    },
});

const subject = "Here's your weekly research diet";
const text = ""

//yaha pe content mein json object hoga jise parse krke html list mein dalna
const getHtml = (user, content) => {
    return (`
    <h1>Hello ${user}, have a look at the new research from your interests.</h1>
    <h2>here you go:${content} </h2>
    
    `)
}

export const sendNewsletter = async (email, user, content) => {
    let mailOptions = {
        from: 'auto.generated.email.smtp@gmail.com',
        to: email,
        subject,
        text,
        html: getHtml(user, content),
    };

    transporter.sendNewsletter(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}