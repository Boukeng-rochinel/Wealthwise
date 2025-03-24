import react from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom';

import './App.css'
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Budgeting from './components/Budget';


function App() {
  

  return (
    <div>
      <BrowserRouter>
<Routes>

  <Route path='/' element = {<Login/>}/>
  <Route path='/Login' element = {<Login/>}/>
  <Route path='/Home' element = {<Home/>}/>
  <Route path='/Signup' element = {<Signup/>}/>
  <Route path='/Budget' element = {<Budgeting/>}/>
</Routes>

      </BrowserRouter>
       
    </div>
  )
}

export default App
