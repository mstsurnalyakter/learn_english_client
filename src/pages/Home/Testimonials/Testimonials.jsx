import { useState } from 'react'
import PropTypes from 'prop-types'

const sample = [
  {
    id: 1,
    name: 'Amina',
    role: 'Student',
    quote: 'My speaking improved so fast — the tutors are brilliant and patient.',
  },
  {
    id: 2,
    name: 'Carlos',
    role: 'Professional',
    quote: 'Flexible schedules made it easy to learn around my work. Highly recommend!'
  },
  {
    id: 3,
    name: 'Lina',
    role: 'Student',
    quote: 'I loved the one-on-one sessions — personalized and effective.'
  }
]

const Testimonials = ({ reviews = sample }) => {
  const [items] = useState(reviews)

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">What learners say</h2>
          <p className="text-sm  mt-2">Real feedback from our community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items?.length > 0 ? (
            items.map(r => (
              <blockquote key={r.id} className="shadow-sm p-6  rounded-lg  border-[1px]">
                <p className="">“{r.quote}”</p>
                <footer className="mt-4 text-sm ">— {r.name}, {r.role}</footer>
              </blockquote>
            ))
          ) : (
            <div className="col-span-full text-center py-8">No reviews yet — be the first to leave feedback.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

Testimonials.propTypes = {
  reviews: PropTypes.array,
}
