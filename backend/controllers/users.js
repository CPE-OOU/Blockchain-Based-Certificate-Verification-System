const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const UserModel = require("../model/User");

// getUsers,
// getUser,
// createUser,
// updateUser,
// deleteUser

// @desc    Get all Users
// @route   Get /api/v1/Users
// @access  Public
// exports.getUsers = (req, res, next) => {
//     res
//         .status(200)
//         .json({success:true, msg: 'get all Users'});
// }

exports.getUsers = asyncHandler(async (req, res, next) => {
  const Users = await UserModel.find();

  res.status(200).json({ success: true, count: Users.length, data: Users });
});

// @desc    Get all User
// @route   Get /api/v1/Users/:id
// @access  Public
// exports.getUser = (req, res, next) => {
//     res
//         .status(200)
//         .json({success:true, msg: `get User ${req.params.id}` });
// }
exports.getUser = asyncHandler(async (req, res, next) => {
  const User = await UserModel.findById(req.params.id);
  if (!User) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: User });
});

// @desc    Create new User
// @route   POST /api/v1/Users/:id
// @access  Private
// exports.createUser = (req, res, next) => {
//     res
//         .status(200)
//         .json({success:true, msg: 'Create new User'});
// }
exports.createUser = asyncHandler(async (req, res, next) => {
  const User = await UserModel.create(req.body);
  //   const User = await req.body;

  res.status(201).json({
    sucess: true,
    data: User,
  });
});

// @desc    Update all User
// @route   PUT /api/v1/Users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const User = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!User) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: User });
});

// @desc    Delate all User
// @route   PUT /api/v1/Users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const User = await UserModel.findByIdAndDelete(req.params.id);

  if (!User) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: {} });
});
