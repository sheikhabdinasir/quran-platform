import { usePublic } from "../context/PublicContext";

function LessonRow({ lesson }) {
  const { playLesson } = usePublic();

  const handlePlay = () => {
    playLesson(lesson);
  };

  return (
    <div className="lesson-row" onClick={handlePlay}>
      <div className="lesson-info">
        <h4>{lesson.title}</h4>
        {lesson.sheikh && <p>{lesson.sheikh}</p>}
      </div>

      <button className="play-btn">▶</button>
    </div>
  );
}

export default LessonRow;
