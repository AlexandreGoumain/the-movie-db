import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex justify-center items-center p-4 bg-gray-800 gap-8">
            <button className="bg-gray-300 p-2 rounded-md text-black">
                <Link to="/">Home</Link>
            </button>
        </div>
    );
}
