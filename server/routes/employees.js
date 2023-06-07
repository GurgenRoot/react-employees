const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const { getAllEmployees, addEmployee, removeEmployee, editEmployee, getEmployee } = require('../controllers/employees');

router.get('/', auth, getAllEmployees);

router.get('/:id', auth, getEmployee);

router.delete('/remove/:id', auth, removeEmployee);

router.post('/add', auth, addEmployee);

router.put('/edit/:id', auth, editEmployee);

module.exports = router;
