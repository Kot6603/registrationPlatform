import User from "../models/user.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    response.json({ id: user._id, email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (request, response) => {
  const { email, password, name } = request.body;

  try {
    const user = await User.signup(email, password, name);

    const token = createToken(user._id);
    response.json({ id: user._id, email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser };
