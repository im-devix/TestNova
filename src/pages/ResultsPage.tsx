import { motion } from 'framer-motion'
import { Trophy, Target, Clock, TrendingUp, RotateCcw } from 'lucide-react'

interface ResultsPageProps {
  results: {
    correct: number
    incorrect: number
    unattempted: number
    totalQuestions: number
    percentage: number
    totalTime: number
    userAnswers: (number | null)[]
  }
  quiz: {
    title: string
    questions: any[]
  }
  onNavigate: (page: string) => void
  onRetake: () => void
}

const ResultsPage = ({ results, quiz, onNavigate, onRetake }: ResultsPageProps) => {
  if (!results || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Available</h2>
          <button
            onClick={() => onNavigate('home')}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-success-600', bg: 'bg-success-100' }
    if (percentage >= 80) return { level: 'Very Good', color: 'text-success-600', bg: 'bg-success-100' }
    if (percentage >= 70) return { level: 'Good', color: 'text-warning-600', bg: 'bg-warning-100' }
    if (percentage >= 60) return { level: 'Fair', color: 'text-warning-600', bg: 'bg-warning-100' }
    return { level: 'Needs Improvement', color: 'text-error-600', bg: 'bg-error-100' }
  }

  const performance = getPerformanceLevel(results.percentage)
  const avgTime = Math.round(results.totalTime / results.totalQuestions)

  return (
    <div className="min-h-screen py-8 lg:py-16">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mb-6 shadow-glow"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Quiz Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {quiz.title}
            </p>
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${performance.bg}`}>
              <span className={`font-semibold ${performance.color}`}>
                {performance.level}
              </span>
            </div>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="relative"
            >
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-2 shadow-large">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {results.percentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {results.correct}/{results.totalQuestions}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card text-center p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-success-600 mb-1">
                {results.correct}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card text-center p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-error-500 to-error-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-error-600 mb-1">
                {results.incorrect}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card text-center p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {results.percentage}%
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="card text-center p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-warning-600 mb-1">
                {avgTime}s
              </div>
              <div className="text-sm text-gray-600">Avg Time</div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetake}
              className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Quiz</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('upload')}
              className="btn-secondary flex items-center space-x-2"
            >
              <span>Try Another Quiz</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="btn-secondary flex items-center space-x-2"
            >
              <span>Go Home</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultsPage