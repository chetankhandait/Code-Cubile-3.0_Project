import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MultiStepForm from "./components/MultiStepForm";
import Portfolio from "./pages/Portfolio";
import FinanceAssistance from "./pages/FinanceAssistance";
// import Portfolio from './pages/Portfolio'
// import FinancialAdvisor from './User'

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/multi-form" element={<MultiStepForm />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/finance-assistant" element={<FinanceAssistance />} />
          <Route path="/multistep-processing" element={<MultiStepForm />} />
        </Routes>
      </div>

      {/* <FinancialAdvisor/> */}
      {/* <Portfolio/> */}
    </div>
  );
}

export default App;
