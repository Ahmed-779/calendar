let currentDate = new Date();

function buildCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarBody = document.getElementById('calendarTable').tBodies[0];
    
    // Set displayed month and year
    monthYear.textContent = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear();
    
    // Get the first day of the month and the total days in the month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    // Clear previous cells
    calendarBody.innerHTML = '';
    
    let dayCounter = 1;
    
    for(let i = 0; i < 6; i++) { // Max 6 weeks in a month
        const row = calendarBody.insertRow();
        
        for(let j = 0; j < 7; j++) {
            const cell = row.insertCell();
            
            // Add day number if within the month
            if((i === 0 && j >= firstDay) || (i > 0 && dayCounter <= totalDays)) {
                cell.textContent = dayCounter++;
            }
        }
    }
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    buildCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    buildCalendar();
}

// Initially build the calendar
buildCalendar();

function addEvent() {
    const eventName = prompt("Event Name:");
    if(!eventName) return; // If the user pressed Cancel, exit the function
    
    const eventDate = prompt("Event Date (YYYY-MM-DD):");
    if(!eventDate) return; // If the user pressed Cancel, exit the function

    // Check if the date is valid
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if(!eventDate.match(datePattern)) {
        alert("Invalid date format. Please use YYYY-MM-DD.");
        return;
    }

    // Check if there are existing events on this date
    if(!events[eventDate]) {
        events[eventDate] = [];
    }
    
    // Add the event to the storage object
    events[eventDate].push(eventName);

    // Rebuild the calendar to reflect the new event
    buildCalendar();
}

