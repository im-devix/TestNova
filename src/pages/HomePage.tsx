import { motion } from 'framer-motion'
import { 
  CloudArrowUpIcon, 
  SparklesIcon,
  ChartBarIcon,
  TrophyIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { Upload, Play, BarChart3, Users, Zap, Target } from 'lucide-react'

interface HomePageProps {
  onNavigate: (page: string) => void
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Upload your quiz in JSON format and start testing knowledge instantly',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Play,
      title: 'Interactive Experience',
      description: 'Engaging quiz interface with real-time feedback and explanations',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Comprehensive results with performance insights and progress tracking',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Easy Sharing',
      description: 'Share quizzes with others through generated links instantly',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { icon: TrophyIcon, label: 'Quizzes Created', value: '10K+' },
    { icon: UserGroupIcon, label: 'Active Users', value: '50K+' },
    { icon: ChartBarIcon, label: 'Questions Answered', value: '1M+' },
    { icon: ClockIcon, label: 'Hours Saved', value: '25K+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        <div className="relative container-max section-padding py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 border border-primary-200/50 mb-8">
                <SparklesIcon className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-700">Welcome to QuizMaster Pro</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Create Amazing
                <span className="block gradient-text">Quiz Experiences</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Build interactive quizzes that engage, educate, and inspire. Perfect for educators, trainers, and knowledge enthusiasts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('upload')}
                  className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Your Quiz</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <Play className="w-5 h-5" />
                  <span>Try Sample Quiz</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-accent-50 rounded-full px-4 py-2 border border-accent-200/50 mb-6">
              <Zap className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-accent-700">Powerful Features</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to create, manage, and analyze quiz performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center p-8 hover:scale-105 cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-success-50 rounded-full px-4 py-2 border border-success-200/50 mb-6">
              <Target className="w-4 h-4 text-success-500" />
              <span className="text-sm font-medium text-success-700">Trusted by Thousands</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of educators and learners trust QuizMaster for their assessment needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center p-8"
                >
                  <Icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-500 to-accent-500">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
              Create your first quiz in minutes and start engaging your audience
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('upload')}
                className="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Your Quiz</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Try Demo</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage