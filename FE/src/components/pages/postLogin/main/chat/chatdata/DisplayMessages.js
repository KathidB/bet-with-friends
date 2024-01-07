import React, { useEffect, useState, useRef } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { gql } from '@apollo/client'
import { useAuth } from '../../../../../auth/authcontext/AuthContext'

import { MdOutlineArrowDropDown } from 'react-icons/md'

const GET_MESSAGES = gql`
  query GetMessages($limit: Int!, $page: Int!) {
    getMessages(limit: $limit, page: $page) {
      content
      sender {
        avatar
        name
        ranking
      }
      uuid
    }
  }
`

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessageSubscription {
    newMessageSubscription {
      content
      uuid
      sender {
        name
        avatar
        ranking
        uuid
      }
    }
  }
`

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!) {
    sendMessage(message: $message) {
      code
      message
      timestamp
    }
  }
`

const DisplayMessages = () => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef()
  const { darkMode } = useAuth()
  const [observedElement, setObservedElement] = useState(null)
  const topRef = useRef(null)

  const [msgLimit, setMsgLimit] = useState(40)

  const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {
    variables: { limit: msgLimit, page: 1 }
  })

  const { data: subscriptionData, error: subscriptionError } = useSubscription(
    NEW_MESSAGE_SUBSCRIPTION
  )

  const [sendMessage] = useMutation(SEND_MESSAGE)

  const chatContainerRef = useRef(null) // New ref for the chat container

  useEffect(() => {
    if (subscriptionData && subscriptionData.newMessageSubscription) {
      refetch()
      chatContainerRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      })
    }
  }, [subscriptionData, refetch])

  // WYSYŁANKO WIADOMOŚCI:
  const handleSendMessage = async e => {
    e.preventDefault()

    if (inputMessage.trim() !== '') {
      try {
        await sendMessage({
          variables: { message: inputMessage }
        })
        setInputMessage('')
      } catch (err) {
        console.error('Error sending message:', err)
      }
    }
  }
  // scroll na dół chatu po renderze

  useEffect(() => {
    setObservedElement(topRef.current)
  }, [data])

  // po scoll do samej góry pobierz nowe dane

  useEffect(() => {
    if (observedElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log('User has scrolled to the top!')
            setMsgLimit(prevLimit => prevLimit + 30)

            chatContainerRef.current?.scrollIntoView({
              block: 'nearest'
            })
          }
        },
        { threshold: 1 }
      )

      observer.observe(observedElement)

      return () => {
        observer.unobserve(observedElement)
      }
    }
  }, [observedElement])

  // scollowanie do samego dołu przy  załadowaniu chatu

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [data])

  // guziks colluje na sam dół.
  const scrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView({
      break: 'end',
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (subscriptionError) return <p>Error: {subscriptionError}</p>

  return (
    <div className='chat-wrapper' ref={topRef}>
      <div className={`chatter ${darkMode && 'darkmode-on'}`}>
        {[...data.getMessages]
          .map(subMsg => (
            <ul className='chat-box' key={subMsg.uuid} ref={chatContainerRef}>
              <li className='chat-box-item'>
                {' '}
                <img
                  className='chat-avatar'
                  src={subMsg.sender.avatar}
                  height={30}
                  alt={`${subMsg.sender.name}'s avatar`}
                />
                <p className='chat-user'>{subMsg.sender.name}:</p>
                <div className='chat-box-msg'>
                  <p className='chat-message'> {subMsg.content}</p>
                </div>
              </li>
            </ul>
          ))
          .reverse()}
      </div>
      <div className='chat-input-wrapper'>
        <div ref={messagesEndRef}></div>
        <button
          className='chat-scroll'
          aria-label='Scoll to the chat window bottom button'
          onClick={scrollToBottom}
        >
          <MdOutlineArrowDropDown size={25} />
        </button>
        <form className='chat-input-box' onSubmit={handleSendMessage}>
          <input
            type='text'
            maxLength={150}
            value={inputMessage}
            className='chat-input'
            placeholder='Wiadomość...'
            onChange={e => setInputMessage(e.target.value)}
          />
          <button className='chat-button' type='submit'>
            Wyślij
          </button>
        </form>
      </div>
    </div>
  )
}

export default DisplayMessages
