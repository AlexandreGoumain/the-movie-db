import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";

function App() {
    const [dataToFetch, setDataToFetch] = useState(null);
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
    };

    const optionsSearch = (title) => {
        return {
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?query=${title}`,
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };
    };

    const handleFetch = async () => {
        setLoading(true);
        axios
            .request(options)
            .then((res) => {
                setDataToFetch(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const specificMovieByTitle = async (title) => {
        setLoading(true);
        axios
            .request(optionsSearch(title))
            .then((res) => {
                setDataToFetch(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleFetch();
    }, [page]);

    console.log(dataToFetch);

    return (
        <div className="text-white">
            <div className="flex gap-2 justify-center items-center p-8">
                <input
                    type="text"
                    className="text-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={() => specificMovieByTitle(title)}>
                    Rechercher
                </button>
            </div>

            <div className="flex justify-center items-center gap-2">
                <button
                    onClick={() => setPage(page - 1)}
                    className="bg-gray-800 p-2 rounded-md"
                >
                    Précédent
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-800 p-2 rounded-md"
                >
                    Suivant
                </button>
            </div>

            {loading && <div>Loading...</div>}

            {dataToFetch && dataToFetch.results.length > 0 ? (
                <>
                    <div className="grid grid-cols-4 gap-4">
                        {dataToFetch.results.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </>
            ) : (
                <div>Aucun film trouvé</div>
            )}
        </div>
    );
}

export default App;
