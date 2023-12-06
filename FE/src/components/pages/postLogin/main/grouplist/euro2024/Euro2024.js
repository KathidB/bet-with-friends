import { useState } from 'react'
import groupsData from '../groupData/groupsData'
import './euro2024.css'

function Euro2024 () {
  const [selectedGroup, setSelectedGroup] = useState('Grupa A')

  const handleChange = e => {
    setSelectedGroup(e.target.value)
  }
  return (
    <div className='group-box'>
      <select
        className='group-select'
        onChange={handleChange}
        value={selectedGroup}
      >
        {groupsData.map(group => (
          <option key={group.groupName} value={group.groupName}>
            {group.groupName}
          </option>
        ))}
      </select>

      <div>
        <ul className='group-list'>
          {groupsData
            .find(group => group.groupName === selectedGroup)
            .teams.map((team, index) => (
              <li className='group-item' key={index}>
                {team}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Euro2024
