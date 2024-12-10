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

const getUsers = async (_, response) => {
  const users = await User.find({}).select("-password");
  response.json(users);
};

const getUser = async (request, response) => {
  const { id } = request.params;
  const reqUser = request.user;

  if (!reqUser) {
    return response.status(401).json({
      error: "Unauthorized: Valid authorization token required",
    });
  }

  if (reqUser.id !== id) {
    return response.status(403).json({
      error: "Forbidden: Not authorized to view this user",
    });
  }

  const user = await User.findById(id).select("-password");

  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
};

const updateUser = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  const reqUser = request.user;

  if (!reqUser) {
    return response.status(401).json({
      error: "Unauthorized: Valid authorization token required",
    });
  }

  if (reqUser.id !== id) {
    return response.status(403).json({
      error: "Forbidden: Not authorized to view this user",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true },
    );

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser, getUsers, getUser, updateUser };
