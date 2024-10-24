const UserService = require("../services/users-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new UserService();
  app.post("/user/signup", async (req, res, next) => {
    try {
      const { name, email, password, phone } = req.body;
      const { data } = await service.SignUp({
        name,
        email,
        password,
        phone,
      });
      res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/user/signin", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.SignIn({
        email,
        password
      });
      res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
