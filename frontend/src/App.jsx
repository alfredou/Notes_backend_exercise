import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./components/NotesForm";
import TasksList from "./components/NotesList";
import Navbar from "./components/Navbar";
import AddCategory from "./components/AddCategory";

function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-20">
        <Navbar />
        <Routes>
          <Route index path="/" element={<TasksList />} />
          <Route path="/notes/new" element={<TaskForm />} />
          <Route path="/notes/:id/edit" element={<TaskForm />} />
          <Route path="/category/new" element={<AddCategory/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
