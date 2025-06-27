import jsQR from 'jsqr';

let videoStream = null;

export function initQRScanner(videoId, startBtnId, stopBtnId, onScan) {
  const video = document.getElementById(videoId);
  const startBtn = document.getElementById(startBtnId);
  const stopBtn = document.getElementById(stopBtnId);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  startBtn.addEventListener('click', async () => {
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = videoStream;
      video.play();
      startBtn.disabled = true;
      stopBtn.disabled = false;
      scanQRCode(video, canvas, ctx, onScan);
    } catch (error) {
      console.error('Erreur lors de l’accès à la caméra:', error);
    }
  });

  stopBtn.addEventListener('click', () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      videoStream = null;
      video.srcObject = null;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });
}

function scanQRCode(video, canvas, ctx, onScan) {
  if (!video.srcObject) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  if (code) {
    onScan(code.data);
  } else {
    requestAnimationFrame(() => scanQRCode(video, canvas, ctx, onScan));
  }
}