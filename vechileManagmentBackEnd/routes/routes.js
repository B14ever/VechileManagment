const express = require('express');
const router = express.Router();
const {viewVehicles} = require('../controllers/viewVehicle'); 
const {addVehicle} = require('../controllers/addVehicle'); 
const {editVehicle} = require('../controllers/editVehicle'); 
const {deleteVehicle} = require('../controllers/deleteVehicle'); 

router.post('/add', addVehicle);
router.put('/edit/:id', editVehicle);
router.delete('/delete/:id', deleteVehicle);
router.get('/view', viewVehicles);


module.exports = router;