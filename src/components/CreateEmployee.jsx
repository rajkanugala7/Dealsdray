import React, { useState } from "react";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate input fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be numeric.";
    }
    if (!formData.designation) newErrors.designation = "Designation is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.courses.length) newErrors.courses = "Select at least one course.";
    if (!formData.image) newErrors.image = "Image URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      console.log("value", value)
    setFormData({
      ...formData,
      courses: checked
        ? [...formData.courses, value]
        : formData.courses.filter((course) => course !== value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Build payload
        const payload = {
          f_Name: formData.name,
          f_Email: formData.email,
          f_Mobile: formData.mobile,
          f_Designation: formData.designation,
          f_gender: formData.gender, // Ensure 'Male' or 'Female'
          f_Course: formData.courses.join(", "), // Join courses as a string
          f_Image: formData.image, // Directly use the text input value
        };
       console.log("payload :" , payload)
        const response = await fetch("http://localhost:8080/api/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to create employee");
        }

        const result = await response.json();
        alert("Employee created successfully!");
        console.log("Response:", result);

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          courses: [],
          image: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error creating employee:", error);
        alert("Failed to create employee. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile No</label>
          <input
            type="text"
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>

        {/* Designation */}
        <div className="mb-3">
          <label htmlFor="designation" className="form-label">Designation</label>
          <select
            className={`form-select ${errors.designation ? "is-invalid" : ""}`}
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="Male"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="Female"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        {/* Courses */}
        <div className="mb-3">
          <label className="form-label">Courses</label>
          <div>
            {["MCA", "BCA", "BSC"].map((course) => (
              <div className="form-check form-check-inline" key={course}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={course}
                  value={course}
                  checked={formData.courses.includes(course)}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={course}>{course}</label>
              </div>
            ))}
          </div>
          {errors.courses && <div className="text-danger">{errors.courses}</div>}
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        </div>

        {/* Submit */}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
