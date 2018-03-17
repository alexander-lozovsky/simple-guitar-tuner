const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const middleX = canvas.width / 2;
const middleY = canvas.height;
const radius = canvas.width / 2;

const startAngleIndex = 1.2;
const endAngleIndex = 1.8;
const centerIndex = startAngleIndex + ((endAngleIndex - startAngleIndex) / 2);
const centsCoff = (endAngleIndex - startAngleIndex) / 100;

const digits = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50];
const digitsOffsetFromArc = -canvas.width / 20;

const arrowWidth = canvas.width / 50;

const startAngle = startAngleIndex * Math.PI;
const endAngle = endAngleIndex * Math.PI;
const zonesCount = digits.length - 1;
const step = (endAngleIndex - startAngleIndex) / zonesCount;
const tickOffsetFromArc = canvas.width / 100;

const drawShape = () => {
  ctx.beginPath();
  ctx.arc(middleX, middleY, radius, startAngle, endAngle, false);
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#000';

  ctx.stroke();
};

const drawTick = (angle) => {
  const fromX = middleX + ((radius - tickOffsetFromArc) * Math.cos(angle));
  const fromY = middleY + ((radius - tickOffsetFromArc) * Math.sin(angle));
  const toX = middleX + ((radius + tickOffsetFromArc) * Math.cos(angle));
  const toY = middleY + ((radius + tickOffsetFromArc) * Math.sin(angle));

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineWidth = canvas.width / 100;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#746845';
  ctx.stroke();
};

const drawTicks = () => {
  for (let i = startAngleIndex; i <= endAngleIndex; i += step) {
    drawTick(i * Math.PI);
  }
  drawTick(endAngleIndex * Math.PI);
};

const drawDigits = () => {
  let angleIndex = startAngleIndex;
  digits.forEach((digit) => {
    const angle = angleIndex * Math.PI;
    angleIndex += step;

    const x = middleX + ((radius - digitsOffsetFromArc) * Math.cos(angle));
    const y = middleY + ((radius - digitsOffsetFromArc) * Math.sin(angle));

    ctx.font = 'bold 20px Tahoma';
    ctx.fillStyle = '#746845';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(digit, x, y);
  });
};

const drawArrow = (arrowValueIndex) => {
  const arrowAngle = arrowValueIndex * Math.PI;
  const toX = middleX + (radius * Math.cos(arrowAngle));
  const toY = middleY + (radius * Math.sin(arrowAngle));

  ctx.beginPath();
  ctx.moveTo(middleX, middleY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = '#464646';
  ctx.lineWidth = arrowWidth;
  ctx.stroke();
};

export default (cents) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShape();
  drawTicks();
  drawDigits();
  drawArrow(centerIndex + (cents * centsCoff));
};