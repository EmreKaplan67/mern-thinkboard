import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes"); // cookies auto-attached
        setNotes(response.data?.data);
      } catch (error: any) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="flex flex-wrap gap-4">
          {notes?.map((note: any) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
