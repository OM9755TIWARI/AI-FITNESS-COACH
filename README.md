
# AI Fitness Coach (Next.js)

A scaffolded Next.js project implementing an AI-powered fitness assistant prototype.

## Features (scaffold)
- User input form (name, age, gender, height, weight, goal, level, location, diet prefs)
- Server API route to call an LLM (OpenAI) to generate personalized workout & diet plan
- TTS and Image-generation placeholders (ElevenLabs / Replicate)
- Export plan to PDF (client-side)
- Tailwind CSS + Framer Motion for UI
- Save plans to localStorage
- Regenerate plan option

## Important
- This is a starter project — **no API keys are included**.
- Fill `.env.local` following `.env.local.example` and run `npm install` then `npm run dev`.

## Quick start
```bash
cd ai-fitness-coach
npm install
# create .env.local from .env.local.example
npm run dev
```

## Environment Variables
Create `.env.local` with values (example provided):
- OPENAI_API_KEY=your_openai_api_key
- ELEVENLABS_API_KEY=your_elevenlabs_key
- REPLICATE_API_TOKEN=your_replicate_token

## What's included
- pages/, components/, public/, styles/
- API route at `pages/api/generate-plan.js` that calls OpenAI's Chat Completions (example)

## Notes
- Replace the API calling logic with whichever provider you prefer (Gemini/Claude/etc.)
- The image & voice features are implemented as placeholders with examples for ElevenLabs and Replicate.


## Added features (update)
- Supabase client scaffold (`lib/supabaseClient.js`) — use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to enable.
- TTS proxy endpoint (`/api/tts`) and UI component `components/TTSPlayer.js` — plug in ElevenLabs key in `.env.local`.
- Image generation proxy endpoint (`/api/generate-image`) and UI component `components/ImageGenerator.js` — plug in Replicate / Gemini / OpenAI images key in `.env.local`.
- PlanCard now includes TTS playback and simple image generation UI for top workout/diet lines.
# AI-FITNESS-COACH
