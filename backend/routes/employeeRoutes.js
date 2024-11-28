const express = require('express');
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

const router = express.Router();

// Fetch all employees
router.get('/employees', getEmployees);

// Add new employee
router.post('/employee', addEmployee);

// Update employee
router.put('/employee/:id', updateEmployee);

// Delete employee
router.delete('/employee/:id', deleteEmployee);

module.exports = router;
