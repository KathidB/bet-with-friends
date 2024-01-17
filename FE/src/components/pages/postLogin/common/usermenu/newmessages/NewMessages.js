// src/App.js
import React, { useEffect } from 'react'
import './newmessages.css'
import { useAuth } from '../../../../../auth/authcontext/AuthContext'
import useGraphQLDataFetcher from '../gglDataFetcher/GraphQLDataFetcher'

const NewMessages = () => {
  const { darkMode } = useAuth()
  const {
    loading,
    error,
    data,
    refetch,
    subscriptionData,
    subscriptionError,
    readSystemInfo
  } = useGraphQLDataFetcher()

  useEffect(() => {
    if (
      subscriptionData &&
      subscriptionData.newSystemInfoSubscription &&
      refetch
    ) {
      refetch()
    }
  }, [subscriptionData, subscriptionData?.newSystemInfoSubscription, refetch])

  const systemInfo = data.getSystemInfo

  const filteredMessages = systemInfo.filter(message => {
    return message.status === false
  })

  const handleChecked = async uuidInput => {
    if (uuidInput !== '') {
      try {
        const response = await readSystemInfo({
          variables: { uuid: uuidInput }
        })
        if (response.data && response.data.readSystemInfo) {
          refetch()
        }
      } catch (err) {
        console.error('Error reading system info:', err)
      }
    }
  }

  if (loading) return null
  if (error) return <p>Error: {error.message}</p>
  if (subscriptionError) return <p>Error: {subscriptionError}</p>

  return (
    <ul className={`msg-box ${darkMode && 'darkmode-on'}`}>
      {filteredMessages.length !== 0 ? (
        filteredMessages.map(newMessage => (
          <li className='msg-item' key={newMessage.uuid}>
            <span>{newMessage.message}</span>
            <label>
              <input
                className='msg-input'
                type='checkbox'
                onChange={() => handleChecked(newMessage.uuid)}
              />
            </label>
          </li>
        ))
      ) : (
        <p className='msg-none'>Brak nowych powiadomień...</p>
      )}
    </ul>
  )
}

export default NewMessages
