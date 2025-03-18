import react from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom';

import './App.css'
import Login from './components/Login';

function App() {
  

  return (
    <div>
      <BrowserRouter>
<Routes>

  <Route path='/' element = {<Login/>}/>
  <Route path='/Login' element = {<Login/>}/>
</Routes>

      </BrowserRouter>
       
    </div>
  )
}

export default App
