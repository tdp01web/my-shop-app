import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Lottie from "lottie-react";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import animationData from "../../src/animation/loading.json"
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
  {
    icon: <FaYoutube style={{ color: "red" }} />,
    name: "Youtube",
    link: "https://www.youtube.com/@smartcomputer-hn",
  },
  {
    icon: <FaSquareFacebook style={{ color: "blue" }} />,
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61565853103540",
  },
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
            onClick={() => {
              window.open(action.link, "_blank");
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default Support;
