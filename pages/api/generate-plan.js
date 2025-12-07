
// Example API route that calls OpenAI Chat Completions (replace or adapt to your provider)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Only POST allowed' })
  const { formData } = req.body
  if (!formData) return res.status(400).send({ error: 'Missing formData' })

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) return res.status(500).send({ error: 'OpenAI API key not configured on server' })

  const prompt = buildPrompt(formData)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // change to available model for your account
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 900
      })
    })

    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content || JSON.stringify(data)

    // For simplicity, we expect the model to return a plain text plan with markers
    res.status(200).json({
      meta: { name: formData.name || 'User', goal: formData.goal, level: formData.level, lastForm: formData },
      workout: extractSection(text, 'WORKOUT') || text,
      diet: extractSection(text, 'DIET') || '',
      tips: extractSection(text, 'TIPS') || '',
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}

function buildPrompt(form) {
  return `Create a personalized fitness plan for the following user. Include clear sections labeled 'WORKOUT', 'DIET', and 'TIPS'. Make it concise and practical.

Name: ${form.name}
Age: ${form.age}
Gender: ${form.gender}
Height_cm: ${form.height}
Weight_kg: ${form.weight}
Goal: ${form.goal}
Level: ${form.level}
Workout location: ${form.location}
Dietary preference: ${form.diet}
Additional notes: ${form.notes || 'None'}

For WORKOUT include 7-day microcycle with exercises, sets, reps, rest times. For DIET include simple meals for breakfast, lunch, dinner, snacks. For TIPS include posture, recovery, motivation lines.`
}

function extractSection(text, name) {
  const re = new RegExp(name + '[:\n\r]+([\s\S]*?)(?=\n[A-Z]{3,}:|$)', 'i')
  const m = text.match(re)
  return m ? m[1].trim() : null
}
