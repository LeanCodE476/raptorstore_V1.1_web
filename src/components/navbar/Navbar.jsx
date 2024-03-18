import React, { useState } from "react";
import NavListDrawer from "./NavListDrawer";
import { Button, Drawer, Hidden } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = ({handleTypeSelection}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Hidden lgUp>
        {" "}
        <Button
          sx={{
            width: "100%",
            bgcolor: "#E5E7E9",
            height: "2.7rem",
            boxShadow: "0px 4px 7px 0px rgba(0,0,0,0.5)",
            position: "sticky",
            top:'0rem',
            zIndex:'9',
            color: "gray" 
          }}
          onClick={() => setOpen(true)}
        >
          Menu <MenuIcon  />
        </Button>
      </Hidden>

      <Drawer open={open} anchor="top" onClose={() => setOpen(false)}>
        <NavListDrawer handleTypeSelection={handleTypeSelection} setOpen={setOpen}></NavListDrawer>
      </Drawer>
    </>
  );
};

export default Navbar;
