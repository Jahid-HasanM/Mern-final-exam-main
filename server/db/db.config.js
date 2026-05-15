const mongoose = require('mongoose')
exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connect");
  } catch (error) {
    console.log("Can't Connect DB");
  }
};

