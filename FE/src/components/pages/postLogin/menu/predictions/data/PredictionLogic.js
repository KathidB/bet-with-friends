import { useEffect, useState } from "react";
import { useAuth } from "../../../../../auth/authcontext/AuthContext";

export const PredictionLogic = () => {
  const [matchList, setMatchList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMatches, setTotalMatches] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(2021);
  const { ipMan } = useAuth();
  const limit = 9;

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const competitionsResponse = await fetch(
          `http://74.234.50.115:5000/api/v1/competetition`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-Total-Count": "true",
            },
          }
        );

        if (competitionsResponse.ok) {
          const competitionsData = await competitionsResponse.json();
          setCompetitions(competitionsData);
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    getCompetitions();
  }, [ipMan]);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const matchesResponse = await fetch(
          `http://${ipMan}:5000/api/v1/bet?competetition=${selectedCompetition}&page=${currentPage}&limit=${limit}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-Total-Count": "true",
            },
          }
        );

        if (matchesResponse.ok) {
          const matchesData = await matchesResponse.json();
          setMatchList(matchesData);
          setTotalMatches(matchesResponse.headers.get("X-Total-Count"));
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getMatches();
  }, [currentPage, selectedCompetition, ipMan, totalMatches]);

  const handleCompetitionChange = (competitionId) => {
    setSelectedCompetition(competitionId);
    setCurrentPage(1); // Resetowanie strony przy zmianie turnieju
  };

  return {
    matchList,
    currentPage,
    totalMatches,
    competitions,
    selectedCompetition,
    limit,
    setCurrentPage,
    handleCompetitionChange,
    setTotalMatches,
  };
};
