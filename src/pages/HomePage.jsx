import { motion } from 'framer-motion';
import { 
  CloudArrowUpIcon, 
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Upload, Play, BarChart3, Users, Zap, Target } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import useQuizStore from '../store/quizStore';

const HomePage = () => {
  const { setCurrentPage, getSampleQuiz, startQuiz } = useQuizStore();

  const handleTrySample = () => {
    const sampleQuiz = getSampleQuiz();
    startQuiz(sampleQuiz);
  };

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
  ];

  const stats = [
    { icon: TrophyIcon, label: 'Quizzes Created', value: '10K+' },
    { icon: UserGroupIcon, label: 'Active Users', value: '50K+' },
    { icon: ChartBarIcon, label: 'Questions Answered', value: '1M+' },
    { icon: ClockIcon, label: 'Hours Saved', value: '25K+' }
  ];

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
              
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                Create Amazing
                <span className="block gradient-text">Quiz Experiences</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Build interactive quizzes that engage, educate, and inspire. Perfect for educators, trainers, and knowledge enthusiasts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="xl"
                  onClick={() => setCurrentPage('upload')}
                  icon={Upload}
                  className="w-full sm:w-auto"
                >
                  Upload Your Quiz
                </Button>
                
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleTrySample}
                  icon={Play}
                  className="w-full sm:w-auto"
                >
                  Try Sample Quiz
                </Button>
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
            
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Comprehensive tools to create, manage, and analyze quiz performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card interactive className="text-center h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-neutral-50 to-white">
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
            
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Thousands of educators and learners trust QuizMaster for their assessment needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <Icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-neutral-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-neutral-600 font-medium">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              );
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
              <Button
                variant="secondary"
                size="xl"
                onClick={() => setCurrentPage('upload')}
                icon={Upload}
                className="w-full sm:w-auto bg-white text-primary-600 hover:bg-neutral-50"
              >
                Upload Your Quiz
              </Button>
              
              <Button
                variant="ghost"
                size="xl"
                onClick={handleTrySample}
                icon={Play}
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                Try Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;