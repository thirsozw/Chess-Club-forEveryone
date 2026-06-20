import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Lesson from './pages/Lesson'
import Play from './pages/Play'
import Puzzles from './pages/Puzzles'
import Impact from './pages/Impact'
import Profile from './pages/Profile'
import ParentDashboard from './pages/ParentDashboard'
import ThemeSelector from './pages/ThemeSelector'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:lessonId" element={<Lesson />} />
          <Route path="/play" element={<Play />} />
          <Route path="/puzzles" element={<Puzzles />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/parents" element={<ParentDashboard />} />
          <Route path="/themes" element={<ThemeSelector />} />
          <Route path="/quiz/:lessonId" element={<Quiz />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
