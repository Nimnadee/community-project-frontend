import { Box, IconButton, Modal, ModalProps, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

const PopUp = ({
  heading,
  children,
  handleClose,
  ...props
}: { heading: string; handleClose: () => void; children: ReactNode } & ModalProps) => {
  return (
    <Modal {...props} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ p: 3, maxWidth: 800, width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">{heading}</Typography>
          <IconButton sx={{ width: "fit-content" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={2}>{children}</Box>
      </Paper>
    </Modal>
  );
};

export default PopUp;
