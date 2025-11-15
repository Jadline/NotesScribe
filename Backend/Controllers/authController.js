const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const signToken = require("../helpers/signToken");
const { Sign } = require("crypto");
const sendEmail = require("../helpers/sendEmail");
const crypto = require("crypto");

async function SignUp(req, res) {
  try {
    const { firstName, secondName, email, role, password, passwordConfirm } =
      req.body;
    const user = await User.create({
      firstName,
      secondName,
      email,
      role,
      password,
      passwordConfirm,
    });

    const token = signToken(user._id);

  const isDev = process.env.NODE_ENV !== "production";

res.cookie("jwt", token, {
  httpOnly: true,
  // secure: !isDev,  
  // sameSite: isDev ? "lax" : "none",
   secure: true,          
  sameSite: "none", 
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
});


    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "invalid email or password",
      });
    }
    const token = signToken(user._id);

const isDev = process.env.NODE_ENV !== "production";
console.log('isDev',isDev)

res.cookie("jwt", token, {
  httpOnly: true,
  //  secure: !isDev,  
  // sameSite: isDev ? "lax" : "none",
  secure: true,          
  sameSite: "none",     
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
});


    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err?.message,
    });
  }
}

async function forgotPassword(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user with that email",
      });
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/account/resetPassword/${resetToken}}`;
    const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    const message = `Forgot your password ? reset it here ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err?.message,
    });
  }
}

async function resetPassword(req, res) {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    console.log("reset user", user);

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or has expired",
      });
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      usersCount: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}
async function logout(req,res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),  
  });

  res.status(200).json({ status: "success", message: "Logged out" });
};


module.exports = { SignUp, Login, getAllUsers, resetPassword, forgotPassword,logout};
