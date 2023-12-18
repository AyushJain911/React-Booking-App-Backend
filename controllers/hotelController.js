import hotel from "../models/hotelModel.js";

export const createHotel = async (req, res, next) => {
  try {
    const savehotel = await hotel.create(req.body);
    return res.status(200).json(savehotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHotel = await hotel.findByIdAndUpdate(
      id,
      // { $set: req.body }, //This is query parameter
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ data: updatedHotel, message: "Hotel has been updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const singleHotel = await hotel.findById(req.params.id);
    res.status(200).json(singleHotel);
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
