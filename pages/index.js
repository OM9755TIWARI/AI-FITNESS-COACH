
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Form from '../components/Form'
import PlanCard from '../components/PlanCard'

export default function Home() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('ai-fitness-plan')
    if (saved) setPlan(JSON.parse(saved))
  }, [])

  const generatePlan = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post('/api/generate-plan', { formData })
      setPlan(res.data)
      localStorage.setItem('ai-fitness-plan', JSON.stringify(res.data))
    } catch (e) {
      console.error(e)
      setError(e?.response?.data || e.message)
    } finally {
      setLoading(false)
    }
  }

  const regenerate = () => {
    if (!plan?.meta?.lastForm) return
    generatePlan(plan.meta.lastForm)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">AI Fitness Coach</h1>
        <Form onGenerate={generatePlan} loading={loading} />
        {error && <div className="text-red-600 mt-4">Error: {String(error)}</div>}
        <div className="mt-6">
          {plan ? (
            <PlanCard plan={plan} onRegenerate={regenerate} />
          ) : (
            <p className="text-gray-600">No plan yet — fill the form and press Generate.</p>
          )}
        </div>
      </div>
    </div>
  )
}
