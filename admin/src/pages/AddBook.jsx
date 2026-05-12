import { useState, useContext } from "react";
import { useDuruus } from "../Context/DuruusContext";
import { AdminContext } from "../Context/AdminContext";
import toast from "react-hot-toast";

const AddBook = () => {
  const { addBook } = useDuruus();
  const { aToken } = useContext(AdminContext);

  const [title, setTitle] = useState("");
  const [sheikhName, setSheikhName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !sheikhName) {
      toast.error("Fadlan geli magaca kitaabka iyo magaca shiikha");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("sheikhName", sheikhName);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await addBook(formData, aToken);

      toast.success("📘 Kitaabka si guul ah ayaa loo keydiyay");

      setTitle("");
      setSheikhName("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("❌ Kitaabka lama keydin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-xl">
        {/* MAIN CARD */}
        <div className="relative bg-white rounded-3xl border border-yellow-100 shadow-[0_20px_60px_rgba(234,179,8,0.12)] p-5 sm:p-7 overflow-hidden">
          
          {/* TOP COLOR LINE */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400"></div>

          {/* BACKGROUND CIRCLES */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10">
            {/* HEADER */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-white text-2xl shadow-lg mb-4">
                📚
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                               kaydi Kitaab Cusub
              </h2>

            </div>

            {/* FORM */}
            <form onSubmit={submitHandler} className="space-y-5">
              {/* TITLE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  magaca Kitaabka
                </label>

                <input
                  type="text"
                  placeholder="Magaca Kitaabka"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>

              {/* SHEIKH */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Magaca Shiikha
                </label>

                <input
                  type="text"
                  placeholder="Magaca Shiikha"
                  value={sheikhName}
                  onChange={(e) => setSheikhName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sharaxaad (Optional)
                </label>

                <textarea
                  placeholder="Sharaxaad kooban oo ku saabsan kitaabka"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sawirka Kitaabka (Optional)
                </label>

                <div className="border-2 border-dashed border-yellow-200 rounded-xl p-4 bg-yellow-50/70">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full text-sm text-gray-600
                    file:mr-3
                    file:py-2
                    file:px-4
                    file:rounded-lg
                    file:border-0
                    file:text-sm
                    file:font-medium
                    file:bg-yellow-500
                    file:text-white
                    hover:file:bg-yellow-600"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 text-sm shadow-lg hover:shadow-xl transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "➕ Kaydi Kitaabka"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;