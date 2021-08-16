import React, { useRef, useEffect } from 'react'

const Notification = ({ alert }) => {
  const alertRef = useRef()

  useEffect(()=>{
    setTimeout(()=>{
      alertRef.current.style.display = 'none'
    },3000)
  })

  if (alert.error) {
      return (
        <div ref={alertRef} className="error-alert">
          {alert.message}
        </div>
      )
    }
  
  return (
      <div ref= {alertRef} className="success-alert">
        {alert.message}
      </div>
    )
  }

  export default Notification;