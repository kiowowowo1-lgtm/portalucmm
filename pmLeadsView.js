// Sample initial data para sa PM Leads
let leadsData = [
    { id: 1, name: "Juan Dela Cruz", phone: "09171234567", branch: "QC", status: "New Lead", dateAdded: "2026-08-15" },
    { id: 2, name: "Maria Santos", phone: "09189876543", branch: "Mandaluyong", status: "Contacted", dateAdded: "2026-08-15" },
    { id: 3, name: "Pedro Penduko", phone: "09191112233", branch: "LP", status: "Booked", dateAdded: "2026-08-14" }
];

export function renderPmLeadsView(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- HEADER ACTION BAR -->
            <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <input type="text" id="search-lead" placeholder="Search lead by name or phone..." class="px-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <button id="btn-open-add-modal" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    <span>Add New Lead</span>
                </button>
            </div>

            <!-- LEADS TABLE CARD -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b">
                                <th class="py-3 px-6">Name</th>
                                <th class="py-3 px-6">Phone Number</th>
                                <th class="py-3 px-6">Branch</th>
                                <th class="py-3 px-6">Status (Quick Change)</th>
                                <th class="py-3 px-6">Date Added</th>
                                <th class="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="leads-table-body" class="divide-y divide-gray-200 text-sm text-gray-700">
                            <!-- Dynamic Lead Rows -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ADD / EDIT LEAD MODAL -->
        <div id="lead-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center hidden z-50">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                <h3 id="modal-title" class="text-xl font-bold text-gray-800 mb-4">Add New Lead</h3>
                <form id="lead-form" class="space-y-4">
                    <input type="hidden" id="lead-id">
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                        <input type="text" id="lead-name" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number</label>
                        <input type="text" id="lead-phone" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Branch</label>
                        <select id="lead-branch" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="QC">Quezon City (QC)</option>
                            <option value="LP">Las Piñas (LP)</option>
                            <option value="Mandaluyong">Mandaluyong</option>
                            <option value="MM">Mastermind (MM)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Status</label>
                        <select id="lead-status" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="New Lead">New Lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Booked">Booked</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3 pt-4 border-t">
                        <button type="button" id="btn-close-modal" class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm">Cancel</button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">Save Lead</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const tableBody = container.querySelector('#leads-table-body');
    const modal = container.querySelector('#lead-modal');
    const modalTitle = container.querySelector('#modal-title');
    const leadForm = container.querySelector('#lead-form');
    const btnOpenAddModal = container.querySelector('#btn-open-add-modal');
    const btnCloseModal = container.querySelector('#btn-close-modal');

    // Function para i-render ang Talaan ng mga Leads
    function renderTable() {
        tableBody.innerHTML = leadsData.map(lead => `
            <tr class="hover:bg-gray-50 transition">
                <td class="py-3 px-6 font-semibold text-gray-800">${lead.name}</td>
                <td class="py-3 px-6">${lead.phone}</td>
                <td class="py-3 px-6"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">${lead.branch}</span></td>
                <td class="py-3 px-6">
                    <!-- Inline Status Selector Toggle -->
                    <select onchange="updateLeadStatus(${lead.id}, this.value)" class="px-2 py-1 text-xs font-semibold rounded-lg border focus:outline-none ${getStatusColorClass(lead.status)}">
                        <option value="New Lead" ${lead.status === 'New Lead' ? 'selected' : ''}>New Lead</option>
                        <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="Booked" ${lead.status === 'Booked' ? 'selected' : ''}>Booked</option>
                        <option value="Cancelled" ${lead.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td class="py-3 px-6 text-gray-500">${lead.dateAdded}</td>
                <td class="py-3 px-6 text-center space-x-2">
                    <button onclick="editLead(${lead.id})" class="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                    <button onclick="deleteLead(${lead.id})" class="text-red-600 hover:text-red-800 font-medium text-xs">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Kulay para sa Status Badges
    function getStatusColorClass(status) {
        switch (status) {
            case 'New Lead': return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'Contacted': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'Booked': return 'bg-green-50 text-green-700 border-green-200';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    }

    // Direct Inline Status Update handler
    window.updateLeadStatus = function(id, newStatus) {
        const lead = leadsData.find(l => l.id === id);
        if (lead) {
            lead.status = newStatus;
            renderTable();
        }
    };

    // Global Edit Action
    window.editLead = function(id) {
        const lead = leadsData.find(l => l.id === id);
        if (!lead) return;

        container.querySelector('#lead-id').value = lead.id;
        container.querySelector('#lead-name').value = lead.name;
        container.querySelector('#lead-phone').value = lead.phone;
        container.querySelector('#lead-branch').value = lead.branch;
        container.querySelector('#lead-status').value = lead.status;

        modalTitle.textContent = "Edit Lead Details";
        modal.classList.remove('hidden');
    };

    // Global Delete Action
    window.deleteLead = function(id) {
        if (confirm("Sigurado ka bang gusto mong burahin ang lead na ito?")) {
            leadsData = leadsData.filter(l => l.id !== id);
            renderTable();
        }
    };

    // Open Add Modal
    btnOpenAddModal.addEventListener('click', () => {
        leadForm.reset();
        container.querySelector('#lead-id').value = "";
        modalTitle.textContent = "Add New Lead";
        modal.classList.remove('hidden');
    });

    // Close Modal
    btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Form Submit (Add o Edit Save)
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = container.querySelector('#lead-id').value;
        const name = container.querySelector('#lead-name').value.trim();
        const phone = container.querySelector('#lead-phone').value.trim();
        const branch = container.querySelector('#lead-branch').value;
        const status = container.querySelector('#lead-status').value;

        if (id) {
            // Edit existing lead
            const lead = leadsData.find(l => l.id == id);
            if (lead) {
                lead.name = name;
                lead.phone = phone;
                lead.branch = branch;
                lead.status = status;
            }
        } else {
            // Add new lead
            const newLead = {
                id: Date.now(),
                name,
                phone,
                branch,
                status,
                dateAdded: new Date().toISOString().split('T')[0]
            };
            leadsData.unshift(newLead);
        }

        modal.classList.add('hidden');
        renderTable();
    });

    // Unang pag-load ng talahanayan
    renderTable();
}
