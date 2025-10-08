const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Choose a session',
      desc: 'Browse live classes or private sessions by level, topic or tutor.'
    },
    {
      id: 2,
      title: 'Book & join',
      desc: 'Reserve a seat in seconds and join via a secure link. We support flexible scheduling.'
    },
    {
      id: 3,
      title: 'Learn & track',
      desc: 'Get notes, homework and progress tracking after every session.'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="text-sm  mt-2">A simple 3-step process to get you speaking confidently.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(step => (
            <div key={step.id} className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">{step.id}</div>
              <h3 className="font-semibold text-gray-700 text-lg">{step.title}</h3>
              <p className="text-sm text-gray-600  mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;
