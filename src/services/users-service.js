const { UserRepository } = require("../database");
const { APIError } = require("../utils/app-errors");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  async SignUp(userParams) {
    const { name, email, password, phone } = userParams;
    try {
      const existingUser = await this.repository.FindUser({ email });
      if (existingUser) {
        return FormateData({
          message: `User with ${email} is already exists!!!`,
          status: "failed",
        });
      } else {
        //create salt
        const salt = await GenerateSalt();
        const userPassword = await GeneratePassword(password, salt);
        const result = this.repository.CreateUser({
          name,
          email,
          password: userPassword,
          phone,
          salt,
        });
        const token = await GenerateSignature({
          email: email,
          _id: result._id,
        });
        return FormateData({
          message: "User Registration is Successful",
          status: "success",
          token,
          id: (await result)._id,
        });
      }
    } catch (error) {
      throw new APIError("User Not Found", error);
    }
  }
  async SignIn(userParams) {
    const { email, password } = userParams;
    try {
      const existingUser = await this.repository.FindUser(email);
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );
        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
          });
          return FormateData({
            id: existingCustomer._id,
            token,
            name: existingUser.name,
          });
        }
      } else {
        return FormateData({
          message: "User does not exists!!!",
          status: "success",
          token,
          id: (await result)._id,
        });
      }
    } catch (error) {
      throw new APIError("Invalid User Email/Password", error);
    }
  }
}

module.exports = UserService;
