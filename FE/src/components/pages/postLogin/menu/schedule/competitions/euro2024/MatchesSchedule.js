function Euro2024Schedule ({ matchList }) {
  return matchList.length > 0 ? (
    <>
      <table className='schedule-table'>
        <thead>
          <tr>
            <th className='crest'></th>
            <th>Gospodarze</th>
            <th>Wynik</th>
            <th>Goście</th>
            <th className='crest'></th>
            <th>Termin</th>
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
              <td>{match.score.full_time ?? 'TBD'}</td>

              <td>{match.away_team.short_name}</td>
              <td className='crest'>
                <img
                  width={25}
                  height={25}
                  src={match.away_team.crest}
                  alt=''
                />
              </td>
              <td>
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

export default Euro2024Schedule
