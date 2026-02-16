const ResumeWindow = ({ window }) => {
  const isFullscreen = window.state === "fullscreen";
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Resume</h2>
      <p>Window state: <strong>{window.state}</strong></p>
      {isFullscreen ? (
        <p>Fullscreen Resume View</p>
      ) : (
        <p>Windowed Resume View</p>
      )}
    </div>
  );
};

export default ResumeWindow;
