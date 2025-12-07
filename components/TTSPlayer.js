
import { useState } from 'react'
import axios from 'axios'

export default function TTSPlayer({ text, voice = 'alloy' }) {
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)

  const play = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/tts', { text, voice }, { responseType: 'json' })
      const url = res.data.url
      setAudioUrl(url)
      const audio = new Audio(url)
      await audio.play()
    } catch (e) {
      console.error(e)
      alert('TTS failed. Check server logs and API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={play} className="px-3 py-1 border rounded">{loading ? 'Generating…' : 'Play TTS'}</button>
      {audioUrl && <a target="_blank" rel="noreferrer" href={audioUrl} className="underline text-sm">Open audio</a>}
    </div>
  )
}
