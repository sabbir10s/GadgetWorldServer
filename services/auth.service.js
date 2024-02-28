const Auth = require("../models/auth.model");

module.exports.createUser = (userInfo) => {
  return Auth.create(userInfo);
};

module.exports.findUserByEmail = (email) => {
  return Auth.findOne({ email: email });
};

module.exports.getAll = () => {
  return Auth.find();
};

module.exports.updateByEmail = (params, body) => {
  const email = { email: params.email };
  const update = body;
  const option = { new: true };
  return Auth.findOneAndUpdate(email, update, option);
};

module.exports.deleteByEmail = (email) => {
  return Auth.findOneAndDelete({email: email});
};