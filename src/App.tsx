import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Learn = lazy(() => import('./pages/Learn'))
const Lesson = lazy(() => import('./pages/Lesson'))
const Play = lazy(() => import('./pages/Play'))
const Puzzles = lazy(() => import('./pages/Puzzles'))
const Impact = lazy(() => import('./pages/Impact'))
const Profile = lazy(() => import('./pages/Profile'))
const ParentDashboard = lazy(() => import('./pages/ParentDashboard'))
const ThemeSelector = lazy(() => import('./pages/ThemeSelector'))
const Quiz = lazy(() => import('./pages/Quiz'))

function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-bounce">♞</div>
        <p className="text-gray-400 font-semibold">Carregando...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
