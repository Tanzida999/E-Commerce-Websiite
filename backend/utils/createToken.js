import jwt from "jsonwebtoken";

const generateToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expiration
  });

  // Set JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return token; // Optional if only the cookie is needed
};

export default generateToken;
