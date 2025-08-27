import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';
import useQuizStore from '../store/quizStore';

const QuizPage = () => {
  const {
    currentQuiz,
    currentQuestionIndex,
    userAnswers,
    timeLeft,
    isQuizActive,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    updateTimer,
    setCurrentPage
  } = useQuizStore();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!currentQuiz) {
      setCurrentPage('home');
      return;
    }

    // Set initial selected answer
    setSelectedAnswer(userAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, userAnswers, currentQuiz, setCurrentPage]);

  useEffect(() => {
    if (!isQuizActive || timeLeft === 0) return;

    const timer = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizActive, timeLeft, updateTimer]);

  if (!currentQuiz) {
    return null;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    answerQuestion(currentQuestionIndex, answerIndex);
    setShowFeedback(true);
    
    // Auto-advance after a short delay
    setTimeout(() => {
      setShowFeedback(false);
      if (isLastQuestion) {
        completeQuiz();
      } else {
        nextQuestion();
      }
    }, 1500);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionVariant = (optionIndex) => {
    if (!showFeedback) {
      return selectedAnswer === optionIndex ? 'selected' : 'default';
    }
    
    if (optionIndex === currentQuestion.correctAnswer) {
      return 'correct';
    }
    
    if (selectedAnswer === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
      return 'incorrect';
    }
    
    return 'default';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="sticky top-16 z-40 glass border-b border-neutral-200/60">
        <div className="container-max section-padding py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-neutral-900 truncate max-w-xs">
                {currentQuiz.title}
              </h1>
              <div className="text-sm text-neutral-500">
                {currentQuestionIndex + 1} of {currentQuiz.questions.length}
              </div>
            </div>
            
            {currentQuiz.timeLimit && (
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium ${
                timeLeft < 60 
                  ? 'bg-error-100 text-error-700' 
                  : timeLeft < 300 
                    ? 'bg-warning-100 text-warning-700'
                    : 'bg-primary-100 text-primary-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <ProgressBar progress={progress} />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container-max section-padding py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8" padding="lg">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      Question {currentQuestionIndex + 1}
                    </span>
                    {currentQuestion.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        currentQuestion.difficulty === 'easy' 
                          ? 'bg-success-100 text-success-700'
                          : currentQuestion.difficulty === 'medium'
                            ? 'bg-warning-100 text-warning-700'
                            : 'bg-error-100 text-error-700'
                      }`}>
                        {currentQuestion.difficulty}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-semibold text-neutral-900 leading-tight">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => {
                    const variant = getOptionVariant(index);
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isIncorrect = showFeedback && isSelected && !isCorrect;
                    
                    return (
                      <motion.button
                        key={index}
                        whileHover={!showFeedback ? { scale: 1.02 } : {}}
                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                        onClick={() => !showFeedback && handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                          variant === 'correct'
                            ? 'border-success-300 bg-success-50 text-success-900'
                            : variant === 'incorrect'
                              ? 'border-error-300 bg-error-50 text-error-900'
                              : variant === 'selected'
                                ? 'border-primary-300 bg-primary-50 text-primary-900'
                                : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/50 text-neutral-900'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                              variant === 'correct'
                                ? 'bg-success-200 text-success-800'
                                : variant === 'incorrect'
                                  ? 'bg-error-200 text-error-800'
                                  : variant === 'selected'
                                    ? 'bg-primary-200 text-primary-800'
                                    : 'bg-neutral-200 text-neutral-700'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-lg font-medium">{option}</span>
                          </div>
                          
                          {showFeedback && (
                            <div className="flex-shrink-0">
                              {isCorrect && (
                                <CheckCircle className="w-6 h-6 text-success-600" />
                              )}
                              {isIncorrect && (
                                <XCircle className="w-6 h-6 text-error-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {showFeedback && currentQuestion.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200"
                  >
                    <h4 className="font-semibold text-neutral-900 mb-2">Explanation:</h4>
                    <p className="text-neutral-700">{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {!showFeedback && (
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                icon={ChevronLeft}
              >
                Previous
              </Button>

              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  onClick={completeQuiz}
                  icon={Flag}
                >
                  Submit Quiz
                </Button>
                
                <Button
                  onClick={isLastQuestion ? completeQuiz : nextQuestion}
                  disabled={selectedAnswer === null}
                  icon={isLastQuestion ? Flag : ChevronRight}
                  iconPosition="right"
                >
                  {isLastQuestion ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;