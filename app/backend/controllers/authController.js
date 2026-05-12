import { 
  signUpService, 
  signInService,
  signOutService
} from "../services/authService.js";

export const signUp = async (req, res) => {
  try {
    const userData = req.body;
    const createUser = await signUpService(userData);
    // res.status(201).json(createUser);
    // Returns the user object and session (if email confirmation is off)
    // res.status(200).json({ message: 'Check your email for the confirmation link!', createUser });
    res.status(201).json({ message: 'User created successfully', createUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const userData = req.body;
    const User = await signInService(userData);

    // Session data includes access_token and refresh_token
    // const { session, user } = data;

    // Security Best Practice: Store tokens in HTTP-only cookies
    // res.cookie('sb-access-token', session.access_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    // });
    
    res.status(200).json(User);
    // res.cookie("access_token", data.session.access_token, { httpOnly: true });
    // const { email } = req.params;
    // const user = await getUserByEmail(email);
    // if (!user) {
        // return res.status(404).json({ error: "User not found" });
    // }

    // Return the access token to the client
    // res.json({ session: data.session });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
    // res.status(500).json({ error: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('No token provided');
    // console.log(authHeader);
    const token = authHeader.split(' ')[1];
    // console.log(token);
    const User = await signOutService(token);
    // console.log(User);
    // console.log(error);
    //res.status(200).json(User);
    res.status(200).json({ message: 'Signed out successfully', User });
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