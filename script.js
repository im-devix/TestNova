// DOM Elements
const pages = {
    home: document.getElementById('homePage'),
    upload: document.getElementById('uploadPage'),
    quiz: document.getElementById('quizPage'),
    solution: document.getElementById('solutionPage'),
    result: document.getElementById('resultPage')
};

const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const useSampleBtn = document.getElementById('useSampleBtn');
const trySampleBtn = document.getElementById('trySampleBtn');
const createQuizBtn = document.getElementById('createQuizBtn');
const prevQuestionBtn = document.getElementById('prevQuestionBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const prevSolutionBtn = document.getElementById('prevSolutionBtn');
const nextSolutionBtn = document.getElementById('nextSolutionBtn');
const viewSolutionsBtn = document.getElementById('viewSolutionsBtn');
const shareResultsBtn = document.getElementById('shareResultsBtn');
const printResultsBtn = document.getElementById('printResultsBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const progressBar = document.getElementById('progressBar');
const timerEl = document.getElementById('timer').querySelector('span');
const quizPreviewModal = document.getElementById('quizPreviewModal');
const quizInfoEl = document.getElementById('quizInfo');
const startQuizBtn = document.getElementById('startQuizBtn');
const cancelQuizBtn = document.getElementById('cancelQuizBtn');
const toggleJsonBtn = document.getElementById('toggleJson');
const jsonExample = document.getElementById('jsonExample');
const scoreCircle = document.getElementById('scoreCircle');
const shareSection = document.getElementById('shareSection');
const shareLinkInput = document.getElementById('shareLinkInput');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const quizTitleHeader = document.getElementById('quizTitleHeader');
const solutionTitleHeader = document.getElementById('solutionTitleHeader');
const solutionScoreEl = document.getElementById('solutionScore');

// Quiz Data
let quizData = null;
let currentQuestionIndex = 0;
let currentSolutionIndex = 0;
let userAnswers = [];
let timerInterval;
let timeLeft = 0;
let startTime = 0;
let timePerQuestion = [];
let performanceChart = null;
let timeChart = null;

// Initialize the app
function init() {
    setupEventListeners();
    checkForSharedQuiz();
}

// Set up all event listeners
function setupEventListeners() {
    fileInput.addEventListener('change', handleFileUpload);
    dropZone.addEventListener('click', () => fileInput.click());
    useSampleBtn.addEventListener('click', useSampleQuiz);
    trySampleBtn.addEventListener('click', useSampleQuiz);
    createQuizBtn.addEventListener('click', () => switchPage('upload'));
    prevQuestionBtn.addEventListener('click', showPreviousQuestion);
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    prevSolutionBtn.addEventListener('click', showPreviousSolution);
    nextSolutionBtn.addEventListener('click', showNextSolution);
    viewSolutionsBtn.addEventListener('click', showSolutions);
    shareResultsBtn.addEventListener('click', shareResults);
    printResultsBtn.addEventListener('click', printResults);
    backToHomeBtn.addEventListener('click', () => switchPage('home'));
    startQuizBtn.addEventListener('click', startQuiz);
    cancelQuizBtn.addEventListener('click', () => quizPreviewModal.classList.remove('active'));
    toggleJsonBtn.addEventListener('click', toggleJsonExample);
    copyLinkBtn.addEventListener('click', copyShareLink);

    // Share buttons
    document.querySelectorAll('.share-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.currentTarget.classList.contains('facebook') ? 'facebook' :
                         e.currentTarget.classList.contains('twitter') ? 'twitter' :
                         e.currentTarget.classList.contains('whatsapp') ? 'whatsapp' : 'email';
            shareQuiz(type);
        });
    });

    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
        dropZone.style.background = 'rgba(67, 97, 238, 0.05)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'rgba(67, 97, 238, 0.3)';
        dropZone.style.background = 'var(--card-bg)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'rgba(67, 97, 238, 0.3)';
        dropZone.style.background = 'var(--card-bg)';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload();
        }
    });
}

function toggleJsonExample() {
    jsonExample.style.display = jsonExample.style.display === 'block' ? 'none' : 'block';
    toggleJsonBtn.classList.toggle('active');
}

function handleFileUpload() {
    const file = fileInput.files[0];
    if (!file) return;
    
    dropZone.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>Processing quiz file...</p>';
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            quizData = JSON.parse(e.target.result);
            generateShareLink();
            showQuizPreview();
        } catch (error) {
            alert("Error parsing JSON file. Please check the format and try again.");
            resetDropZone();
        }
    };
    reader.onerror = function() {
        alert("Error reading file");
        resetDropZone();
    };
    reader.readAsText(file);
}

function resetDropZone() {
    dropZone.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Drag & drop your quiz file</p>
        <p><small>or click to browse</small></p>
    `;
}

function generateShareLink() {
    if (!quizData) return;
    
    // In a real app, you would upload to a server and get a shareable link
    const quizString = JSON.stringify(quizData);
    const encodedQuiz = btoa(encodeURIComponent(quizString));
    const shareLink = `${window.location.origin}${window.location.pathname}?quiz=${encodedQuiz}`;
    
    shareLinkInput.value = shareLink;
    shareSection.classList.add('active');
}

function copyShareLink() {
    shareLinkInput.select();
    document.execCommand('copy');
    
    const originalText = copyLinkBtn.innerHTML;
    copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    
    setTimeout(() => {
        copyLinkBtn.innerHTML = originalText;
    }, 2000);
}

function shareQuiz(type) {
    const link = shareLinkInput.value;
    const title = quizData ? quizData.title : 'Check out this quiz!';
    const text = quizData ? quizData.description || 'I created a quiz on QuizMaster Pro, try it out!' : 'Try this quiz on QuizMaster Pro!';
    
    let url;
    switch(type) {
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`;
            break;
        case 'whatsapp':
            url = `https://wa.me/?text=${encodeURIComponent(`${text} ${link}`)}`;
            break;
        case 'email':
            url = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${link}`)}`;
            break;
    }
    
    window.open(url, '_blank');
}

function showQuizPreview() {
    quizInfoEl.innerHTML = `
        <div><span>Title:</span> <span>${quizData.title || 'Untitled Quiz'}</span></div>
        <div><span>Questions:</span> <span>${quizData.questions.length}</span></div>
        <div><span>Time:</span> <span>${quizData.timeLimit ? quizData.timeLimit + ' mins' : 'No limit'}</span></div>
        <div><span>Description:</span> <span>${quizData.description || 'No description'}</span></div>
    `;
    
    quizPreviewModal.classList.add('active');
    resetDropZone();
}

function useSampleQuiz() {
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        quizData = {
            title: "Elite Knowledge Quiz",
            description: "Test your elite knowledge with these premium questions",
            timeLimit: 3,
            questions: [
                {
                    question: "What is the capital of France?",
                    options: ["London", "Paris", "Berlin", "Madrid"],
                    correctAnswer: 1,
                    explanation: "Paris has been the capital of France since the 5th century."
                },
                {
                    question: "Which planet is known as the Red Planet?",
                    options: ["Venus", "Mars", "Jupiter", "Saturn"],
                    correctAnswer: 1,
                    explanation: "Mars appears red due to iron oxide (rust) on its surface."
                },
                {
                    question: "Who painted the Mona Lisa?",
                    options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
                    correctAnswer: 1,
                    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
                },
                {
                    question: "What is the largest ocean on Earth?",
                    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                    correctAnswer: 3,
                    explanation: "The Pacific Ocean covers about 63 million square miles."
                },
                {
                    question: "Which element has the chemical symbol 'O'?",
                    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
                    correctAnswer: 1,
                    explanation: "Oxygen is essential for human respiration and combustion."
                }
            ]
        };
        
        generateShareLink();
        startQuiz();
        btn.innerHTML = originalText;
    }, 800);
}

function startQuiz() {
    quizPreviewModal.classList.remove('active');
    userAnswers = new Array(quizData.questions.length).fill(null);
    currentQuestionIndex = 0;
    timePerQuestion = new Array(quizData.questions.length).fill(0);
    startTime = Date.now();
    
    // Set quiz title in header
    quizTitleHeader.textContent = quizData.title || 'Quiz';
    solutionTitleHeader.textContent = `${quizData.title || 'Quiz'} Solutions`;
    
    // Set timer if available
    if (quizData.timeLimit) {
        timeLeft = quizData.timeLimit * 60;
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        timerEl.textContent = "No Limit";
        document.querySelector('.timer i').style.display = 'none';
    }
    
    showQuestion();
    switchPage('quiz');
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showResults();
        return;
    }
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeLeft--;
}

function showQuestion() {
    // Record time spent on previous question
    if (currentQuestionIndex > 0) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        timePerQuestion[currentQuestionIndex - 1] = timeSpent;
    }
    startTime = Date.now();
    
    const question = quizData.questions[currentQuestionIndex];
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update question counter
    document.getElementById('questionCount').textContent = 
        `${currentQuestionIndex + 1}/${quizData.questions.length}`;
    
    // Set question text
    document.getElementById('questionText').textContent = question.question;
    
    // Create options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        if (userAnswers[currentQuestionIndex] === i) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-number">${String.fromCharCode(65 + i)}</div>
            <div>${option}</div>
            <div class="option-status"></div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevQuestionBtn.disabled = currentQuestionIndex === 0;
    
    // Update next button text and icon based on position
    const nextIcon = currentQuestionIndex === quizData.questions.length - 1 ? 
        '<i class="fas fa-check"></i>' : 
        '<i class="fas fa-arrow-right"></i>';
    
    nextQuestionBtn.innerHTML = currentQuestionIndex === quizData.questions.length - 1 ? 
        `Submit ${nextIcon}` : 
        `Next ${nextIcon}`;
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    showQuestion();
}

function showNextQuestion() {
    if (currentQuestionIndex < quizData.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
        // Smooth scroll to top of question
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Record time spent on last question
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        timePerQuestion[currentQuestionIndex] = timeSpent;
        showResults();
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
        // Smooth scroll to top of question
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showResults() {
    clearInterval(timerInterval);
    
    // Calculate results
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    
    quizData.questions.forEach((q, i) => {
        if (userAnswers[i] === q.correctAnswer) {
            correct++;
        } else if (userAnswers[i] !== null) {
            incorrect++;
        } else {
            unattempted++;
        }
    });
    
    const percentage = Math.round((correct / quizData.questions.length) * 100);
    
    // Display results
    document.getElementById('quizTitleResult').textContent = quizData.title || 'Quiz Results';
    document.getElementById('scorePercent').textContent = `${percentage}%`;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = incorrect;
    document.getElementById('unattemptedCount').textContent = unattempted;
    
    // Calculate accuracy
    const accuracy = Math.round((correct / (correct + incorrect)) * 100) || 0;
    document.getElementById('accuracyRate').textContent = `${accuracy}%`;
    
    // Calculate time stats
    const totalTime = timePerQuestion.reduce((a, b) => a + b, 0);
    const avgTime = Math.round(totalTime / quizData.questions.length);
    
    document.getElementById('avgTime').textContent = `${avgTime}s`;
    
    // Animate score circle
    scoreCircle.style.background = `conic-gradient(var(--secondary) ${percentage}%, var(--light-gray) ${percentage}%)`;
    
    // Create charts
    createCharts(correct, incorrect, unattempted);
    
    switchPage('result');
}

function showSolutions() {
    currentSolutionIndex = 0;
    showSolution();
    switchPage('solution');
}

function showSolution() {
    const question = quizData.questions[currentSolutionIndex];
    const userAnswer = userAnswers[currentSolutionIndex];
    const isCorrect = userAnswer === question.correctAnswer;
    
    // Update progress
    const progress = ((currentSolutionIndex + 1) / quizData.questions.length) * 100;
    document.getElementById('solutionProgressBar').style.width = `${progress}%`;
    
    // Update question counter
    document.getElementById('solutionQuestionCount').textContent = 
        `${currentSolutionIndex + 1}/${quizData.questions.length}`;
    
    // Update score
    let correctCount = 0;
    for (let i = 0; i <= currentSolutionIndex; i++) {
        if (userAnswers[i] === quizData.questions[i].correctAnswer) {
            correctCount++;
        }
    }
    solutionScoreEl.textContent = `${correctCount}/${quizData.questions.length}`;
    
    // Set question text
    document.getElementById('solutionQuestionText').textContent = question.question;
    
    // Create options
    const optionsContainer = document.getElementById('solutionOptionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Mark correct/incorrect answers
        if (i === question.correctAnswer) {
            optionElement.classList.add('correct');
        } else if (userAnswer === i) {
            optionElement.classList.add('incorrect');
        }
        
        // Add status icon
        let statusIcon = '';
        if (i === question.correctAnswer) {
            statusIcon = '<i class="fas fa-check"></i>';
        } else if (userAnswer === i) {
            statusIcon = '<i class="fas fa-times"></i>';
        }
        
        optionElement.innerHTML = `
            <div class="option-number">${String.fromCharCode(65 + i)}</div>
            <div>${option}</div>
            <div class="option-status">${statusIcon}</div>
        `;
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Set explanation
    document.getElementById('explanationText').textContent = 
        question.explanation || 'No explanation provided for this question.';
    
    // Update navigation buttons
    prevSolutionBtn.disabled = currentSolutionIndex === 0;
    
    // Update next button text and icon based on position
    const nextIcon = currentSolutionIndex === quizData.questions.length - 1 ? 
        '<i class="fas fa-check"></i>' : 
        '<i class="fas fa-arrow-right"></i>';
    
    nextSolutionBtn.innerHTML = currentSolutionIndex === quizData.questions.length - 1 ? 
        `Finish ${nextIcon}` : 
        `Next ${nextIcon}`;
}

function showNextSolution() {
    if (currentSolutionIndex < quizData.questions.length - 1) {
        currentSolutionIndex++;
        showSolution();
        // Smooth scroll to top of question
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        switchPage('result');
    }
}

function showPreviousSolution() {
    if (currentSolutionIndex > 0) {
        currentSolutionIndex--;
        showSolution();
        // Smooth scroll to top of question
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function createCharts(correct, incorrect, unattempted) {
    // Destroy existing charts if they exist
    if (performanceChart) {
        performanceChart.destroy();
    }
    if (timeChart) {
        timeChart.destroy();
    }
    
    // Performance Chart (Pie)
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    performanceChart = new Chart(performanceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect', 'Unattempted'],
            datasets: [{
                data: [correct, incorrect, unattempted],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(244, 67, 54, 0.8)',
                    'rgba(255, 152, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(244, 67, 54, 1)',
                    'rgba(255, 152, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function shareResults() {
    const percentage = document.getElementById('scorePercent').textContent;
    const correct = document.getElementById('correctCount').textContent;
    const total = quizData.questions.length;
    const text = `I scored ${percentage} (${correct}/${total}) on the "${quizData.title}" quiz on QuizMaster Pro!`;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Quiz Results',
            text: text,
            url: url
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(text, url);
        });
    } else {
        fallbackShare(text, url);
    }
}

function fallbackShare(text, url) {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
}

function printResults() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Capture the result content as an image
    const resultContent = document.querySelector('.result-content');
    
    html2canvas(resultContent).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add new page if content is too long
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        doc.save('quiz-results.pdf');
    });
}

function switchPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    pages[pageName].classList.add('active');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Check for shared quiz in URL
function checkForSharedQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    
    if (quizParam) {
        try {
            const decodedQuiz = decodeURIComponent(atob(quizParam));
            quizData = JSON.parse(decodedQuiz);
            switchPage('upload');
            showQuizPreview();
        } catch (e) {
            console.error('Error parsing shared quiz:', e);
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);