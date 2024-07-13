const admin = require('./firebase');
const authenticate = async (req, res, next) => {
    try {
const token = req.headers.authorization;

if (!token) {
return res.status(401).json({msg:"you are 'Unauthorized'"});
}
else{
    next()
}

// const decodedToken = await admin.auth().verifyIdToken(token);
// req.user = decodedToken;
// next();
} catch (error) {
return res.status(500).json({'error:': error});
}
};
module.exports = authenticate;
