const AboutWindow = ({ window, isActive }) => {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>{window.title}</h2>
      <p>Window state: <strong>{window.state}</strong></p>
      <p>{isActive ? "Active Window" : "Inactive Window"}</p>
    </div>
  );
};

export default AboutWindow;

