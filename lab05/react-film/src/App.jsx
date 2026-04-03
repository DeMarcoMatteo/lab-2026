
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import AppNavbar from '../components/Navbar'
import Filters from '../components/Filters'
import './App.css'
import Filmslist from '../components/Filmslist'

import Film from './Film.js'

const films = [
  new Film(1, "Pulp Fiction", true, "2026-04-01", 5, 1),
  new Film(2, "21 Grams", true, "2023-12-11", 4, 1),
  new Film(3, "Star Wars", false, null, 3, 1),
  new Film(4, "Matrix", false, null, null, 1),
]

const filterDefinitions = {
  all: {
    label: 'All',
    filterFn: () => true,
  },
  favorites: {
    label: 'Favorites',
    filterFn: (film) => film.favorite,
  },
  best: {
    label: 'Best Rated',
    filterFn: (film) => film.rating === 5,
  },
  lastSeen: {
    label: 'Seen Last Month',
    filterFn: (film) => film.watchDate && film.watchDate.isAfter(dayjs().subtract(1, 'month')),
  },
  unseen: {
    label: 'Unseen',
    filterFn: (film) => !film.watchDate,
  },
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleFilms = useMemo(() => {
    const selectedFilter = filterDefinitions[activeFilter] ?? filterDefinitions.all
    return films.filter(selectedFilter.filterFn)
  }, [activeFilter])

  return (
    <div className="App">
      <AppNavbar/>
      <main className="container-fluid">
        <div className="row">
          <Filters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <Filmslist films={visibleFilms} filterLabel={filterDefinitions[activeFilter].label} />
        </div>
      </main>
    </div>
  );
}

export default App
