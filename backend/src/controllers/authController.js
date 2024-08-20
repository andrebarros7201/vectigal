const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const validateUserSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Enter a username")
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          username: value,
        },
      });

      if (user) {
        throw new Error("User already exists.");
      }

      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Enter a email")
    .isEmail()
    .withMessage("Enter a valid email")
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          email: value,
        },
      });

      if (user) {
        throw new Error("Email already registered.");
      }

      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Enter a password")
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit"),
  body("confirm-password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

exports.signUp = [
  validateUserSignUp,
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      // Hash the password
      bcrypt.hash(password, 12, async (err, hash) => {
        if (err) {
          return res.sendStatus(500);
        }

        // Create the user in the database
        const user = await prisma.user.create({
          data: {
            username: username,
            email: email,
            password: hash,
          },
        });

        // Send the response
        res.status(201).json({ message: "User created", user });
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }),
];

const validateUserLogIn = [
  body("username").trim().notEmpty().withMessage("Username cannot be empty."),
  body("password").trim().notEmpty().withMessage("Password cannot be empty."),
];

exports.logIn = [
  validateUserLogIn,
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { username }, // Assuming 'username' is the unique field in your Prisma schema
      });

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Incorrect username/password combination." });
      }

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
          }
          res.cookie("jwt_token", token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
          });

          return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: payload,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }),
];
