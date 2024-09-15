
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import MultiStepForm from './components/MultiStepForm'
import Portfolio from './pages/Portfolio'
// import Portfolio from './pages/Portfolio'
import FinancialAdvisor from './User'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>

      <Route path="/" element={<Homepage />} />
      <Route path="/multi-form" element={<MultiStepForm />} />
      <Route path="/portfolio" element={<Portfolio />} />
   

      </Routes>

    
 
      
      <FinancialAdvisor/>
      {/* <FinancialAdvisor/> */}
      {/* <Portfolio/> */}
    </div>
  )
}

export default App
