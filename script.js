async function sendPrompt() {
  const prompt = document.getElementById("prompt").value;
  const resultBox = document.getElementById("result");

  resultBox.textContent = "Generating...";

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=API_KEY_KAMU",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  resultBox.textContent =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "Gagal generate";
}
