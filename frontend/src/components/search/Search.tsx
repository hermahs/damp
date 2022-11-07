import {
  Box,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useStores } from "../../hooks";

export const Search = observer(() => {
  const [searchString, setSearchString] = useState<string>("");
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const helperRef = useRef<HTMLDivElement>(null);

  const { store } = useStores();

  const handleOpenHelper = () => {
    setOpenHelper(true);
  };

  const handleCloseHelper = () => {
    setOpenHelper(false);
  };

  const handleClickOpen = () => {
    setOpenHelper(!openHelper);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    store.dataStore.setSearchString(event.target.value);
    store.dataStore.reloadData();
  };

  return (
    <Box sx={{ my: 1, width: 1, display: "flex", flexDirection: "row" }}>
      <TextField
        data-testid="searchBox"
        sx={{ flexGrow: 1 }}
        value={searchString}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <Typography
              sx={{ width: "fit-content" }}
              ref={helperRef}
              onClick={handleClickOpen}
              onMouseEnter={handleOpenHelper}
              onMouseLeave={handleCloseHelper}
            >
              <HelpOutlineIcon />
            </Typography>
          ),
        }}
        label="search"
      />
      <Popover
        id="search-helper"
        sx={{ pointerEvents: "none" }}
        open={openHelper}
        anchorEl={helperRef.current}
        onClose={handleCloseHelper}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography variant="body2" sx={{ p: 2 }} onClick={handleCloseHelper}>
          You can search by game name, developer, or publisher
        </Typography>
      </Popover>
    </Box>
  );
});
