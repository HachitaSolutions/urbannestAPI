const UserRepository = require("./repository/user-repository");

//Database modules
module.exports = {
    databaseConnection: require("./connection"),
    UserRepository
}