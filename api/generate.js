// api/generate.js
// Vercel serverless function. Keeps the Anthropic API key on the server only —
// the browser never sees it. Set ANTHROPIC_KEY (NOT prefixed with VITE_) in
// Vercel → Settings → Environment Variables, then remove any VITE_ANTHROPIC_KEY.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing 'prompt' in request body" });
  }

  const apiKey = process.env.ANTHROPIC_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing ANTHROPIC_KEY environment variable" });
  }

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      // Surface Anthropic's real error (e.g. "Your credit balance is too low")
      // — always coerced to a plain string so the client never receives an object.
      let message = "Anthropic API error (" + anthropicRes.status + ")";
      if (data?.error?.message && typeof data.error.message === "string") {
        message = data.error.message;
      } else if (typeof data?.error === "string") {
        message = data.error;
      } else if (data?.error) {
        try { message = JSON.stringify(data.error); } catch { /* keep default */ }
      }
      return res.status(anthropicRes.status).json({ error: message });
    }

    const text = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n");

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unexpected server error while contacting Anthropic" });
  }
}
