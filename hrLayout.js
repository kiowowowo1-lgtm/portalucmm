export function renderHrLayout(container, user) {
    container.innerHTML = `
        <div class="flex h-screen bg-gray-100 font-sans">
            <!-- LEFT NAVIGATION SIDEBAR -->
            <aside class="w-64 bg-purple-950 text-white flex flex-col shadow-lg">
                <div class="p-5 text-xl font-bold border-b border-purple-800 flex items-center justify-between">
                    <span>HR Portal</span>
                </div>
                <nav id="hr-nav" class="flex-1 p-4 space-y-1">
                    <button data-view="dashboard" class="w-full flex items-center px-4 py-3 rounded-lg bg-purple-700 text-white font-medium transition text-left">Dashboard</button>
                    <button data-view="employees" class="w-full flex items-center px-4 py-3 rounded-lg text-purple-200 hover:bg-purple-900 hover:text-white transition text-left">Employee Directory</button>
                    <button data-view="attendance" class="w-full flex items-center px-4 py-3 rounded-lg text-purple-200 hover:bg-purple-900 hover:text-white transition text-left">Attendance & Time Logs</button>
                    <button data-view="payroll" class="w-full flex items-center px-4 py-3 rounded-lg text-purple-200 hover:bg-purple-900 hover:text-white transition text-left">Payroll Summary</button>
                    <button data-view="reports" class="w-full flex items-center px-4 py-3 rounded-lg text-purple-200 hover:bg-purple-900 hover:text-white transition text-left">HR Reports</button>
                </nav>
                <div class="p-4 border-t border-purple-800">
                    <button onclick="location.reload()" class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium">Logout</button>
                </div>
            </aside>

            <!-- MAIN CONTENT AREA -->
            <main class="flex-1 flex flex-col overflow-y-auto">
                <!-- Top Header -->
                <header class="bg-white shadow-sm px-8 py-4 flex justify-between items-center border-b">
                    <h1 id="hr-page-title" class="text-2xl font-bold text-gray-800">HR Dashboard</h1>
                    <div class="flex items-center space-x-3">
                        <span class="text-sm font-medium text-gray-600">Welcome, ${user.name} (${user.role})</span>
                        <div class="h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <!-- Dynamic Content Container -->
                <div id="hr-main-content" class="p-8">
                    <!-- Default Dashboard Content -->
                    <div class="space-y-6">
                        <!-- KPI Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-500 uppercase">Total Employees</p>
                                    <h3 class="text-3xl font-bold text-gray-900 mt-1">16</h3>
                                </div>
                                <div class="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </div>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-500 uppercase">Present Today</p>
                                    <h3 class="text-3xl font-bold text-green-600 mt-1">14</h3>
                                </div>
                                <div class="p-3 bg-green-50 text-green-600 rounded-lg">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-500 uppercase">On Leave / Absent</p>
                                    <h3 class="text-3xl font-bold text-red-500 mt-1">2</h3>
                                </div>
                                <div class="p-3 bg-red-50 text-red-500 rounded-lg">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                            </div>
                        </div>

                        <!-- Employee Overview Card -->
                        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 class="text-lg font-bold text-gray-800 mb-2">Human Resources Overview</h3>
                            <p class="text-gray-600 text-sm">Welcome to the HR Management module. Access employee records, track daily attendance, and review payroll operations directly connected to your Google Sheets database.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;

    // Sidebar navigation handler
    const contentArea = container.querySelector('#hr-main-content');
    const pageTitle = container.querySelector('#hr-page-title');
    const navButtons = container.querySelectorAll('#hr-nav button');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => {
                btn.classList.remove('bg-purple-700', 'text-white');
                btn.classList.add('text-purple-200');
            });
            
            button.classList.add('bg-purple-700', 'text-white');
            button.classList.remove('text-purple-200');

            const view = button.getAttribute('data-view');

            if (view === 'dashboard') {
                pageTitle.textContent = "HR Dashboard";
                contentArea.innerHTML = `
                    <div class="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 class="text-lg font-bold mb-2">HR Dashboard Summary</h3>
                        <p class="text-gray-600 text-sm">Overview metrics for employees and active staff across all branches.</p>
                    </div>`;
            } else if (view === 'employees') {
                pageTitle.textContent = "Employee Directory";
                contentArea.innerHTML = `<div class="bg-white p-6 rounded-xl shadow-sm border">Employee Directory Module</div>`;
            } else if (view === 'attendance') {
                pageTitle.textContent = "Attendance & Time Logs";
                contentArea.innerHTML = `<div class="bg-white p-6 rounded-xl shadow-sm border">Attendance Logs Module</div>`;
            } else if (view === 'payroll') {
                pageTitle.textContent = "Payroll Summary";
                contentArea.innerHTML = `<div class="bg-white p-6 rounded-xl shadow-sm border">Payroll Module</div>`;
            } else if (view === 'reports') {
                pageTitle.textContent = "HR Reports";
                contentArea.innerHTML = `<div class="bg-white p-6 rounded-xl shadow-sm border">HR Reports Module</div>`;
            }
        });
    });
}
