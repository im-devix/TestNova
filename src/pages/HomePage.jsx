import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Users, 
  Clock, 
  Award,
  ArrowRight,
  Play,
  Upload
} from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import useQuizStore from '../store/quizStore';

const HomePage = () => {
  const { setCurrentPage, getSampleQuiz, startQuiz } = useQuizStore();

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create and share quizzes in seconds with our intuitive interface',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Get detailed insights with beautiful charts and performance metrics',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Share quizzes with friends and track their progress in real-time',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Gamified Learning',
      description: 'Earn points, badges, and compete on leaderboards',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Quizzes Created', value: '1M+', icon: Sparkles },
    { label: 'Questions Answered', value: '10M+', icon: Clock },
    { label: 'Success Rate', value: '94%', icon: TrendingUp }
  ];

  const handleTrySample = () => {
    const sampleQuiz = getSampleQuiz();
    startQuiz(sampleQuiz);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234f46e5" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="relative container-max section-padding py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-200/50 mb-6">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-700">New: AI-Powered Quiz Generation</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                Create Amazing
                <span className="block gradient-text">Quiz Experiences</span>
              </h1>
              
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Build interactive quizzes that engage, educate, and inspire. 
                Perfect for educators, trainers, and knowledge enthusiasts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="xl"
                onClick={() => setCurrentPage('upload')}
                icon={Upload}
                className="shadow-glow"
              >
                Create Your Quiz
              </Button>
              
              <Button
                variant="secondary"
                size="xl"
                onClick={handleTrySample}
                icon={Play}
              >
                Try Sample Quiz
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200/50 mb-3">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Why Choose QuizMaster?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Powerful features designed to make quiz creation and taking a delightful experience
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
                  <Card interactive className="h-full text-center group">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
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

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-500 to-accent-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Cpath d="M20 20c0 11.046-8.954 20-20 20v20h40V20H20z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of educators and learners who trust QuizMaster for their quiz needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                onClick={() => setCurrentPage('upload')}
                icon={ArrowRight}
                iconPosition="right"
                className="bg-white hover:bg-neutral-50 text-primary-600 shadow-large"
              >
                Start Creating Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;