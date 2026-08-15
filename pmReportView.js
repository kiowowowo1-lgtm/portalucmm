// Local temporary storage para sa reports habang hindi pa nakakonekta sa Sheet
let reportsData = [
    {
        id: "REP-20260815-4821",
        subject: "Weekly Page Engagement & Leads Summary",
        paragraph: "Overall lead conversions this week increased by 15% across all branches, with Mandaluyong receiving the highest inquiry volume regarding PMS services.",
        submittedBy: "Page Manager",
        dateSubmitted: "2026-08-15 14:30"
    }
];

export function renderPmReportView(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- SUBMISSION FORM CARD -->
            <div class="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                <h3 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Submit New Report</h3>
                
                <form id="report-form" class="space-y-4">
                    <!-- Auto Generated ID Display -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Generated Report ID</label>
                        <input type="text" id="report-id-display" readonly class="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs font-mono font-bold text-blue-600 focus:outline-none cursor-not-allowed">
                    </div>

                    <!-- Subject Input -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Report Subject</label>
                        <input type="text" id="report-subject" required placeholder="e.g. End of Day Page Summary" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>

                    <!-- Paragraph Input -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Report Details (Paragraph)</label>
                        <textarea id="report-paragraph" required rows="6" placeholder="Isulat dito ang detalyadong ulat o salaysay..." class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                    </div>

                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition flex items-center justify-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                        <span>Submit Report</span>
                    </button>
                </form>
            </div>

            <!-- SUBMITTED REPORTS HISTORY LIST -->
            <div class="lg:col-span-2 space-y-4">
                <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-gray-800">Submitted Reports Log</h3>
                    <span id="reports-count" class="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">0 Reports</span>
                </div>

                <div id="reports-list-container" class="space-y-4">
                    <!-- Dynamic Submitted Report Cards -->
                </div>
            </div>

        </div>
    `;

    const reportForm = container.querySelector('#report-form');
    const reportIdInput = container.querySelector('#report-id-display');
    const reportSubjectInput = container.querySelector('#report-subject');
    const reportParagraphInput = container.querySelector('#report-paragraph');
    const reportsListContainer = container.querySelector('#reports-list-container');
    const reportsCount = container.querySelector('#reports-count');

    // Function para mag-generate ng natatanging Report ID (hal: REP-20260815-3912)
    function generateReportID() {
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `REP-${dateStr}-${randomNum}`;
    }

    // I-set ang bagong ID sa input field
    function resetFormID() {
        reportIdInput.value = generateReportID();
    }

    // Function para i-render ang talaan ng mga naisubmit na ulat
    function renderReportsList() {
        reportsCount.textContent = `${reportsData.length} ${reportsData.length === 1 ? 'Report' : 'Reports'}`;

        if (reportsData.length === 0) {
            reportsListContainer.innerHTML = `
                <div class="bg-white p-8 rounded-xl border border-dashed text-center text-gray-400 text-sm">
                    Wala pang naisusumiteng ulat.
                </div>
            `;
            return;
        }

        reportsListContainer.innerHTML = reportsData.map(rep => `
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 space-y-2 hover:border-blue-300 transition">
                <div class="flex justify-between items-start">
                    <div>
                        <span class="text-[10px] font-mono font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">${rep.id}</span>
                        <h4 class="text-base font-bold text-gray-800 mt-1">${rep.subject}</h4>
                    </div>
                    <span class="text-xs text-gray-400 font-medium">${rep.dateSubmitted}</span>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">${rep.paragraph}</p>
                <div class="flex justify-between items-center pt-2 text-xs text-gray-400">
                    <span>Submitted by: <strong class="text-gray-700">${rep.submittedBy}</strong></span>
                    <button onclick="deleteReport('${rep.id}')" class="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Delete report handler
    window.deleteReport = function(id) {
        if (confirm("Sigurado ka bang gusto mong burahin ang ulat na ito?")) {
            reportsData = reportsData.filter(r => r.id !== id);
            renderReportsList();
        }
    };

    // Form submission event
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newReport = {
            id: reportIdInput.value,
            subject: reportSubjectInput.value.trim(),
            paragraph: reportParagraphInput.value.trim(),
            submittedBy: "Page Manager",
            dateSubmitted: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
        };

        reportsData.unshift(newReport);
        
        // Reset inputs
        reportSubjectInput.value = '';
        reportParagraphInput.value = '';
        resetFormID();

        renderReportsList();
    });

    // Unang pag-setup
    resetFormID();
    renderReportsList();
}
