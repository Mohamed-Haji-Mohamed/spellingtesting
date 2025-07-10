class SpellingQuiz {
  constructor() {
    this.questions = [
      { question: "Choose the correct spelling", options: ["Satarday", "Saturday", "Saturrday", "Saturdey"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Sanday", "Sunday", "Sainday", "Suinday"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Manday", "Monday", "Mondey", "Moinday"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Tusday", "Tuesday", "Tuiesday", "Tuesiday"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Wenesday", "Wednesday", "Wednasday", "Wednesdey"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Tursday", "Thursday", "Tharsday", "Tarsday"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Frieday", "Friday", "Freday", "Fridey"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Janaury", "January", "Januery", "Jenuary"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Fabruary", "February", "Februery", "Fabruay"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Merch", "March", "Marrch", "Marss"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Aprel", "April", "Abril", "Appril"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Mey", "May", "Maiy", "Meiy"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Jun", "June", "Junie", "Chune"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Julie", "July", "Julay", "Julyie"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Agust", "August", "Augast", "Augusto"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Septampar", "September", "Sebtember", "Sebtamber"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Octobar", "October", "Octoberr", "Octoberr"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Nuvember", "November", "Novamber", "Novambar"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Desember", "December", "Decemper", "Decamper"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Yasterday", "Yesterday", "Yestarday", "Yastarday"], answer: 1 }
    ];

    this.currentIndex = 0;
    this.score = 0;

    this.dom = {
      counter: document.querySelector('.question-counter'),
      text: document.querySelector('.question-text'),
      options: document.querySelector('.answer-options'),
      progressFill: document.querySelector('.progress-fill'),
      progressPercent: document.querySelector('.progress-percent'),
      quizArea: document.querySelector('.quiz-area'),
      resultsArea: document.querySelector('.results-area'),
      resultsFill: document.querySelector('.results-fill'),
      resultsPercent: document.querySelector('.results-percent'),
      restartButtons: document.querySelectorAll('.restart-button'),
      correctSound: document.querySelector('.correct-sound'),
      incorrectSound: document.querySelector('.incorrect-sound')
    };

    this.init();
  }

  init() {
    this.currentIndex = 0;
    this.score = 0;
    this.dom.quizArea.style.display = 'block';
    this.dom.resultsArea.classList.remove('visible');
    this.updateProgress(0);
    this.showQuestion();

    this.dom.restartButtons.forEach(btn =>
      btn.addEventListener('click', () => this.init())
    );
  }

  showQuestion() {
    const q = this.questions[this.currentIndex];

    // Shuffle the options and update correct index
    const shuffled = q.options.map((opt, i) => ({
      text: opt,
      originalIndex: i
    }));
    const correctIndex = q.answer;
    this.shuffleArray(shuffled);
    const newAnswerIndex = shuffled.findIndex(opt => opt.originalIndex === correctIndex);

    this.questions[this.currentIndex].shuffled = shuffled;
    this.questions[this.currentIndex].correctShuffledIndex = newAnswerIndex;

    this.dom.counter.textContent = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
    this.dom.text.textContent = q.question;
    this.dom.options.innerHTML = '';

    shuffled.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-button';
      btn.textContent = option.text;
      btn.addEventListener('click', () => this.checkAnswer(index));
      this.dom.options.appendChild(btn);
    });
  }

  checkAnswer(index) {
    const buttons = this.dom.options.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.add('disabled'));

    const correct = this.questions[this.currentIndex].correctShuffledIndex;

    if (index === correct) {
      buttons[index].classList.add('correct');
      this.score++;
      this.dom.correctSound.play();
    } else {
      buttons[index].classList.add('incorrect');
      buttons[correct].classList.add('correct');
      this.dom.incorrectSound.play();
    }

    this.updateProgress((this.currentIndex + 1) / this.questions.length);

    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex < this.questions.length) {
        this.showQuestion();
      } else {
        this.showResults();
      }
    }, 1200);
  }

  updateProgress(ratio) {
    const offset = 226.19467 * (1 - ratio);
    this.dom.progressFill.style.strokeDashoffset = offset;
    this.dom.progressPercent.textContent = `${Math.round(ratio * 100)}%`;
  }

  showResults() {
    this.dom.quizArea.style.display = 'none';
    this.dom.resultsArea.classList.add('visible');

    const percent = Math.round((this.score / this.questions.length) * 100);
    let current = 0;

    const animate = () => {
      if (current >= percent) {
        this.dom.resultsPercent.textContent = `${percent}%`;
        this.dom.resultsFill.style.strokeDashoffset = 339.292 * (1 - percent / 100);
        return;
      }

      this.dom.resultsPercent.textContent = `${Math.floor(current)}%`;
      this.dom.resultsFill.style.strokeDashoffset = 339.292 * (1 - current / 100);
      current += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new SpellingQuiz();
});
