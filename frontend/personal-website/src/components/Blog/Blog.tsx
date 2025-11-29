import React, { useState, useEffect } from 'react';
import { stringToColor } from '../../helpers/helpers.ts';
import { X } from 'lucide-react';

// Define the shape of a Blog object
type tBlog = {
  id: string;
  title: string;
  summary: string;
  date_created: string;
  cover_image: string;
  tags: string[];
};

const queryBlogs = async () => {
  // Function to hit endpoint to get all of the stored blogs. 
  try {
    const res = await fetch("http://localhost:8080/api/blog/");
    const data = await res.json();
    return data as tBlog[];  // returns the blogs array
  } catch (err) {
    console.error(err);
    return [];
  }
}

const addSubscriber = async (emailAddress: string) => {
  try {
    const res = await fetch("http://localhost:8080/api/subscriber/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailAddress }),
    });

    if (!res.ok) {
      throw new Error("Failed to subscribe");
    }

    const data = await res.json();
    return data; 
  } catch (err) {
    console.error("Error adding subscriber:", err);
    throw err;
  }
};


const Blog = () => {
  const [blogs, setBlogs] = useState<tBlog[]>([]);
  const [email, setEmail] = useState<string>("");
  const [subMessage, setSubMessage] = useState<string>(""); // State for subscription status feedback
  
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await queryBlogs();
      setBlogs(fetchedBlogs);

      const tagsSet = new Set<string>();
      
      for (const blog of fetchedBlogs) {
        if (blog.tags) {
          for (const tag of blog.tags) {
            tagsSet.add(tag);
          }
        }
      }
      
      setAllTags(Array.from(tagsSet));
    };
    fetchBlogs();
  }, []);

  const handleTagFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = event.target.value;
    if (tag && !tagFilters.includes(tag)) {
      setTagFilters([...tagFilters, tag]);
    }
  };

  const onRemoveTagFilter = (tagToRemove: string) => {
    setTagFilters(tagFilters.filter(t => t !== tagToRemove));
  };

  const handleEmailButtonPress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await addSubscriber(email);
      setSubMessage("Successfully added to list of subscribers - Welcome!");
      setEmail(""); // Clear input on success
      
      // Clear message after 3 seconds
      setTimeout(() => setSubMessage(""), 3000);
    } catch (err) {
      setSubMessage("Failed to subscribe. Please try again.");
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    if (tagFilters.length === 0) return true;

    const matchFound = blog.tags.some(tag => tagFilters.includes(tag));
    return matchFound;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", marginTop:"40px" }}>
      <h1 style={{fontSize:"64px", fontWeight:"bold", textAlign:"center", marginBottom:"-10px", color:"#1a202c"}}>
        Blog
      </h1>
      <p>A collection of thoughts and ideas that I am learning about.</p>
      <form 
        onSubmit={handleEmailButtonPress}
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "30px"
      }}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          style={{
            padding: "10px 20px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
            flex: 1,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          Subscribe
        </button>
      </form>
      
      {/* Subscription Status Message */}
      {subMessage && (
        <div style={{ marginBottom: "20px", color: subMessage.includes("Failed") ? "red" : "green", fontSize: "14px" }}>
          {subMessage}
        </div>
      )}

      {/* --- Filter Section --- */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px", width: "100%", maxWidth: "1200px" }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Filter by Tag:</span>
          <select
            value={""} // Always empty to allow re-selecting
            onChange={handleTagFilterChange}
            style={{
              padding: '5px 10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              marginLeft: '10px'
            }}>
            <option value="" disabled>Select a tag...</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))} 
          </select>
        </div>

        {/* Selected Tags (Chips) */}
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tagFilters.map(tag => (
            <span 
              key={tag} 
              onClick={() => onRemoveTagFilter(tag)} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                backgroundColor: '#e2e8f0',
                borderRadius: '12px',
                cursor: 'pointer', 
                color: '#475569',
                fontSize: '14px'
              }}>
              {tag} 
              <X size={14} style={{ marginLeft: '4px' }}/> 
            </span>
          ))}
        </div>
      </div>

      {/* --- Blog List --- */}
      <div style={{ width: "100%", maxWidth: "1200px", padding: "0 20px" }}>
        {filteredBlogs.length === 0 && <p>No blogs found matching these tags.</p>}
        
        {filteredBlogs.map((blog) => (
          <a key={blog.id} href={`/blog/${blog.id}`} style={{textDecoration:"none", color:"inherit"}}>
            <div
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
                <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "10px", color: "#1a202c" }}>
                  {blog.title}
                </h2>
                <p style={{ fontSize: "16px", color: "#4b5563" }}>
                  {blog.summary}
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px" }}>
                  {blog.date_created.split(" ")[0]}
                </p>
                <div style={{display:"flex", gap:"10px", flexWrap: "wrap"}}>
                  {blog.tags.map((tag) => (
                    <div key={tag} style={{backgroundColor: stringToColor(tag), padding: "2px 8px", borderRadius:"5px", color:"white", fontSize: "12px"}}> 
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <img
                src={`http://localhost:8080/${blog.cover_image}`}
                alt={blog.title}
                style={{
                  width: "300px",
                  height: "180px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Blog;
