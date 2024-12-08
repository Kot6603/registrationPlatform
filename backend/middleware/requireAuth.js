import jwt from "jsonwebtoken";
import User from "../models/user.js";

async function requireAuth(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: "Unauthorized: Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  console.log(token);

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    request.user = await User.findOne({ _id: id }).select("_id email");
    next();
  } catch (error) {
    console.log(error);
    response.status(403).json({ error: "Forbidden: Invalid token" });
  }
}

export default requireAuth;
