import React from 'react'

function ValidationSuccess({successMessage}) {
  return (
    <div className='w-96 mb-4 p-2 font-medium text-green-600'>
      {successMessage}
    </div>
  )
}

export default ValidationSuccess