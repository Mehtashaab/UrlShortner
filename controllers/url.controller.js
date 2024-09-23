import User from "../models/user.model.js";
import { nanoid } from 'nanoid'; // Import nanoid for generating unique short IDs

// Controller function for creating a new user
const createUser = async (req, res) => {
    // Log the request body to check if it's correctly received
    console.log(req.body);

    // Destructure 'url' from req.body
    const { url } = req.body;

    // If 'url' is not provided in the request body, return an error response
    if (!url) {
        return res.status(400).json({ message: "Url is required" });
    }

    // Generate a shortId using nanoid
    const shortId = nanoid(8);

    // Create a new user in the database with the provided URL and generated shortId
    const newUser = await User.create({
        shortId: shortId,
        redirectUrl: url,
        visitHistory: []
    });

    // Return the shortId as a response
    return res.json({ id: shortId });
}


const getUserUrl = async (req, res) => {
    try {
        // Correctly destructure 'shortId' from req.params
        const { shortId } = req.params;

        // Find the user by shortId and update their visit history
        const user = await User.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true } // Return the updated user document
        );

        // If user is not found, send a 404 response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Redirect to the user's redirectUrl
        res.redirect(user.redirectUrl);

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const getAnalytics = async (req, res) => {
    try {
        // Destructure shortId from req.params
        const { shortId } = req.params;

        // Find the user by shortId, not _id
        const user = await User.findOne({ shortId });
        
        // If no user is found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the total number of visits and average visit duration in the response
        return res.json({
            analytics: {
                totalVisits: user.visitHistory.length,
                averageVisitDuration:user.visitHistory
            }
        });
    } catch (error) {
        // Handle server errors
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export { createUser ,getUserUrl,getAnalytics};
