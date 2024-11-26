import React from "react";
import { Box, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"; // Icon lửa

const SoldProgressBar = ({ sold, total }) => {
  const percentage = (sold / total) * 100;

  return (
    <Box display="flex" alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        bgcolor="#E30019"
        borderRadius="20px"
        padding="2px 8px"
        marginRight="8px"
      >
        <LocalFireDepartmentIcon
          style={{ color: "white", fontSize: "16px", marginRight: "4px" }}
        />
        <Typography
          variant="body2"
          style={{ color: "white", fontWeight: "bold" }}
        >
          Đã bán: {sold}
        </Typography>
      </Box>
    </Box>
  );
};
export default SoldProgressBar;
