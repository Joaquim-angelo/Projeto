let model, webcam, labelContainer;

async function init() {
  const URL = "./model/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  webcam = new tmImage.Webcam(224, 224, true);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("webcam").appendChild(webcam.canvas);
  labelContainer = document.getElementById("resultado");
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  prediction.sort((a, b) => b.probability - a.probability);
  labelContainer.innerHTML = `Número detectado: ${prediction[0].className} (${(prediction[0].probability * 100).toFixed(2)}%)`;
}
