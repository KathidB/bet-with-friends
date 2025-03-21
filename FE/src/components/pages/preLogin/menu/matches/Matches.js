import { useEffect, useState } from "react";
import { useAuth } from "../../../../auth/authcontext/AuthContext";
import { useTranslation } from "react-i18next";

function Matches() {
  const { t } = useTranslation();
  const [matchesData, setMatchesData] = useState([]);
  const [competitionsList, setCompetitionsList] = useState([]);
  const [currentCompetition, setCurrentCompetition] = useState(2001);

  const { ipMan } = useAuth();

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const competitionsResponse = await fetch(
          `http://74.234.50.115:5000/api/v1/competetition`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Total-Count": "true",
            },
          }
        );
        if (competitionsResponse.ok) {
          const competitionsData = await competitionsResponse.json();
          setCompetitionsList(competitionsData);
          // zamiana bo w euro nie ma jeszcze meczy a jest na 1 miejscu w tabeli wiec jest pusta domyślnie.
          // competitionsData.reverse()

          // Sprawdź, czy Champions League jest w dostępnych konkurencjach
        } else {
          console.error("Błąd podczas pobierania danych");
        }
      } catch (error) {
        console.error("Błąd podczas wysyłania żądania:", error);
      }
    };

    getCompetitions();
  }, [ipMan]);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const pubMatchesResponse = await fetch(
          `http://74.234.50.115:5000/api/v1/matches?competetition=${currentCompetition}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Total-Count": "true",
            },
          }
        );

        if (pubMatchesResponse.ok) {
          const matchesInfo = await pubMatchesResponse.json();
          setMatchesData(matchesInfo);
        } else {
          console.error(
            "Błąd podczas pobierania danych:",
            pubMatchesResponse.status
          );
        }
      } catch (error) {
        console.error("Błąd podczas wysyłania żądania:", error.message);
      }
    };

    getMatches();
  }, [ipMan, currentCompetition]);

  const handleCompetitionChange = (competitionId) => {
    setCurrentCompetition(competitionId);
  };

  return (
    <section className="app-wrap">
      <h2 className="section-title">
        {" "}
        {t("matches.headerA")}{" "}
        <span className="span-brand"> {t("matches.headerB")}</span>{" "}
      </h2>

      <p>{t("matches.info")}</p>

      <div className="competition-buttons">
        {competitionsList.map((competition) => (
          <button
            key={competition.public_id}
            className={`competition-btn ${
              currentCompetition === competition.public_id
                ? "active-schedule"
                : ""
            }`}
            onClick={() => handleCompetitionChange(competition.public_id)}
          >
            <img width={50} height={50} src={competition.emblem} alt="" />
            <span>{competition.name}</span>
          </button>
        ))}
      </div>

      <table className="schedule-table">
        <thead>
          <tr>
            <th className="crest"></th>
            <th> {t("matches.host")}</th>
            <th> {t("matches.result")}</th>
            <th> {t("matches.guest")}</th>
            <th className="crest"></th>
            <th className="crest"> {t("matches.date")}</th>
          </tr>
        </thead>
        <tbody>
          {matchesData.map((match) => (
            <tr key={match.score.public_id}>
              <td className="crest">
                <img
                  width={25}
                  height={25}
                  src={match.home_team.crest}
                  alt=""
                />
              </td>
              <td>{match.home_team.short_name}</td>
              <td>{match.score.full_time.replace("-", " - ") ?? "TBD"}</td>

              <td>{match.away_team.short_name}</td>
              <td className="crest">
                <img
                  width={25}
                  height={25}
                  src={match.away_team.crest}
                  alt=""
                />
              </td>
              <td className="crest">
                {" "}
                {new Date(match.utc_date).toLocaleDateString("en-GB")} (
                {match.utc_date.replace("T", " ").slice(11, -3)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default Matches;
