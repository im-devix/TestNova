import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Upload, FileText, Sparkles, Code, Share2, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Modal from '../components/UI/Modal';
import useQuizStore from '../store/quizStore';

const UploadPage = () => {
  const { getSampleQuiz, startQuiz, setCurrentQuiz } = useQuizStore();
  const [dragActive, setDragActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showJsonExample, setShowJsonExample] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [uploadedQuiz, setUploadedQuiz] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file.name.endsWith('.json')) {
      toast.error('Please upload a JSON file');
      return;
    }

    setIsProcessing(true);
    
    try {
      const text = await file.text();
      const quizData = JSON.parse(text);
      
      // Validate quiz structure
      if (!quizData.title || !quizData.questions || !Array.isArray(quizData.questions)) {
        throw new Error('Invalid quiz format');
      }

      // Validate questions
      for (const question of quizData.questions) {
        if (!question.question || !question.options || !Array.isArray(question.options) || 
            typeof question.correctAnswer !== 'number') {
          throw new Error('Invalid question format');
        }
      }

      setUploadedQuiz(quizData);
      setCurrentQuiz(quizData);
      generateShareLink(quizData);
      setShowPreview(true);
      toast.success('Quiz uploaded successfully!');
      
    } catch (error) {
      toast.error('Invalid JSON format. Please check your file.');
      console.error('Upload error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateShareLink = (quiz) => {
    try {
      const encodedQuiz = btoa(encodeURIComponent(JSON.stringify(quiz)));
      const link = `${window.location.origin}?quiz=${encodedQuiz}`;
      setShareLink(link);
    } catch (error) {
      console.error('Error generating share link:', error);
    }
  };

  const handleTrySample = () => {
    const sampleQuiz = getSampleQuiz();
    setUploadedQuiz(sampleQuiz);
    setCurrentQuiz(sampleQuiz);
    generateShareLink(sampleQuiz);
    setShowPreview(true);
  };

  const handleStartQuiz = () => {
    if (uploadedQuiz) {
      startQuiz(uploadedQuiz);
      setShowPreview(false);
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const jsonExample = `{
  "title": "Sample Quiz",
  "description": "A sample quiz to test knowledge",
  "timeLimit": 10,
  "difficulty": "medium",
  "category": "General Knowledge",
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": ["London", "Paris", "Berlin", "Madrid"],
      "correctAnswer": 1,
      "explanation": "Paris is the capital city of France.",
      "difficulty": "easy"
    }
  ]
}`;

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
            
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Upload Your Quiz
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Upload a JSON file or try our sample quiz to get started with QuizMaster
            </p>
          </div>

          {/* Upload Area */}
          <Card className="mb-8">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary-400 bg-primary-50' 
                  : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-50/50'
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
                  dragActive ? 'text-primary-500' : 'text-neutral-400'
                }`} />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {isProcessing ? 'Processing...' : 'Drop your quiz file here'}
              </h3>
              <p className="text-neutral-600 mb-4">
                or click to browse your files
              </p>
              <p className="text-sm text-neutral-500">
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
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Button
              variant="accent"
              size="lg"
              onClick={handleTrySample}
              icon={Sparkles}
              className="w-full"
            >
              Try Sample Quiz
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowJsonExample(true)}
              icon={Code}
              className="w-full"
            >
              View JSON Format
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowShareModal(true)}
              icon={Share2}
              className="w-full"
              disabled={!shareLink}
            >
              Share Quiz
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Easy Format
              </h3>
              <p className="text-neutral-600 text-sm">
                Simple JSON structure that's easy to create and understand
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Instant Validation
              </h3>
              <p className="text-neutral-600 text-sm">
                Automatic validation ensures your quiz works perfectly
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Easy Sharing
              </h3>
              <p className="text-neutral-600 text-sm">
                Generate shareable links instantly for your quizzes
              </p>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Quiz Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Quiz Preview"
        size="lg"
      >
        {uploadedQuiz && (
          <div className="space-y-6">
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {uploadedQuiz.title}
              </h3>
              <p className="text-neutral-600 mb-4">
                {uploadedQuiz.description || 'No description provided'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-neutral-700">Questions:</span>
                  <span className="ml-2 text-neutral-600">{uploadedQuiz.questions.length}</span>
                </div>
                <div>
                  <span className="font-medium text-neutral-700">Time Limit:</span>
                  <span className="ml-2 text-neutral-600">
                    {uploadedQuiz.timeLimit ? `${uploadedQuiz.timeLimit} minutes` : 'No limit'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-neutral-700">Difficulty:</span>
                  <span className="ml-2 text-neutral-600 capitalize">
                    {uploadedQuiz.difficulty || 'Not specified'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-neutral-700">Category:</span>
                  <span className="ml-2 text-neutral-600">
                    {uploadedQuiz.category || 'General'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button
                onClick={handleStartQuiz}
                className="flex-1"
                icon={Sparkles}
              >
                Start Quiz
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowPreview(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* JSON Example Modal */}
      <Modal
        isOpen={showJsonExample}
        onClose={() => setShowJsonExample(false)}
        title="JSON Format Example"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-neutral-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-neutral-100 font-mono">
              {jsonExample}
            </pre>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Important Notes:</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• correctAnswer is zero-based index (0, 1, 2, 3)</li>
                  <li>• timeLimit is in minutes (optional)</li>
                  <li>• explanation field is optional but recommended</li>
                  <li>• All questions must have exactly 4 options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Your Quiz"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 input-field font-mono text-sm"
              placeholder="Generate a quiz first..."
            />
            <Button
              onClick={copyShareLink}
              icon={Copy}
              disabled={!shareLink}
            >
              Copy
            </Button>
          </div>
          
          <p className="text-sm text-neutral-600">
            Share this link with others to let them take your quiz. The quiz data is encoded in the URL.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default UploadPage;