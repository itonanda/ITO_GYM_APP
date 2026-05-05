import { 
  createUser, 
  getUsers, 
  getUserById, 
  getUserByEmail,
  updateUser,
  deleteUser,
  searchUsers
} from "../services/userService.js";

//var jwt = require("jsonwebtoken");
//var bcrypt = require("bcryptjs");


export const addUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/*
export const addUser = async (req, res) => {
  try {
    const userData = req.body;
    //const { email, password } = req.body; // Extract data
    // Check if user already exists in database
    //let user = await User.fetchUserByEmail({ email });
    //if (user) return res.status(400).json({ msg: 'User already exists' });

    // Then secure the password before saving
    //const salt = await bcrypt.genSalt(10); // Generating the salt(unique string) for hashing
    //const hashedPassword = await bcrypt.hash(password, salt); // Hashing the password, which can't be unhashed

    // Now create new user with hashed password
    //user = new User({ email, password: hashedPassword });
    const newUser = await createUser({
      //UserId: userData.userid,
      email: userData.email,
      //email: req.body.email,
      password: bcrypt.hashSync(userData.password, 8),
      //password: bcrypt.hashSync(req.body.password, 8),
    })
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
*/

export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const users = await searchUsers(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};