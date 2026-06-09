import { useState } from "react";

const EditLessonModal = ({ lesson, onClose, onSave }) => {
  const [title, setTitle] = useState(lesson.title);
  const [order, setOrder] = useState(lesson.order);
const [audioFile, setAudioFile] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">✏️ Edit Lesson</h3>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded mb-3"
          placeholder="Lesson Number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />

 <input
  type="file"
  accept="audio/*"
  className="w-full border p-2 rounded mb-4"
  onChange={(e) =>
    setAudioFile(
      e.target.files[0]
    )
  }
/>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
           

  
  onClick={() => {

    const formData =
      new FormData();

    formData.append(
      "title",
      title
    );

    formData.append(
      "order",
      order
    );

    if (audioFile) {

      formData.append(
        "file",
        audioFile
      );
    }

    onSave(
      lesson._id,
      formData
    );
  }}
  className="px-4 py-2 bg-emerald-600 text-white rounded"
>
  Save
</button>
        </div>
      </div>
    </div>
  );
};

export default EditLessonModal;
EditLessonModal.jsx