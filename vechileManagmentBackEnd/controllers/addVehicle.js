const Vehicles = require('../models/vehicleModels');

const addVehicle = async (req, res) => {
  try {
    const {
      model,
      year,
      vin,
      registrationDate,
      isActive,
      mileage,
      fuelType,
      color,
      price
    } = req.body;

    // Create a new vehicle instance
    const newVehicle = new Vehicles({
      model,
      year,
      vin,
      registrationDate,
      isActive,
      mileage,
      fuelType,
      color,
      price
    });

    // Save the vehicle to the database
    const savedVehicle = await newVehicle.save();

    res.status(201).json({
      message: 'Vehicle added successfully.',
      data: savedVehicle
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate VIN error
      res.status(409).json({
        message: 'Vehicle with this VIN already exists.'
      });
    } else {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while adding the vehicle.' });
    }
  }
};

module.exports = { addVehicle };
