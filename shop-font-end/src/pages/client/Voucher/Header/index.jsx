import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const HeaderVoucher = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const navLinks = [
    { label: "Hệ thống Showroom", href: "#showroom" },
    { label: "Trả góp", href: "#installment" },
    { label: "Bảo hành", href: "#warranty" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar className="md:container mx-auto flex justify-between items-center p-4 w-full md:w-[80%]">
          <Box className="flex items-center">
            <img
              src="/images/voucher/logo-02-20200903083638.svg"
              alt="GEARVN Logo"
              className="h-11 mr-4 w-[152px]"
            />
          </Box>

          <Box className="hidden md:flex space-x-8 gap-8 text-[14px] md:text-[16px]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-black font-bold hover:text-red-500"
              >
                {link.label}
              </a>
            ))}
          </Box>

          {/* Hotline for Desktop (unchanged) */}
          <Box className="hidden md:flex items-center">
            <a
              href="tel:19005301"
              className="flex items-center border-2 border-red-500 text-red-500 font-bold px-4 py-2 rounded-full hover:bg-red-100"
            >
              <span className="mr-2">☎</span> Hotline: 1900 5301
            </a>
          </Box>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="md:hidden"
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem component="a" href={link.href} key={link.label}>
                {link.icon}
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderVoucher;
