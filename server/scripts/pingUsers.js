import Users from "../models/User.js"
import axios from "axios";


export const pingAllUsers = async function () {
    try {
        if (!Users) return false;
        const users = await Users.find()
        // let val = []

        users.forEach(async (user, indx) => {
            let pref = user.preferences
            pref.splice(0, 0, user.email);
            // val.push(pref);
            let data = JSON.stringify(pref);
            // console.log(pref);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/receive_data',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios.request(config).catch((error) => {
                console.log(pref);
                console.log("Error in request for user", user.name);
            });
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}