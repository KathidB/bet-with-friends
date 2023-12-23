import { FcGraduationCap } from 'react-icons/fc'

import './myachiv.css'
function MyAchiv (userProfile) {
  const userAchiv = userProfile.props

  console.log('MY ACHIV:', userProfile.props)
  return (
    <>
      <div className='achiv-box'>
        <p style={{ fontWeight: 'bold' }}>Twoje osiągnięcia</p>

        <div>
          <ul className='achiv-list'>
            {userAchiv.achievements.map(achiv => (
              <li className='achiv-list-item' key={achiv.name}>
                <div className='achiv-name'>
                  <FcGraduationCap size={20} />
                  <span className='achiv-span-top'>{achiv.achiv_name}</span>
                </div>
                <div className='achiv-name-data'>
                  <span>
                    {new Date(achiv.acquired)
                      .toLocaleString('pl-PL', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                      .replace(',', '')}
                  </span>

                  <span className='achiv-span-top'>{achiv.description}. </span>
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
