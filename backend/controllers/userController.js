import User from "../models/user.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (request, response) => {
  response.json({ msg: "login user" });
};

// signup user
const signupUser = async (request, response) => {
  const { email, password, name } = request.body;

  try {
    const user = await User.signup(email, password, name);

    const token = createToken(user._id);
    response.json({ email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser };
