const choices = document.querySelectorAll('.choice');
const cImg = document.getElementById('computer-image');
const out = document.getElementById('outcome-text');
const wSpan = document.getElementById('wins');
const lSpan = document.getElementById('losses');
const tSpan = document.getElementById('ties');
const rBtn = document.getElementById('reset-button');
let w = 0, l = 0, t = 0;
function randThrow() {
  return ['rock','paper','scissors'][Math.floor(Math.random()*3)];
}
function decide(p, c) {
  if (p === c) { out.textContent = 'tie!'; tSpan.textContent = ++t; return; }
  if (
    (p === 'rock' && c === 'scissors') ||
    (p === 'paper' && c === 'rock') ||
    (p === 'scissors' && c === 'paper')
  ) {
    out.textContent = 'you win!';
    wSpan.textContent = ++w;
  } else {
    out.textContent = 'you lose!';
    lSpan.textContent = ++l;
  }
}
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    choices.forEach(c => c.classList.remove('selected'));
    choice.classList.add('selected');
    let n = 0, interval = setInterval(() => {
      cImg.src = 'images/' + randThrow() + '.PNG';
      if (++n === 6) {
        clearInterval(interval);
        let final = randThrow();
        cImg.src = 'images/' + final + '.PNG';
        decide(choice.getAttribute('data-throw'), final);
      }
    }, 500);
  });
});
rBtn.addEventListener('click', () => {
  w = 0; l = 0; t = 0;
  wSpan.textContent = w; lSpan.textContent = l; tSpan.textContent = t;
  out.textContent = 'make your move!';
  choices.forEach(c => c.classList.remove('selected'));
  cImg.src = 'images/question-mark.PNG';
});
