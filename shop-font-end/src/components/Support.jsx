import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Lottie from "lottie-react";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import animationData from "../../public/animation/loading.json";
export const Icon = () => {
  return (
    <div className="w-full  flex justify-center items-center flex-col">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 160, height: 160 }}
      />
    </div>
  );
};

const actions = [
  { icon: <FaYoutube style={{ color: "red" }} />, name: "Youtube" },
  { icon: <FaSquareFacebook style={{ color: "blue" }} />, name: "Facebook" },
];

const Support = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 40,
        right: 40,
        zIndex: 9999,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        direction="up"
        icon={<Icon />}
        sx={{ backgroundColor: "transparent" }}
        FabProps={{
          style: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default Support;
