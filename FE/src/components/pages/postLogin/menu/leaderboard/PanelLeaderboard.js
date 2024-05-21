import { useState, useEffect, useRef } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import './panelleaderboard.css'
import RaccoonLeader from './images/raccoon-leader.webp'
import { useTranslation } from 'react-i18next'

import { useAuth } from '../../../../auth/authcontext/AuthContext'

import { FaArrowDown } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDownUpAcrossLine } from 'react-icons/fa6'
import { FcGlobe } from 'react-icons/fc'

import TotalLeaders from './totalLeaders/TotalLeaders'

function PanelLeaderboard () {
  const { t } = useTranslation()
  const [leadersData, setLeadersData] = useState([])
  const [handleTableShow, setHandleTableShow] = useState(false)
  const [page, setPage] = useState(1)
  const [totalLeaders, setTotalLeaders] = useState(null)
  const [limit] = useState(10)
  const [selectedCompetition, setSelectedCompetition] = useState(2019)
  const { ipMan, darkMode } = useAuth()
  const [buttonCompetitions, setButtonCompetitions] = useState([])
  const globalRankBtn = useRef()

  // MAIN API FOR ALL  LEADERBOARD!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://${ipMan}:5000/api/v1/ranking?competetition=${selectedCompetition}&page=${page}&limit=${limit}`

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'X-Total-Count': 'true'
          }
        })

        if (response.ok) {
          const jsonData = await response.json()

          setLeadersData(jsonData)
          setTotalLeaders(response.headers.get('X-Total-Count'))
        } else {
          const errorText = await response.text()
          console.error('Error fetching data:', errorText)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [page, limit, ipMan, selectedCompetition])

  const handleCompetitionChange = competitionId => {
    setSelectedCompetition(competitionId)
    // Resetowanie strony przy zmianie turnieju
  }

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const competitionsResponse = await fetch(
          `http://138.2.142.138:5000/api/v1/competetition`,
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
          setButtonCompetitions(competitionsData)
        } else {
          console.error('Error durning data fetch')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    getCompetitions()
  }, [ipMan])

  useEffect(() => {
    if (globalRankBtn.current) {
      globalRankBtn.current.click()
    }
  }, [])

  return (
    <section className='app-wrap'>
      <h2 className='section-title panel-header'>
        <span className='span-brand'> Leader</span>board
      </h2>
      {/*  buttony */}

      <div className='competition-buttons'>
        <button
          style={
            darkMode
              ? { color: 'white', backgroundColor: '#1F1F1F' }
              : { color: 'black' }
          }
          onClick={() => setHandleTableShow(true)}
          ref={globalRankBtn}
          className={`competition-btn ${
            handleTableShow ? 'active-schedule' : ''
          }`}
        >
          <FcGlobe className='fc-globe' />
          <p>{t('panelLB.global')}</p>
        </button>

        {buttonCompetitions.map(competition => (
          <button
            key={competition.public_id}
            style={
              darkMode
                ? { color: 'white', backgroundColor: '#1F1F1F' }
                : { color: 'black' }
            }
            className={`competition-btn ${
              selectedCompetition === competition.public_id && !handleTableShow
                ? 'active-schedule'
                : ''
            }`}
            onClick={() => {
              handleCompetitionChange(competition.public_id)
              setHandleTableShow(false)
            }}
          >
            <img
              width={50}
              height={50}
              src={competition.emblem}
              alt='football team emblem'
              className='comp-button-img'
              loading='lazy'
              style={{ backgroundColor: 'white', borderRadius: '2px' }}
            />
            <p>{competition.name}</p>
          </button>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Bet With <span className='span-brand'>Friends</span> {t('panelLB.topP')}
      </p>

      <img
        className='leader-raccoon'
        src={RaccoonLeader}
        alt=''
        width={125}
        height={125}
        loading='lazy'
      />

      {!handleTableShow && (
        <p className='schedule-btns'>
          <button
            style={
              totalLeaders === '0' ? { display: 'none' } : { display: 'block' }
            }
            className='schedule-list-btn span-brand'
            disabled={page === 1 || totalLeaders === '0' ? true : false}
            onClick={() => setPage(prevValue => prevValue - 1)}
          >
            <BsArrowLeft />
          </button>

          {totalLeaders === '0' ? (
            <span className='schedule-btn-span'>{t('panelLB.waiting')}</span>
          ) : (
            <span className='schedule-btn-span'>
              {t('panelLeaders.browse')} {page} /{' '}
              {Math.ceil(totalLeaders / limit)}
            </span>
          )}

          <button
            style={
              totalLeaders === '0' ? { display: 'none' } : { display: 'block' }
            }
            className='schedule-list-btn span-brand'
            onClick={() => setPage(prevValue => prevValue + 1)}
            // total matches np. 16 przez 10 daje 1.6 i Ceil robi 2.
            disabled={
              page === Math.ceil(totalLeaders / limit) || totalLeaders === '0'
            }
          >
            <BsArrowRight />
          </button>
        </p>
      )}

      {!leadersData.length <= 0 && handleTableShow === false ? (
        <table className='panel-leader-table'>
          <thead>
            <tr>
              <th className='th-place'>{t('panelTopTyper.place')}</th>
              <th>{t('panelTopTyper.nick')}</th>
              <th className='th-hide'>Avatar</th>
              <th>{t('panelTopTyper.points')}</th>
              <th>{t('panelTopTyper.bets')}</th>
              <th>{t('panelTopTyper.wins')}</th>
              <th className='th-hide'>{t('panelTopTyper.rating')}</th>
            </tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr
                key={leader.public_id}
                className={`top-panel-player ${
                  leader.place <= 3 ? 'top-players' : ''
                }`}
              >
                <td className={`th-place`}>
                  {leader.place}{' '}
                  <span style={{ color: 'green' }}>
                    {leader.tendency === 2 && <FaArrowUp />}
                  </span>
                  <span style={{ color: 'red' }}>
                    {leader.tendency === 1 && <FaArrowDown />}
                  </span>
                  <span style={{ color: 'gray' }}>
                    {leader.tendency === 0 && <FaArrowDownUpAcrossLine />}
                  </span>
                </td>
                <td className='leader-name'>{leader.profile.name}</td>
                <td className='th-hide'>
                  <img
                    className={`${leader.place <= 3 ? 'top-avatar' : ''}`}
                    src={`http://138.2.142.138:5000/api/v1/avatar/${leader.profile.avatar}`}
                    alt='user avatar'
                    loading='lazy'
                  />
                </td>
                <td>{leader.points}</td>
                <td>{leader.bets}</td>
                <td>{leader.wins}</td>
                <td className='th-hide'>{leader.rating} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {!handleTableShow && (
        <table className='panel-leader-mobile'>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr
                key={leader.public_id}
                className={`top-panel-player ${
                  leader.place <= 3 ? 'top-players' : ''
                }`}
              >
                <td className='leader-stats-box'>
                  <div className='top-leader-box'>
                    <span className='leader-place top-leader-box-item'>
                      {' '}
                      {leader.place}
                    </span>

                    {leader.tendency === 2 && (
                      <span style={{ color: 'green' }}>
                        <FaArrowUp />
                      </span>
                    )}

                    {leader.tendency === 1 && (
                      <span style={{ color: 'red' }}>
                        <FaArrowDown />
                      </span>
                    )}

                    {leader.tendency === 0 && (
                      <span style={{ color: 'gray' }}>
                        <FaArrowDownUpAcrossLine />
                      </span>
                    )}

                    <p className='top-leader-box-item'>
                      {' '}
                      {leader.profile.name}
                    </p>

                    <img
                      className={` top-leader-box-item leader-box-img ${
                        leader.place <= 3 ? 'top-avatar' : ''
                      }`}
                      src={`http://138.2.142.138:5000/api/v1/avatar/${leader.profile.avatar}`}
                      alt=''
                      width={40}
                      loading='lazy'
                    />
                  </div>
                  <div className='leader-stats'>
                    <p>
                      {t('panelTopTyper.points')}
                      <br /> {leader.points}
                    </p>
                    <p>
                      {t('panelTopTyper.bets')} <br />
                      {leader.bets}
                    </p>
                    <p>
                      {t('panelTopTyper.wins')} <br />
                      {leader.wins}
                    </p>
                    <p>
                      {t('panelTopTyper.rating')} <br />
                      {leader.rating} %
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {handleTableShow && <TotalLeaders />}
    </section>
  )
}
export default PanelLeaderboard
