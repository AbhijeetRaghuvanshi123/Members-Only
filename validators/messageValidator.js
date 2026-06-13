import { body } from "express-validator";

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters.")
    .matches(/[a-zA-Z0-9]/)
    .withMessage("Title must contain at least one letter or number.")
    .escape(),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content is required.")
    .isLength({ min: 10, max: 5000 })
    .withMessage("Message must be between 10 and 5000 characters.")
    .escape(),
];

export default validateMessage;