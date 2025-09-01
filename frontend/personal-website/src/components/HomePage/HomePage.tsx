export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "600px" }}>
        {/* Profile Image */}
        <div>
          <img
            src="/profile.jpg"
            alt="James Hocking"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
        </div>

        {/* Intro Text */}
        <div style={{ fontSize: "18px", marginBottom: "20px" }}>
          Hi! I am <strong>James Hocking</strong>, a 22 year old{" "}
          <em>Mechatronic Engineer</em> and <em>Computer Scientist</em>.  
          I am keen to get in touch if you are passionate about Software,  
          Artificial Intelligence, Space, or all of the above!
        </div>

        <p style={{ fontSize: "16px", color: "#4b5563" }}>jameshocking542@gmail.com</p>

      </div>
    </div>
  );
}
