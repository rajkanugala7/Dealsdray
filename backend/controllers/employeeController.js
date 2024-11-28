const Employee = require('../models/EmployeeSchema'); // Path to your Employee model

// Fetch all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
};

// Add new employee
exports.addEmployee = async (req, res) => {
    console.log("body : ",req.body);
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Image } = req.body;

  // Basic input validation (you can extend this with more checks if needed)
  if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newEmployee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image,
    });

    console.log("Creating new employee:", newEmployee);
    const savedEmployee = await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: savedEmployee });
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ message: 'Error adding employee', error: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Image } = req.body;

  if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Image },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: 'Error updating employee', error: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
};
