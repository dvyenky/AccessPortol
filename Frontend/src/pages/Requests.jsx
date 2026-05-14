import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import MainLayout from "../components/layout/MainLayout";
import StatusChip from "../components/common/StatusChip";

import api from "../api/axios";

function Requests() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] = useState([]);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const [formData, setFormData] = useState({
    employee_name: user.userId,
    request_title: "",
    access_type: "",
    reason: "",
    priority: "",
    requested_date: "",
  });

  const fetchRequests = async () => {
    try {
      const response = await api.get("/requests");

      let data = response.data;

      if (user.role !== "ADMIN") {
        data = data.filter(
          (r) => r.employee_name === user.userId
        );
      }

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRequest = async () => {
  try {
    const payload = {
      ...formData,
      requested_date: formData.requested_date
        ? formData.requested_date.toString()
        : "",
    };

    await api.post("/requests/", payload);

    setOpen(false);
    fetchRequests();

    setFormData({
      employee_name: user.userId,
      request_title: "",
      access_type: "",
      reason: "",
      priority: "",
      requested_date: "",
    });
  } catch (error) {
    console.log(error);
  }
};

  const handleStatusUpdate = async (
    id,
    status
  ) => {
    try {
      await api.put(`/requests/${id}`, {
        status,
        admin_remarks: `${status} by admin`,
      });

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRequests = requests.filter(
    (request) => {
      const matchesSearch =
        request.employee_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        request.request_title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "" ||
        request.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const paginatedRequests =
    filteredRequests.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Access Requests
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Request
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                select
                label="Filter Status"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <MenuItem value="">
                  All
                </MenuItem>

                <MenuItem value="PENDING">
                  Pending
                </MenuItem>

                <MenuItem value="APPROVED">
                  Approved
                </MenuItem>

                <MenuItem value="REJECTED">
                  Rejected
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell>
                  Employee
                </TableCell>

                <TableCell>
                  Access Type
                </TableCell>

                <TableCell>Status</TableCell>

                <TableCell>
                  Requested Date
                </TableCell>

                {user.role === "ADMIN" && (
                  <TableCell>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRequests.map(
                (request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      #{request.id}
                    </TableCell>

                    <TableCell>
                      {request.employee_name}
                    </TableCell>

                    <TableCell>
                      {request.access_type}
                    </TableCell>

                    <TableCell>
                      <StatusChip
                        status={request.status}
                      />
                    </TableCell>

                    <TableCell>
                      {request.requested_date}
                    </TableCell>

                    {user.role === "ADMIN" && (
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <Button
                            size="small"
                            color="success"
                            variant="contained"
                            onClick={() =>
                              handleStatusUpdate(
                                request.id,
                                "APPROVED"
                              )
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={() =>
                              handleStatusUpdate(
                                request.id,
                                "REJECTED"
                              )
                            }
                          >
                            Reject
                          </Button>
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={Math.ceil(
                filteredRequests.length /
                  rowsPerPage
              )}
              page={page}
              onChange={(e, value) =>
                setPage(value)
              }
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Create Access Request
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Request Title"
                name="request_title"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Access Type"
                name="access_type"
                onChange={handleChange}
              >
                <MenuItem value="VPN Access">
                  VPN Access
                </MenuItem>

                <MenuItem value="Database Access">
                  Database Access
                </MenuItem>

                <MenuItem value="Admin Portal Access">
                  Admin Portal Access
                </MenuItem>

                <MenuItem value="Server Access">
                  Server Access
                </MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Reason"
                name="reason"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Priority"
                name="priority"
                onChange={handleChange}
              >
                <MenuItem value="Low">
                  Low
                </MenuItem>

                <MenuItem value="Medium">
                  Medium
                </MenuItem>

                <MenuItem value="High">
                  High
                </MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Requested Date"
                name="requested_date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreateRequest}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}

export default Requests;