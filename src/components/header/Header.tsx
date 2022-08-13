import { observer } from "mobx-react-lite";
import { store } from "../../store/store";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Header = observer(() => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div>
          <p className="navbar-brand mb-0">Near Data Analizer</p>

          <a
            href="https://github.com/ruziev-dev"
            className="badge badge-primary text-wrap text-decoration-none"
          >
            <GitHubIcon /> Timur Ruziev
          </a>
        </div>
        <p className="text-monospace navbar-brand text-uppercase badge badge-primary text-wrap">
          {store.baseInfo?.network}
        </p>
      </div>
    </nav>
  );
});
