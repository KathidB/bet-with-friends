import React, { useEffect, useState } from 'react'
import Euro2024 from './euro2024/Euro2024'
import ChampionsLeague from './CL/ChampionsLeague'
import './grouplist.css'

function YourComponent () {
  const [activeTab, setActiveTab] = useState('Euro2024')
  // const [compe, setCompe] = useState([])

  const handleTabClick = tab => {
    setActiveTab(tab)
  }

  const fetchCompetitionData = async () => {
    try {
      // Ustawienie stanu ładowania na true przed wysłaniem żądania

      // Wysyłanie żądania GET do backendu
      const response = await fetch(
        `http://130.162.44.103:5000/api/v1/competetition`,
        {
          method: 'GET',
          credentials: 'include', // Dodanie tego, jeśli istnieje konieczność uwierzytelnienia
          headers: {
            'Content-Type': 'application/json'
            // Dodaj inne nagłówki, jeśli są wymagane
          }
        }
      )

      // Ustawienie stanu ładowania na false po odebraniu odpowiedzi

      if (response.ok) {
        // Pobranie danych z odpowiedzi w formacie JSON
        const data = await response.json()

        // Ustawienie pobranych danych w stanie komponentu
        // setCompe(data);
      } else {
        // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi

        // Spróbuj sparsować błąd jako JSON, jeśli to możliwe
        const errorData = await response.json()

        // Obsługa konkretnych kodów błędów
        if (errorData.code === 'E1') {
          throw new Error(`Błąd podczas pobierania danych konkursu.`)
        } else {
          throw new Error(`Niespodziewany błąd.`)
        }
      }
    } catch (error) {
      // Ustawienie błędu, który zostanie wyświetlony użytkownikowi
      console.error('Wystąpił błąd podczas pobierania danych:', error)
    }
  }

  // Wywołanie funkcji pobierającej dane, np. w useEffect
  useEffect(() => {
    fetchCompetitionData()
  }, [])

  return (
    <div className='panel-side-box'>
      <div className='tabs'>
        <button
          className={`tabs-btn ${activeTab === 'Euro2024' ? 'active-btn' : ''}`}
          onClick={() => handleTabClick('Euro2024')}
        >
          Euro 2024
        </button>
        <button
          className={`tabs-btn ${
            activeTab === 'ChampionsLeague' ? 'active-btn' : ''
          }`}
          onClick={() => handleTabClick('ChampionsLeague')}
        >
          Liga Mistrzów
        </button>
      </div>

      <div className='competition-groups'>
        {activeTab === 'Euro2024' ? <Euro2024 /> : <ChampionsLeague />}
      </div>
    </div>
  )
}

export default YourComponent
