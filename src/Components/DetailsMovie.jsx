import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

export default function DetailsMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState(null);

    const optionsSearch = (id) => {
        return {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${id}`,
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };
    };

    const videosOptions = (id) => {
        return {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${id}/videos`,
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };
    };

    const handleFetch = async () => {
        setLoading(true);
        axios
            .request(optionsSearch(id))
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleFetchVideos = async () => {
        setLoading(true);
        axios
            .request(videosOptions(id))
            .then((res) => {
                setVideos(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleFetch();
        handleFetchVideos();
    }, []);

    console.log(videos);

    return (
        <>
            {loading && <div>Loading...</div>}
            {movie && (
                <>
                    <div className="flex justify-center items-center p-8 bg-gray-900 text-white">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className="max-w-72"
                        />

                        <div className="flex flex-col gap-4">
                            <h1 className="text-5xl font-bold">
                                {movie.title}
                            </h1>
                            <p className="text-xl">{movie.overview}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 p-8 justify-center items-center">
                        <div className="h-96 w-1/2">
                            {videos &&
                                videos.results.map((video, index) => (
                                    <>
                                        <p>Trailer {index + 1}</p>
                                        <ReactPlayer
                                            key={video.id}
                                            url={`https://www.youtube.com/watch?v=${video.key}`}
                                            width="100%"
                                            height="100%"
                                        />
                                    </>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
