import Room from "../models/roomModel.js";
import Hotel from "../models/hotelModel.js";

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.find(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    try {
      await Hotel.findById(hotelId, { $pull: { rooms: req.params.id } });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const savedRoom = await Room.create(req.body);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (error) {
    next(error);
  }
};
