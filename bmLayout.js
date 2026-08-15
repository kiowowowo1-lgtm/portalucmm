function BmLayout({ currentUser, onLogout, scriptUrl, dbData }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">BM Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Branch: <span className="text-blue-400 font-medium">{currentUser.branch}</span></p>
        </div>
        <nav className="flex-1 p-4 space-y-1.5">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}>Dashboard</button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white py-2.5 rounded-lg text-sm font-medium transition">Log Out</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">Branch Manager Dashboard</h1>
          <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full">BM - {currentUser.branch}</span>
        </header>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Welcome, {currentUser.employeeName}</h2>
          <p className="text-sm text-gray-600">Assigned Branch: <span className="font-bold text-blue-600">{currentUser.branch}</span></p>
        </div>
      </main>
    </div>
  );
}
window.bmLayout = BmLayout;
