import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About'
import Experience from './components/Experience'
import Works from './components/Works'
import Contact from './components/Contact'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
const App = () => {
  return (
    
    <BrowserRouter>
    <Routes>
    <Route path="/home" element={<Home />} />
    </Routes>
    <div className='relative z-0 bg-gray-100'>

      <div className='bg-gray-50  '>
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
    </BrowserRouter>
  )
}

export default App