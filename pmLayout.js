// pmLayout.js

// 2. Main Layout Component
function PmLayout({ currentUser, onLogout, scriptUrl, dbData, setDbData }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Safe checks para sa leads data mula sa dbData (o pwede ring state handler)
  const leads = dbData && dbData.leads ? dbData.leads : [];
  
  const handleSetLeads = (newLeads) => {
    if (typeof setDbData === "function") {
      setDbData(prev => ({ ...prev, leads: newLeads }));
    }
  };

  const bookedLeads = leads.filter(l => l.status === "Booked");
  const inquiries = leads.filter(l => l.status === "Inquiry");

  // Dashboard calculations para ipasa sa Dashboard View
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const branches = ["UC", "LP", "MANDALUYONG", "MM"];

  const inputtedLeadsTodayCount = leads.filter(l => {
    if (!l.id) return false;
    const leadDate = new Date(Number(l.id));
    leadDate.setHours(0,0,0,0);
    return leadDate.getTime() === today.getTime();
  }).length;

  const bookingTodayCount = bookedLeads.filter(l => {
    if (!l.appointmentDate) return false;
    const appt = new Date(l.appointmentDate);
    appt.setHours(0, 0, 0, 0);
    return appt.getTime() === today.getTime();
  }).length;

  const bookingsTomorrowList = bookedLeads.filter(l => {
    if (!l.appointmentDate) return false;
    const appt = new Date(l.appointmentDate);
    appt.setHours(0, 0, 0, 0);
    return appt.getTime() === tomorrow.getTime();
  });

  const tomorrowByBranch = branches.reduce((acc, branch) => {
    acc[branch] = bookingsTomorrowList.filter(l => String(l.branch || "").trim().toUpperCase() === branch).length;
    return acc;
  }, {});

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    weekDays.push(d);
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">PM Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Hello, <span className="text-blue-400 font-medium">{currentUser.employeeName}</span></p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("leads")} 
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'leads' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}>
            Leads
          </button>
          <button 
            onClick={() => setActiveTab("calendar")} 
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'calendar' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}>
            Calendar
          </button>
          <button 
            onClick={() => setActiveTab("reminders")} 
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'reminders' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}>
            Clients to Remind
          </button>
          <button 
            onClick={() => setActiveTab("report")} 
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'report' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}`}>
            Report
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout} 
            className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white py-2.5 rounded-lg text-sm font-medium transition">
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto space-y-6">
        
        {/* Welcome Banner sa Pinakataas */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome Back, {currentUser.employeeName}! 👋</h2>
            <p className="text-blue-100 text-sm mt-1">Narito ang pangkalahatang buod ng iyong mga operasyon at performance metrics.</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs bg-white/20 px-3 py-1.5 rounded-lg font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab === "reminders" ? "Clients to Remind" : activeTab} View
          </h1>
          <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full">Page Manager</span>
        </header>

        {/* 1. Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">Real-time performance metrics and branch booking distribution</p>
            </div>
            
            {/* 4 KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Leads Added Today</p>
                  <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{inputtedLeadsTodayCount}</h3>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-xl">📥</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Bookings Today</p>
                  <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{bookingTodayCount}</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-xl">🎯</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Bookings Tomorrow</p>
                  <h3 className="text-3xl font-extrabold text-blue-600 mt-1">{bookingsTomorrowList.length}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">📅</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Bookings This Week</p>
                  <h3 className="text-3xl font-extrabold text-indigo-600 mt-1">
                    {bookedLeads.filter(l => {
                      if (!l.appointmentDate) return false;
                      const appt = new Date(l.appointmentDate);
                      appt.setHours(0,0,0,0);
                      const endWeek = new Date(today);
                      endWeek.setDate(today.getDate() + 7);
                      return appt >= today && appt <= endWeek;
                    }).length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-xl">📊</div>
              </div>
            </div>

            {/* Detalyadong Branch Breakdown para Bukas */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-gray-800 mb-3">Tomorrow's Bookings per Branch</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {branches.map(branch => (
                  <div key={branch} className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg text-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase">{branch}</span>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{tomorrowByBranch[branch] || 0}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Schedule Matrix */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-gray-800 mb-4">Weekly Schedule Matrix (Branch & Date)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-xs text-gray-400 uppercase bg-gray-50">
                      <th className="p-3 font-semibold">Date / Day</th>
                      {branches.map(b => (
                        <th key={b} className="p-3 text-center font-semibold">{b}</th>
                      ))}
                      <th className="p-3 text-center font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {weekDays.map((day, idx) => {
                      const dateString = day.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
                      let dayTotal = 0;
                      const branchCounts = branches.map(branch => {
                        const count = bookedLeads.filter(l => {
                          if (!l.appointmentDate) return false;
                          const appt = new Date(l.appointmentDate);
                          appt.setHours(0,0,0,0);
                          const isSameDay = appt.getTime() === day.getTime();
                          const isSameBranch = String(l.branch || "").trim().toUpperCase() === branch;
                          return isSameDay && isSameBranch;
                        }).length;
                        dayTotal += count;
                        return count;
                      });

                      return (
                        <tr key={idx} className="hover:bg-gray-50/50">
                          <td className="p-3 font-medium text-gray-700">{dateString}</td>
                          {branchCounts.map((count, cIdx) => (
                            <td key={cIdx} className="p-3 text-center">
                              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${count > 0 ? "bg-indigo-100 text-indigo-700" : "text-gray-300"}`}>
                                {count}
                              </span>
                            </td>
                          ))}
                          <td className="p-3 text-center font-bold text-gray-900">{dayTotal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. Leads Tab (Tumatawag na sa kumpletong PmLeadsView na may Add/Edit features) */}
        {activeTab === "leads" && (
          window.PmLeadsView ? (
            <window.PmLeadsView 
              leads={leads} 
              setLeads={handleSetLeads} 
              scriptUrl={scriptUrl} 
              currentUser={currentUser} 
              branchesList={branches}
              statusesList={["Inquiry", "Booked", "Cancelled", "Follow up", "Not Interested"]}
            />
          ) : (
            <div className="p-4 bg-white rounded shadow text-gray-500">Loading Leads View...</div>
          )
        )}

        {/* 3. Calendar Tab */}
        {activeTab === "calendar" && (
          window.PmCalendarView ? <window.PmCalendarView dbData={dbData} currentUser={currentUser} /> : <div className="p-4 bg-white rounded shadow text-gray-500">Loading Calendar View...</div>
        )}

        {/* 4. Reminders Tab */}
        {activeTab === "reminders" && (
          window.PmRemindersView ? <window.PmRemindersView dbData={dbData} currentUser={currentUser} /> : <div className="p-4 bg-white rounded shadow text-gray-500">Loading Reminders View...</div>
        )}

        {/* 5. Report Tab */}
        {activeTab === "report" && (
          window.PmReportView ? <window.PmReportView dbData={dbData} currentUser={currentUser} /> : <div className="p-4 bg-white rounded shadow text-gray-500">Loading Report View...</div>
        )}

      </main>
    </div>
  );
}

window.pmLayout = PmLayout;
