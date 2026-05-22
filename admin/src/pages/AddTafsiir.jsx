import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { quranSurahs } from "../data/quranSurahs";

const API =
  `${import.meta.env.VITE_API_URL}/api/tafsiir`;

const AddTafsiir = () => {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [selectedSurah, setSelectedSurah] =
    useState(null);

  const [form, setForm] =
    useState({
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

  /********************************
   HANDLE CHANGE
  ********************************/

  const change = (e) => {

    setForm((prev) => ({
      ...prev,

      [e.target.name]:
        e.target.value,
    }));
  };

  /********************************
   HANDLE SURAH
  ********************************/

  const handleSurah =
    async (e) => {

      const num =
        Number(
          e.target.value
        );

      const selected =
        quranSurahs.find(
          (item) =>
            item.surahNumber ===
            num
        );

      const surahJuz =
        selected?.juz || 1;

      try {

        const { data } =
          await axios.get(
            `${API}/next-part/${num}`
          );

        setSelectedSurah(
          selected
        );

        setForm((prev) => ({
          ...prev,

          juzNumber:
            surahJuz,

          surahNumber:
            num,

          surahName:
            selected?.surahName || "",

          partNumber:
            String(
              data.nextPart || 1
            ),
        }));

      } catch {

        toast.error(
          "Failed to load next part"
        );
      }
    };

  /********************************
   SUBMIT
  ********************************/

  const submit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        /********************************
         AYAH VALIDATION
        ********************************/

        if (
          selectedSurah &&
          Number(form.ayahTo) >
          selectedSurah.ayahs
        ) {

          toast.error(
            `Surah-ka wuxuu leeyahay ${selectedSurah.ayahs} aayadood oo keliya`
          );

          setLoading(false);

          return;
        }

        if (
          Number(form.ayahFrom) >
          Number(form.ayahTo)
        ) {

          toast.error(
            "Ayah From cannot be greater than Ayah To"
          );

          setLoading(false);

          return;
        }

        const fd =
          new FormData();

        Object.entries(form).forEach(
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

        const { data } =
          await axios.post(
            `${API}/add`,
            fd
          );

        toast.success(
          data.message
        );

        /********************************
         RESET
        ********************************/

        setFile(null);

        setSelectedSurah(null);

        setForm({
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

<div className="
min-h-screen
bg-[#0B1120]
text-white
px-4
py-10
">

<div className="
max-w-5xl
mx-auto
">

{/* HEADER */}

<div className="
mb-10
text-center
">

<h1 className="
text-4xl
md:text-5xl
font-bold
bg-gradient-to-r
from-yellow-400
to-amber-500
bg-clip-text
text-transparent
mb-3
">
Add Tafsiir
</h1>

<p className="
text-gray-400
max-w-2xl
mx-auto
">
Ku dar tafsiirka Qur'aanka
si professional ah.
</p>

</div>

{/* CARD */}

<div className="
bg-[#111827]
border
border-yellow-500/20
rounded-3xl
p-6
md:p-10
shadow-2xl
">

<form
onSubmit={submit}
className="
grid
md:grid-cols-2
gap-6
"
>

{/* SURAH */}

<div className="md:col-span-2">

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Select Surah
</label>

<select
value={
  form.surahNumber || ""
}
onChange={handleSurah}
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
focus:outline-none
focus:ring-2
focus:ring-yellow-500
"
>

<option value="">
Select Surah
</option>

{quranSurahs.map(
  (surah) => (

<option
key={
  surah.surahNumber
}
value={
  surah.surahNumber
}
>

{surah.surahNumber}.
{" "}
{surah.arabicName}
{" - "}
{surah.surahName}

</option>

))}
</select>

</div>

{/* PART NUMBER */}

<div>

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Part Number
</label>

<input
readOnly
value={
  form.partNumber || ""
}
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
"
/>

</div>

{/* SHEIKH */}

<div>

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Sheikh Name
</label>

<input
name="sheikhName"
value={
  form.sheikhName
}
onChange={change}
placeholder="Enter Sheikh Name"
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
placeholder-gray-500
focus:outline-none
focus:ring-2
focus:ring-yellow-500
"
/>

</div>

{/* AYAH FROM */}

<div>

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Ayah From
</label>

<input
name="ayahFrom"
value={
  form.ayahFrom
}
onChange={change}
placeholder="1"
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
"
/>

{
selectedSurah && (
<p className="
text-xs
text-gray-400
mt-2
">
Total Ayahs:
{" "}
<span className="text-yellow-400">
{selectedSurah.ayahs}
</span>
</p>
)}

</div>

{/* AYAH TO */}

<div>

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Ayah To
</label>

<input
name="ayahTo"
value={
  form.ayahTo
}
onChange={change}
placeholder="7"
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
"
/>

</div>

{/* TITLE */}

<div className="md:col-span-2">

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Tafsiir Title
</label>

<input
name="tafsiirTitle"
value={
  form.tafsiirTitle
}
onChange={change}
placeholder="Enter Tafsiir Title"
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
"
/>

</div>

{/* MEDIA TYPE */}

<div>

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Media Type
</label>

<select
name="mediaType"
value={
  form.mediaType
}
onChange={change}
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
"
>

<option value="audio">
Audio
</option>

<option value="video">
Video
</option>

</select>

</div>

{/* SOURCE TYPE */}

<div>

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Source Type
</label>

<select
name="sourceType"
value={
  form.sourceType
}
onChange={change}
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
"
>

<option value="link">
External Link
</option>

<option value="upload">
Upload File
</option>

</select>

</div>

{/* URL OR FILE */}

<div className="md:col-span-2">

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
{
form.sourceType ===
"upload"
? "Upload File"
: "Media URL"
}
</label>

{form.sourceType ===
"upload" ? (

<input
type="file"
onChange={(e) =>
setFile(
e.target.files[0]
)
}
className="
w-full
bg-[#0F172A]
border
border-dashed
border-yellow-500/30
rounded-2xl
px-4
py-6
text-white
"
/>

) : (

<input
name={
form.mediaType ===
"audio"
? "audioUrl"
: "videoUrl"
}
value={
form.mediaType ===
"audio"
? form.audioUrl
: form.videoUrl
}
onChange={change}
placeholder="Paste Media URL"
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
"
/>

)}

</div>

{/* DESCRIPTION */}

<div className="md:col-span-2">

<label className="
block
text-sm
text-yellow-400
mb-2
font-medium
">
Description
</label>

<textarea
rows="5"
name="description"
value={
  form.description
}
onChange={change}
placeholder="Write description..."
className="
w-full
bg-[#0F172A]
border
border-yellow-500/20
rounded-2xl
px-4
py-4
text-white
resize-none
"
/>

</div>

{/* BUTTON */}

<button
disabled={loading}
className="
md:col-span-2
bg-gradient-to-r
from-yellow-500
to-amber-600
hover:from-yellow-400
hover:to-amber-500
transition-all
duration-300
rounded-2xl
py-4
font-bold
text-black
text-lg
shadow-lg
"
>

{
loading
? "Saving..."
: "Add Tafsiir"
}

</button>

</form>

</div>

</div>

</div>
  );
};

export default AddTafsiir;