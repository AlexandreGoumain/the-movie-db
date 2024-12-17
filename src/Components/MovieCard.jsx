import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col gap-2 bg-gray-800 p-4 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate(`/movie/${movie.id}`)}
        >
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                />
            )}
            <div>
                <p>titre : {movie.title}</p>
                <p>sortie le : {movie.release_date}</p>
                <div>
                    <p>note : {movie.vote_average}</p>
                    <p>nombre de votes : {movie.vote_count}</p>
                </div>
            </div>
        </div>
    );
}
