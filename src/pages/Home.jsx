import '../css/Home.css'
import MovieCard from "../components/movie_card"
import { useState, useEffect } from "react"
import { getPopularMovies, searchMovies } from '../services/api'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const loadPopularMovies = async () => {
        try{
          const popularMovies =  await getPopularMovies();
          setMovies(popularMovies);
        }catch (err) {
          console.log(err);
          setError("Failed to fetch popular movies. Please try again later.");
        }
        finally{
          setLoading(false);
        }
      }

      loadPopularMovies();
    }, [])

const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchTerm.trim()) return;
    if(loading) return;

    setLoading(true);

    try{
        const searchReasult = await searchMovies(searchTerm);
        setMovies(searchReasult);
        setError(null);
    }catch(err){
        console.log(err);
        setError("Failed to fetch search results. Please try again later.");
    }finally{
        setLoading(false);
    }
}



  return (
    <div className='Home'>
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="search for movies..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button className='search-button'>search</button>
        </form>

    {error && <div className='error-message'>{err}</div>}

    {loading ? <div className='loading'>Loading.....</div> : <div className='movies-grid'>
        {movies.map((movie) => ( 
            /* here we are making our search term to lowercase then only displaying moviecard with that serchterm only by using conditionl rendering (&&) 
            movie.title.toLowerCase().startsWith(searchTerm) && */
             <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>}
  
    </div>
  )
}

export default Home
