// Sample initial bookings data
let bookingsData = [
    { id: 1, date: "2026-08-16", clientName: "Juan Dela Cruz", service: "PMS & Oil Change", branch: "QC", time: "09:00 AM" },
    { id: 2, date: "2026-08-16", clientName: "Maria Santos", service: "Brake Cleaning", branch: "Mandaluyong", time: "01:00 PM" },
    { id: 3, date: "2026-08-18", clientName: "Pedro Penduko", service: "Engine Tune-up", branch: "LP", time: "10:30 AM" }
];

export function renderPmCalendarView(container) {
    // Agosto 2026 Grid setup (Aug 1, 2026 is Saturday)
    const currentYear = 2026;
    const currentMonth = 7; // August (0-indexed)
    const monthName = "August 2026";
    const daysInMonth = 31;
    const startDayOfWeek = 6; // Saturday (0=Sun, 1=Mon, ..., 6=Sat)

    container.innerHTML = `
        <div class="space-y-6">
            <!-- CALENDAR HEADER & CONTROLS -->
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <h2 class="text-xl font-bold text-gray-800">${monthName}</h2>
                    <span class="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold">Live Calendar</span>
                </div>
                <div class="text-sm text-gray-500 font-medium">
                    Click any day block to view or add booking details
                </div>
            </div>

            <!-- CALENDAR GRID -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <!-- DAYS OF THE WEEK HEADER -->
                <div class="grid grid-cols-7 bg-gray-50 text-center font-bold text-xs uppercase tracking-wider text-gray-600 border-b py-3">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                <!-- MONTH DAYS GRID -->
                <div id="calendar-days-grid" class="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-gray-100 bg-gray-50">
                    <!-- Dynamic Calendar Blocks -->
                </div>
            </div>
        </div>

        <!-- DAY BOOKINGS MODAL -->
        <div id="booking-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center hidden z-50">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] flex flex-col">
                <div class="flex justify-between items-center border-b pb-3 mb-4">
                    <div>
                        <h3 id="modal-date-title" class="text-lg font-bold text-gray-800">Bookings for Date</h3>
                        <p class="text-xs text-gray-500">Scheduled appointments and maintenance entries</p>
                    </div>
                    <button id="btn-close-booking-modal" class="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
                </div>

                <!-- BOOKING LIST -->
                <div id="day-bookings-list" class="space-y-3 overflow-y-auto flex-1 pr-1 mb-4">
                    <!-- Dynamic Booking Cards -->
                </div>

                <!-- ADD BOOKING SECTION -->
                <div class="border-t pt-4">
                    <h4 class="text-sm font-bold text-gray-800 mb-2">Add Booking for this Date</h4>
                    <form id="quick-booking-form" class="grid grid-cols-2 gap-3">
                        <input type="hidden" id="selected-date-input">
                        <input type="text" id="book-client" placeholder="Client Name" required class="px-3 py-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                        <input type="text" id="book-service" placeholder="Service (e.g. PMS)" required class="px-3 py-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                        <select id="book-branch" class="px-3 py-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="QC">QC Branch</option>
                            <option value="LP">LP Branch</option>
                            <option value="Mandaluyong">Mandaluyong Branch</option>
                            <option value="MM">MM Branch</option>
                        </select>
                        <input type="text" id="book-time" placeholder="Time (e.g. 10:00 AM)" required class="px-3 py-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                        <button type="submit" class="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2 rounded-lg transition">Save Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    const grid = container.querySelector('#calendar-days-grid');
    const modal = container.querySelector('#booking-modal');
    const modalTitle = container.querySelector('#modal-date-title');
    const dayBookingsList = container.querySelector('#day-bookings-list');
    const btnCloseModal = container.querySelector('#btn-close-booking-modal');
    const bookingForm = container.querySelector('#quick-booking-form');
    const selectedDateInput = container.querySelector('#selected-date-input');

    // Function para i-render ang Month Grid
    function renderCalendarGrid() {
        grid.innerHTML = '';

        // Empty cells bago mag-start ang 1st day ng month
        for (let i = 0; i < startDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = "bg-gray-100/50 min-h-[100px] border-b border-r border-gray-100";
            grid.appendChild(emptyCell);
        }

        // Generate cells para sa bawat araw ng buwan
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayBookings = bookingsData.filter(b => b.date === dateStr);

            const dayCell = document.createElement('div');
            dayCell.className = "bg-white min-h-[110px] p-2 hover:bg-blue-50/50 transition cursor-pointer flex flex-col justify-between border-b border-r border-gray-100";
            
            // Markahan ang kasalukuyang araw (hal. Aug 15)
            const isToday = day === 15;

            dayCell.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-bold ${isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm' : 'text-gray-700'}">${day}</span>
                    ${dayBookings.length > 0 ? `<span class="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">${dayBookings.length} Booked</span>` : ''}
                </div>
                
                <!-- Display Simple Booking Blocks inside Calendar Cell -->
                <div class="space-y-1 overflow-hidden flex-1">
                    ${dayBookings.slice(0, 2).map(b => `
                        <div class="bg-blue-50 border border-blue-200 text-blue-700 text-[10px] p-1 rounded font-medium truncate">
                            <span class="font-bold">${b.time}</span> - ${b.clientName}
                        </div>
                    `).join('')}
                    ${dayBookings.length > 2 ? `<div class="text-[9px] text-gray-400 font-semibold pl-1">+${dayBookings.length - 2} more...</div>` : ''}
                </div>
            `;

            // On-click event bawat day block
            dayCell.addEventListener('click', () => openDayModal(dateStr, day));
            grid.appendChild(dayCell);
        }
    }

    // Buksan ang modal para sa napiling araw
    function openDayModal(dateStr, dayNumber) {
        selectedDateInput.value = dateStr;
        modalTitle.textContent = `Appointments for August ${dayNumber}, 2026`;
        renderDayBookingsList(dateStr);
        modal.classList.remove('hidden');
    }

    // Listahan ng mga booking sa loob ng modal
    function renderDayBookingsList(dateStr) {
        const dayBookings = bookingsData.filter(b => b.date === dateStr);

        if (dayBookings.length === 0) {
            dayBookingsList.innerHTML = `<p class="text-xs text-gray-400 text-center py-6 border border-dashed rounded-lg">Walang nakatakdang booking sa petsang ito.</p>`;
            return;
        }

        dayBookingsList.innerHTML = dayBookings.map(b => `
            <div class="bg-gray-50 border p-3 rounded-lg flex justify-between items-center">
                <div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">${b.time}</span>
                        <h4 class="text-xs font-bold text-gray-800">${b.clientName}</h4>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${b.service} &bull; <span class="font-semibold text-gray-700">${b.branch} Branch</span></p>
                </div>
                <button onclick="removeBooking(${b.id}, '${dateStr}')" class="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition">Remove</button>
            </div>
        `).join('');
    }

    // Remove booking handler
    window.removeBooking = function(id, dateStr) {
        bookingsData = bookingsData.filter(b => b.id !== id);
        renderDayBookingsList(dateStr);
        renderCalendarGrid();
    };

    // Close Modal
    btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Add new booking submit
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = selectedDateInput.value;
        const clientName = container.querySelector('#book-client').value.trim();
        const service = container.querySelector('#book-service').value.trim();
        const branch = container.querySelector('#book-branch').value;
        const time = container.querySelector('#book-time').value.trim();

        const newBooking = {
            id: Date.now(),
            date,
            clientName,
            service,
            branch,
            time
        };

        bookingsData.push(newBooking);
        bookingForm.reset();
        selectedDateInput.value = date;

        renderDayBookingsList(date);
        renderCalendarGrid();
    });

    // Initial load ng Calendar
    renderCalendarGrid();
}
