const Vehicles = require('../models/vehicleModels');
const editVehicle = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedVehicle = await Vehicles.findByIdAndUpdate(id, updateData, {
        new: true, 
        runValidators: true 
      });
  
      if (!updatedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found.' });
      }
  
      res.status(200).json({
        message: 'Vehicle updated successfully.',
        data: updatedVehicle
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the vehicle.' });
    }
  };
  
  module.exports = { editVehicle };