const Vehicles = require('../models/vehicleModels');
const viewVehicles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  const skip = (page - 1) * limit;
 
  try {
   
    const vehicles = await Vehicles.find()
      .skip(skip)
      .limit(parseInt(limit));

   
    const totalCount = await Vehicles.countDocuments();

    res.status(200).json({
      message: 'Vehicles retrieved successfully.',
      data: vehicles,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving vehicles.' });
  }
};
  
  
  module.exports = { viewVehicles};
  