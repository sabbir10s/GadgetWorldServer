const Invoice = require("../models/Invoice.model");

module.exports.create = (invoice) => {
  return Invoice.create(invoice);
};

module.exports.getAll = () => {
  return Invoice.find();
};

module.exports.getById = (invoice) => {
  return Invoice.findById(invoice);
};

module.exports.updateById = (invoice) => {
  const id = invoice.params.id;
  const update = invoice.body;
  const option = { new: true };
  return Invoice.findByIdAndUpdate(id, update, option);
};

module.exports.deleteById = (invoice) => {
  return Invoice.findByIdAndDelete(invoice);
};
