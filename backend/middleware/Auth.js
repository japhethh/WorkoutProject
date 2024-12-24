import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }
  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = token_decode.id;
  next();
});

export default authMiddleware;

export const authMiddlewareBearer = expressAsyncHandler(
  async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized Login Again" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  }
);

// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   try {
//     // Check if endpoint requires authentication (excluding file upload endpoints)
//     if (req.file) {
//       return next(); // Skip authentication middleware for file upload endpoints
//     }

//     const token = req.headers.token;
//     if (!token) {
//       return res.status(400).json({ success: false, message: "Not Authorized. Login Again" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = decoded.id; // Attach decoded user ID to request body
//     next();
//   } catch (error) {
//     console.error("Authentication Error:", error);
//     return res.status(401).json({ success: false, message: "Unauthorized. Invalid Token." });
//   }
// };

// export default authMiddleware;
