import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:4000/api/tafsiir";

const AddTafsiir = () => {
  const [juzList, setJuzList] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    juzNumber: "",
    surahNumber: "",
    surahName: "",
    partNumber: "",
    ayahFrom: "",
    ayahTo: "",
    tafsiirTitle: "",
    sheikhName: "",
    description: "",
    mediaType: "audio",
    sourceType: "link",
    audioUrl: "",
    videoUrl: "",
  });

  useEffect(() => {
    loadJuz();
  }, []);

  const loadJuz = async () => {
    const { data } = await axios.get(`${API}/juz`);
    setJuzList(data.juzList || []);
  };

  const handleJuz = async (e) => {
    const juz = e.target.value;

    const { data } = await axios.get(
      `${API}/juz/${juz}`
    );

    setSurahs(data.surahs || []);

    setForm((prev) => ({
      ...prev,
      juzNumber: juz,
      surahNumber: "",
      surahName: "",
      partNumber: "",
    }));
  };

  const handleSurah = async (e) => {
    const num = e.target.value;

    const selected = surahs.find(
      (item) =>
        String(item.surahNumber) ===
        String(num)
    );

    const { data } = await axios.get(
      `${API}/next-part/${num}`
    );

    setForm((prev) => ({
      ...prev,
      surahNumber: num,
      surahName:
        selected?.surahName || "",
      partNumber: String(
        data.nextPart || ""
      ),
    }));
  };

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          fd.append(
            key,
            value ?? ""
          );
        }
      );

      if (file) {
        fd.append("file", file);
      }

      const { data } = await axios.post(
        `${API}/add`,
        fd
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message || "Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        Add Tafsiir
      </h1>

      <form
        onSubmit={submit}
        className="grid md:grid-cols-2 gap-4"
      >
        <select
          value={
            form.juzNumber || ""
          }
          onChange={handleJuz}
          className="border p-3 rounded"
        >
          <option value="">
            Select Juz
          </option>

          {juzList.map((j) => (
            <option key={j} value={j}>
              Juz {j}
            </option>
          ))}
        </select>

        <select
          value={
            form.surahNumber ||
            ""
          }
          onChange={handleSurah}
          className="border p-3 rounded"
        >
          <option value="">
            Select Surah
          </option>

          {surahs.map((s) => (
            <option
              key={s.surahNumber}
              value={s.surahNumber}
            >
              {s.surahName}
            </option>
          ))}
        </select>

        <input
          readOnly
          value={
            form.partNumber ||
            ""
          }
          className="border p-3 rounded bg-gray-100"
        />

        <select
          name="mediaType"
          value={
            form.mediaType ||
            "audio"
          }
          onChange={change}
          className="border p-3 rounded"
        >
          <option value="audio">
            Audio
          </option>
          <option value="video">
            Video
          </option>
        </select>

        <select
          name="sourceType"
          value={
            form.sourceType ||
            "link"
          }
          onChange={change}
          className="border p-3 rounded"
        >
          <option value="link">
            External Link
          </option>
          <option value="upload">
            Upload File
          </option>
        </select>

        {form.sourceType ===
        "upload" ? (
          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="border p-3 rounded"
          />
        ) : form.mediaType ===
          "audio" ? (
          <input
            name="audioUrl"
            value={
              form.audioUrl ||
              ""
            }
            onChange={change}
            placeholder="Audio URL"
            className="border p-3 rounded"
          />
        ) : (
          <input
            name="videoUrl"
            value={
              form.videoUrl ||
              ""
            }
            onChange={change}
            placeholder="Video URL"
            className="border p-3 rounded"
          />
        )}

        <input
          name="ayahFrom"
          value={
            form.ayahFrom || ""
          }
          onChange={change}
          placeholder="Ayah From"
          className="border p-3 rounded"
        />

        <input
          name="ayahTo"
          value={
            form.ayahTo || ""
          }
          onChange={change}
          placeholder="Ayah To"
          className="border p-3 rounded"
        />

        <input
          name="tafsiirTitle"
          value={
            form.tafsiirTitle ||
            ""
          }
          onChange={change}
          placeholder="Title"
          className="border p-3 rounded"
        />

        <input
          name="sheikhName"
          value={
            form.sheikhName ||
            ""
          }
          onChange={change}
          placeholder="Sheikh"
          className="border p-3 rounded"
        />

        <textarea
          rows="4"
          name="description"
          value={
            form.description ||
            ""
          }
          onChange={change}
          placeholder="Description"
          className="border p-3 rounded md:col-span-2"
        />

        <button className="bg-black text-white p-3 rounded md:col-span-2">
          {loading
            ? "Saving..."
            : "Add Tafsiir"}
        </button>
      </form>
    </div>
  );
};

export default AddTafsiir;