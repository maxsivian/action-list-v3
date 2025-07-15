import express from "express"
const router = express.Router()
import mongoose from "mongoose"

import { User } from "../models/UserSchema.js"
import { verifyUserToken } from "../middlewares/verifyUserToken.js"


router.get("/get-tasks", verifyUserToken, async (req, res) => {
    try {
        // console.log("req.body", req.body);

        const mongo_id = req.mongo_id

        let userTasks = await User.findById(mongo_id).select("tasks")

        // console.log("userTasks", userTasks);
        // console.log(" ");
        if (!userTasks) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, data: userTasks.tasks })

    } catch (error) {
        console.log("taskRoutes (get) `/get-tasks` error: ", error)
        // console.log("error.name: ", error.name)
        // console.log("error.message: ", error.message)

        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ success: false, message: "Server database is under maintainance", error: error });
        }
        
        return res.status(500).json({ success: false, message: error.message });
    }
})


router.post("/sync-tasks", verifyUserToken, async (req, res) => {
    try {
        // console.log("req.body", req.body);

        const mongo_id = req.mongo_id;
        const newTasks = req.body;
        // console.log("newTasks", newTasks);

        // Optionally validate that `newTasks` is an array
        if (!Array.isArray(newTasks)) {
            return res.status(400).json({ success: false, message: "Invalid data format" });
        }


        const updatedUser = await User.findByIdAndUpdate(
            mongo_id,
            { tasks: newTasks },
            // { new: true } // return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.log("taskRoutes (post) `/sync-tasks` error: ", error)
        // console.log("error.name: ", error.name)
        // console.log("error.message: ", error.message)

        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ success: false, message: "Server database is under maintainance", error: error });
        }

        return res.status(500).json({ success: false, message: error.message });
    }
})


export default router