import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { apiUrl } from "../services/api";
import useFetch from "../hooks/useFetch";


const NoteList = () => {
  const [noteList, setNoteList] = useState([]);
  const [activeList, setActiveList] = useState(false);
  const [category, setCategory] = useState({
    category_name: ""
  });
  const {data: dataCat, loading: loadingCat, error} = useFetch("/categories") 

  const loadNotes = async () => {
    const res = await apiUrl.get("/notes");
    const data = res.data;
    setNoteList(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const filterActiveNotes = (notes, catName) => {
    const dataFiltered = notes.filter((task) => (catName) ? task.archived !== true && task.Category?.category_name == catName : task.archived !== true)
    return dataFiltered
  };

  const filterArchivedNotes = (notes, catName) => {
    const dataFiltered = notes.filter((task) => (catName) ? task.archived !== false && task.Category?.category_name == catName : task.archived !== false);
    return dataFiltered
  };

  const handleChange = () => {
    setActiveList((prevActiveList) => !prevActiveList);
  };

  const handleSelectChange = (e) => {
    const { name, value, type } = e.target;
    setCategory((prevTask) => ({ ...prevTask, [name]: value == "None" ? "" : value }));
  };
  const renderNoNotesMessage = () => {
    return (
      <>
         <br/>
         <h1 className="text-white font-bold">You don't have notes associated with this category</h1>
      </>
    )
    }

  return (
    <>
        <h1 className="text-white font-bold w-3">{activeList ? "Archived" : "Active"}</h1>
        <div className="flex justify-end">
          <label className="flex justify-end w-fit gap-3 text-white">
            <input
              type="checkbox"
              checked={activeList}
              onChange={handleChange}
            />
            {activeList ? "Show Active" : "Show Archived"}
          </label>
        </div>
        <div className="flex flex-col w-28">
          <label className="text-white" htmlFor="categorias">Filter:</label>
          <select className="border border-gray-400 p-2 rounded-md block my-1 w-fit" id="categorias" name="category_name" value={category.category_name} onChange={handleSelectChange}>
            <option value="">Selecciona...</option>
            {dataCat?.map((option) => (
              <option key={option.category_name} value={option.category_name}>
                {option.category_name}
              </option>
            ))}
            <option value="None">None</option>
          </select>
        </div>
    {activeList
      ? (filterArchivedNotes(noteList, category.category_name).length == 0)
        ? renderNoNotesMessage()
        : filterArchivedNotes(noteList, category.category_name).map((note) => (
          <NoteCard key={note.note_id} note={note} />
        ))
      : (filterActiveNotes(noteList, category.category_name).length == 0)
        ? renderNoNotesMessage()
        : filterActiveNotes(noteList, category.category_name).map((note) => (
          <NoteCard key={note.note_id} note={note} />
        ))}
    </>
  );
};

export default NoteList;
