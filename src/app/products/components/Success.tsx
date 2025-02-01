import { Alert, Snackbar } from "@mui/material";

const SuccessAlert = ({
  open,
  msg,
  severity,
  handleClose,
}: {
  open: Boolean;
  severity: string;
  msg: string;
  handleClose: () => void;
}) => {
  return (
    <Snackbar
      open={open as boolean}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity as any} variant="filled" sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
