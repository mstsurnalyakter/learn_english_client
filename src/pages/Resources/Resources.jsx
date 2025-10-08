import { FaUniversity, FaGlobe, FaPlay, FaDownload, FaExternalLinkAlt, FaSearch, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const featuredCourses = [
  {
    id: 'coursera-intro',
    name: 'Coursera — English for Career Development',
    desc: 'A practical course for learners who want to improve workplace English and communication skills.',
    url: 'https://www.coursera.org',
    icon: FaUniversity,
  },
  {
    id: 'edx-grammar',
    name: 'edX — Academic English',
    desc: 'University-style modules focused on academic reading, writing and listening.',
    url: 'https://www.edx.org',
    icon: FaUniversity,
  },
];

const languageApps = [
  { id: 'duolingo', name: 'Duolingo', desc: 'Bite-sized daily lessons with gamified practice.', url: 'https://www.duolingo.com', icon: FaGlobe },
  { id: 'bbc', name: 'BBC Learning English', desc: 'Short videos, audio and worksheets tailored for English learners.', url: 'https://www.bbc.co.uk/learningenglish', icon: FaPlay },
  { id: 'cambridge', name: 'Cambridge English', desc: 'Exam preparation materials and learner activities from Cambridge.', url: 'https://www.cambridge.org', icon: FaGlobe },
];

const videoChannels = [
  { id: 'teded', name: 'TED-Ed', desc: 'Short, animated lessons that build listening and critical thinking.', url: 'https://ed.ted.com', icon: FaPlay },
  { id: 'voa', name: 'VOA Learning English', desc: 'News and features in simplified English for learners.', url: 'https://learningenglish.voanews.com', icon: FaPlay },
];

const freeTools = [
  { id: 'grammarly', name: 'Grammarly (free tier)', desc: 'Instant writing feedback and clarity suggestions.', url: 'https://www.grammarly.com', icon: FaExternalLinkAlt },
  { id: 'oxford', name: 'Oxford Learner\'s Dictionaries', desc: 'Authoritative dictionary entries with example sentences.', url: 'https://www.oxfordlearnersdictionaries.com', icon: FaBook },
];

const Resources = () => {
  return (
    <div className="pb-16">
      <header className="bg-gradient-to-r from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Curated Learning Resources</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Hand-picked courses, apps, video channels and free study tools to help you learn English faster. Browse the categories below or search for a specific topic.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="relative w-full max-w-xl">
              <FaSearch className="absolute left-3 top-3 text-slate-400" />
              <input
                aria-label="Search resources"
                placeholder="Search resources, e.g. 'grammar', 'listening', 'IELTS'"
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm"
              />
            </div>
            <Link to="/signup" className="hidden md:inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow">
              Join & Unlock
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                <FaUniversity />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Featured Courses</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Structured courses from reputable platforms—great if you prefer guided learning and milestones.</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              {featuredCourses.map((c) => (
                <a key={c.id} href={c.url} target="_blank" rel="noreferrer" className="block p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-indigo-600 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                        <c.icon />
                      </div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{c.desc}</div>
                      </div>
                    </div>
                    <div className="text-slate-400 text-sm">Open <FaExternalLinkAlt className="inline ml-1" /></div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <FaGlobe />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Apps & Platforms</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Quick daily practice and long-term study options—pick what matches your schedule.</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {languageApps.map((a) => (
                <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <div className="text-2xl text-amber-500 p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                    <a.icon />
                  </div>
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{a.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h4 className="font-semibold text-lg">Video Channels</h4>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Short lessons and listening practice from trusted channels.</p>

            <div className="mt-4 space-y-3">
              {videoChannels.map((v) => (
                <a key={v.id} href={v.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded text-white bg-purple-500">
                      <v.icon />
                    </div>
                    <div>
                      <div className="font-medium">{v.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{v.desc}</div>
                    </div>
                  </div>
                  <FaExternalLinkAlt className="text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h4 className="font-semibold text-lg">Free Tools & Dictionaries</h4>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Write, check and explore vocabulary with these free (or freemium) tools.</p>

            <div className="mt-4 space-y-3">
              {freeTools.map((t) => (
                <a key={t.id} href={t.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20">
                      <t.icon />
                    </div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{t.desc}</div>
                    </div>
                  </div>
                  <FaExternalLinkAlt className="text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h4 className="font-semibold text-lg">Downloadable Worksheets</h4>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Practical PDFs and printable worksheets you can use for quick practice.</p>

            <div className="mt-4 space-y-3">
              <a className="flex items-center justify-between p-3 rounded-md border border-slate-100 dark:border-slate-700" href="#">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-green-50 text-green-600">
                    <FaDownload />
                  </div>
                  <div>
                    <div className="font-medium">Beginner Workbook</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">PDF pack with basic grammar and exercises.</div>
                  </div>
                </div>
                <span className="text-slate-500">Download</span>
              </a>

              <a className="flex items-center justify-between p-3 rounded-md border border-slate-100 dark:border-slate-700" href="#">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-green-50 text-green-600">
                    <FaDownload />
                  </div>
                  <div>
                    <div className="font-medium">Pronunciation Guide</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Audio + transcript for everyday sounds and tips.</div>
                  </div>
                </div>
                <span className="text-slate-500">Download</span>
              </a>
            </div>
          </div>
        </section>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">Want us to add a resource? <a href="/contact" className="text-indigo-600">Contact the team</a>.</p>
        </div>
      </main>
    </div>
  );
};

export default Resources;
