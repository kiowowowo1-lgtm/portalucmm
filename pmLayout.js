import { renderPmDashboardView } from './pmDashboardView.js';
import { renderPmLeadsView } from './pmLeadsView.js';
import { renderPmCalendarView } from './pmCalendarView.js';
import { renderPmRemindView } from './pmRemindView.js';
import { renderPmReportView } from './pmReportView.js';

export function renderPmLayout(container, user) {
    container.innerHTML = `
        <div class="flex h-screen bg-gray-100 font-sans">
            <!-- LEFT NAVIGATION SIDEBAR -->
            <aside class="w-64 bg-slate-900 text-white flex flex-col shadow-lg">
                <div class="p-5 text-xl font-bold border-b border-slate-800">
                    <span>PM CRM Portal</span>
                </div>
                <nav id="pm-nav" class="flex-1 p-4 space-y-1">
                    <button data-view="dashboard" class="w-full flex items-center px-4 py-3 rounded-lg bg-blue-600 text-white font-medium transition text-left">Dashboard</button>
                    <button data-view="leads" class="w-full flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition text-left">Leads</button>
                    <button data-view="calendar" class="w-full flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition text-left">Calendar</button>
                    <button data-view="remind" class="w-full flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition text-left">Clients to Remind</button>
                    <button data-view="report" class="w-full flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition text-left">Report</button>
                </nav>
                <div class="p-4 border-t border-slate-800">
                    <button onclick="location.reload()" class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium">Logout</button>
                </div>
            </aside>

            <!-- MAIN CONTENT AREA -->
            <main class="flex-1 flex flex-col overflow-y-auto">
                <header class="bg-white shadow-sm px-8 py-4 flex justify-between items-center border-b">
                    <h1 id="page-title" class="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                    <div class="flex items-center space-x-3">
                        <span class="text-sm font-medium text-gray-600">Welcome, ${user.name} (${user.role})</span>
                        <div class="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <!-- Dynamic Content Container -->
                <div id="main-content-area" class="p-8">
                    <!-- Awtomatikong maglo-load dito ang Dashboard -->
                </div>
            </main>
        </div>
    `;

    const contentArea = container.querySelector('#main-content-area');
    const pageTitle = container.querySelector('#page-title');
    const navButtons = container.querySelectorAll('#pm-nav button');

    // Awtomatikong i-render ang Dashboard sa unang bukas pa lang ng layout
    pageTitle.textContent = "Dashboard Overview";
    renderPmDashboardView(contentArea);

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
            navButtons.forEach(btn => btn.classList.add('text-slate-300'));
            
            button.classList.add('bg-blue-600', 'text-white');
            button.classList.remove('text-slate-300');

            const view = button.getAttribute('data-view');

            if (view === 'dashboard') {
                pageTitle.textContent = "Dashboard Overview";
                renderPmDashboardView(contentArea);
            } else if (view === 'leads') {
                pageTitle.textContent = "Leads Management";
                renderPmLeadsView(contentArea);
            } else if (view === 'calendar') {
                pageTitle.textContent = "Appointments Calendar";
                renderPmCalendarView(contentArea);
            } else if (view === 'remind') {
                pageTitle.textContent = "Clients to Remind";
                renderPmRemindView(contentArea);
            } else if (view === 'report') {
                pageTitle.textContent = "Reports & Analytics";
                renderPmReportView(contentArea);
            }
        });
    });
}
