import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CloudArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { Upload, FileText, Sparkles } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UploadPageProps {
  onNavigate: (page: string) => void
  onQuizStart: (quiz: any) => void
}

const UploadPage = ({ onNavigate, onQuizStart }: UploadPageProps) => {
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.json')) {
      toast.error('Please upload a JSON file')
      return
    }

    setIsProcessing(true)
    
    try {
      const text = await file.text()
      const quizData = JSON.parse(text)
      
      // Validate quiz structure
      if (!quizData.title || !quizData.questions || !Array.isArray(quizData.questions)) {
        throw new Error('Invalid quiz format')
      }

      toast.success('Quiz uploaded successfully!')
      onQuizStart(quizData)
      
    } catch (error) {
      toast.error('Invalid JSON format. Please check your file.')
      console.error('Upload error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTrySample = () => {
    const sampleQuiz = {
      title: "Sample Knowledge Quiz",
      description: "Test your general knowledge",
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          options: ["London", "Paris", "Berlin", "Madrid"],
          correctAnswer: 1,
          explanation: "Paris is the capital city of France."
        },
        {
          id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1,
          explanation: "Mars appears red due to iron oxide on its surface."
        }
      ]
    }
    
    onQuizStart(sampleQuiz)
  }

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
            <div className="inline-flex items-center space-x-2 bg-primary-50 rounded-full px-4 py-2 border border-primary-200/50 mb-6">
              <Upload className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">Upload Quiz</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Upload Your Quiz
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload a JSON file or try our sample quiz to get started with QuizMaster
            </p>
          </div>

          {/* Upload Area */}
          <div className="card p-8 mb-8">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary-400 bg-primary-50' 
                  : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".json"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isProcessing}
              />
              
              <motion.div
                animate={{ 
                  scale: dragActive ? 1.05 : 1,
                  rotate: dragActive ? 5 : 0 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CloudArrowUpIcon className={`w-16 h-16 mx-auto mb-4 ${
                  dragActive ? 'text-primary-500' : 'text-gray-400'
                }`} />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isProcessing ? 'Processing...' : 'Drop your quiz file here'}
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse your files
              </p>
              <p className="text-sm text-gray-500">
                Supports JSON files up to 10MB
              </p>
              
              {isProcessing && (
                <div className="mt-4">
                  <div className="inline-flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
                    <span className="text-sm text-primary-600">Processing your quiz...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTrySample}
              className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Try Sample Quiz</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <span>Back to Home</span>
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Format
              </h3>
              <p className="text-gray-600 text-sm">
                Simple JSON structure that's easy to create and understand
              </p>
            </div>
            
            <div className="card text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instant Validation
              </h3>
              <p className="text-gray-600 text-sm">
                Automatic validation ensures your quiz works perfectly
              </p>
            </div>
            
            <div className="card text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Rich Experience
              </h3>
              <p className="text-gray-600 text-sm">
                Interactive quiz taking with real-time feedback
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UploadPage