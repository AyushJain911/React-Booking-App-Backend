import express from "express";
import { verifyUser, verifyAdmin } from "../utils/VerifyToken.js";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

router.get("/", verifyAdmin, getUsers);

export default router;
