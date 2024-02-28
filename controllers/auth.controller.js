const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

hashPassword = (password, saltRound) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

module.exports.register = async (req, res, next) => {
  try {
    const userFind = await authService.findUserByEmail(req.body.email);
    if (userFind) {
      res.status(500).json({
        message: "already use this mail!",
      });
    } else {
      const { body } = req;
      const saltRound = bcrypt.genSaltSync(10);
      body.password = await hashPassword(body.password, saltRound);
      const userData = {
        name: body.name,
        email: body.email,
        role: "user",
        password: body.password,
      };
      const user = await authService.createUser(userData);
      const userObj = JSON.parse(JSON.stringify(user));
      delete userObj.password;

      const token = await jwt.sign(
        {
          data: userObj,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        error: false,
        data: null,
        token: token,
        message: "registration completed",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) reject(err);
      resolve(match);
    });
  });
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await authService.findUserByEmail(req.body.email);
    const matchPassword = await comparePassword(
      req.body.password,
      user.password
    );
    if (!matchPassword) {
      return res.status(400).json({
        error: false,
        data: null,
        token: null,
        message: "User credentials didn't matched",
      });
    }
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign(
      {
        data: userObj,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "login successful",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const registers = await authService.getAll();
    return res.status(200).json(registers);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const register = await authService.findUserByEmail(email);
    return res.status(200).json(register);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.updateByEmail = async (req, res, next) => {
  try {
    const { params, body } = req;
    if (body.password) {
      const saltRound = bcrypt.genSaltSync(10);
      body.password = await hashPassword(body.password, saltRound);
    }
    const updateRegister = await authService.updateByEmail(params, body);
    return res.status(200).json(updateRegister);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.deleteByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const deleteEmail = await authService.deleteByEmail(email);
    return res.status(200).json(deleteEmail);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};