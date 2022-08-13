import { Box, IconButton, List, ListItemButton } from "@mui/material";
import { ListItemContent } from "@mui/joy";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import { store } from "../../store/store";
import { observer } from "mobx-react-lite";

export const SideBar = observer(() => {
  const [filterText, setFilter] = useState("");
  let pools = store?.baseInfo?.pools.filter((pool) => {
    if (!filterText) return true;
    else return pool.POOLNAME.includes(filterText);
  });

  return (
    <Box>
      <div className="card overflow-auto">
        <List component="nav" sx={{ height: "90vh" }}>
          <ListItemContent
            sx={{ padding: 1, display: "flex", flexDirection: "row" }}
          >
            <input
              value={filterText}
              onChange={({ target }) => setFilter(target.value)}
              type="text"
              className="form-control"
              placeholder="Type here to find validator node"
            />

            <IconButton
              aria-label="delete"
              sx={{ marginLeft: 1 }}
              onClick={() => setFilter("")}
            >
              <CloseOutlinedIcon fontSize="inherit" />
            </IconButton>
          </ListItemContent>
          {pools?.map(({ POOLNAME }) => (
            <ListItemButton
              key={POOLNAME}
              onClick={() => store.onSelectValidator(POOLNAME)}
            >
              {POOLNAME}
            </ListItemButton>
          ))}
        </List>
      </div>
    </Box>
  );
});
