
import AppNavbar from '../components/Navbar'
import Filters from '../components/Filters'
import './App.css'
import Filmslist from '../components/Filmslist'

import Film from './Film.js'

const films = [
  new Film(1, "Pulp Fiction", true, "2023-12-10", 5, 1),
  new Film(2, "21 Grams", true, "2023-12-11", 4, 1),
  new Film(3, "Star Wars", false, null, 3, 1),
  new Film(4, "Matrix", false, null, null, 1),
]

function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <main className="container-fluid">
        <div className="row">
          <Filters/>
          <Filmslist/>
        </div>
      </main>
    </div>
  );
}

export default App
