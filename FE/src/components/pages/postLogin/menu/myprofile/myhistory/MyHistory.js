import { FcCalendar } from 'react-icons/fc'
import './myhistory.css'

// import { useEffect } from 'react'
function MyHistory () {
  // const userStats = props.props

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const url = ``

  //       const response = await fetch(url, {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-type': 'application/json',
  //           'X-Total-Count': 'true'
  //         }
  //       })

  //       // Sprawdź, czy status odpowiedzi jest OK (200)
  //       if (response.ok) {
  //         const jsonData = await response.json()

  //       } else {
  //         // Odczytaj treść odpowiedzi jako tekst, jeśli nie jest to JSON
  //         const errorText = await response.text()
  //         console.error('Błąd pobierania danych:', errorText)
  //       }
  //     } catch (error) {
  //       console.error('Błąd pobierania danych:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  return (
    <>
      <div className='history '>
        <p className='history-item'>
          <FcCalendar /> Historia Betowania
        </p>
        <div className='history-box'>
          <ol>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
            <li>12.12.2024 - Szatko jak zwykle zbetował źle 2:0</li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default MyHistory
