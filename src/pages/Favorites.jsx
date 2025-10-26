import '../css/Favorites.css'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/movie_card'

const Favorites = () => {
  const {favorites} = useMovieContext();

  if(favorites && favorites.length > 0){
    return (
    <div>
      <h2 className='favorites'>Your Favorites</h2>
      <div className='movies-grid'>
        {favorites.map((movie) => ( 
            <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

     return (
    <div className='favorites-empty'>
      <h2>No Favorites for now.</h2>
      <p>Add Favorites to see here.</p>
    </div>
  )
  
 
}

export default Favorites
