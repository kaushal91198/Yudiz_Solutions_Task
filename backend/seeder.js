
const users = require("./data/sampleUserData");
const userModel = require("./models/User");
const colors = require("colors");

const importData = async () => {
  try {
    const createUser = await userModel.insertMany(users);
    console.log(colors.blue("Data inserted in database."));
  } catch (error) {
    console.log(colors.red(error));
  }
};

const destroyData = async () => {
  try {
    await userModel.deleteMany();
    console.log(colors.blue('Data deleted successfully in database.'))
  } catch (error) {
    console.log(colors.red(error));
  }
};

module.exports = { importData, destroyData };
