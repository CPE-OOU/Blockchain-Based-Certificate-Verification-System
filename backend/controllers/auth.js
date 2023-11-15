const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// const sendEmail = require('../utils/sendEmail');
const User = require("../model/User");
const { createAccount } = require("./celoOperations");
const bcrypt = require("bcryptjs");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
// exports.register = asyncHandler(async (req, res, next) => {
//   const { name, email, password, role } = req.body;

//   // Create the blockchain account
// try {
//   celoAccount = createAccount()
// } catch (error) {
//   return next(new ErrorResponse('Error creating Celo account', 401));
// }

// const publicAddress = celoAccount.address

// //salt the privateKey
//   const salt = await bcrypt.genSalt(10);
//   privateKey = await bcrypt.hash(celoAccount.privateKey, salt);

//   // Create user on the database
//   const user = await User.create({
//     name,
//     email,
//     password,
//     role,
//     publicAddress,
//     privateKey,

//   });

//   // address = web3.eth.accounts.create();

//   // const senderAccount = {
//   //     address: '0xD263C466E6aA620DF49495A6B6A4a8e49496F06C',
//   //     privateKey: '0x18424a8c4a250461b3a6b43b9619f6f32ce3dddc70e68746bf6fa25fa86c2b64'
//   // }

//   // Create token
// const token = user.getSignedJwtToken();

// });

exports.register = asyncHandler(async (req, res, next) => {
  const { name, matricNo, identityNo, email, password, role } = req.body;

  // Create the blockchain account
  try {
    // Encrypt the private key before saving to the database and allow it to be decryptable when needed to be used

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return next(
        new ErrorResponse("A user with this email already exists", 400)
      );
    }

    const celoAccount = await createAccount();

    const address = celoAccount.address;
    const privateKey = celoAccount.privateKey;

    // If not, create the new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      matricNo,
      identityNo,
      address,
      privateKey,
    });

    // Create an object to hold the user info you want to include in the response
    let userResponse = {
      name: user.name,
      email: user.email,
      role: user.role,
      matricNo: user.matricNo,
      address: address,
      // privateKey: privateAddress,
      // Do not include the privateAddress
    };
    user.get;
    const token = user.getSignedJwtToken();

    res.status(200).json({ true: true, token });

    // sendTokenResponse(user, 200, res);
  } catch (error) {
    return next(
      new ErrorResponse(`Error creating Celo account: ${error.message}`, 401)
    );
  }

  //   const publicAddress = celoAccount.address;

  //   // Salt the privateKey
  //   const salt = await bcrypt.genSalt(10);
  //   const privateKey = await bcrypt.hash(celoAccount.privateKey, salt);

  //   // Create user on the database
  //   const user = await User.create({
  //     name,
  //     email,
  //     password,
  //     role,
  //     publicAddress,
  //     privateKey,
  //   });

  // // Create an object to hold the user info you want to include in the response
  // let userResponse = {
  //   name: user.name,
  //   email: user.email,
  //   role: user.role,
  //   publicAddress: user.publicAddress,
  //   // Do not include the privateAddress
  // };

  //   } catch (error) {
  //     // Handle any other errors
  //     // return next(new ErrorResponse('Error registering user', 500));
  //     return next(new ErrorResponse(`${error.message}`, 401));

  //   }
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // const token = user.getSignedJwtToken();

  // res.status(200).json({true: true, token});

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
