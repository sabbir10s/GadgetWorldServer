const Products = require("../models/Products.model");

module.exports.create = (products) => {
  return Products.create(products);
};

module.exports.getAll = () => {
  return Products.find();
};

module.exports.getById = (products) => {
  return Products.findById(products);
};

module.exports.updateById = (products) => {
  const id = products.params.id;
  const update = products.body;
  const option = { new: true };
  return Products.findByIdAndUpdate(id, update, option);
};

module.exports.deleteById = (products) => {
  return Products.findByIdAndDelete(products);
};
