import { 
  signUpService, 
  signInService
} from "../services/authService.js";

export const signUp = async (req, res) => {
  try {
    const userData = req.body;
    const createUser = await signUpService(userData);
    // res.status(201).json(newUser);
    res.status(201).json(createUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const userData = req.body;
    const User = await signInService(userData);
    // if (!User) {
    //     return res.status(404).json({ error: "User not found" });
    // }
    res.status(200).json(User);
    // res.cookie("access_token", data.session.access_token, { httpOnly: true });
    // const { email } = req.params;
    // const user = await getUserByEmail(email);
    // if (!user) {
        // return res.status(404).json({ error: "User not found" });
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
    // res.status(500).json({ error: error.message });
  }
};