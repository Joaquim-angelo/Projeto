let model, webcam, labelContainer, maxPredictions;

// Substitua pela URL do seu modelo do Teachable Machine
const URL = "https://teachablemachine.withgoogle.com/models/bDOlCwY5D/";

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(224, 224, flip);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("webcam").appendChild(webcam.canvas);
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  let resultText = "Resultado: ";

  prediction.sort((a, b) => b.probability - a.probability);

  resultText += `${prediction[0].className} (${(prediction[0].probability * 100).toFixed(2)}%)`;

  document.getElementById("result").innerText = resultText;
}

