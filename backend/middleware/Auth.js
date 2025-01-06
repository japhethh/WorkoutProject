import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }
  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log("tama tama");
  console.log(token_decode, "blast");
  req.body.userId = token_decode.id;
  next();
});

export default authMiddleware;

export const authMiddlewareBearer = expressAsyncHandler(
  async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized!" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Decoded Token:", token);

    // console.log(token);
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
