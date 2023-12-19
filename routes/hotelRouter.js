import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotelController.js";

const router = express.Router();

//Create hotel
router.post("/", createHotel);

//Update hotel
router.put("/:id", updateHotel);

// Delete hotel
router.delete("/:id", deleteHotel);

// Get hotel
router.get("/find/:id", getHotel);

// Get all hotels
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
