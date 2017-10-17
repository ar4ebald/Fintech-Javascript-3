const cvs = document.getElementById('cvs');
const ctx = cvs.getContext('2d');

ctx.strokeStyle = 'rgba(0,255,0,0.8)';
ctx.fillStyle = 'rgba(0,0,0,0.6)';
ctx.lineWidth = 2;

const offset = 0.1 * cvs.height;
const aspect = cvs.height / cvs.width;

const viewHeight = 8;
const pointsCount = 1000;

const dt = 0.01;
let time = 0;

function clear() {
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}

const spins = 60;
const pi = Math.PI;
const pi2 = Math.PI * 2;

function lastQuarter(t) {
  return (t < pi / 2) ? 0.15 : Math.sin(t);
}

function xFunction(t) {
  const w = (t % pi2) - pi;
  const w2 = (t * 0.99 % pi2) - pi;

  let x = Math.sin(spins * t) * lastQuarter(w);

  x += (w + pi) * 0.3 * Math.sin(w2);

  return x;
}

function yFunction(t) {
  const w = (t % pi2) - pi;

  return w + -0.15 * lastQuarter(w) * Math.cos(spins * t);
}

function step() {
  clear();

  let x = (xFunction(time) / viewHeight * aspect + 0.5) * cvs.width;
  let y = (0.5 - yFunction(time) / viewHeight) * cvs.height;

  ctx.beginPath();
  ctx.moveTo(x, y);

  for (let i = 0; i < pointsCount; i += 1, time += dt) {
    const prevx = x;
    const prevy = y;

    x = (xFunction(time) / viewHeight * aspect + 0.5) * cvs.width;
    y = (0.5 - yFunction(time) / viewHeight) * cvs.height;

    if (Math.abs(x - prevx) < offset && Math.abs(y - prevy) < offset) { ctx.lineTo(x, y); } else { ctx.moveTo(x, y); }
  }

  ctx.stroke();

  requestAnimationFrame(step);
}

step();
