import { useState, useEffect } from "react";

const EditBookModal = ({ book, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [sheikhName, setSheikhName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setSheikhName(book.sheikhName || "");
      setDescription(book.description || "");
      setImage(null);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("sheikhName", sheikhName);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    onSave(book._id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* HEADER */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-800">
            ✏️ Edit Book
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Cusboonaysii xogta kitaabka
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Title
            </label>

            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* SHEIKH */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sheikh Name
            </label>

            <input
              type="text"
              placeholder="Sheikh Name"
              value={sheikhName}
              onChange={(e) => setSheikhName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm resize-none focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* CURRENT IMAGE */}
          {book?.image && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Image
              </label>

              <div className="rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
            </div>
          )}

          {/* NEW IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Book Image
            </label>

            <div className="border border-dashed border-gray-300 rounded-xl p-3 bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-gray-600
                file:mr-3
                file:py-2
                file:px-3
                file:rounded-lg
                file:border-0
                file:text-sm
                file:font-medium
                file:bg-emerald-600
                file:text-white
                hover:file:bg-emerald-700"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-medium transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;