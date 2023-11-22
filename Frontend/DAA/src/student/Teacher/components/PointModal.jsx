import { Box, Modal } from "@mui/material";
import React from "react";

import PointForm from "./PointForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 500,
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const PointModal = ({ handleClose, open, studentPoints }) => {
  console.log("value: ", studentPoints);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PointForm studentPoint={studentPoints} />
        </Box>
      </Modal>
    </div>
  );
};

export default PointModal;
