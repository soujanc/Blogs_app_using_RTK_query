import { useState } from 'react'
import Hom from './pages/Hom'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Addeditblog from './pages/Addeditblog'
import Detail from './pages/Detail'
import Nav from './components/Nav'
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
    <Router>
      <div className="app">
        <Nav/>
        <ToastContainer position="top-center"/>
        <Routes>
<Route path="/" element={<Hom/>}/>
<Route path="/create" element={<Addeditblog/>}/>
<Route path="/update/:id" element={<Addeditblog/>}/>
<Route path="/detail/:id" element={<Detail/>}/>
        </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
