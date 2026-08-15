export function renderPmDashboardView(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- KPI CARDS -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Leads Input Today</p>
                        <h3 class="text-3xl font-bold text-gray-900 mt-1">12</h3>
                    </div>
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Scheduled Appointments Today</p>
                        <h3 class="text-3xl font-bold text-gray-900 mt-1">8</h3>
                    </div>
                    <div class="p-3 bg-green-50 text-green-600 rounded-lg">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
            </div>

            <!-- BOOKING PER BRANCH TOMORROW -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Bookings Per Branch Tomorrow (Sun, Aug 16)</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg border text-center">
                        <span class="text-xs font-semibold text-gray-500 uppercase">QC</span>
                        <p class="text-2xl font-bold text-blue-600 mt-1">3</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg border text-center">
                        <span class="text-xs font-semibold text-gray-500 uppercase">Las Piñas (LP)</span>
                        <p class="text-2xl font-bold text-blue-600 mt-1">2</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg border text-center">
                        <span class="text-xs font-semibold text-gray-500 uppercase">Mandaluyong</span>
                        <p class="text-2xl font-bold text-blue-600 mt-1">5</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg border text-center">
                        <span class="text-xs font-semibold text-gray-500 uppercase">Mastermind (MM)</span>
                        <p class="text-2xl font-bold text-blue-600 mt-1">1</p>
                    </div>
                </div>
            </div>

            <!-- NUMBER OF APPOINTMENTS THIS WEEK TABLE -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-800">Number of Appointments This Week</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b">
                                <th class="py-3 px-6">Date / Day</th>
                                <th class="py-3 px-6 text-center">QC</th>
                                <th class="py-3 px-6 text-center">LP</th>
                                <th class="py-3 px-6 text-center">MANDALUYONG</th>
                                <th class="py-3 px-6 text-center">MM</th>
                                <th class="py-3 px-6 text-center font-bold">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 text-sm text-gray-700">
                            <tr>
                                <td class="py-3 px-6 font-medium">Sat, Aug 15</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center font-bold">0</td>
                            </tr>
                            <tr class="bg-gray-50/50">
                                <td class="py-3 px-6 font-medium">Sun, Aug 16</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center font-bold">0</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-6 font-medium">Mon, Aug 17</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center font-bold">0</td>
                            </tr>
                            <tr class="bg-gray-50/50">
                                <td class="py-3 px-6 font-medium">Tue, Aug 18</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center font-bold">0</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-6 font-medium">Wed, Aug 19</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center font-bold">0</td>
                            </tr>
                            <tr class="bg-gray-50/50">
                                <td class="py-3 px-6 font-medium">Thu, Aug 20</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center font-bold">0</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-6 font-medium">Fri, Aug 21</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center">0</td>
                                <td class="py-3 px-6 text-center font-bold">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
