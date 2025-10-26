import './css/App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import NavBar from './components/NavBar.jsx'
import { MovieProvider } from './context/MovieContext.jsx'

function App() {
  return (
    <MovieProvider>
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<Home />}/> /* creating a route for home */
          <Route path="/Favorites" element={<Favorites/>}/> //creating a route for favorites
        </Routes>
      </main>
    </div>
    </MovieProvider>
  )
}

export default App
