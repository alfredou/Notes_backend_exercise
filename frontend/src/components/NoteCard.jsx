import { useNavigate } from "react-router-dom";

function NoteCard({ note }) {
  const navigate = useNavigate();

  return (
    <>
        <div
          className="flex justify-between bg-white p-3 rounded-lg shadow-lg px-10 my-2 hover:cursor-pointer hover:bg-cyan-600"
          onClick={() => navigate(`/notes/${note.note_id}/edit`)}
          >
          <div>
             <h3 className="font-bold text-xl">{note.title}</h3>
             <p>{note.content}</p>
          </div>
          <div className={note.Category ? `justify-center content-center h-full bg-slate-400 opacity-95 rounded-md p-1 px-3 w-24` : ''}>
              <div>{note.Category?.category_name}</div>
          </div>
        </div>
    </>
  );
}

export default NoteCard;
