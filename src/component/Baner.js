import React from 'react'
import Carousel from './Carousel'

const Baner = () => {
  return (
    <div className="bg-[url('../public/1.jpg')] h-96">
        <div className='flex flex-col text-center '>
            <p className='text-5xl mt-6 font-bold'>Crypto Hunter</p>
            <p className='text-sm mt-2 font-thin'>get your all favorite crypto here</p>
        </div>
        <Carousel/>
    
    </div>
  )
}

export default Baner
