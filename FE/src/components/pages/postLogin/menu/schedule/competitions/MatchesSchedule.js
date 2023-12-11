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
          <tr>
            <th className='crest'></th>
            <th>Gospodarze</th>
            <th>Wynik</th>
            <th>Goście</th>
            <th className='crest'></th>
            <th className='crest'>Termin</th>
          </tr>
        </thead>
        <tbody>
          {matchList.map(match => (
            <tr key={match.score.public_id}>
              <td className='crest'>
                <img
                  width={25}
                  height={25}
                  src={match.home_team.crest}
                  alt=''
                />
              </td>
              <td>{match.home_team.short_name}</td>
              <td>{match.score.full_time.replace('-', ' - ') ?? 'TBD'}</td>

              <td>{match.away_team.short_name}</td>
              <td className='crest'>
                <img
                  width={25}
                  height={25}
                  src={match.away_team.crest}
                  alt=''
                />
              </td>
              <td className='crest'>
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
