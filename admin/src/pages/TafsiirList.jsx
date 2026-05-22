import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

const TafsiirList = () => {

const API =
`${import.meta.env.VITE_API_URL}/api/tafsiir`;

const [grouped, setGrouped] =
useState([]);

const [expanded, setExpanded] =
useState(null);

const [loading, setLoading] =
useState(true);

/********************************
 LOAD DATA
********************************/

const loadData = async () => {

try {

setLoading(true);

const { data } =
await axios.get(
`${API}/grouped`
);

setGrouped(
data.grouped || []
);

} catch {

toast.error(
"Failed to load Tafsiir"
);

} finally {

setLoading(false);
}
};

useEffect(() => {

loadData();

}, []);

/********************************
 TOGGLE ACTIVE
********************************/

const toggleItem =
async (id) => {

try {

await axios.patch(
`${API}/toggle/${id}`
);

toast.success(
"Status Updated"
);

loadData();

} catch {

toast.error(
"Failed"
);
}
};

/********************************
 DELETE
********************************/

const removeItem =
async (id) => {

const confirmDelete =
window.confirm(
"Delete this Tafsiir?"
);

if (
!confirmDelete
) return;

try {

await axios.delete(
`${API}/delete/${id}`
);

toast.success(
"Deleted Successfully"
);

loadData();

} catch {

toast.error(
"Delete Failed"
);
}
};

return (

<div className="
min-h-screen
bg-[#0B1120]
text-white
px-4
py-8
">

<div className="
max-w-7xl
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
Tafsiir Management
</h1>

<p className="
text-gray-400
max-w-2xl
mx-auto
">
Maamul dhammaan
tafsiirka Qur'aanka
si casri ah.
</p>

</div>

{/* LOADING */}

{
loading && (

<div className="
text-center
py-20
text-yellow-400
text-xl
">
Loading...
</div>

)}

{/* EMPTY */}

{
!loading &&
grouped.length === 0 && (

<div className="
bg-[#111827]
border
border-yellow-500/20
rounded-3xl
p-10
text-center
text-gray-400
">
No Tafsiir Found
</div>

)}

{/* GROUPED */}

<div className="
space-y-6
">

{
grouped.map(
(surah) => {

const isOpen =
expanded ===
surah.surahNumber;

return (

<div
key={
surah.surahNumber
}
className="
bg-[#111827]
border
border-yellow-500/20
rounded-3xl
overflow-hidden
shadow-2xl
"
>

{/* SURAH HEADER */}

<button
onClick={() =>
setExpanded(
isOpen
? null
: surah.surahNumber
)
}
className="
w-full
flex
items-center
justify-between
px-6
py-5
hover:bg-[#1F2937]
transition
duration-300
"
>

<div className="
flex
items-center
gap-4
">

<div className="
w-14
h-14
rounded-2xl
bg-gradient-to-br
from-yellow-400
to-amber-600
flex
items-center
justify-center
text-black
font-bold
text-lg
shadow-lg
">

{
surah.surahNumber
}

</div>

<div className="text-left">

<h2 className="
text-xl
font-bold
text-yellow-400
">
{
surah.surahName
}
</h2>

<p className="
text-sm
text-gray-400
mt-1
">
{
surah.parts.length
}
{" "}
Parts
</p>

</div>

</div>

<div className="
text-3xl
text-yellow-400
">

{
isOpen
? "−"
: "+"
}

</div>

</button>

{/* PARTS */}

{
isOpen && (

<div className="
border-t
border-yellow-500/10
divide-y
divide-yellow-500/10
">

{
surah.parts.map(
(item) => (

<div
key={
item._id
}
className="
p-6
flex
flex-col
lg:flex-row
lg:items-center
justify-between
gap-6
hover:bg-[#0F172A]
transition
duration-300
"
>

{/* LEFT */}

<div className="
flex-1
">

<div className="
flex
flex-wrap
items-center
gap-3
mb-3
">

<span className="
bg-yellow-500/10
text-yellow-400
px-3
py-1
rounded-full
text-sm
font-medium
">

Part
{" "}
{
item.partNumber
}

</span>

<span className="
bg-white/5
text-gray-300
px-3
py-1
rounded-full
text-sm
">

{
item.ayahFrom
}
-
{
item.ayahTo
}

</span>

<span className="
bg-white/5
text-gray-300
px-3
py-1
rounded-full
text-sm
uppercase
">

{
item.mediaType
}

</span>

</div>

<h3 className="
text-xl
font-semibold
mb-2
">

{
item.tafsiirTitle
}

</h3>

<p className="
text-gray-400
mb-4
">

{
item.sheikhName
}

</p>

{
item.description && (

<p className="
text-sm
text-gray-500
leading-relaxed
max-w-3xl
">

{
item.description
}

</p>

)}

{/* AUDIO */}

{
item.audioUrl && (

<audio
controls
className="
w-full
mt-5
rounded-xl
"
>

<source
src={
item.audioUrl
}
/>

</audio>

)}

{/* VIDEO */}

{
item.videoUrl && (

<video
controls
className="
w-full
max-w-xl
rounded-2xl
mt-5
"
>

<source
src={
item.videoUrl
}
/>

</video>

)}

</div>

{/* ACTIONS */}

<div className="
flex
flex-wrap
gap-3
">

<button
onClick={() =>
toggleItem(
item._id
)
}
className={`
px-5
py-3
rounded-2xl
font-medium
transition
duration-300
${
item.isActive
? `
bg-green-500/20
text-green-400
hover:bg-green-500/30
`
: `
bg-red-500/20
text-red-400
hover:bg-red-500/30
`
}
`}
>

{
item.isActive
? "Active"
: "Inactive"
}

</button>

<button
className="
px-5
py-3
rounded-2xl
bg-blue-500/20
text-blue-400
hover:bg-blue-500/30
font-medium
transition
duration-300
"
>

Edit

</button>

<button
onClick={() =>
removeItem(
item._id
)
}
className="
px-5
py-3
rounded-2xl
bg-red-500/20
text-red-400
hover:bg-red-500/30
font-medium
transition
duration-300
"
>

Delete

</button>

</div>

</div>

))
}

</div>

)}

</div>

);
})
}

</div>

</div>

</div>
);
};

export default TafsiirList;