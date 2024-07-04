import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js'


const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    }
    catch (error) {
        next(new ApiError(500, "Something went wrong while generating refresh and access token"))
    }
}


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const encryptedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({username, email, password: encryptedPassword})
    try {
        await newUser.save();
        res.status(201).json(new ApiResponse(200, newUser, 'New User Created Successfully'))
        
    } catch (error) {
        next(new ApiError(500, 'This username or email already exists'));
        
    }
}

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({
            $or: [{email}]
        })
        console.log(validUser)
        if (!validUser) {
            return next(new ApiError(404, "User not found!!"))
        }
        const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
        if(!isPasswordValid){
            return next(new ApiError(401, "Wrong credentials!!"))
        }
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(validUser._id);
        const loggedInUser = await User.findById(validUser._id).select("-password -refreshToken -avatar -createdAt -updatedAt -__v")
        console.log(loggedInUser)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        // .json(new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "User logged in Successfully"))
        .json(new ApiResponse(200, loggedInUser, "User logged in Successfully"))
        // .json(loggedInUser)

    } catch (error) {
        next(new ApiError(403, 'Authentication failed'));
    }
};


export const logout = async (req, res, next) => {
    try {
        const loggedoutUser = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: null
            }},
            {
                new: true,
            }
        ).select('-password')
        console.log(req.user._id)
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, loggedoutUser, "User logged Out"))
        
    } catch (error) {
        next(new ApiError(500, 'Unable to logout Try again...'))
    }
};