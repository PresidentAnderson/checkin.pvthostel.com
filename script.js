// Initialize date inputs with today's date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').value = today;
    
    // Set checkout date to tomorrow by default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('checkOutDate').value = tomorrow.toISOString().split('T')[0];
});

// Handle form submission
document.getElementById('guestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const guest = {};
    
    for (let [key, value] of formData.entries()) {
        guest[key] = value;
    }
    
    // Add timestamp and unique ID
    guest.id = Date.now().toString();
    guest.checkedInAt = new Date().toISOString();
    
    // Validate dates
    if (new Date(guest.checkOutDate) <= new Date(guest.checkInDate)) {
        showMessage('Check-out date must be after check-in date', 'error');
        return;
    }
    
    // Save to localStorage
    saveGuest(guest);
    
    // Show success message
    showMessage('Guest checked in successfully!', 'success');
    
    // Reset form
    this.reset();
    
    // Reset dates to today/tomorrow
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').value = today;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('checkOutDate').value = tomorrow.toISOString().split('T')[0];
});

// Save guest to localStorage
function saveGuest(guest) {
    let guests = getGuests();
    guests.push(guest);
    localStorage.setItem('hostelGuests', JSON.stringify(guests));
}

// Get guests from localStorage
function getGuests() {
    const guests = localStorage.getItem('hostelGuests');
    return guests ? JSON.parse(guests) : [];
}

// Show message to user
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    const main = document.querySelector('main');
    main.insertBefore(messageDiv, main.firstChild);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Export guest data as JSON
function exportData() {
    const guests = getGuests();
    
    if (guests.length === 0) {
        showMessage('No guest data to export', 'error');
        return;
    }
    
    const dataStr = JSON.stringify(guests, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `guests_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showMessage('Guest data exported successfully!', 'success');
}