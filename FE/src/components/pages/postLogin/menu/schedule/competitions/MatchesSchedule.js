import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'

function MatchesSchedule ({
  matchList,
  currentPage,
  totalMatches,
  limit,
  setCurrentPage
}) {
  return matchList.length > 0 ? (
    <>
      <img
        className='footbal-team-crest'
        width={65}
        height={65}
        src={matchList[0].competition.emblem}
        alt='Footbal team emblem'
        style={{ backgroundColor: 'white' }}
      />
      <p className='competition-name'>{matchList[0]?.competition.name}</p>
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

      <table className='schedule-table'>
        <thead>
          <tr className='schedule-table-tr'>
            <th className='crest'></th>
            <th>Gospodarze</th>
            <th className='schedue-result'>Wynik</th>
            <th>Goście</th>
            <th className='crest'></th>
            <th className='crest'>Termin</th>
          </tr>
        </thead>
        <tbody>
          {matchList.map(match => (
            <tr key={match.score.public_id} className='schedule-tr'>
              <td className='crest mobile-schedule'>
                <img
                  width={25}
                  height={25}
                  src={match.home_team.crest}
                  alt=''
                  style={{ backgroundColor: 'white' }}
                />
              </td>
              <td className='schedule-team-crest-home mobile-schedule'>
                <img
                  className='home-team-crest'
                  width={25}
                  height={25}
                  src={match.home_team.crest}
                  alt=''
                  style={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
                <span> {match.home_team.short_name}</span>
              </td>
              <td className='mobile-schedule'>
                {match.score.full_time.replace('-', ' - ') ?? 'TBD'} <br />
                <span className=' mobile-date'>
                  {new Date(match.utc_date).toLocaleDateString('en-GB')} (
                  {match.utc_date.replace('T,', ' ').slice(11, -3)})
                </span>
              </td>

              <td className='schedule-team-crest-away mobile-schedule'>
                <span> {match.away_team.short_name} </span>
                <img
                  className='away-team-crest'
                  width={25}
                  height={25}
                  src={match.away_team.crest}
                  alt=''
                  style={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
              </td>
              <td className='crest mobile-schedule'>
                <img
                  width={25}
                  height={25}
                  src={match.away_team.crest}
                  alt=''
                  style={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
              </td>
              <td className='crest mobile-schedule'>
                {' '}
                {new Date(match.utc_date).toLocaleDateString('en-GB')} (
                {match.utc_date.replace('T', ' ').slice(11, -3)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    'Oczekiwanie na rozgrywki...'
  )
}

export default MatchesSchedule
