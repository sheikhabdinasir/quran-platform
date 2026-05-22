import React,{
useContext,
useEffect,
useState
} from "react";

import axios from "axios";

import "../tafsiir.css";

import {
TafsiirPlayerContext
} from "../Context/TafsiirPlayerContext";

const TafsiirAudio = () => {

const API =
`${import.meta.env.VITE_API_URL}/api/tafsiir/grouped`;

const [grouped,
setGrouped] =
useState([]);

const [expanded,
setExpanded] =
useState(null);

const [search,
setSearch] =
useState("");

const {
currentTrack,
isPlaying,
playTrack,
togglePlay,
favorites,
toggleFavorite
} = useContext(
TafsiirPlayerContext
);

/********************************
 LOAD
********************************/

useEffect(() => {
loadData();
}, []);

const loadData =
async () => {

try {

const { data } =
await axios.get(API);

const onlyAudio =
data.grouped.map(
(surah) => ({

...surah,

parts:
surah.parts.filter(
(item) =>
item.audioUrl
)

})
).filter(
(surah) =>
surah.parts.length > 0
);

setGrouped(
onlyAudio
);

} catch(err) {

console.log(err);
}
};

/********************************
 SEARCH
********************************/

const filtered =
grouped.filter(
(surah) =>

surah.surahName
.toLowerCase()
.includes(
search.toLowerCase()
)
);

/********************************
 PLAY
********************************/

const playPart =
(item, surahParts) => {

const tracks =
surahParts.filter(
(track) =>
track.audioUrl
);

playTrack(
item,
tracks
);
};

return (

<div className="
min-h-screen
bg-[#07111F]
text-white
px-4
py-8
">

<div className="
max-w-6xl
mx-auto
">

{/* HEADER */}

<div className="
text-center
mb-12
">

<p className="
text-yellow-400
text-lg
mb-3
">
﷽
</p>

<h1 className="
text-4xl
md:text-6xl
font-bold
bg-gradient-to-r
from-yellow-400
to-amber-500
bg-clip-text
text-transparent
mb-4
leading-tight
">
دروس التفسير
</h1>

<p className="
text-gray-400
max-w-2xl
mx-auto
leading-relaxed
">
استمع إلى تفسير القرآن الكريم
بجودة عالية وتصميم فاخر
</p>

</div>

{/* SEARCH */}

<div className="
mb-10
">

<input
type="text"
placeholder="
Search Surah...
"
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
className="
w-full
bg-[#111827]
border
border-yellow-500/20
rounded-2xl
px-5
py-4
text-white
placeholder-gray-500
focus:outline-none
focus:ring-2
focus:ring-yellow-500
"
/>

</div>

{/* SURAHS */}

<div className="
space-y-5
">

{
filtered.map(
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
border-yellow-500/10
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
shadow-lg
">

{
surah.surahNumber
}

</div>

<div className="
text-left
">

<h2 className="
text-2xl
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
Lessons

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
(item) => {

const active =
currentTrack?._id ===
item._id;

const liked =
favorites.includes(
item._id
);

return (

<div
key={
item._id
}
className={`
p-6
flex
flex-col
lg:flex-row
lg:items-center
justify-between
gap-6
transition
duration-300
${
active
? `
bg-yellow-500/5
`
: `
hover:bg-[#0F172A]
`
}
`}
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
">

{
item.sheikhName
}

</p>

</div>

{/* ACTIONS */}

<div className="
flex
items-center
gap-3
">

<button
onClick={() => {

if(active){

togglePlay();

}else{

playPart(
item,
surah.parts
);
}

}}
className="
w-14
h-14
rounded-2xl
bg-gradient-to-r
from-yellow-400
to-amber-500
text-black
text-xl
font-bold
shadow-lg
hover:scale-105
transition
duration-300
"
>

{
active &&
isPlaying
? "❚❚"
: "▶"
}

</button>

<button
onClick={() =>
toggleFavorite(
item._id
)
}
className="
text-3xl
text-yellow-400
hover:scale-110
transition
duration-300
"
>

{
liked
? "★"
: "☆"
}

</button>

</div>

</div>

);

})
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

export default TafsiirAudio;