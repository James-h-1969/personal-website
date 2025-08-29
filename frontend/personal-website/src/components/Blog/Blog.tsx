import { useEffect, useState } from "react";
import type { tBlog } from "./BlogTypes.ts";

const queryBlogs = async () => {
  // Function to hit endpoint to get all of the stored blogs. 
  // TODO. Add filtering based on topic
  try {
    const res = await fetch("http://localhost:8080/api/blog/");
    const data = await res.json();
    return data;  // returns the blogs array
  } catch (err) {
    console.error(err);
    return [];
  }
}

const Blog = () => {
  const [blogs, setBlogs] = useState<tBlog[]>([]);
  
  // ensure that the blogs show
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await queryBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, [])

   const containerStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "64px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#1a202c", // dark gray
    marginBottom: "-10px"
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        Blog
      </h1>
      <p>A collection of thoughts and ideas that I am learning about.</p>
      <div style={{ width: "100%", maxWidth: "1200px", padding: "0 20px" }}>
        {blogs.map((blog) => (
          <a href={`/blog/${blog.id}`} style={{textDecoration:"none", color:"inherit"}}>
          <div
            key={blog.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              backgroundColor: "#ffffff",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-4px)";
              target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ flex: "1", paddingRight: "20px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  color: "#1a202c",
                }}
              >
                {blog.title}
              </h2>
              <p style={{ fontSize: "16px", color: "#4b5563" }}>
                {blog.summary}
              </p>
              <p>
                {blog.date_created.split(" ")[0]}
              </p>
            </div>

            <img
              src={`http://localhost:8080/${blog.cover_image}`}
              alt={blog.title}
              style={{
                width: "200px",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Blog; 
