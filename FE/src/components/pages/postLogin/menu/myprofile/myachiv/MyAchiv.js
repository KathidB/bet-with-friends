import { FcGraduationCap } from 'react-icons/fc'

import './myachiv.css'
function MyAchiv (userProfile) {
  const userAchiv = userProfile.props


  return (
    <>
      <div className='achiv-box'>
        <p style={{ fontWeight: 'bold' }}>Twoje osiągnięcia</p>

        <div>
          <ul className='achiv-list'>
            {userAchiv.achievements.map(achiv => (
              <li className='achiv-list-item' key={achiv.uuid}>
                <div className='achiv-name'>
                  <FcGraduationCap size={20} />
                  <span
                    style={!achiv.active ? { color: 'silver' } : null}
                    className='achiv-span-top'
                  >
                    {achiv.achiv_name}
                  </span>
                </div>
                <div className='achiv-name-data'>
                  <span>
                    {achiv.acquired
                      ? new Date(achiv.acquired)
                          .toLocaleString('pl-PL', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                          .replace(',', '')
                      : '...'}
                  </span>

                  <span
                    style={!achiv.active ? { color: 'silver' } : null}
                    className='achiv-span-top'
                  >
                    {achiv.description}.{' '}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyAchiv
