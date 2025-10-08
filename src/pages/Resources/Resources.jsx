const Resources = () => {
  const items = [
    { id: 1, title: "Beginner Workbook", type: "PDF" },
    { id: 2, title: "Pronunciation Guide", type: "Video" },
    { id: 3, title: "Grammar Cheatsheet", type: "PDF" },
  ];

  return (
    <div>
      <header className="bg-gradient-to-r from-[#fffaf0] to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 dark:text-white">Free Resources</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Download worksheets, watch tutorials, and practice at your own pace.</p>
          <div className="mt-6">
            <a href="/signup" className="inline-flex items-center gap-2 bg-[#4D95EA] text-white px-4 py-2 rounded-md">Join & Access</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.id} className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{it.title}</h3>
              <span className="text-xs text-slate-500">{it.type}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">A helpful resource to support your studies.</p>
            <div className="mt-4 flex items-center gap-3">
              <a href="#" className="text-[#4D95EA] text-sm">Download</a>
              <a href="#" className="text-sm text-gray-500">Preview</a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Resources;
