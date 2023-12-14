import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const GET_MESSAGES = gql`
  query GetMessages {
    getMessages {
      content
      sender {
        image
        name
        ranking
      }
    }
  }
`

function DisplayMessages () {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { limit: 10, page: 1 }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {data.getMessages.map((message, index) => (
        <div key={index}>
          <img
            src={message.sender.image}
            alt={`${message.sender.name}'s avatar`}
          />
          <p>{message.sender.name}</p>
          <p>Ranking: {message.sender.ranking}</p>
          <p>Message: {message.content}</p>
        </div>
      ))}
    </div>
  )
}

export default DisplayMessages
