import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddAddress() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const [errors, setErrors] = React.useState({})

  function validate() {
    const e = {}
    if (!form.firstName) e.firstName = 'First name is required'
    if (!form.lastName) e.lastName = 'Last name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.street) e.street = 'Street is required'
    if (!form.city) e.city = 'City is required'
    if (!form.state) e.state = 'State is required'
    if (!form.zipcode) e.zipcode = 'Zipcode is required'
    if (!form.country) e.country = 'Country is required'
    if (!form.phone) e.phone = 'Phone is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    // save to localStorage (simple persistence)
    const existing = JSON.parse(localStorage.getItem('addresses') || '[]')
    existing.push({ ...form, id: Date.now() })
    localStorage.setItem('addresses', JSON.stringify(existing))
    // navigate back to cart
    navigate('/cart')
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-medium mb-4">Add Address</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Last name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Street</label>
          <input name="street" value={form.street} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
          {errors.street && <p className="text-sm text-red-500">{errors.street}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input name="state" value={form.state} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
            {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Zipcode</label>
            <input name="zipcode" value={form.zipcode} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
            {errors.zipcode && <p className="text-sm text-red-500">{errors.zipcode}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <input name="country" value={form.country} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
          {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 mt-1" />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded">Save Address</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>

      </form>
    </div>
  )
}
