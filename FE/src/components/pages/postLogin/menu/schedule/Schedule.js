import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import Euro2024Schedule from './competitions/euro2024/MatchesSchedule'
import './schedule.css'

function Schedule () {
  const [matchList, setMatchList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalMatches, setTotalMatches] = useState(null)
  const [competitions, setCompetitions] = useState([]) // Nowy stan na potrzeby przechowywania kompetencji
  const [selectedCompetition, setSelectedCompetition] = useState(2001) // Domyślnie brak wybranej kompetencji
  // 2018 euro
  const limit = 10

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
          `http://130.162.44.103:5000/api/v1/matches?competetition=${selectedCompetition}&page=${currentPage}&limit=${limit}`,
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

  const handleCompetitionNames = competitionName => {
    const translateCompetition = {
      'European Championship': 'Euro 2024',
      'UEFA Champions League': 'Champions League',
      'Premier League': 'Premier League',
      Championship: 'Championship',
      Bundesliga: 'Bundesliga',
      'Serie A': 'Serie A'
    }

    return translateCompetition[competitionName] || competitionName
  }

  return (
    <section>
      <div className='schedule'>
        <h2 className='panel-header'>
          Terminarz <span className='span-brand'>rozgrywek</span>
        </h2>

        <div className='competition-buttons'>
          {competitions.map(competition => (
            <button
              key={competition.public_id}
              className={`competition-btn ${
                selectedCompetition === competition.public_id
                  ? 'active-schedule'
                  : ''
              }`}
              onClick={() => handleCompetitionChange(competition.public_id)}
            >
              <img width={50} height={50} src={competition.emblem} alt='' />
              {handleCompetitionNames(competition.name)}
            </button>
          ))}
        </div>

        {/* //  Lista buttonów z zawodami */}

        <p className='schedule-btns'>
          <button
            aria-label='Previous page'
            className='schedule-list-btn span-brand'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prevValue => prevValue - 1)}
          >
            <BsArrowLeft />
          </button>
          <span className='schedule-btn-span'>
            Przeglądaj listę {currentPage} / {Math.ceil(totalMatches / limit)}
          </span>
          <button
            aria-label='Next page'
            className='schedule-list-btn span-brand'
            onClick={() => setCurrentPage(prevValue => prevValue + 1)}
            disabled={currentPage === Math.ceil(totalMatches / limit)}
          >
            <BsArrowRight />
          </button>
        </p>

        <Euro2024Schedule matchList={matchList} />
      </div>
    </section>
  )
}

export default Schedule
