import Users from "../models/User.js"
import axios from "axios";


export const pingAllUsers = async function () {
    try {
        const users = await Users.find()

        users.map((user, indx) => {
            let pref = user.preferences
            pref.splice(0, 0, user.email);
            let data = JSON.stringify(pref);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/receive_data',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .catch((error) => {
                    console.log(error);
                });
        });
    } catch (err) {
        console.log(err);
    }
}