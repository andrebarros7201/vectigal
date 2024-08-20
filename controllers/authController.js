const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");

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
        throw new Error("User already exists.");
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
