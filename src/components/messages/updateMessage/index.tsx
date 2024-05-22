
import React from 'react'

function UpdateMessage({updateMessage}) {
  return (
    <article className=' w-44 h-10 p-2 font-medium rounded-t-md bg-blue-200 text-blue-600 absolute animate-pulseBackground '>
         {updateMessage}
    </article>
  )
}

export default UpdateMessage
