const About = () => {
  return (
    <div className="pb-16">
      <header className="bg-gradient-to-r from-[#e6f6ff] to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 dark:text-white">About LearnEnglish</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">We connect learners with expert tutors and provide high-quality sessions, materials, and community support to accelerate your English learning journey.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="/signup" className="inline-flex items-center gap-2 bg-[#4D95EA] text-white px-5 py-3 rounded-lg shadow">Get Started</a>
            <a href="/tutors" className="inline-flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-lg">Find Tutors</a>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Our mission</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Empower learners worldwide with accessible, effective, and personalised English learning.</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Our tutors</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Certified instructors with years of teaching experience in ESL and exam preparation.</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Our resources</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Free worksheets, video lessons, and structured study plans to keep you on track.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
