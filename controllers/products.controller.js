const productsService = require("../services/products.service");

module.exports.create = async (req, res, next) => {
  try {
    const product = await productsService.create(req.body);
    return res.status(200).json(product);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productsService.getById(id);
    return res.status(200).json(product);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    const product = await productsService.updateById(req);
    return res.status(200).json(product);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productsService.deleteById(id);
    return res.status(200).json(product);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
