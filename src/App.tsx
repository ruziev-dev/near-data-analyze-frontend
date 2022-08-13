import { Box } from "@mui/material";
import { Header } from "./components/header/Header";
import { MainArea } from "./components/main/MainArea";
import { SideBar } from "./components/sidebar/SideBar";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { store } from "./store/store";

function App() {
  useEffect(() => {
    store.initializeApp();
  }, []);
  return (
    <div>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 1,
          padding: 1,
          gridTemplateRows: "auto",
          gridTemplateAreas: `
          "sidebar main main main main"
          "footer footer footer footer footer"`,
        }}
      >
        <Box sx={{ gridArea: "main" }}>
          <MainArea />
        </Box>
        <Box sx={{ gridArea: "sidebar" }}>
          <SideBar />
        </Box>
      </Box>
    </div>
  );
}

export default observer(App);
