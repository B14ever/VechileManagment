const Vehicles = require('../models/vehicleModels');
const deleteVehicle = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedVehicle = await Vehicles.findByIdAndDelete(id);
  
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found.' });
      }
  
      res.status(200).json({
        message: 'Vehicle deleted successfully.',
        data: deletedVehicle
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the vehicle.' });
    }
  };
  
  module.exports = {deleteVehicle };