async function sendPrompt() {
  const prompt = document.getElementById("prompt").value;
  const resultBox = document.getElementById("result");

  if (!prompt) {
    resultBox.textContent = "Ketik perintah dulu dong!";
    return;
  }

  resultBox.textContent = "Emergent AI lagi mikir...";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD_HZMpEVY9BIw6K_JwWnALyRjcsTkC8oQ",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content) {
      resultBox.textContent = data.candidates[0].content.parts[0].text;
    } else {
      resultBox.textContent = "Error: " + JSON.stringify(data);
    }
  } catch (error) {
    resultBox.textContent = "Koneksi bermasalah!";
  }
}
