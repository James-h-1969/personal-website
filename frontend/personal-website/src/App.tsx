import TaskBar from './components/TaskBar.tsx';
import BlogPost from './components/Blog/BlogPost.tsx'
import Blog from './components/Blog/Blog.tsx';
import Projects from './components/Projects/Projects.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <TaskBar />
        <BrowserRouter>
          <Routes>
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
