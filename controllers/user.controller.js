import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      const error = new Error("Users not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};
