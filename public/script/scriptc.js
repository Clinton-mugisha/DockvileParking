const months = document.querySelectorAll('.month-hover');
const numDates = document.querySelectorAll('.num-dates span');
const eventIndicators = document.querySelectorAll('.event-indicator');
const addEventButtons = document.querySelectorAll('.add-event');

// Event handling for changing months
let currentMonth = 3; // April is selected by default (index 3)
months.forEach((month, index) => {
    month.addEventListener('click', () => {
        // Remove active classes from all months and event indicators
        months.forEach(m => m.classList.remove('month-color'));
        eventIndicators.forEach(indicator => indicator.classList.remove('active-day'));

        // Highlight the selected month and its corresponding event indicator
        month.classList.add('month-color');
        eventIndicators[index].classList.add('active-day');

        currentMonth = index;
        updateCalendar();
    });
});

// Event handling for clicking on dates
numDates.forEach((date, index) => {
    date.addEventListener('click', () => {
        // Remove active classes from all event indicators
        eventIndicators.forEach(indicator => indicator.classList.remove('active-day'));

        // Highlight the selected date's event indicator
        eventIndicators[index].classList.add('active-day');
    });
});

// Event handling for adding events
addEventButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const selectedMonth = currentMonth + 1; // Since months are 0-indexed
        const selectedDate = numDates[index].textContent.trim();

        // Replace this with your logic to open a modal or form for adding events
        // For demonstration purposes, we're just logging the selected date and month
        console.log(`Adding event for ${selectedDate}/${selectedMonth}`);
    });
});

function updateCalendar() {
    // Replace this with your logic to update the calendar's content for the selected month
    // You'll need to update the date values, event indicators, and possibly other content
}

// Initial setup, highlight April and its corresponding event indicator
months[currentMonth].classList.add('month-color');
eventIndicators[currentMonth].classList.add('active-day');
