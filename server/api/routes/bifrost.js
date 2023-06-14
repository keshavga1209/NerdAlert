import express from "express";
import home from '../controllers/bifrost_api.js';

export default function (io) {
    const router = express.Router();
    console.log("Bifrost Router loaded");

    router.get("/", home(io).home);
    router.post("/sendPapers", home(io).sendMail);
    // router.post("/login", home(io).login);
    // router.post("/updateName", home(io).updatename);
    // router.post(
    //     "/getInfo",
    //     passport.authenticate("jwt", { session: false }),
    //     home(io).getInfo
    // );
    return router;
}

// for any further routes, access from here
// router.use('/routerName', require('./route'));
