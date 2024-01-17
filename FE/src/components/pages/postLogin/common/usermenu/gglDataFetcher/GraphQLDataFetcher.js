// GraphQLDataFetcher.js
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const MY_QUERY = gql`
  query GetSystemInfo {
    getSystemInfo(limit: 100, page: 1) {
      message
      status
      uuid
    }
  }
`

const NEW_SYSTEM_INFO_SUBSCRIPTION = gql`
  subscription NewSystemInfoSubscription {
    newSystemInfoSubscription {
      message
      status
      uuid
    }
  }
`

const READ_SYSTEM_INFO = gql`
  mutation ReadSystemInfo($uuid: String!) {
    readSystemInfo(uuid: $uuid) {
      code
      message
      timestamp
    }
  }
`

const useGraphQLDataFetcher = () => {
  const { loading, error, data, refetch } = useQuery(MY_QUERY)
  const { data: subscriptionData, error: subscriptionError } = useSubscription(
    NEW_SYSTEM_INFO_SUBSCRIPTION
  )
  const [readSystemInfo] = useMutation(READ_SYSTEM_INFO)

  return {
    loading,
    error,
    data,
    refetch,
    subscriptionData,
    subscriptionError,
    readSystemInfo
  }
}

export default useGraphQLDataFetcher
