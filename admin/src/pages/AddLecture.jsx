import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { playDing } from "../utils/playSound";

const AddLecture = () => {
  
  const [form, setForm] = useState({
  title: "",
  speaker: "",
  description: "",
});

const [audioFile, setAudioFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
  !form.title ||
  !form.speaker ||
  !form.description ||
  !audioFile
) {
      toast.error("❌ Fadlan buuxi dhammaan xogta");
      return;
    }

    try {

      const formData = new FormData();

formData.append("title", form.title);
formData.append("speaker", form.speaker);
formData.append("description", form.description);
formData.append("file", audioFile);

await axios.post(
  `${import.meta.env.VITE_API_URL}/api/lectures/add`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      playDing();
      toast.success("✅ Muxaadarada si guul ah ayaa loogu daray");

     setForm({
  title: "",
  speaker: "",
  description: "",
});

setAudioFile(null);

    } catch (error) {
      toast.error("❌ Khalad ayaa dhacay");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100 p-6">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-yellow-500">

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          ➕ Ku Dar Muxaadarooyin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="block font-semibold mb-1">Magaca Muxaadarrada</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Tusaale: Soonka"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* SPEAKER */}
          <div>
            <label className="block font-semibold mb-1">Magaca Shiikhka</label>
            <input
              name="speaker"
              value={form.speaker}
              onChange={handleChange}
              placeholder="Shiikh Abdinasir..."
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-semibold mb-1">Sharaxaad</label>
            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Sharaxaad kooban..."
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
            />
          </div>

     <div>
  <label className="block font-semibold mb-1">
    Audio File (MP3)
  </label>

  <input
    type="file"
    accept=".mp3,audio/*"
    onChange={(e) =>
      setAudioFile(e.target.files[0])
    }
    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 outline-none"
  />
</div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full transition transform hover:scale-105 shadow-lg"
          >
            💾 Save Lecture
          </button>

        </form>

      </div>

    </section>
  );
};

export default AddLecture;
