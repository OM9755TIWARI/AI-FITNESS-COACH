
import { useState } from 'react'
import axios from 'axios'

export default function ImageGenerator({ prompt }) {
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/generate-image', { prompt })
      setImgUrl(res.data.url)
    } catch (e) {
      console.error(e)
      alert('Image generation failed. Check server logs and API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button onClick={generate} className="px-3 py-1 border rounded">{loading ? 'Generating…' : 'Generate Image'}</button>
        {imgUrl && <a target="_blank" rel="noreferrer" href={imgUrl} className="underline text-sm">Open image</a>}
      </div>
      {imgUrl && <img src={imgUrl} alt="Generated" className="max-w-sm rounded shadow" />}
    </div>
  )
}
