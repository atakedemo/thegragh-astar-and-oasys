import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client'
import GET_TRANSFERS from '../graphql/queries'

const Test = () => {
  const { loading, error, data } = useQuery(GET_TRANSFERS)
  const [eventList, setEventList] = useState<History[]>([])
  const [tokenHolders, setTokenHolders] = useState([]);
  
  useEffect(() => {
    if (!loading && !error && data) {
      setTokenHolders(data.accountTokenBalances);
      console.log(data);
    }
  }, [loading, error, data]);
}