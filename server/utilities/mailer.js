import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "auto.generated.email.smtp@gmail.com",
        pass: "cpsqoxdjxbohceed",
    },
});

const subject = "Verify your Email";
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

export const sendMail = async (email, token) => {
    let mailOptions = {
        from: 'auto.generated.email.smtp@gmail.com',
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