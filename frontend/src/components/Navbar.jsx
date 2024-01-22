import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const location =  useLocation()

  return (
    <nav className="flex items-center justify-between">
      <Link to="/">
        <h1 className="text-white font-bold text-4xl my-4">Notes</h1>
      </Link>
    <div className="flex gap-2">
      {location.pathname === "/notes/new" || location.pathname.includes('/notes/') ? (
        <button
          className="bg-slate-200 text-black font-bold py-2 px-4 rounded-lg my-2"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      ) : (
        <button
          className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg my-2 hover:bg-cyan-700"
          onClick={() => navigate("/notes/new")}
        >
          Add Note
        </button>
      )}
      <button
          className="bg-cyan-600 text-white font-bold py-2 px-2 rounded-lg my-2 hover:bg-cyan-700"
          onClick={() => navigate("/category/new")}
        >
          Add Category
      </button>
    </div>
    </nav>
  );
}
