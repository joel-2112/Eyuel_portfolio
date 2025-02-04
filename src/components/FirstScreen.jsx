import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Experience from './Experience'
import Works from './Works'
import Contact from './Contact'

const FirstScreen = () => {
  return (
    <div className='relative z-0 bg-white '>

      <div className='bg-white  '>
        <Navbar/>
        <Hero/>
      </div>
      <About/>
      <Experience/>
      <Works/>
      <div className='relative z-0'>
         <Contact/>
      </div>
    </div>
  )
}

export default FirstScreen