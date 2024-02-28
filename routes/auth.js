const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/* GET users listing. */
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/", authController.getAll);
router.get("/:email", authController.getByEmail);
router.put("/:email", authController.updateByEmail);
router.delete("/:email", authController.deleteByEmail);

module.exports = router;
