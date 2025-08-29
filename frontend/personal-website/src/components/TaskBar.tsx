
import { FaLinkedin, FaGithub } from "react-icons/fa";

const TaskBar = () => {
  const iconStyle: React.CSSProperties = {
    fontSize: "24px",
    margin: "0 8px",
    color: "#ffffff", // pale red for your theme
    transition: "transform 0.2s, color 0.2s",
    cursor: "pointer",
    paddingTop: "6px",
  };

  const handleIconHover = (e: React.MouseEvent<SVGElement, MouseEvent>, enter: boolean) => {
    const target = e.currentTarget;
    if (enter) {
      target.style.color = "#d1d5db"; // darker red on hover
      target.style.transform = "scale(1.2)";
    } else {
      target.style.color = "white";
      target.style.transform = "scale(1)";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        backgroundColor: "#1e293b", // dark slate
        color: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1800px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {/* Logo + Socials */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            James Hocking
          </div>
       </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems:"center" }}>

          <a
            href="https://www.linkedin.com/in/jameshocking1969/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              style={iconStyle}
              onMouseEnter={(e) => handleIconHover(e, true)}
              onMouseLeave={(e) => handleIconHover(e, false)}
            />
          </a>

          <a
            href="https://github.com/James-h-1969"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              style={iconStyle}
              onMouseEnter={(e) => handleIconHover(e, true)}
              onMouseLeave={(e) => handleIconHover(e, false)}
            />
          </a>
 
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          >
            Home
          </a>

          <a
            href="/blog"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          >
            Blog
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskBar;

