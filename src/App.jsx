import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explorer from './pages/Explorer'
import FirstScreen from './components/FirstScreen';
import Terminal from './components/Terminal'
const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="" element={<FirstScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App