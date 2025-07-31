# Ambassador User Guide

## Welcome to PVT Hostel Check-In System

This guide will help you efficiently check in guests and manage their information using our simple web-based system.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Checking In Guests](#checking-in-guests)
3. [Viewing Guest List](#viewing-guest-list)
4. [Checking Out Guests](#checking-out-guests)
5. [Exporting Data](#exporting-data)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

## Getting Started

### Accessing the System

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to your hostel's check-in URL
3. Bookmark the page for quick access

### System Requirements

- Modern web browser (updated within last 2 years)
- Internet connection (only for initial page load)
- JavaScript enabled in your browser

## Checking In Guests

### Step-by-Step Process

1. **Open the Check-In Form**
   - Navigate to the main page (index.html)
   - You'll see the guest check-in form

2. **Fill in Guest Information**

   **Required Fields (marked with *):**
   - **First Name**: Guest's first name
   - **Last Name**: Guest's last name
   - **ID/Passport Number**: Official identification number
   - **Room Number**: Assigned room (e.g., "101", "A12")
   - **Check-In Date**: Today's date (auto-filled)
   - **Check-Out Date**: Expected departure date
   - **Number of Guests**: How many people (minimum 1)

   **Optional Fields:**
   - **Email**: Guest's email address
   - **Phone Number**: Contact number
   - **Additional Notes**: Special requests, late arrival, etc.

3. **Submit the Form**
   - Click the "Check In Guest" button
   - You'll see a green success message
   - The form will reset for the next guest

### Quick Tips

- 📅 Dates are automatically set to today and tomorrow
- 🔄 Use Tab key to move between fields quickly
- ✅ Red asterisk (*) indicates required fields
- 📝 Add notes for special circumstances

## Viewing Guest List

### Accessing the Guest List

1. Click "View All Guests" button on the main page
2. Or navigate directly to guests.html

### Understanding the Guest Table

The guest list shows:
- **Name**: Full name of the guest
- **Room**: Assigned room number
- **ID/Passport**: Identification number
- **Check-In**: Arrival date
- **Check-Out**: Departure date
- **Contact**: Email and phone (if provided)
- **Actions**: Check-out button

### Sorting and Finding Guests

- Guests are automatically sorted by check-in time (newest first)
- Use browser's Find function (Ctrl+F or Cmd+F) to search
- Scroll through the list to find specific guests

## Checking Out Guests

### Process

1. Go to the Guest List page
2. Find the guest in the table
3. Click the "Check Out" button in their row
4. Confirm the action when prompted
5. Guest will be removed from the active list

### Important Notes

- ⚠️ Check-out is permanent - make sure it's the right guest
- 📊 Data is preserved in exports even after check-out
- 🔄 You cannot undo a check-out action

## Exporting Data

### When to Export

- Daily backup (recommended)
- Before system maintenance
- For reporting purposes
- When switching computers

### How to Export

1. Click "Export Guest Data" button
2. File will download automatically
3. Default filename: `guests_export_YYYY-MM-DD.json`

### Using Exported Data

- Open in any text editor to view
- Import into Excel or Google Sheets
- Share with management for reports
- Keep as backup records

## Common Tasks

### Editing Guest Information

Currently, direct editing is not available. To update guest information:
1. Check out the guest
2. Check them in again with correct information

### Handling Room Changes

1. Note the change in the original booking's notes
2. Check out the guest from old room
3. Check in to new room with updated information

### Group Check-Ins

For multiple guests in the same room:
1. Use "Number of Guests" field
2. Add all names in the notes field
3. Or create separate entries for each guest

### Late Arrivals

1. Add "Late arrival expected" in notes
2. Include expected arrival time
3. Check in when guest arrives

## Troubleshooting

### Form Won't Submit

**Problem**: Clicking submit does nothing
**Solutions**:
- Check all required fields are filled
- Ensure check-out date is after check-in date
- Refresh the page and try again

### Lost Guest Data

**Problem**: Can't see previously entered guests
**Solutions**:
- Make sure you're using the same browser
- Check if someone cleared browser data
- Restore from your latest export

### Export Not Working

**Problem**: Export button doesn't download file
**Solutions**:
- Check browser's download settings
- Try a different browser
- Ensure pop-ups aren't blocked

### Date Issues

**Problem**: Wrong dates showing
**Solutions**:
- Check your computer's date settings
- Manually select correct dates
- Clear form and start over

## Best Practices

### Daily Routine

1. **Start of Day**
   - Export yesterday's data for backup
   - Review today's expected check-ins
   - Verify room availability

2. **During Check-Ins**
   - Verify ID matches the name
   - Confirm room number twice
   - Add relevant notes

3. **End of Day**
   - Export the day's data
   - Review tomorrow's check-outs
   - Clear any completed check-outs

### Data Management

- 📁 Export data daily
- 🗂️ Organize exports by date
- 🔒 Store backups securely
- 🗑️ Archive old data monthly

### Security Tips

- 🔐 Never share guest information
- 💻 Log out of shared computers
- 🚫 Don't save passwords in browser
- 👁️ Be aware of shoulder surfers

### Customer Service

- 😊 Greet guests warmly
- ✍️ Double-check spelling of names
- 📱 Verify contact information
- 📝 Note special requests

## Keyboard Shortcuts

- **Tab**: Move to next field
- **Shift+Tab**: Move to previous field
- **Enter**: Submit form (when on button)
- **Ctrl/Cmd+F**: Find on page
- **Ctrl/Cmd+P**: Print page

## Emergency Procedures

### System Not Loading

1. Check internet connection
2. Try different browser
3. Contact IT support
4. Use paper backup form

### Data Recovery

1. Check for recent exports
2. Look in browser downloads folder
3. Contact IT for assistance
4. Use paper records if needed

## Frequently Asked Questions

**Q: Can I check in a guest for a past date?**
A: Yes, manually change the check-in date to the past date.

**Q: How many guests can the system handle?**
A: Thousands, but export monthly for best performance.

**Q: Can multiple people use the system?**
A: Yes, but on different computers/browsers to avoid conflicts.

**Q: Is the data backed up automatically?**
A: No, you must manually export for backups.

**Q: Can I access this from my phone?**
A: Yes, the system works on mobile browsers.

## Contact Support

For additional help:
- **IT Support**: it@pvthostel.com
- **Phone**: +1-234-567-8900
- **Available**: Monday-Friday, 9 AM - 5 PM

Remember: When in doubt, export your data first!

---

*Last Updated: January 2025*
*Version: 1.0*