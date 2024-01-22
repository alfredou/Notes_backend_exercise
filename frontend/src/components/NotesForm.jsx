import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { apiUrl } from "../services/api";

const NotesForm = () => {
  const [notes, setNotes] = useState({
    title: "",
    content: "",
    archived: false,
    category_id: undefined
  });
  
  const {data: dataCat, loading: loadingCat, error} = useFetch("/categories") 

  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {
    if (params.id) {
      loadNotes(params.id);
    }
  }, [params.id]);

  const loadNotes = async (id) => {
    const result = await apiUrl.get(`/notes/${id}`);
    const data = result.data
    setNotes({ title: data.title, content: data.content, archived: data.archived, category_id: data.Category?.category_id });
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiUrl.delete(`/note/${id}`)
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (params.id) {
        const res = await apiUrl.put(`/notes/${params.id}`, notes, {
          headers: { "Content-Type": "application/json" },
        })
      } else {
        const response = await apiUrl.post("/notes", notes, {
          headers: { "Content-Type": "application/json" },
        });
      }
      navigate("/");
    } 
    catch (error) {
      console.error(error);
    }
  };


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setNotes((prevNote) => ({ ...prevNote, [name]: type === 'checkbox' ? e.target.checked : value == "None" ? undefined : value }));
  };
  
  
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <div className="w-2/5">
        <h3 className="font-bold text-2xl my-3 text-white">
          {params.id ? "Update Note" : "Create Note"}
        </h3>
        <input
          type="text"
          name="title"
          placeholder="Write your title"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={notes.title}
          autoFocus
        />
        <textarea
          name="content"
          rows={4}
          placeholder="Write your description"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={notes.content}
        ></textarea>
     <div className="flex gap-8 py-2">
        <div>
          <label className="text-white font-bold" htmlFor="categorias">Selecciona una categoria:</label>
          <select className="border border-gray-400 p-2 rounded-md block my-2 w-fit" id="categorias" name="category_id" value={notes.category_id} onChange={handleChange}>
            <option>Selecciona...</option>
            {dataCat?.map((option) => (
              <option key={option.category_name} value={option.category_id}>
                {option.category_name}
              </option>
            ))}
            <option value="None">None</option>
          </select>
        </div>
        {params.id && <div>
              <label className="text-white font-bold flex gap-2">
                <input
                  type="checkbox"
                  checked={notes.archived}
                  name="archived"
                  onChange={handleChange}
                  />
                {notes.archived ? "Archived" : "Archive Note"}
              </label>
        </div>}
    </div>
    <div className="flex justify-between">
         {params.id && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() => handleDelete(params.id)}
            >
                  Delete
          </button>
              )}
          <button
            onClick={(e)=>handleSubmit(e)}
            disabled={!notes.title || !notes.content}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
              Save
          </button>
    </div>
  </div>
</div>
  );
};

export default NotesForm;
