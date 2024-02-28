const invoiceService = require("../services/invoice.service");

module.exports.create = async (req, res, next) => {
  try {
    const lastInvoice = await invoiceService
      .getAll()
      .sort({ _id: -1 })
      .limit(1);
    if (lastInvoice[0]) {
      req.body.invoiceNumber = lastInvoice[0].invoiceNumber + 1;
    } else {
      req.body.invoiceNumber = 1;
    }
    const invoice = await invoiceService.create(req.body);
    return res.status(200).json(invoice);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getAll();
    return res.status(200).json(invoices);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const invoice = await invoiceService.getById(id);
    return res.status(200).json(invoice);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    const invoice = await invoiceService.updateById(req);
    return res.status(200).json(invoice);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const invoice = await invoiceService.deleteById(id);
    return res.status(200).json(invoice);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
