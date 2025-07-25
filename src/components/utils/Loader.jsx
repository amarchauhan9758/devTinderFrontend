import React from 'react'

function Loader() {
    return (
        <div className='w-25 h-25 bg-red-800 relative'>
            <div className='absolute  inset-0'>

                <span className="loading loading-spinner text-red-200 tex t-center loading-md"></span>
            </div>
        </div>
    )
}

export default Loader
