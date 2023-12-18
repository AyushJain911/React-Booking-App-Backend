import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  getRooms,
  getRoom,
  deleteRoom,
  createRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/:id", getRooms);
router.get("/:id", getRoom);
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
router.post("/:hotelId", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.put("/:availability/:id", updateRoomAvailability);

export default router;
