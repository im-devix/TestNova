import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface Quiz {
  title: string
  description?: string
  questions: Question[]
}

interface QuizPageProps {
  quiz: Quiz
  onComplete: (results: any) => void
  onNavigate: (page: string) => void
}

const QuizPage = ({ quiz, onComplete, onNavigate }: QuizPageProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    setSelectedAnswer(userAnswers[currentQuestionIndex])
  }, [currentQuestionIndex, userAnswers])

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Quiz Available</h2>
          <button
            onClick={() => onNavigate('upload')}
            className="btn-primary"
          >
            Upload a Quiz
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setUserAnswers(newAnswers)
    setShowFeedback(true)
    
    // Auto-advance after showing feedback
    setTimeout(() => {
      setShowFeedback(false)
      if (isLastQuestion) {
        completeQuiz(newAnswers)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }, 2000)
  }

  const completeQuiz = (answers: (number | null)[]) => {
    const endTime = Date.now()
    const totalTime = Math.round((endTime - startTime) / 1000)
    
    let correct = 0
    let incorrect = 0
    let unattempted = 0
    
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++
      } else if (answers[index] !== null) {
        incorrect++
      } else {
        unattempted++
      }
    })
    
    const results = {
      correct,
      incorrect,
      unattempted,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100),
      totalTime,
      userAnswers: answers
    }
    
    onComplete(results)
  }

  const getOptionVariant = (optionIndex: number) => {
    if (!showFeedback) {
      return selectedAnswer === optionIndex ? 'selected' : 'default'
    }
    
    if (optionIndex === currentQuestion.correctAnswer) {
      return 'correct'
    }
    
    if (selectedAnswer === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
      return 'incorrect'
    }
    
    return 'default'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-16 z-40 glass border-b border-gray-200/60">
        <div className="container-max section-padding py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs">
                {quiz.title}
              </h1>
              <div className="text-sm text-gray-500">
                {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container-max section-padding py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card p-8 mb-8"
          >
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  Question {currentQuestionIndex + 1}
                </span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const variant = getOptionVariant(index)
                const isSelected = selectedAnswer === index
                const isCorrect = index === currentQuestion.correctAnswer
                const isIncorrect = showFeedback && isSelected && !isCorrect
                
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
                            : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/50 text-gray-900'
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
                                : 'bg-gray-200 text-gray-700'
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
                )
              })}
            </div>

            {showFeedback && currentQuestion.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                <p className="text-gray-700">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Navigation */}
          {!showFeedback && (
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </motion.button>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => completeQuiz(userAnswers)}
                  className="btn-secondary"
                >
                  Submit Quiz
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isLastQuestion) {
                      completeQuiz(userAnswers)
                    } else {
                      setCurrentQuestionIndex(currentQuestionIndex + 1)
                    }
                  }}
                  disabled={selectedAnswer === null}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLastQuestion ? 'Finish' : 'Next'}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizPage