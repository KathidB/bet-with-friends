import { useState, useEffect } from 'react'
import YourProfile from '../yourprofile/YourProfile'
import TopTyper from '../toptyper/TopTyper'

function TopParent () {
  const [leadersData, setLeadersData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://4.184.219.209:5000/api/v1/ranking',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        const jsonData = await response.json()
        setLeadersData(jsonData)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <YourProfile />
      <TopTyper leadersData={leadersData} />
    </>
  )
}

export default TopParent
