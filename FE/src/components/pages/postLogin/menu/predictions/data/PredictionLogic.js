import { useEffect, useState } from 'react'

export const PredictionLogic = () => {
  const [matchList, setMatchList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalMatches, setTotalMatches] = useState(null)
  const [competitions, setCompetitions] = useState([]) // Nowy stan na potrzeby przechowywania kompetencji
  const [selectedCompetition, setSelectedCompetition] = useState(2021) // Domyślnie brak wybranej kompetencji
  // 2018 euro
  const limit = 9

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const competitionsResponse = await fetch(
          'http://130.162.44.103:5000/api/v1/competetition',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': 'true'
            }
          }
        )
        if (competitionsResponse.ok) {
          const competitionsData = await competitionsResponse.json()
          setCompetitions(competitionsData)
          // zamiana bo w euro nie ma jeszcze meczy a jest na 1 miejscu w tabeli wiec jest pusta domyślnie.
          // competitionsData.reverse()

          // Sprawdź, czy Champions League jest w dostępnych konkurencjach
        } else {
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getCompetitions()
  }, [])

  useEffect(() => {
    const getMatches = async () => {
      try {
        const matchesResponse = await fetch(
          `http://130.162.44.103:5000/api/v1/bet?competetition=${selectedCompetition}&page=${currentPage}&limit=${limit}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': 'true'
            }
          }
        )

        if (matchesResponse.ok) {
          const matchesData = await matchesResponse.json()
          setMatchList(matchesData)
          setTotalMatches(matchesResponse.headers.get('X-Total-Count'))
        } else {
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getMatches()
  }, [currentPage, selectedCompetition])

  const handleCompetitionChange = competitionId => {
    setSelectedCompetition(competitionId)
    setCurrentPage(1) // Resetowanie strony przy zmianie turnieju
  }

  return {
    matchList,
    currentPage,
    totalMatches,
    competitions,
    selectedCompetition,
    limit,
    setCurrentPage,
    handleCompetitionChange
  }
}
