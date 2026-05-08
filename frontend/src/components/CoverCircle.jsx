function CoverCircle({ cover, title }) {
  return (
    <div className="cover-circle">
      {cover ? (
        <img src={cover} alt={title} />
      ) : (
        <div className="audio-icon">📖</div>
      )}
    </div>
  );
}

export default CoverCircle;
