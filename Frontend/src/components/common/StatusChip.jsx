import { Chip } from "@mui/material";

function StatusChip({ status }) {
  const getColor = () => {
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
    <Chip
      label={status}
      color={getColor()}
      size="small"
    />
  );
}

export default StatusChip;