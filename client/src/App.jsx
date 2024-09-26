import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import Footer from "./components/Footer/Footer"
import "./App.css"

function App() {

  return (

      <div className="app-container">
      <BrowserRouter>
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
  
       
}

export default App
