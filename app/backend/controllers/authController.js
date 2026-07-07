import { 
  signUpService, 
  signInService,
  signInDataService,
  signOutService,
  sendbyEmailService,
  generateLinkService,
  inviteByEmailService
} from "../services/authService.js";

export const signUp = async (req, res) => {
  try {
    const userData = req.body;
    // 1. Validate inputs
    if (!userData.email || !userData.password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const createUser = await signUpService(userData);

    // 3. Handle Supabase error
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // 4. Send success response
    // return res.status(200).json({ message: 'User created successfully', createUser });

    // if (error) return res.status(400).json({ error: error.message });
    // res.status(201).json(createUser);
    res.status(200).json({ message: 'User created successfully', createUser });
    // Returns the user object and session (if email confirmation is off)
    // res.status(200).json({ message: 'Check your email for the confirmation link!', createUser });
    const Email = await sendbyEmailService(userData);
    // if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Check your email for the confirmation link!', Email });
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

    // if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(User);

    // res.cookie("access_token", data.session.access_token, { httpOnly: true });
    // const { email } = req.params;
    // const user = await getUserByEmail(email);
    // if (!user) {
        // return res.status(404).json({ error: "User not found" });
    // }

    // Return the access token to the client
    // res.json({ session: data.session });

    // if (error) return res.status(401).json({ error: error.message });

    // Return the access_token to the client
    // return res.status(200).json({
    //     access_token: data.session.access_token,
    //     refresh_token: data.session.refresh_token,
    //     user: data.user
    // });

    // return res.status(200).json({ session: data.session });

    // Example using cookie-parser
    // res.cookie('sb-access-token', data.session.access_token, {
    // httpOnly: true,
    // secure: true, // true in production
    // sameSite: 'Lax',
    // });

  } catch (error) {
    res.status(400).json({ error: error.message });
    // res.status(500).json({ error: error.message });
  }
};

export const signInData = async (req, res) => {
  try {
    const userData = req.body;
    const User = await signInDataService(userData);

    // Session data includes access_token and refresh_token
    // const { session, user } = data;

    // Security Best Practice: Store tokens in HTTP-only cookies
    // res.cookie('sb-access-token', session.access_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    // });

    // if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(User);

    // res.cookie("access_token", data.session.access_token, { httpOnly: true });
    // const { email } = req.params;
    // const user = await getUserByEmail(email);
    // if (!user) {
        // return res.status(404).json({ error: "User not found" });
    // }

    // Return the access token to the client
    // res.json({ session: data.session });

    // if (error) return res.status(401).json({ error: error.message });
// Returns new access_token, new refresh_token, and user payload
//   return res.status(200).json({
//     accessToken: data.session.access_token,
//     refreshToken: data.session.refresh_token,
//     user: data.user
//   });
    // Return the access_token to the client
    // return res.status(200).json({
    //     access_token: data.session.access_token,
    //     refresh_token: data.session.refresh_token,
    //     // user: data.user
    //     email: data.user.email,
    //     name: data.user.full_name,
    // });

    // return res.status(200).json({ session: data.session });

    // Example using cookie-parser
    // res.cookie('sb-access-token', data.session.access_token, {
    // httpOnly: true,
    // secure: true, // true in production
    // sameSite: 'Lax',
    // });

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
    // if (error) return res.status(400).json({ error: error.message });
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