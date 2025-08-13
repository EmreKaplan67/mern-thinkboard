import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../api/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }: { note: any, setNotes: any }) => {
    
    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully!");
            setNotes((prev: any) => prev.filter((note: any) => note._id !== id));
        } catch (error: any) {
            console.error("Error deleting note", error);
            toast.error("Failed to delete note");
        }
    }
  return (
    <Link to={`/note/${note._id}`} className="block">
    <div className="card bg-base-100 w-[350px] shadow-sm hover:shadow-lg transition-all duration-200" id={note._id}>
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>{note.content}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-circle btn-sm">
              <PenSquareIcon className="size-4" />
            </button>
            <button
              className="btn btn-ghost btn-circle btn-sm text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default NoteCard;
