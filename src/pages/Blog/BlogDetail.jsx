import { useParams, Link } from "react-router-dom";
import posts from "../../data/blogPosts";

const BlogDetail = () => {
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === String(id));

  if (!post) return <div className="max-w-4xl mx-auto p-6">Post not found</div>;

  return (
    <div>
      <header className="bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-extrabold text-sky-800 dark:text-white">{post.title}</h1>
          <div className="text-sm text-slate-500 mt-2">By {post.author} • {new Date(post.date).toLocaleDateString()}</div>
        </div>
        <div className="w-full h-64 md:h-96 bg-gray-100">
          <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="prose dark:prose-invert">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className="mt-8">
          <Link to="/blog" className="text-[#4D95EA]">← Back to blog</Link>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold">More posts</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.filter(p => p.id !== post.id).slice(0,3).map(p => (
              <Link key={p.id} to={`/blog/${p.id}`} className="block bg-white dark:bg-slate-800 rounded-lg p-3 shadow hover:shadow-md">
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-xs text-slate-500">By {p.author}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogDetail;
