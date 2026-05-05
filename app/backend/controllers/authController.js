import { 
  signUp, 
  signIn
} from "../services/authService.js";

export const signUp = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await signUp(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const userData = req.body;
    const User = await signIn(userData);
    res.status(201).json(User);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};