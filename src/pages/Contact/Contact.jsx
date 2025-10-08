import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent (demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <header className="bg-gradient-to-r from-white to-[#f7fbff] dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 dark:text-white">Contact Us</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">We are here to help — send us a message and we will get back to you shortly.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <label className="block text-sm">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full p-2 rounded border" />

          <label className="block text-sm mt-4">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="mt-1 w-full p-2 rounded border" />

          <label className="block text-sm mt-4">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-1 w-full p-2 rounded border" />

          <button type="submit" className="mt-4 bg-[#4D95EA] text-white px-4 py-2 rounded">Send message</button>
        </form>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Contact info</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Email: support@learnenglish.example</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Phone: +1 555 123 4567</p>
          <div className="mt-4">
            <a href="/faq" className="text-[#4D95EA]">Visit our FAQ</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
