import { useState, useEffect } from "react";
import { useDuruus } from "../Context/DuruusContext";
import toast from "react-hot-toast";

const AddLesson = () => {
  const { books, getBooks, addLesson } = useDuruus();

  const [data, setData] = useState({
    title: "",
    order: 1,
    book: "",
    audioUrl: "",
  });

  useEffect(() => {
    getBooks();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!data.title || !data.book || !data.audioUrl) {
      toast.error("Fadlan buuxi dhammaan xogta");
      return;
    }

    try {
      await addLesson(data);
      toast.success("Lesson si guul ah ayaa loo daray ✅");
      setData({ title: "", order: 1, book: "", audioUrl: "" });
    } catch (error) {
      toast.error("Lesson lama keydin ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          ➕   geli  cashar csub     
        </h2>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Lesson Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              magaca ciwaanka
            </label>
            <input
              type="text"
              placeholder="Tusaale: Casharka 1aad"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Order + Book */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                numbers sax ah u samee
              </label>
              <input
                type="number"
                value={data.order}
                onChange={(e) =>
                  setData({ ...data, order: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daooro kitaab
              </label>
              <select
                value={data.book}
                onChange={(e) => setData({ ...data, book: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">  Xulo kitaab </option>
                {books.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Audio URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audio URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/audio.mp3"
              value={data.audioUrl}
              onChange={(e) => setData({ ...data, audioUrl: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl
                       font-semibold hover:bg-blue-700 transition duration-200"
          >
            ➕ KAYDI CASHARKA
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
