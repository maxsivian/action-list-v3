import express from "express"
import mongoose from "mongoose"
const router = express.Router()

import { User } from "../models/UserSchema.js"
import { verifyUserToken } from "../middlewares/verifyUserToken.js"


router.put("/update-name", verifyUserToken, async (req, res) => {
    try {
        // console.log("req.body", req.body);
        let { updatedName } = req.body
        updatedName = updatedName.trim()
        // console.log(updatedName);


        if (!updatedName) {
            return res.status(400).json({ success: false, message: "Name is empty" })
        }

        const result = await User.updateOne(
            { _id: req.mongo_id },
            { $set: { name: updatedName } }
        );

        // console.log("result", result);

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.log("accountRoutes (put) `/update-name` error: ", error)
        // console.log("error.name: ", error.name)
        // console.log("error.message: ", error.message)

        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ success: false, message: "Server database is under maintainance", error: error });
        }

        return res.status(500).json({ success: false, message: error.message, error: error });
    }
})


router.delete("/", verifyUserToken, async (req, res) => {
    try {
      
        const result = await User.deleteOne(
            { _id: req.mongo_id }
        );

        // console.log("result", result);

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        return res.status(200).json({ success: true, message: "Account deletion successful" });

    } catch (error) {
        console.log("accountRoutes (delete) `/` error: ", error)
        // console.log("error.name: ", error.name)
        // console.log("error.message: ", error.message)

        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ success: false, message: "Server database is under maintainance", error: error });
        }

        return res.status(500).json({ success: false, message: error.message, error: error });
    }
})



export default router