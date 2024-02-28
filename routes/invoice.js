const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");

/* GET users listing. */
router.post("/", invoiceController.create);
router.get("/", invoiceController.getAll);
router.get("/:id", invoiceController.getById);
router.put("/:id", invoiceController.updateById);
router.delete("/:id", invoiceController.deleteById);

module.exports = router;
