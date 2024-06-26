import express from "express";
import { createUser, authUser, forgotPassword } from "../controllers/user.controllers.js";
import { createQuotation, getAllQuotation, getAllQuotationCustomer, getQuotation } from "../controllers/quotation.controllers.js";
import formidable from "express-formidable";
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(authUser);
router.route("/forgot-password").post(forgotPassword);

router.get("/get-quotation/:id", getQuotation);
router.get("/get-quotations/:email", getAllQuotation);
router.get("/get-quotations-customer/:email", getAllQuotationCustomer);
router.post("/create-quotation", formidable(), createQuotation);

export default router;