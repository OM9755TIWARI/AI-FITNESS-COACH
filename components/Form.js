
import { useState } from 'react'

export default function Form({ onGenerate, loading }) {
  const [form, setForm] = useState({
    name: '',
    age: 25,
    gender: 'Male',
    height: 170,
    weight: 70,
    goal: 'Weight Loss',
    level: 'Beginner',
    location: 'Home',
    diet: 'Non-Veg',
    notes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submit = (e) => {
    e.preventDefault()
    onGenerate(form)
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" onChange={handleChange} value={form.name} placeholder="Name" className="p-2 border rounded" />
        <input name="age" type="number" onChange={handleChange} value={form.age} placeholder="Age" className="p-2 border rounded" />
        <select name="gender" onChange={handleChange} value={form.gender} className="p-2 border rounded">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="height" type="number" onChange={handleChange} value={form.height} placeholder="Height (cm)" className="p-2 border rounded" />
        <input name="weight" type="number" onChange={handleChange} value={form.weight} placeholder="Weight (kg)" className="p-2 border rounded" />
        <select name="goal" onChange={handleChange} value={form.goal} className="p-2 border rounded">
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Maintain</option>
        </select>
        <select name="level" onChange={handleChange} value={form.level} className="p-2 border rounded">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <select name="location" onChange={handleChange} value={form.location} className="p-2 border rounded">
          <option>Home</option>
          <option>Gym</option>
          <option>Outdoor</option>
        </select>
        <select name="diet" onChange={handleChange} value={form.diet} className="p-2 border rounded">
          <option>Non-Veg</option>
          <option>Veg</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>
        <textarea name="notes" onChange={handleChange} value={form.notes} placeholder="Optional notes (medical, stress, etc.)" className="p-2 border rounded col-span-1 md:col-span-2" />
      </div>
      <div className="mt-3 flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Generating…' : 'Generate Plan'}
        </button>
        <button type="button" onClick={() => { setForm({ name:'', age:25, gender:'Male', height:170, weight:70, goal:'Weight Loss', level:'Beginner', location:'Home', diet:'Non-Veg', notes:'' }) }} className="px-4 py-2 border rounded">
          Reset
        </button>
      </div>
    </form>
  )
}
