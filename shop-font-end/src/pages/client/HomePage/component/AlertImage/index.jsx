import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useEffect, useState } from "react";

const imageUrl = "/public/images/alertanh.webp";

const AlertImage = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("alertImageClosed", "true"); // Lưu trạng thái đã đóng vào localStorage
  };

  //   useEffect(() => {
  //     const isAlertImageClosed = localStorage.getItem("alertImageClosed");
  //     if (isAlertImageClosed === "true") {
  //       setOpen(false);
  //     }
  //   }, []); // Sử dụng useEffect để kiểm tra trạng thái khi component được mount

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperComponent={(props) => <div {...props} />}
    >
      <DialogActions>
        <CancelIcon onClick={handleClose} color="primary" />
      </DialogActions>
      <DialogContent className="text-center">
        <img src={imageUrl} alt="" className="mt-4 mx-auto w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default AlertImage;
