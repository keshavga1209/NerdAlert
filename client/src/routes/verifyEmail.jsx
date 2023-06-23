import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../config.json'
import axios from 'axios'
// import styles from "../styles/home/home.module.css";

export default function Verify() {
  const navigate = useNavigate()

  const { tokenKey } = useParams()
  console.log(tokenKey)

  const verifiedState = {
    NULL: 'NULL',
    ERROR: 'ERROR',
    TRUE: 'TRUE',
  }
  const [verified, setVerified] = useState(verifiedState.NULL)

  useEffect(() => {
    if (!tokenKey) return

    axios
      .post(`${config.SERVER}/user/verifyEmail`, {
        token: tokenKey,
      })
      .then(() => {
        setVerified(verifiedState.TRUE)
      })
      .catch(() => {
        setVerified(verifiedState.ERROR)
      })
  }, [tokenKey])

  return (
    <div>
      {
        {
          [verifiedState.TRUE]: (
            <>
              <a href="/kv-react/login">Login again.</a>
            </>
          ),
          [verifiedState.ERROR]: (
            <>
              <>
                <a href=" /kv-react/signup">Link has expired. Sign up again.</a>
              </>
            </>
          ),
          [verifiedState.NULL]: (
            <>
              <p>Verifying...</p>
            </>
          ),
        }[verified]
      }
    </div>
  )
}
