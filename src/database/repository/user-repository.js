const { UserModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");
class UserRepository {
  async CreateUser({ name, email, password, phone, salt }) {
    try {
      const user = await UserModel({
        name,
        email,
        phone,
        password,
        salt,
        wishList: [],
        isAdmin: false,
      });
      const userResult = user.save();
      return userResult;
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create User"
      );
    }
  }

  async FindUser({ email }) {
    const existingUser = await UserModel.findOne({ email: email });
    return existingUser;
  }
}
module.exports = UserRepository;
