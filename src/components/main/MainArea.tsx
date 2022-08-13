import { Box } from "@mui/material";
import { BreadCrumps } from "./BreadCrumps";
import { store, WINDOW } from "../../store/store";
import { observer } from "mobx-react-lite";
import { Pool } from "./pool/Pool";
import { Epoch } from "./epoch/Epoch";
import { Base } from "./base/Base";

export const MainArea = observer(() => {
  let entityId = "";
  switch (store.currentView) {
    case WINDOW.EPOCH:
      entityId = store.selectedEpoch?.ID || "";
      break;
    case WINDOW.POOL:
      entityId = store.selectedPool || "";
      break;
  }
  return (
    <div className="card">
      <Box sx={{ height: "90vh" }}>
        {store.isFetch ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </Box>
        ) : (
          <>
            <BreadCrumps
              middleLevelKey={store.currentView}
              entityId={entityId}
            />
            <ContentProxy currentView={store.currentView} />
          </>
        )}
      </Box>
    </div>
  );
});

const ContentProxy = ({ currentView }: { currentView: WINDOW }) => {
  switch (currentView) {
    case WINDOW.EPOCH:
      return <Epoch />;
    case WINDOW.POOL:
      return <Pool />;
    default:
      return <Base />;
  }
};
