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

useEffect(() => {
loadData();
}, []);

const loadData =
async () => {

try {

const { data } =
await axios.get(API);

const audioOnly =
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
audioOnly
);

} catch(err){

console.log(err);
}
};

const filtered =
grouped.filter(
(item)=>

item.surahName
.toLowerCase()
.includes(
search.toLowerCase()
)
);

const playSurah =
(item, parts) => {

playTrack(
item,
parts
);
};

return (

<div className="premium-page">

{/* HERO */}

<div className="premium-hero">

<p className="hero-bismillah">
﷽
</p>

<h1 className="premium-title">
القرآن الكريم
</h1>

<p className="premium-sub">
استمع إلى تفسير القرآن الكريم
بصوت الشيخ عبد الناصر حاجي أحمد
</p>

</div>

{/* SEARCH */}

<div className="premium-search-wrap">

<input
type="text"
placeholder="ابحث عن سورة..."
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
className="premium-search"
/>

</div>

{/* LIST */}

<div className="premium-list">

{
filtered.map(
(surah)=>{

const open =
expanded ===
surah.surahNumber;

return (

<div
key={
surah.surahNumber
}
className={`
premium-card
${open ? "open" : ""}
`}
>

{/* TOP */}

<div
className="premium-card-top"
onClick={()=>
setExpanded(
open
? null
: surah.surahNumber
)
}
>

<div className="premium-left">

<div className="premium-number">

{
surah.surahNumber
}

</div>

<div>

<h2 className="premium-surah">

{
surah.surahName
}

</h2>

<p className="premium-meta">

{
surah.parts.length
}
{" "}
دروس

</p>

</div>

</div>

<div className="premium-actions">

<button
className="premium-play"
onClick={(e)=>{

e.stopPropagation();

playSurah(
surah.parts[0],
surah.parts
);

}}
>

▶

</button>

<span className="premium-arrow">

{
open
? "⌄"
: "›"
}

</span>

</div>

</div>

{/* PARTS */}

{
open && (

<div className="premium-parts">

{
surah.parts.map(
(item)=>{

const active =
currentTrack?._id ===
item._id;

const liked =
favorites.includes(
item._id
);

return (

<div
key={item._id}
className={`
premium-part
${active ? "active" : ""}
`}
>

<div className="premium-part-left">

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

<div className="premium-part-actions">

<button
className="small-play"
onClick={()=>{

if(active){

togglePlay();

}else{

playSurah(
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
className="small-play"
onClick={()=>
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