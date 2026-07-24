import jwt from "jsonwebtoken";


const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    // Get authorization header
    const authHeader =
      req.headers.authorization;


    // Check token
    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message:
          "Please login first",

      });

    }


    // Remove "Bearer "
    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;


    // Verify token
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    // Store user ID
    req.userId =
      decoded.id;


    // Continue
    next();


  } catch (error) {

    console.log(
      "Auth Middleware Error:",
      error
    );


    return res.status(401).json({

      success: false,

      message:
        "Invalid or expired token",

    });

  }

};


export default authMiddleware;