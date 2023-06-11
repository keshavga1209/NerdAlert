import express from "express";
import home from "../controllers/home_controller.js";


export default function (io) {
    const router = express.Router();
    console.log("Router loaded");

    router.get("/", home(io).home);
    // router.use("/student", student(io));
    // for any further routes, access from here
    // router.use('/routerName', require('./route'));
    return router;
}
