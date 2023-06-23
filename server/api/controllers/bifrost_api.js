import { getHtmlEmailPapers } from "../../scripts/email.js";
import { sendEmail } from "../../utilities/mailer.js";
import Users from '../../models/User.js'

export default function (io) {
    const home = function (req, res) {
        console.log("home reached");
        res.send("Router is Working");
    };

    const sendMail = async function (req, res) {
        try {
            const { papers, email } = req.body
            const user = await Users.findOne({ email });
            if (!user) return res.status(200).send({
                success: false,
                message: `No Such user bro`,
            });
            const html = getHtmlEmailPapers(papers, user.name);
            sendEmail("Your Weekly Scraper", email, html);
            return res.status(201).send({
                success: true,
                message: "Please check your email",
                papers,
                email,
                html
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    }


    return { home, sendMail };
}
