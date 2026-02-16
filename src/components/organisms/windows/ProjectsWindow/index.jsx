const ProjectsWindow = ({ window }) => {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Projects</h2>
      <p>Size: {window.size}</p>
      <p>State: {window.state}</p>
    </div>
  );
};

export default ProjectsWindow;
