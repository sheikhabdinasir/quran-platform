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
 LOAD DATA
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
 FILTER
********************************/

const filtered =
grouped.filter(
(item) =>

item.surahName
.toLowerCase()
.includes(
search.toLowerCase()
)
);

/********************************
 PLAY
********************************/

const handlePlay =
(item, parts) => {

const tracks =
parts.filter(
(track) =>
track.audioUrl
);

playTrack(
item,
tracks
);
};

return (

<div className="tafsiir-page">

<div className="tafsiir-wrap">

{/* HERO */}

<div className="hero">

<div className="hero-content">

<p className="hero-small">
﷽
</p>

<h1 className="hero-title">
القرآن الكريم
</h1>

<p className="hero-sub">
استمع إلى تفسير القرآن الكريم
بصوت الشيخ عبد الناصر حاجي أحمد
</p>

</div>

</div>

{/* SEARCH */}

<div className="search-box">

<input
type="text"
placeholder="ابحث عن سورة..."
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
className="search-input"
/>

</div>

{/* SURAHS */}

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
className="surah-card"
>

{/* HEADER */}

<button
className="surah-header"
onClick={() =>
setExpanded(
isOpen
? null
: surah.surahNumber
)
}
>

<div className="surah-left">

<div className="surah-number">
{
surah.surahNumber
}
</div>

<div className="surah-info">

<h2>
{
surah.surahName
}
</h2>

<div className="surah-meta">

<span>
{
surah.parts.length
}
{" "}
دروس
</span>

</div>

</div>

</div>

<button
className="surah-play"
onClick={(e)=>{

e.stopPropagation();

handlePlay(
surah.parts[0],
surah.parts
);

}}
>

▶

</button>

</button>

{/* PARTS */}

{
isOpen && (

<div className="parts-wrap">

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
className="part-item"
>

<div className="part-left">

<h3>
{
item.tafsiirTitle
}
</h3>

<p>

Part {
item.partNumber
}
{" • "}

{
item.sheikhName
}

</p>

</div>

<div
style={{
display:"flex",
gap:"12px"
}}
>

<button
className="part-play"
onClick={() => {

if(active){

togglePlay();

}else{

handlePlay(
item,
surah.parts
);
}

}}
>

{
active &&
isPlaying
? "❚❚"
: "▶"
}

</button>

<button
className="part-play"
onClick={() =>
toggleFavorite(
item._id
)
}
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
);
};

export default TafsiirAudio;