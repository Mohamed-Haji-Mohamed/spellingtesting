class SpellingQuiz {
  constructor() {
    this.questions = [
      { question: "Choose the correct spelling", options: ["Queckly", "Quickly", "Quicklie", "Quickily"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Quetly", "Quietly", "Quatly", "Quetily"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Angerily", "Angrily", "Angirily", "Angrely"], answer: 1 },
      { question: "Choose the correct spelling", options: ["bolitely", "Politely", "Politrlie", "Polightly"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Sereosly", "Seriously", "Sireosly", "Siriously"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Brightely", "Brightly", "Brightily", "Brigtly"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Strongely", "Strongly", "Strongily", "Estrongly"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Bravily", "Bravely", "Braveliy", "Braveley"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Coldely", "Coldly", "Koldly", "Coldily"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Nervosly", "Nervously", "Narvosly", "Narvously"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Exectly", "Exactly", "Exactely", "Exactily"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Hangrily", "Hungrily", "Hungrely", "Hungerily"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Lezily", "Lazily", "Lazely", "Laziley"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Luckly", "Luckily", "Lukily", "Lakely"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Nosly", "Noisily", "Noesly", "Noysly"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Perfactly", "Perfectly", "Parfectly", "berfectly"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Powerfuly", "Powerfully", "Powarfully", "bowerfully"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Busely", "Busily", "Bucily", "Biesily"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Widiely", "Widely", "Waydly", "Widly"], answer: 1 },
      { question: "Choose the correct spelling", options: ["Eqally", "Equally", "Equaly", "Equaley"], answer: 1 }
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
