import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);
  const [employees, setEmployees] = useState([]);  // State to store employee data
  const [loading, setLoading] = useState(true);  // State to track loading state
  const [error, setError] = useState(null);  // State to store any errors
  const navigate = useNavigate();

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const result = await response.json();
        setEmployees(result);  // Set the fetched data into state
      } catch (error) {
        setError(error.message);  // Set error message if something goes wrong
      } finally {
        setLoading(false);  // Set loading to false after the request
      }
    };

    fetchEmployees();
  }, []);

  // Handlers for actions
  const handleEdit = (row) => {
    alert(`Edit employee: ${row.f_Name}`);
  };

  const handleDelete = (row) => {
    alert(`Delete employee: ${row.f_Name}`);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "f_Id", header: "Id", size: 80 },
      {
        accessorKey: "f_Image",
        header: "Image",
        Cell: ({ renderedCellValue }) => (
          <img
            src={renderedCellValue}
            alt="Employee"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ),
        enableSorting: false,
        size: 80,
      },
      { accessorKey: "f_Name", header: "Name", size: 150 },
      { accessorKey: "f_Email", header: "Email", size: 200 },
      { accessorKey: "f_Mobile", header: "Mobile No", enableSorting: false, size: 120 },
      { accessorKey: "f_Designation", header: "Designation", enableSorting: false, size: 150 },
      { accessorKey: "f_gender", header: "Gender", enableSorting: false, size: 100 },
      { accessorKey: "f_Course", header: "Course", enableSorting: false, size: 100 },
      {
        accessorKey: "f_Createdate",
        header: "Create Date",
        Cell: ({ renderedCellValue }) =>
          new Date(renderedCellValue).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        size: 120,
      },
      {
        accessorKey: "actions",
        header: "Action",
        Cell: ({ row }) => (
          <>
            <IconButton onClick={() => handleEdit(row.original)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.original)}>
              <DeleteIcon color="error" />
            </IconButton>
          </>
        ),
        enableSorting: false,
        size: 150,
      },
    ],
    []
  );

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPageIndex(newPage - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h3>Employee List</h3>
        <div className="dtop">
          <span>Total count = {employees.length}</span>
          <button className="btn btn-primary p-3" onClick={() => { navigate('/create') }}>Create Employee</button>
        </div>
        <MaterialReactTable
          columns={columns}
          data={employees}
          enableSorting
          enablePagination={false}
          initialState={{ pagination: { pageSize: pageSize, pageIndex: pageIndex } }}
          localization={{
            toolbarSearchPlaceholder: "Search for keyword",
            toolbarSearchTooltip: "Search for a specific keyword",
          }}
          muiTableContainerProps={{
            sx: {
              maxHeight: "calc(100vh - 180px)",
              overflowY: "auto",
              width: "100%",
            },
          }}
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
              width: "100%",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              wordWrap: "break-word",
            },
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Pagination
              count={Math.ceil(employees.length / pageSize)}
              page={pageIndex + 1}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
