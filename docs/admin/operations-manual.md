# Operations Manual

## PVT Hostel Check-In System Administration Guide

This manual provides comprehensive operational procedures for administrators managing the PVT Hostel Check-In System.

## Table of Contents

1. [System Overview](#system-overview)
2. [Daily Operations](#daily-operations)
3. [User Management](#user-management)
4. [Data Management](#data-management)
5. [System Configuration](#system-configuration)
6. [Monitoring and Reporting](#monitoring-and-reporting)
7. [Backup and Recovery](#backup-and-recovery)
8. [Troubleshooting](#troubleshooting)
9. [Emergency Procedures](#emergency-procedures)
10. [Compliance and Auditing](#compliance-and-auditing)

## System Overview

### Architecture Summary
- **Type**: Client-side web application
- **Data Storage**: Browser LocalStorage
- **Access**: Web browser on any device
- **Deployment**: Static file hosting

### Key Components
1. **Check-in Interface** (index.html)
2. **Guest Management** (guests.html)
3. **Styling** (styles.css)
4. **Logic** (script.js)

## Daily Operations

### Morning Procedures

#### 1. System Health Check (8:00 AM)
```
□ Access main check-in page
□ Verify form loads correctly
□ Test guest list page
□ Confirm export functionality
□ Check browser console for errors
```

#### 2. Data Backup (8:15 AM)
```
□ Export previous day's data
□ Save to dated folder: /backups/YYYY/MM/DD/
□ Verify export file integrity
□ Upload to cloud backup (if applicable)
```

#### 3. Review Dashboard (8:30 AM)
```
□ Current occupancy count
□ Today's expected check-outs
□ Today's expected check-ins
□ Any flagged issues from night shift
```

### Shift Handover Procedures

#### Information to Communicate
1. **System Status**
   - Any technical issues
   - Pending maintenance
   - Recent changes

2. **Guest Issues**
   - VIP arrivals
   - Problem guests
   - Special requests

3. **Operational Notes**
   - Room availability
   - Maintenance schedules
   - Staff assignments

### End of Day Procedures

#### 1. Final Data Export (10:00 PM)
```
□ Export complete guest list
□ Save with timestamp
□ Verify all check-ins recorded
□ Document any discrepancies
```

#### 2. System Check (10:15 PM)
```
□ Clear any test data
□ Verify tomorrow's setup
□ Check browser storage usage
□ Log any issues for morning
```

## User Management

### Access Control

#### Current System
- No built-in authentication
- Relies on device/browser access
- Physical security important

#### Best Practices
1. **Dedicated Terminals**
   - Use specific computers for check-in
   - Password-protect user accounts
   - Auto-lock after inactivity

2. **Browser Security**
   - Use private/incognito mode on shared computers
   - Clear data when switching users
   - Disable password saving

### Training New Staff

#### Basic Training Checklist
```
□ System overview (30 min)
□ Check-in process walkthrough (45 min)
□ Guest list navigation (15 min)
□ Data export procedures (15 min)
□ Common issues resolution (30 min)
□ Practice sessions (1 hour)
□ Supervised first shift
```

#### Training Materials
- Quick Start Guide
- Ambassador User Guide
- Video tutorials (if available)
- Practice scenarios

## Data Management

### Storage Monitoring

#### Check Storage Usage
```javascript
// Run in browser console
const used = new Blob(Object.values(localStorage)).size;
console.log(`Storage used: ${(used/1024/1024).toFixed(2)} MB`);
```

#### Storage Limits
- **Recommended**: Export when > 1000 guests
- **Warning**: At 4MB usage
- **Critical**: At 4.5MB usage

### Data Archival

#### Monthly Archive Process
1. **Export All Data**
   ```
   - Click "Export Guest Data"
   - Save as: guests_archive_YYYY_MM.json
   ```

2. **Verify Export**
   ```
   - Open file in text editor
   - Check for completeness
   - Verify record count
   ```

3. **Archive Storage**
   ```
   /archives/
   ├── 2025/
   │   ├── 01/
   │   │   ├── guests_archive_2025_01.json
   │   │   └── guests_archive_2025_01_backup.json
   │   └── 02/
   │       └── guests_archive_2025_02.json
   ```

4. **Clear Old Data** (Optional)
   ```javascript
   // Only after confirming successful archive
   localStorage.removeItem('hostelGuests');
   localStorage.setItem('hostelGuests', '[]');
   ```

### Data Import/Recovery

#### Restore from Backup
```javascript
// In browser console
const backupData = /* paste backup JSON here */;
localStorage.setItem('hostelGuests', JSON.stringify(backupData));
location.reload();
```

## System Configuration

### Browser Settings

#### Recommended Configuration
1. **Chrome/Edge**
   - JavaScript: Enabled
   - Cookies: Enabled
   - Pop-ups: Allowed for site
   - Storage: Persistent

2. **Firefox**
   - Enhanced Tracking Protection: Standard
   - Cookies: Enabled
   - JavaScript: Enabled

3. **Safari**
   - Prevent Cross-Site Tracking: Off for this site
   - JavaScript: Enabled
   - Storage: Allowed

### Performance Optimization

#### Browser Cache
```
□ Clear cache monthly
□ Keep browser updated
□ Disable unnecessary extensions
□ Use dedicated profile for system
```

#### System Performance
```
□ Restart browser daily
□ Close unnecessary tabs
□ Monitor memory usage
□ Regular system updates
```

## Monitoring and Reporting

### Daily Reports

#### Occupancy Report
```javascript
// Generate in console
const guests = JSON.parse(localStorage.getItem('hostelGuests') || '[]');
const today = new Date().toISOString().split('T')[0];
const active = guests.filter(g => 
  g.checkInDate <= today && g.checkOutDate > today
);
console.log(`Current occupancy: ${active.length} guests`);
```

#### Check-in Statistics
```javascript
// Today's check-ins
const todayCheckins = guests.filter(g => 
  g.checkInDate === today
);
console.log(`Today's check-ins: ${todayCheckins.length}`);
```

### Monthly Reports

#### Generate Monthly Summary
1. Export month's data
2. Import to spreadsheet
3. Create pivot tables for:
   - Total check-ins
   - Average stay length
   - Room utilization
   - Nationality breakdown

### KPI Tracking

#### Key Metrics
1. **Operational**
   - Check-in processing time
   - System uptime
   - Data export frequency
   - Error rate

2. **Business**
   - Occupancy rate
   - Average length of stay
   - Guest satisfaction
   - Revenue per room

## Backup and Recovery

### Backup Strategy

#### 3-2-1 Rule
- **3** copies of data
- **2** different storage types
- **1** offsite backup

#### Implementation
1. **Primary**: Browser LocalStorage
2. **Daily Backup**: Local server/computer
3. **Cloud Backup**: Google Drive/Dropbox

### Automated Backup Script

#### Windows Batch Script
```batch
@echo off
set date=%date:~10,4%-%date:~4,2%-%date:~7,2%
mkdir "C:\Backups\%date%"
echo Please export data and save to C:\Backups\%date%\
pause
```

#### Mac/Linux Shell Script
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
mkdir -p ~/Backups/$DATE
echo "Please export data and save to ~/Backups/$DATE/"
```

### Recovery Procedures

#### Data Loss Scenarios

1. **Browser Data Cleared**
   - Locate latest backup
   - Import using console method
   - Verify data integrity

2. **Computer Failure**
   - Access from another computer
   - Restore from cloud backup
   - Update all bookmarks

3. **Corrupted Data**
   - Export current data (if possible)
   - Identify last good backup
   - Merge if necessary

## Troubleshooting

### Common Issues

#### Issue: Form Won't Submit
```
Diagnosis:
□ Check browser console for errors
□ Verify all required fields filled
□ Check date validation

Solution:
1. Refresh page (F5)
2. Clear browser cache
3. Try different browser
4. Check JavaScript enabled
```

#### Issue: Guests Not Showing
```
Diagnosis:
□ Check correct browser/computer
□ Verify LocalStorage not cleared
□ Check browser privacy mode

Solution:
1. Check localStorage in console
2. Restore from recent backup
3. Verify no filters applied
```

#### Issue: Export Not Working
```
Diagnosis:
□ Check browser download settings
□ Verify popup blocker
□ Check disk space

Solution:
1. Try different browser
2. Check downloads folder
3. Disable popup blocker
4. Manual copy from console
```

### Advanced Troubleshooting

#### Browser Console Commands
```javascript
// Check if data exists
localStorage.getItem('hostelGuests')

// Count total guests
JSON.parse(localStorage.getItem('hostelGuests')).length

// Find specific guest
const guests = JSON.parse(localStorage.getItem('hostelGuests'));
guests.find(g => g.lastName === 'Smith')

// Clear all data (CAUTION!)
localStorage.clear()
```

## Emergency Procedures

### System Failure

#### Immediate Actions
1. **Switch to Backup System**
   - Use paper forms
   - Alternative computer
   - Mobile device

2. **Document Everything**
   - Guest names
   - Room numbers
   - Check-in times
   - Contact information

3. **Communication**
   - Inform management
   - Update staff
   - Note for guests

#### Recovery Steps
```
1. Assess the situation
2. Implement temporary solution
3. Contact IT support
4. Document all manual entries
5. Input data when system restored
6. Verify no data lost
7. Report incident
```

### Data Breach

#### If Unauthorized Access Suspected
1. **Immediate Actions**
   - Change all passwords
   - Export current data
   - Document incident
   - Notify management

2. **Investigation**
   - Check access logs
   - Review recent changes
   - Identify affected data
   - Determine scope

3. **Remediation**
   - Implement additional security
   - Update access procedures
   - Staff retraining
   - Policy review

## Compliance and Auditing

### Data Protection

#### GDPR Compliance (If Applicable)
1. **Data Minimization**
   - Collect only necessary data
   - Delete when no longer needed
   - Regular data audits

2. **Guest Rights**
   - Right to access data
   - Right to correction
   - Right to deletion
   - Right to data portability

3. **Security Measures**
   - Physical access control
   - Regular backups
   - Incident response plan
   - Staff training

### Audit Procedures

#### Monthly Audit Checklist
```
□ Verify backup completeness
□ Check data accuracy sampling
□ Review access logs
□ Test recovery procedures
□ Update documentation
□ Staff compliance check
```

#### Annual Audit
1. **System Review**
   - Performance metrics
   - Security assessment
   - Compliance check
   - Update needs

2. **Process Review**
   - Operational efficiency
   - Staff feedback
   - Guest satisfaction
   - Improvement opportunities

### Record Keeping

#### Required Records
1. **Operational**
   - Daily check-in logs
   - System downtime
   - Error reports
   - Maintenance logs

2. **Compliance**
   - Audit reports
   - Training records
   - Incident reports
   - Policy updates

## Best Practices Summary

### Do's
✅ Export data daily
✅ Maintain multiple backups
✅ Train staff thoroughly
✅ Document all issues
✅ Keep system updated
✅ Monitor performance
✅ Review procedures regularly

### Don'ts
❌ Share login credentials
❌ Skip daily backups
❌ Ignore error messages
❌ Use personal devices
❌ Modify system files
❌ Clear data without backup
❌ Bypass procedures

## Appendices

### A. Contact Information
- **IT Support**: it@pvthostel.com
- **Management**: mgmt@pvthostel.com
- **Emergency**: +1-234-567-8900

### B. Glossary
- **LocalStorage**: Browser data storage
- **JSON**: JavaScript Object Notation
- **Export**: Save data to file
- **Console**: Browser developer tool

### C. Resources
- [Technical Documentation](../technical/architecture.md)
- [User Guide](../user-guides/ambassador-guide.md)
- [API Documentation](../api/overview.md)
- [Security Guidelines](../security/guidelines.md)

---

*Last Updated: January 2025*
*Version: 1.0*
*Next Review: July 2025*