import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import Header from './components/Header'

type Page = 'home' | 'upload' | 'quiz' | 'results'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentQuiz, setCurrentQuiz] = useState<any>(null)
  const [quizResults, setQuizResults] = useState<any>(null)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />
      case 'upload':
        return <UploadPage onNavigate={setCurrentPage} onQuizStart={(quiz) => {
          setCurrentQuiz(quiz)
          setCurrentPage('quiz')
        }} />
      case 'quiz':
        return <QuizPage 
          quiz={currentQuiz} 
          onComplete={(results) => {
            setQuizResults(results)
            setCurrentPage('results')
          }}
          onNavigate={setCurrentPage}
        />
      case 'results':
        return <ResultsPage 
          results={quizResults}
          quiz={currentQuiz}
          onNavigate={setCurrentPage}
          onRetake={() => {
            setCurrentPage('quiz')
          }}
        />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
    </div>
  )
}

export default App