import { ArrowLeftIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.dismiss(); // Dismiss any existing toasts
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    // Dismiss any existing toasts before showing a new one
    toast.dismiss();
    const toastId = toast.loading("Creating note...");
    
    try {
      await api.post("/notes", formData);
      toast.success("Note created successfully!", { id: toastId });
      navigate("/");
    } catch (error: any) {
      console.error("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a moment.", {
          id: toastId,
          duration: 4000,
          icon: "⏳",
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to create note", { id: toastId });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link 
            to="/" 
            className="btn btn-ghost mb-6"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-2xl font-semibold mb-6">Create New Note</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label htmlFor="title" className="label">
                    <span className="label-text font-medium mb-2">Title</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered w-full focus:outline-none"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="content" className="label">
                    <span className="label-text font-medium mb-2">Content</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full h-40 resize-none focus:outline-none p-4"
                    value={formData.content}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      'Create Note'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;