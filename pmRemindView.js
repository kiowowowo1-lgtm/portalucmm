// Sample initial clients to remind data
let remindData = [
    { id: 1, name: "Juan Dela Cruz", phone: "09171234567", branch: "QC", service: "PMS & Oil Change", appointmentDate: "2026-08-16", appointmentTime: "09:00 AM", status: "Pending" },
    { id: 2, name: "Maria Santos", phone: "09189876543", branch: "Mandaluyong", service: "Brake Cleaning", appointmentDate: "2026-08-16", appointmentTime: "01:00 PM", status: "Pending" },
    { id: 3, name: "Pedro Penduko", phone: "09191112233", branch: "LP", service: "Engine Tune-up", appointmentDate: "2026-08-16", appointmentTime: "03:30 PM", status: "Reminded" }
];

export function renderPmRemindView(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- KPI METRICS SUMMARY -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Reminders Today</p>
                        <h3 id="count-total" class="text-3xl font-bold text-gray-900 mt-1">0</h3>
                    </div>
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Reminders</p>
                        <h3 id="count-pending" class="text-3xl font-bold text-amber-600 mt-1">0</h3>
                    </div>
                    <div class="p-3 bg-amber-50 text-amber-600 rounded-lg">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Reminded Clients</p>
                        <h3 id="count-reminded" class="text-3xl font-bold text-green-600 mt-1">0</h3>
                    </div>
                    <div class="p-3 bg-green-50 text-green-600 rounded-lg">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>
            </div>

            <!-- FILTER BAR -->
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-semibold text-gray-700">Filter Status:</span>
                    <button id="filter-all" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white transition">All</button>
                    <button id="filter-pending" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Pending</button>
                    <button id="filter-reminded" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Reminded</button>
                </div>
                <div class="text-xs text-gray-500 italic">
                    Showing clients scheduled for tomorrow (Sunday, Aug 16, 2026)
                </div>
            </div>

            <!-- CLIENTS TABLE -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b">
                                <th class="py-3 px-6">Client Name</th>
                                <th class="py-3 px-6">Contact Number</th>
                                <th class="py-3 px-6">Branch</th>
                                <th class="py-3 px-6">Service</th>
                                <th class="py-3 px-6">Scheduled Time</th>
                                <th class="py-3 px-6">Status</th>
                                <th class="py-3 px-6 text-center">Quick Action</th>
                            </tr>
                        </thead>
                        <tbody id="remind-table-body" class="divide-y divide-gray-200 text-sm text-gray-700">
                            <!-- Dynamic Rows -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    const tableBody = container.querySelector('#remind-table-body');
    const countTotal = container.querySelector('#count-total');
    const countPending = container.querySelector('#count-pending');
    const countReminded = container.querySelector('#count-reminded');

    const btnFilterAll = container.querySelector('#filter-all');
    const btnFilterPending = container.querySelector('#filter-pending');
    const btnFilterReminded = container.querySelector('#filter-reminded');

    let activeFilter = 'All';

    // Function para i-render ang talaan
    function renderTable() {
        // Update KPI Counters
        countTotal.textContent = remindData.length;
        countPending.textContent = remindData.filter(d => d.status === 'Pending').length;
        countReminded.textContent = remindData.filter(d => d.status === 'Reminded').length;

        // Apply Status Filter
        let filteredData = remindData;
        if (activeFilter === 'Pending') {
            filteredData = remindData.filter(d => d.status === 'Pending');
        } else if (activeFilter === 'Reminded') {
            filteredData = remindData.filter(d => d.status === 'Reminded');
        }

        if (filteredData.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="py-8 text-center text-gray-400 text-sm">Walang kliyente sa napiling listahan.</td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = filteredData.map(item => `
            <tr class="hover:bg-gray-50 transition">
                <td class="py-3 px-6 font-semibold text-gray-800">${item.name}</td>
                <td class="py-3 px-6">${item.phone}</td>
                <td class="py-3 px-6"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">${item.branch}</span></td>
                <td class="py-3 px-6 text-gray-600">${item.service}</td>
                <td class="py-3 px-6 font-medium text-blue-600">${item.appointmentTime}</td>
                <td class="py-3 px-6">
                    <span class="px-2.5 py-1 text-xs font-bold rounded-full border ${item.status === 'Reminded' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}">
                        ${item.status}
                    </span>
                </td>
                <td class="py-3 px-6 text-center space-x-2">
                    <button onclick="sendSmsReminder(${item.id})" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition">
                        SMS
                    </button>
                    <button onclick="toggleRemindStatus(${item.id})" class="px-3 py-1 ${item.status === 'Reminded' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'} rounded text-xs font-semibold transition">
                        ${item.status === 'Reminded' ? 'Mark Pending' : 'Mark Reminded'}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Toggle Remind Status Handler
    window.toggleRemindStatus = function(id) {
        const item = remindData.find(d => d.id === id);
        if (item) {
            item.status = item.status === 'Reminded' ? 'Pending' : 'Reminded';
            renderTable();
        }
    };

    // SMS Reminder Quick Action
    window.sendSmsReminder = function(id) {
        const item = remindData.find(d => d.id === id);
        if (item) {
            const message = `Hello ${item.name}, pinapaalala lang po namin ang inyong appointment bukas (${item.appointmentDate}) ng ${item.appointmentTime} para sa ${item.service} sa aming ${item.branch} branch. Salamat!`;
            alert(`[SIMULATED SMS SENT TO ${item.phone}]:\n\n"${message}"`);
            item.status = 'Reminded';
            renderTable();
        }
    };

    // Filter Buttons Handlers
    function updateFilterButtons() {
        [btnFilterAll, btnFilterPending, btnFilterReminded].forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-600');
        });
    }

    btnFilterAll.addEventListener('click', () => {
        activeFilter = 'All';
        updateFilterButtons();
        btnFilterAll.classList.add('bg-blue-600', 'text-white');
        btnFilterAll.classList.remove('bg-gray-100', 'text-gray-600');
        renderTable();
    });

    btnFilterPending.addEventListener('click', () => {
        activeFilter = 'Pending';
        updateFilterButtons();
        btnFilterPending.classList.add('bg-blue-600', 'text-white');
        btnFilterPending.classList.remove('bg-gray-100', 'text-gray-600');
        renderTable();
    });

    btnFilterReminded.addEventListener('click', () => {
        activeFilter = 'Reminded';
        updateFilterButtons();
        btnFilterReminded.classList.add('bg-blue-600', 'text-white');
        btnFilterReminded.classList.remove('bg-gray-100', 'text-gray-600');
        renderTable();
    });

    // Unang pag-render ng talahanayan
    renderTable();
}
