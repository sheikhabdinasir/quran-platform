import { useState, useEffect } from "react";
import { useDuruus } from "../Context/DuruusContext";
import EditLessonModal from "../components/EditLessonModal";

const LessonList = () => {
  const {
    lessons,
    getLessons,
    books,
    getBooks,
    updateLesson,
    deleteLesson, // ✅ DELETE
  } = useDuruus();

  const [selectedBook, setSelectedBook] = useState("");
  const [editLesson, setEditLesson] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  const loadLessons = (bookId) => {
    setSelectedBook(bookId);
    if (bookId) getLessons(bookId);
  };

  const selectedBookTitle =
    books.find((b) => b._id === selectedBook)?.title || "";

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">📚 Lesson List</h2>

      {/* Book Selector */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium mb-1">
        DOORO KITAAB
        </label>
        <select
          value={selectedBook}
          onChange={(e) => loadLessons(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">-- Choose Book --</option>
          {books.map((b) => (
            <option key={b._id} value={b._id}>
              {b.title}
            </option>
          ))}
        </select>
      </div>

      {/* Lessons */}
      {selectedBook && (
        <>
          <h3 className="text-xl font-semibold mb-3">
            🎧 Lessons – {selectedBookTitle}
          </h3>

          {lessons.length === 0 ? (
            <p className="text-gray-500">CASHAR LAMA HELIN!.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((l) => (
                <div
                  key={l._id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      casharka: #{l.order}
                    </p>
                    <h4 className="font-semibold text-lg">
                      {l.title}
                    </h4>
                  </div>

                  <audio controls src={l.audioUrl} className="w-full" />

                  {/* ACTIONS */}

<div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => setEditLesson(l)}
                      className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        const ok = window.confirm(
                          "Ma hubtaa inaad tirtirto casharkan?"
                        );
                        if (!ok) return;

                        await deleteLesson(l._id);
                        await getLessons(selectedBook); // 🔄 refresh list
                      }}
                      className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== EDIT LESSON MODAL ===== */}
      {editLesson && (
        <EditLessonModal
          lesson={editLesson}
          onClose={() => setEditLesson(null)}
          onSave={async (id, data) => {
            await updateLesson(id, data);
            await getLessons(selectedBook);
            setEditLesson(null);
          }}
        />
      )}
    </div>
  );
};

export default LessonList;
