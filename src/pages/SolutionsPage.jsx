import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  Lightbulb,
  ArrowLeft,
  Target
} from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';
import useQuizStore from '../store/quizStore';

const SolutionsPage = () => {
  const {
    currentQuiz,
    userAnswers,
    results,
    setCurrentPage
  } = useQuizStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!currentQuiz || !results) {
      setCurrentPage('home');
    }
  }, [currentQuiz, results, setCurrentPage]);

  if (!currentQuiz || !results) {
    return null;
  }

  const currentQuestion = currentQuiz.questions[currentIndex];
  const userAnswer = userAnswers[currentIndex];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  const progress = ((currentIndex + 1) / currentQuiz.questions.length) * 100;

  const nextQuestion = () => {
    if (currentIndex < currentQuiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getOptionStatus = (optionIndex) => {
    if (optionIndex === currentQuestion.correctAnswer) {
      return 'correct';
    }
    if (userAnswer === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
      return 'incorrect';
    }
    return 'default';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="sticky top-16 z-40 glass border-b border-neutral-200/60">
        <div className="container-max section-padding py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('results')}
                icon={ArrowLeft}
                size="sm"
              >
                Back to Results
              </Button>
              <div className="h-6 w-px bg-neutral-300" />
              <h1 className="text-lg font-semibold text-neutral-900">
                Solutions Review
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-neutral-500">
                {currentIndex + 1} of {currentQuiz.questions.length}
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                isCorrect 
                  ? 'bg-success-100 text-success-700'
                  : userAnswer !== null
                    ? 'bg-error-100 text-error-700'
                    : 'bg-warning-100 text-warning-700'
              }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Correct</span>
                  </>
                ) : userAnswer !== null ? (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Incorrect</span>
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" />
                    <span>Skipped</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-padding py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8" padding="lg">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      Question {currentIndex + 1}
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

                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map((option, index) => {
                    const status = getOptionStatus(index);
                    const isUserAnswer = userAnswer === index;
                    
                    return (
                      <div
                        key={index}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                          status === 'correct'
                            ? 'border-success-300 bg-success-50'
                            : status === 'incorrect'
                              ? 'border-error-300 bg-error-50'
                              : 'border-neutral-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                              status === 'correct'
                                ? 'bg-success-200 text-success-800'
                                : status === 'incorrect'
                                  ? 'bg-error-200 text-error-800'
                                  : 'bg-neutral-200 text-neutral-700'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className={`text-lg font-medium ${
                              status === 'correct'
                                ? 'text-success-900'
                                : status === 'incorrect'
                                  ? 'text-error-900'
                                  : 'text-neutral-900'
                            }`}>
                              {option}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {isUserAnswer && (
                              <span className="text-sm font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-full">
                                Your Answer
                              </span>
                            )}
                            {status === 'correct' && (
                              <CheckCircle className="w-6 h-6 text-success-600" />
                            )}
                            {status === 'incorrect' && (
                              <XCircle className="w-6 h-6 text-error-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {currentQuestion.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-200/50"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-2">
                          Explanation
                        </h4>
                        <p className="text-neutral-700 leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={previousQuestion}
              disabled={currentIndex === 0}
              icon={ChevronLeft}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {currentQuiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary-500 scale-125'
                      : userAnswers[index] === currentQuiz.questions[index].correctAnswer
                        ? 'bg-success-300 hover:bg-success-400'
                        : userAnswers[index] !== null
                          ? 'bg-error-300 hover:bg-error-400'
                          : 'bg-warning-300 hover:bg-warning-400'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextQuestion}
              disabled={currentIndex === currentQuiz.questions.length - 1}
              icon={ChevronRight}
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;