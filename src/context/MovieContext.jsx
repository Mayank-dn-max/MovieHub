import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

// Move this after the context creation and add error handling
export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
}; 

export const MovieProvider = ({children}) => { 
    // Initialize state with stored data immediately
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    return (
        <MovieContext.Provider 
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite
            }}
        >
            {children} 
        </MovieContext.Provider>
    );
};