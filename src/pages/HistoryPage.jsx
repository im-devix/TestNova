import { motion } from 'framer-motion';
import { 
  Clock, 
  Trophy, 
  Target, 
  Calendar,
  TrendingUp,
  Eye,
  Trash2,
  BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import useQuizStore from '../store/quizStore';

const HistoryPage = () => {
  const { quizHistory, setCurrentPage } = useQuizStore();

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'text-success-600 bg-success-100';
    if (percentage >= 60) return 'text-warning-600 bg-warning-100';
    return 'text-error-600 bg-error-100';
  };

  const getPerformanceIcon = (percentage) => {
    if (percentage >= 80) return Trophy;
    if (percentage >= 60) return Target;
    return TrendingUp;
  };

  const averageScore = quizHistory.length > 0 
    ? Math.round(quizHistory.reduce((sum, result) => sum + result.results.percentage, 0) / quizHistory.length)
    : 0;

  const totalQuizzes = quizHistory.length;
  const totalQuestions = quizHistory.reduce((sum, result) => sum + result.results.totalQuestions, 0);
  const totalCorrect = quizHistory.reduce((sum, result) => sum + result.results.correct, 0);

  return (
    <div className="min-h-screen py-8 lg:py-16">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary-50 rounded-full px-4 py-2 border border-primary-200/50 mb-6">
              <BarChart3 className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">Quiz History</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Your Quiz Journey
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Track your progress and review your past quiz performances
            </p>
          </div>

          {/* Stats Overview */}
          {totalQuizzes > 0 && (
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {totalQuizzes}
                  </div>
                  <div className="text-sm text-neutral-600">Quizzes Taken</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-success-600 mb-1">
                    {averageScore}%
                  </div>
                  <div className="text-sm text-neutral-600">Average Score</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-accent-600 mb-1">
                    {totalQuestions}
                  </div>
                  <div className="text-sm text-neutral-600">Total Questions</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-warning-600 mb-1">
                    {totalCorrect}
                  </div>
                  <div className="text-sm text-neutral-600">Correct Answers</div>
                </Card>
              </motion.div>
            </div>
          )}

          {/* Quiz History List */}
          {totalQuizzes === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                No Quiz History Yet
              </h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Start taking quizzes to see your performance history and track your progress over time.
              </p>
              <Button
                onClick={() => setCurrentPage('upload')}
                size="lg"
              >
                Take Your First Quiz
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Recent Quizzes
              </h2>
              
              {quizHistory.map((result, index) => {
                const PerformanceIcon = getPerformanceIcon(result.results.percentage);
                
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card interactive className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPerformanceColor(result.results.percentage)}`}>
                            <PerformanceIcon className="w-6 h-6" />
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                              {result.quiz.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-neutral-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {format(new Date(result.completedAt), 'MMM dd, yyyy')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{result.results.avgTime}s avg</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-neutral-900">
                              {result.results.percentage}%
                            </div>
                            <div className="text-sm text-neutral-600">
                              {result.results.correct}/{result.results.totalQuestions} correct
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Eye}
                              onClick={() => {
                                // TODO: Implement view detailed results
                                console.log('View results for:', result.id);
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Trash2}
                              onClick={() => {
                                // TODO: Implement delete result
                                console.log('Delete result:', result.id);
                              }}
                              className="text-error-600 hover:text-error-700 hover:bg-error-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryPage;