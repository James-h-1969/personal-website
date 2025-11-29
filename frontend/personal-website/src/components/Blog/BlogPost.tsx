import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { tBlog } from "./BlogTypes.ts";
import {stringToColor} from "../../helpers/helpers.ts"; 
import { FaArrowLeft } from "react-icons/fa";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const queryBlog = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:8080/api/blog/${id}`);
    const data = await res.json();
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const BlogPost = () => {
  const [blog, setBlog] = useState<tBlog | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const data = await queryBlog(Number(id));
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "center",
          color: "#6B7280", // gray
        }}
      >
        Loading blog post...
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "80px", // push down below title bar
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          backgroundColor: "white",
          padding: "32px",
        }}
      >
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            padding: "8px 12px",
            borderRadius: "8px",
            width: "fit-content",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
            transition: "background 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e5e5")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
        >
          <FaArrowLeft style={{ fontSize: "18px" }} />
          <a 
            href="/blog/" 
            style={{ 
              textDecoration: "none", 
              color: "inherit", 
              fontSize: "16px", 
              fontWeight: "500" 
            }}
          >
            Return to Blogs
          </a>
        </div>
        <div style={{display:"flex", alignItems:"center", gap: '20px'}}> 
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            {blog.title}
          </h1>
          {
            blog.tags.map(tag => (
              <div style={{backgroundColor:stringToColor(tag), padding: "2px 8px", borderRadius:"5px", color:"white", fontSize: "12px"}}>{tag}</div>
            ))
          }
        </div>
        <p
          style={{
            color: "#6B7280", // subtle gray
            marginBottom: "24px",
          }}
        >
          {new Date(blog.date_created).toLocaleDateString()}
        </p>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#374151",
            lineHeight: "1.75rem",
          }}
        >
          {blog.summary}
        </p>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
