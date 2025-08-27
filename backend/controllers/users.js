import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/users.js";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword });

    const accessToken = jwt.sign({ _id: user._id }, ACCESS_TOKEN, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ _id: user._id }, REFRESH_TOKEN, {
      expiresIn: "1d",
    });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Successfully registered!",
      username: user.username,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exists!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Incorrect password or username!" });
    }

    const accessToken = jwt.sign({ _id: user.id }, ACCESS_TOKEN, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ _id: user.id }, REFRESH_TOKEN, {
      expiresIn: "1d",
    });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Successfully logged in!",
      username: user.username,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Successfully logged out!" });
};

export const refresh = (req, res) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No refresh token provided." });

  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({ _id: decoded.id }, ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
  }
};
