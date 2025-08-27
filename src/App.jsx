import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import SolutionsPage from './pages/SolutionsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import useQuizStore from './store/quizStore';

function App() {
  const { currentPage, setCurrentQuiz, startQuiz } = useQuizStore();

  useEffect(() => {
    // Check for shared quiz in URL
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    
    if (quizParam) {
      try {
        const decodedQuiz = decodeURIComponent(atob(quizParam));
        const quizData = JSON.parse(decodedQuiz);
        setCurrentQuiz(quizData);
        startQuiz(quizData);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Error parsing shared quiz:', error);
      }
    }
  }, [setCurrentQuiz, startQuiz]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'upload':
        return <UploadPage />;
      case 'quiz':
        return <QuizPage />;
      case 'results':
        return <ResultsPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;