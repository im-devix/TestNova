import { motion } from 'framer-motion'
import { Trophy, Home, Upload, BarChart3 } from 'lucide-react'

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const navigation = [
    { name: 'Home', page: 'home', icon: Home },
    { name: 'Upload', page: 'upload', icon: Upload },
    { name: 'Results', page: 'results', icon: BarChart3 },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass border-b border-gray-200/60"
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">QuizMaster</h1>
              <p className="text-xs text-gray-500 -mt-1">Pro Edition</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.page
              
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.page)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-glow'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </motion.button>
              )
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header