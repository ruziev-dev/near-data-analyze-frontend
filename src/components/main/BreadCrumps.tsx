import { Link, Typography } from "@mui/material";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { store, WINDOW } from "../../store/store";

type Props = {
  middleLevelKey: WINDOW;
  entityId: string;
};

export const BreadCrumps: React.FC<Props> = ({ middleLevelKey, entityId }) => {
  if (middleLevelKey === WINDOW.BASE) return null;
  return (
    <div className="card-body">
      <Breadcrumbs separator="›" aria-label="breadcrumbs" size="md">
        {["Home", middleLevelKey].map((item: string) => (
          <Link
            onClick={
              item === "Home" ? (event: any) => store.onPressHome() : () => {}
            }
            key={item}
            underline="hover"
            color="neutral"
            fontSize="inherit"
          >
            {item}
          </Link>
        ))}
        <Typography fontSize="inherit">{entityId}</Typography>
      </Breadcrumbs>
    </div>
  );
};
