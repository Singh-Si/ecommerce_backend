const User = require("../modules/models/user.model"); // Corrected model path
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (token) {
            token = token.split(" ")[1];
        }
        
        if (!token) {
            return res.status(401).json({ success: false, error: "Unauthorized user, token not available." });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findByPk(decodedToken.id);
        if (!user) {
            return res.status(401).json({ success: false, error: "Unauthorized user, user not found." });
        }

        // Attach the user to the request object for use in other routes
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ success: false, error: "Invalid token or authentication failed." });
    }
};

module.exports = verifyToken;
