
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import TTSPlayer from './TTSPlayer'
import ImageGenerator from './ImageGenerator'

export default function PlanCard({ plan, onRegenerate }) {
  const ref = useRef()

  const downloadPDF = async () => {
    const el = ref.current
    const canvas = await html2canvas(el, { scale: 2 })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] })
    pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save('ai-fitness-plan.pdf')
  }

  // Simple heuristic: list some exercise/meal prompts to generate images for
  const examplesToGenerate = []
  if (plan.workout) {
    const lines = plan.workout.split('\n').slice(0,6)
    examplesToGenerate.push(...lines.filter(Boolean))
  }
  if (plan.diet) {
    const lines = plan.diet.split('\n').slice(0,6)
    examplesToGenerate.push(...lines.filter(Boolean))
  }

  return (
    <div>
      <div ref={ref} className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">{plan.meta.name}'s Plan</h2>
        <p className="text-sm text-gray-500">Goal: {plan.meta.goal} — Level: {plan.meta.level}</p>
        <div className="mt-3">
          <h3 className="font-medium">Workout Plan</h3>
          <pre className="whitespace-pre-wrap">{plan.workout}</pre>
        </div>
        <div className="mt-3">
          <h3 className="font-medium">Diet Plan</h3>
          <pre className="whitespace-pre-wrap">{plan.diet}</pre>
        </div>
        <div className="mt-3">
          <h3 className="font-medium">AI Tips & Motivation</h3>
          <p>{plan.tips}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2 flex-wrap">
        <button onClick={downloadPDF} className="px-3 py-2 bg-green-600 text-white rounded">Export as PDF</button>
        <button onClick={onRegenerate} className="px-3 py-2 border rounded">Regenerate</button>
        <TTSPlayer text={`Workout plan for ${plan.meta.name}: ${plan.workout.substring(0,800)}`} />
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Generate illustrative images</h4>
        <p className="text-sm text-gray-500">Click generate to create images for individual exercises or meals (placeholder).</p>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {examplesToGenerate.map((ex, idx) => (
            <div key={idx} className="p-2 border rounded">
              <div className="font-semibold text-sm">{ex}</div>
              <ImageGenerator prompt={ex} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
