
import React from 'react'

function FeedbackMessage({feedbackMessage, className}) {
  return (
    <article className={` w-44 h-12 p-2 font-medium rounded-t-md absolute ${className}`}>
         {feedbackMessage}
    </article>
  )
}

export default FeedbackMessage
