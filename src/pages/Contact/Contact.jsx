import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaTwitter, FaFacebookF } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    // demo submission — replace with real API call later
    setStatus({ type: 'loading', message: 'Sending...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Thanks — your message has been sent.' });
      setForm({ name: '', email: '', message: '' });
    }, 750);
  };

  return (
    <div className="pb-16">
      <header className="bg-gradient-to-r from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Contact the Team</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have a question or suggestion? Drop us a message and we&#39;ll get back to you within 1-2 working days.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">We read every message — tell us how we can improve your learning experience.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
              >
                <FaPaperPlane />
                <span>Send message</span>
              </button>

              {status?.type === 'loading' && <span className="text-sm text-slate-500">{status.message}</span>}
              {status?.type === 'error' && <span className="text-sm text-red-500">{status.message}</span>}
              {status?.type === 'success' && <span className="text-sm text-green-600">{status.message}</span>}
            </div>
          </form>
        </section>

        <aside className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold">Contact info</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-600" />
              <div>
                <div className="font-medium">Email</div>
                <div>support@learnenglish.example</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-green-600" />
              <div>
                <div className="font-medium">Phone</div>
                <div>+1 555 123 4567</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-rose-500" />
              <div>
                <div className="font-medium">Office</div>
                <div>Remote / Distributed team</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/faq" className="text-indigo-600">Help & FAQ</a></li>
              <li><a href="/resources" className="text-indigo-600">Free Resources</a></li>
              <li><a href="/blog" className="text-indigo-600">Latest articles</a></li>
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium">Follow us</h4>
            <div className="mt-3 flex items-center gap-3">
              <a href="#" className="p-2 rounded bg-blue-600 text-white"><FaFacebookF /></a>
              <a href="#" className="p-2 rounded bg-sky-500 text-white"><FaTwitter /></a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Contact;
