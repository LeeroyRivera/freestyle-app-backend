const admin = require("../config/firebase");

async function verifyToken(req, res, next) { // Middleware to verify Firebase ID token
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>" format and split the string to get the token
  if (!token) return res.status(401).send("Unauthorized"); 

  try {
    const decoded = await admin.auth().verifyIdToken(token); // Verify the token using Firebase Admin SDK
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}

module.exports = verifyToken;