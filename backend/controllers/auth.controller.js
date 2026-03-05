import User from "../models/User.js";
import redis  from "../lib/redis.js"; 
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

const storeRefreshToken = async (userId, refreshToken) => {
  if (redis) {
    await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
  }
}

const setCookies = (res,accessToken,refreshToken) =>{
  res.cookie("accessToken", accessToken,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })

   res.cookie("refreshToken", refreshToken,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 1000,
  })
}

export const register = async (req, res) => {
  const { name, email, password } = req.body; 

       try {
        
            const userExist = await User.findOne({email})

            if(userExist){
              return res.status(400).json({message: "User Exists"})
            }
            const user = await User.create({
              name,
              email,
              password
            })

            const {accessToken, refreshToken} = generateToken(user._id)
            await storeRefreshToken(user._id, refreshToken)

            setCookies(res, accessToken, refreshToken)  


            res.status(201).json({
              user:{ 
                id: user._id, 
                name: user.name, 
                email: user.email ,
                role: user.role
              }, 
              message: "User registered successfully"}) 
            
       } catch (error) {
        res.status(500).json({message: error.message})
       }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user){
      res.status(400).send({message: "Invalid Email"})
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch){
      res.status(400).send({message: "Invalid password"})
    }
    const {accessToken, refreshToken} = generateToken(user._id)
    await storeRefreshToken(user._id, refreshToken)

    setCookies(res, accessToken, refreshToken)

    res.status(200).json({
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      message: "User logged in successfully"
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      await redis.del(`refreshToken:${decoded.userId}`);
    }

    res.clearCookie("refreshToken", {
    httpOnly: true, 
    });
    res.clearCookie("refreshToken", {
    httpOnly: true, 
    });
    res.clearCookie("accessToken", {
    httpOnly: true, 
    
    });

  res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message }); 
  }
  
}