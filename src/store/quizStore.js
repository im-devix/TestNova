import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useQuizStore = create(
  persist(
    (set, get) => ({
      // Quiz data
      currentQuiz: null,
      quizHistory: [],
      
      // Quiz state
      currentQuestionIndex: 0,
      userAnswers: [],
      timeLeft: 0,
      startTime: null,
      timePerQuestion: [],
      isQuizActive: false,
      isQuizCompleted: false,
      
      // Results
      results: null,
      
      // UI state
      currentPage: 'home',
      isLoading: false,
      showMobileMenu: false,
      
      // Actions
      setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
      
      setCurrentPage: (page) => set({ currentPage: page }),
      
      startQuiz: (quiz) => {
        const timeLimit = quiz.timeLimit ? quiz.timeLimit * 60 : 0;
        set({
          currentQuiz: quiz,
          currentQuestionIndex: 0,
          userAnswers: new Array(quiz.questions.length).fill(null),
          timeLeft: timeLimit,
          startTime: Date.now(),
          timePerQuestion: new Array(quiz.questions.length).fill(0),
          isQuizActive: true,
          isQuizCompleted: false,
          results: null,
          currentPage: 'quiz'
        });
      },
      
      answerQuestion: (questionIndex, answerIndex) => {
        const { userAnswers } = get();
        const newAnswers = [...userAnswers];
        newAnswers[questionIndex] = answerIndex;
        set({ userAnswers: newAnswers });
      },
      
      nextQuestion: () => {
        const { currentQuestionIndex, currentQuiz, timePerQuestion, startTime } = get();
        
        // Record time spent on current question
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const newTimePerQuestion = [...timePerQuestion];
        newTimePerQuestion[currentQuestionIndex] = timeSpent;
        
        if (currentQuestionIndex < currentQuiz.questions.length - 1) {
          set({
            currentQuestionIndex: currentQuestionIndex + 1,
            timePerQuestion: newTimePerQuestion,
            startTime: Date.now()
          });
        } else {
          get().completeQuiz();
        }
      },
      
      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({
            currentQuestionIndex: currentQuestionIndex - 1,
            startTime: Date.now()
          });
        }
      },
      
      completeQuiz: () => {
        const { currentQuiz, userAnswers, timePerQuestion } = get();
        
        // Calculate results
        let correct = 0;
        let incorrect = 0;
        let unattempted = 0;
        
        currentQuiz.questions.forEach((question, index) => {
          if (userAnswers[index] === question.correctAnswer) {
            correct++;
          } else if (userAnswers[index] !== null) {
            incorrect++;
          } else {
            unattempted++;
          }
        });
        
        const totalQuestions = currentQuiz.questions.length;
        const percentage = Math.round((correct / totalQuestions) * 100);
        const accuracy = correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;
        const totalTime = timePerQuestion.reduce((a, b) => a + b, 0);
        const avgTime = Math.round(totalTime / totalQuestions);
        
        const results = {
          correct,
          incorrect,
          unattempted,
          totalQuestions,
          percentage,
          accuracy,
          totalTime,
          avgTime,
          completedAt: new Date().toISOString()
        };
        
        // Add to history
        const quizResult = {
          id: Date.now(),
          quiz: currentQuiz,
          results,
          userAnswers,
          timePerQuestion,
          completedAt: results.completedAt
        };
        
        set((state) => ({
          results,
          isQuizActive: false,
          isQuizCompleted: true,
          currentPage: 'results',
          quizHistory: [quizResult, ...state.quizHistory.slice(0, 9)] // Keep last 10 results
        }));
      },
      
      resetQuiz: () => set({
        currentQuiz: null,
        currentQuestionIndex: 0,
        userAnswers: [],
        timeLeft: 0,
        startTime: null,
        timePerQuestion: [],
        isQuizActive: false,
        isQuizCompleted: false,
        results: null
      }),
      
      updateTimer: () => {
        const { timeLeft, isQuizActive } = get();
        if (timeLeft > 0 && isQuizActive) {
          set({ timeLeft: timeLeft - 1 });
        } else if (timeLeft === 0 && isQuizActive) {
          get().completeQuiz();
        }
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      toggleMobileMenu: () => set((state) => ({ showMobileMenu: !state.showMobileMenu })),
      
      // Sample quiz data
      getSampleQuiz: () => ({
        id: 'sample-quiz',
        title: "Elite Knowledge Challenge",
        description: "Test your knowledge with these carefully crafted questions",
        timeLimit: 5,
        difficulty: "intermediate",
        category: "General Knowledge",
        questions: [
          {
            id: 1,
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Madrid"],
            correctAnswer: 1,
            explanation: "Paris has been the capital of France since the 5th century and is known as the 'City of Light'.",
            difficulty: "easy"
          },
          {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1,
            explanation: "Mars appears red due to iron oxide (rust) on its surface, giving it the distinctive reddish appearance.",
            difficulty: "easy"
          },
          {
            id: 3,
            question: "Who painted the Mona Lisa?",
            options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"],
            correctAnswer: 1,
            explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. It's housed in the Louvre Museum in Paris.",
            difficulty: "medium"
          },
          {
            id: 4,
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3,
            explanation: "The Pacific Ocean covers about 63 million square miles, making it larger than all land masses combined.",
            difficulty: "medium"
          },
          {
            id: 5,
            question: "Which element has the chemical symbol 'Au'?",
            options: ["Silver", "Gold", "Aluminum", "Argon"],
            correctAnswer: 1,
            explanation: "Gold's chemical symbol 'Au' comes from the Latin word 'aurum', meaning 'shining dawn'.",
            difficulty: "medium"
          },
          {
            id: 6,
            question: "In which year did World War II end?",
            options: ["1944", "1945", "1946", "1947"],
            correctAnswer: 1,
            explanation: "World War II ended in 1945 with the surrender of Japan on September 2, 1945.",
            difficulty: "medium"
          },
          {
            id: 7,
            question: "What is the speed of light in vacuum?",
            options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
            correctAnswer: 0,
            explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second, a fundamental constant of nature.",
            difficulty: "hard"
          },
          {
            id: 8,
            question: "Which programming language was created by Guido van Rossum?",
            options: ["Java", "Python", "JavaScript", "C++"],
            correctAnswer: 1,
            explanation: "Python was created by Guido van Rossum and first released in 1991. It's named after Monty Python's Flying Circus.",
            difficulty: "medium"
          }
        ]
      })
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        quizHistory: state.quizHistory,
      }),
    }
  )
);

export default useQuizStore;