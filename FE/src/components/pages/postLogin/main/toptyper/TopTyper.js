import { useAuth } from "../../../../auth/authcontext/AuthContext";
import { useTranslation } from "react-i18next";

import "./toptyper.css";

function TopTyper(props) {
  const { t } = useTranslation();
  const { leadersData } = props;
  const { darkMode } = useAuth();
  const topTyper =
    leadersData && leadersData.length > 0 ? leadersData[0] : null;

  return leadersData && leadersData.length > 0 ? (
    <div className={`panel-side-box ${darkMode && "darkmode-on"}`}>
      <h2 className="panel-header">
        {t("panelTopTyper.headerA")}{" "}
        <span className="span-brand">{t("panelTopTyper.headerB")}</span>{" "}
      </h2>
      <div className="top-typer">
        <img
          src={`http://74.234.50.115:5000/api/v1/avatar/${topTyper.avatar}`}
          alt=""
          className="avatar top-typer-avatar"
          height={110}
          width={110}
        />
        <p className="top-typer-name">{topTyper.name}</p>
        <p>
          {t("panelTopTyper.points")}: {topTyper.points}
        </p>
        <p>
          {t("panelTopTyper.wins")}: {topTyper.rating.wins}
        </p>
        <p>
          {t("panelTopTyper.rating")}: {topTyper.rating.rating}%
        </p>
      </div>
    </div>
  ) : null;
}

export default TopTyper;
