import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API =
`${import.meta.env.VITE_API_URL}/api/tafsiir`;


const AddTafsiir = () => {

  const [surahs, setSurahs] =
    useState([]);

  const [file, setFile] =
    useState(null);

  // ⬇️ HALKAN KU DAR
  const fileInputRef = useRef(null);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      juzNumber: "1",
      surahNumber: "",
      surahName: "",

      partNumber: "",

      ayahFrom: "",
      ayahTo: "",

      tafsiirTitle: "",

      sheikhName: "",

      description: "",

  

    });

  /* ================= LOAD SURAHS ================= */

  useEffect(() => {

    loadSurahs();

  }, []);

  const loadSurahs =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${API}/juz/1`
          );

        setSurahs(
          data.surahs || []
        );

      } catch (err) {

        console.log(err);
      }
    };

  /* ================= HANDLE SURAH ================= */

  const handleSurah =
    async (e) => {

      const num =
        e.target.value;

      const selected =
        surahs.find(
          (item) =>
            String(
              item.surahNumber
            ) ===
            String(num)
        );

      const { data } =
        await axios.get(
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

  /* ================= CHANGE ================= */

  const change = (e) => {

    setForm((prev) => ({

      ...prev,

      [e.target.name]:
        e.target.value,

    }));
  };

  /* ================= SUBMIT ================= */

  const submit =
    async (e) => {

      e.preventDefault();
if (!file) {
  toast.error("MP3 file dooro");
  return;
}
      try {

        setLoading(true);

        const fd =
          new FormData();

        Object.entries(form)
          .forEach(
            ([key, value]) => {

              fd.append(
                key,
                value ?? ""
              );

            }
          );

        if (file) {

          fd.append(
            "file",
            file
          );
        }
const aToken = localStorage.getItem("aToken");
        const { data } =
  await axios.post(
    `${API}/add`,
    fd,
    {
      headers: {
        Authorization: `Bearer ${aToken}`,
      },
    }
  );
  toast.success(data.message);

setFile(null);

setForm({
  juzNumber: "1",
  surahNumber: "",
  surahName: "",
  partNumber: "",
  ayahFrom: "",
  ayahTo: "",
  tafsiirTitle: "",
  sheikhName: "",
  description: "",
});
if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

      } catch (error) {

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed"
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

        {/* ================= SURAH ================= */}

        <select
          value={
            form.surahNumber ||
            ""
          }
          onChange={
            handleSurah
          }
          className="border p-3 rounded"
        >

          <option value="">
            Select Surah
          </option>

          {
            surahs.map((s) => (

              <option
                key={
                  s.surahNumber
                }

                value={
                  s.surahNumber
                }
              >

                {
                  s.surahName
                }

              </option>

            ))
          }

        </select>

        {/* ================= PART ================= */}

        <input
          readOnly

          value={
            form.partNumber ||
            ""
          }

          className="border p-3 rounded bg-gray-100"

          placeholder="Part Number"
        />

{/* ================= AUDIO FILE ================= */}


<input
  ref={fileInputRef}
  type="file"
  accept=".mp3,audio/*"
  onChange={(e) =>
    setFile(e.target.files[0])
  }
  className="border p-3 rounded"
/>

        {/* ================= AYAH ================= */}

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

        {/* ================= TITLE ================= */}

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

        {/* ================= SHEIKH ================= */}

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

        {/* ================= DESCRIPTION ================= */}

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

        {/* ================= BUTTON ================= */}

        <button
          className="bg-black text-white p-3 rounded md:col-span-2"
        >

          {
            loading
              ? "Saving..."
              : "Add Tafsiir"
          }

        </button>

      </form>

    </div>
  );
};

export default AddTafsiir;