import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

const RequestDetailsModal = ({
  open,
  onClose,
  request,
  refreshData,
  user,
}) => {
  const [remarks, setRemarks] = useState(
    request?.adminRemarks || ""
  );

  if (!request) return null;

  const updateRequestStatus = (status) => {
    const allRequests =
      JSON.parse(localStorage.getItem("requests")) ||
      [];

    const updatedRequests = allRequests.map((req) => {
      if (req.id === request.id) {
        return {
          ...req,

          status,

          adminRemarks: remarks,

          history: [
            ...req.history,

            {
              action: `Request ${status}`,

              performedBy: user.name,

              timestamp:
                new Date().toISOString(),
            },
          ],
        };
      }

      return req;
    });

    localStorage.setItem(
      "requests",
      JSON.stringify(updatedRequests)
    );

    refreshData();

    onClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";

      case "REJECTED":
        return "error";

      default:
        return "warning";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Request Details
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <Box>

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              {request.title}
            </Typography>

            <Chip
              label={request.status}
              color={getStatusColor(
                request.status
              )}
              sx={{
                mt: 1,
              }}
            />

          </Box>

          <Divider />

          <Stack spacing={2}>

            <Typography>
              <strong>Request ID:</strong>{" "}
              {request.id}
            </Typography>

            <Typography>
              <strong>Employee:</strong>{" "}
              {request.employeeName}
            </Typography>

            <Typography>
              <strong>Access Type:</strong>{" "}
              {request.accessType}
            </Typography>

            <Typography>
              <strong>Priority:</strong>{" "}
              {request.priority}
            </Typography>

            <Typography>
              <strong>Requested Date:</strong>{" "}
              {request.requestedDate}
            </Typography>

            <Typography>
              <strong>Reason:</strong>{" "}
              {request.reason}
            </Typography>

          </Stack>

          <Divider />

          <Box>

            <Typography
              variant="h6"
              mb={2}
            >
              Activity Timeline
            </Typography>

            <Stack spacing={2}>

              {request.history?.map(
                (item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor:
                        "#f5f5f5",
                    }}
                  >

                    <Typography
                      fontWeight="600"
                    >
                      {item.action}
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      By:{" "}
                      {item.performedBy}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {new Date(
                        item.timestamp
                      ).toLocaleString()}
                    </Typography>

                  </Box>
                )
              )}

            </Stack>

          </Box>

          {user.role === "ADMIN" &&
            request.status ===
              "PENDING" && (
              <>

                <Divider />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Admin Remarks"
                  value={remarks}
                  onChange={(e) =>
                    setRemarks(
                      e.target.value
                    )
                  }
                />

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                >

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      updateRequestStatus(
                        "REJECTED"
                      )
                    }
                  >
                    Reject
                  </Button>

                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      updateRequestStatus(
                        "APPROVED"
                      )
                    }
                  >
                    Approve
                  </Button>

                </Stack>

              </>
            )}

        </Stack>

      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsModal;