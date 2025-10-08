import posts from "../../data/blogPosts";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div>
      <header className="bg-gradient-to-r from-white to-[#f0f9ff] dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 dark:text-white">LearnEnglish Blog</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Practical tips, stories, and updates for English learners and tutors.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.id} className="bg-white dark:bg-slate-800 rounded-lg p-0 overflow-hidden shadow hover:shadow-lg transition">
            <div className="h-40 bg-gray-100">
              <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <div className="text-xs text-slate-500 mt-1">By {p.author} • {new Date(p.date).toLocaleDateString()}</div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{p.excerpt}</p>
              <Link to={`/blog/${p.id}`} className="mt-4 inline-block text-sm text-[#4D95EA]">Read more</Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Blog;
