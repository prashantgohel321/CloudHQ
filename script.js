// --- DOM Element References ---
const navItems = document.querySelectorAll('.nav-item');
const dashboardSections = document.querySelectorAll('.dashboard-section');
const iamTableBody = document.getElementById('iam-table-body');
const providerFilter = document.getElementById('provider-filter');
const departmentFilter = document.getElementById('department-filter');
const accessFilter = document.getElementById('access-filter');
const accessRequestForm = document.getElementById('access-request-form');
const requestCardsContainer = document.getElementById('request-cards-container');
const auditLogsDisplay = document.getElementById('audit-logs-display');
const provisionForm = document.getElementById('provision-form');
const provisionedResourcesContainer = document.getElementById('provisioned-resources-container');
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthYear = document.getElementById('current-month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const expiryDetailsList = document.getElementById('expiry-details-list');
const hygieneScoreValue = document.getElementById('hygiene-score-value');
const hygieneHealthStatus = document.getElementById('hygiene-health-status');
const hygieneChecklistUl = document.getElementById('hygiene-checklist');
const quickActionBtns = document.querySelectorAll('.action-btn');
const actionFeedback = document.getElementById('action-feedback');

// --- Mock Data ---
let iamUsers = [
    { name: 'Alice Smith', department: 'Engineering', provider: 'AWS', roles: ['EC2Admin', 'S3ReadOnly'], accessLevel: 'Admin' },
    { name: 'Bob Johnson', department: 'Finance', provider: 'Azure', roles: ['StorageContributor', 'Reader'], accessLevel: 'Write' },
    { name: 'Charlie Brown', department: 'Engineering', provider: 'GCP', roles: ['CloudFunctionsAdmin', 'BigQueryUser'], accessLevel: 'Admin' },
    { name: 'Diana Prince', department: 'HR', provider: 'AWS', roles: ['IAMUser', 'DynamoDBViewer'], accessLevel: 'Read' },
    { name: 'Eve Adams', department: 'Engineering', provider: 'Azure', roles: ['VirtualMachineContributor'], accessLevel: 'Write' },
    { name: 'Frank White', department: 'Finance', provider: 'GCP', roles: ['BillingAccountUser'], accessLevel: 'Read' },
    { name: 'Grace Lee', department: 'Engineering', provider: 'AWS', roles: ['RootUser'], accessLevel: 'Root' },
    { name: 'Heidi Klum', department: 'HR', provider: 'Azure', roles: ['SecurityReader'], accessLevel: 'Read' },
    { name: 'Ivan Petrov', department: 'Engineering', provider: 'GCP', roles: ['ComputeAdmin'], accessLevel: 'Admin' },
];

let accessRequests = [
    { id: 1, requester: 'John Doe', resource: 'prod-db-access', level: 'Write', justification: 'Urgent bug fix', status: 'Pending', timestamp: new Date('2025-07-10T10:00:00') },
    { id: 2, requester: 'Sarah Lee', resource: 'dev-s3-bucket', level: 'Read', justification: 'Data analysis', status: 'Approved', timestamp: new Date('2025-07-08T14:30:00') },
    { id: 3, requester: 'Mike Ross', resource: 'staging-ec2', level: 'Admin', justification: 'Deployment testing', status: 'Expired', timestamp: new Date('2025-07-01T09:00:00') },
];

let auditLogs = [
    '[INFO] 2025-07-15 08:00:00 - User sarah@company.com logged in from 192.168.1.10',
    '[ALERT] 2025-07-15 08:05:12 - Admin access granted to alice@company.com for EC2 (review required)',
    '[INFO] 2025-07-15 08:10:30 - User bob@company.com assumed IAM role S3ReadOnly',
    '[WARNING] 2025-07-15 08:15:45 - Unused Lambda role found: my-old-function-role',
    '[INFO] 2025-07-15 08:20:01 - Resource "dev-api-gateway" provisioned by charlie@company.com',
    '[ALERT] 2025-07-15 08:25:05 - Public S3 bucket detected: customer-data-bucket (critical)',
];
let logInterval; // To store the interval ID for audit logs

let provisionedResources = [
    { id: 'res-001', type: 'EC2 Instance', region: 'us-east-1', size: 't2.medium', purpose: 'Web Server', team: 'Frontend', status: 'Completed', timestamp: new Date('2025-07-12') },
    { id: 'res-002', type: 'RDS Database', region: 'eu-west-1', size: 'db.t3.micro', purpose: 'Analytics DB', team: 'Data Science', status: 'Completed', timestamp: new Date('2025-07-10') },
];

let calendarEvents = [
    { date: new Date('2025-07-20'), type: 'Temporary Access Expiry', user: 'Liam', policy: 'prod-read-access' },
    { date: new Date('2025-07-25'), type: 'Key Rotation Reminder', user: 'Security Team', policy: 'Root Account Keys' },
    { date: new Date('2025-08-05'), type: 'Policy Review Due', user: 'Compliance', policy: 'GDPR-aligned IAM' },
    { date: new Date('2025-07-15'), type: 'Internal Audit', user: 'Internal Audit Team', policy: 'Network Security' }, // Today's event
    { date: new Date('2025-07-28'), type: 'Security Patch Deadline', user: 'DevOps', policy: 'All EC2 Instances' },
];
let currentCalendarDate = new Date(); // To track current month in calendar

let hygieneChecklist = [
    { text: 'MFA Enabled for Root User', status: 'compliant' },
    { text: 'No Public S3 Buckets', status: 'warning', hint: '(1 found)' },
    { text: 'Least Privilege IAM Policies', status: 'compliant' },
    { text: 'Long-lived Credentials', status: 'critical', hint: '(2 active)' },
    { text: 'Unused IAM Roles/Users Cleaned', status: 'warning', hint: '(3 found)' },
    { text: 'Security Groups Hardened', status: 'compliant' },
    { text: 'Regular Vulnerability Scans', status: 'compliant' },
    { text: 'CloudTrail/CloudWatch Logs Enabled', status: 'compliant' },
];

// --- Utility Functions ---

/**
 * Displays a temporary feedback message to the user.
 * @param {string} message - The message to display.
 * @param {number} duration - How long to display the message in milliseconds.
 */
function showFeedback(message, duration = 3000) {
    actionFeedback.textContent = message;
    actionFeedback.classList.add('show');
    setTimeout(() => {
        actionFeedback.classList.remove('show');
    }, duration);
}

/**
 * Formats a date object into a readable string.
 * @param {Date} date - The date object to format.
 * @returns {string} Formatted date string (e.g., "July 15, 2025").
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// --- Dashboard Navigation Logic ---

/**
 * Handles navigation between dashboard sections.
 * @param {Event} event - The click event.
 */
function handleNavigation(event) {
    const clickedNavItem = event.currentTarget;
    const targetSectionId = clickedNavItem.dataset.section;

    // Remove 'active' from current nav item and section
    document.querySelector('.nav-item.active')?.classList.remove('active');
    document.querySelector('.dashboard-section.active')?.classList.remove('active');

    // Add 'active' to clicked nav item and target section
    document.getElementById(targetSectionId).classList.add('active');
    clickedNavItem.classList.add('active');


    // Special handling for audit logs to start/stop interval
    if (targetSectionId === 'audit-logs') {
        if (!logInterval) {
            logInterval = setInterval(addRandomLogEntry, 3000); // Start adding logs every 3 seconds
        }
    } else {
        if (logInterval) {
            clearInterval(logInterval); // Stop adding logs if not on audit log section
            logInterval = null;
        }
    }

    // Re-render specific sections if needed on navigation
    if (targetSectionId === 'iam-overview') {
        renderIamTable();
    } else if (targetSectionId === 'access-request') {
        renderAccessRequests();
    } else if (targetSectionId === 'resource-provisioning') {
        renderProvisionedResources();
    } else if (targetSectionId === 'iam-calendar') {
        renderCalendar(currentCalendarDate);
    } else if (targetSectionId === 'hygiene-score') {
        updateHygieneScore();
        renderHygieneChecklist();
    }
}

// Attach event listeners to navigation items
navItems.forEach(item => {
    item.addEventListener('click', handleNavigation);
});

// --- IAM Role Overview Functions ---

/**
 * Renders the IAM role overview table based on current filters.
 */
function renderIamTable() {
    iamTableBody.innerHTML = ''; // Clear existing rows

    const selectedProvider = providerFilter.value;
    const selectedDepartment = departmentFilter.value;
    const selectedAccess = accessFilter.value;

    const filteredUsers = iamUsers.filter(user => {
        const matchesProvider = !selectedProvider || user.provider === selectedProvider;
        const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
        const matchesAccess = !selectedAccess || user.accessLevel === selectedAccess;
        return matchesProvider && matchesDepartment && matchesAccess;
    });

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.department}</td>
            <td>${user.provider}</td>
            <td>${user.roles.map(role => `<span class="badge ${role.toLowerCase().includes('admin') || role.toLowerCase().includes('root') ? 'admin' : (role.toLowerCase().includes('read') || role.toLowerCase().includes('viewer') ? 'read' : 'write')}">${role}</span>`).join('')}</td>
            <td><span class="badge ${user.accessLevel.toLowerCase()}">${user.accessLevel}</span></td>
        `;
        iamTableBody.appendChild(row);
    });
}

// Attach event listeners to filters
providerFilter.addEventListener('change', renderIamTable);
departmentFilter.addEventListener('change', renderIamTable);
accessFilter.addEventListener('change', renderIamTable);

// --- Access Request Manager Functions ---

/**
 * Handles the submission of a new access request.
 * @param {Event} event - The form submission event.
 */
function handleSubmitAccessRequest(event) {
    event.preventDefault(); // Prevent default form submission

    const requester = document.getElementById('requester-name').value;
    const resource = document.getElementById('resource-name').value;
    const level = document.getElementById('access-level-request').value;
    const justification = document.getElementById('justification').value;

    const newRequest = {
        id: accessRequests.length + 1,
        requester,
        resource,
        level,
        justification,
        status: 'Pending',
        timestamp: new Date()
    };
    accessRequests.unshift(newRequest); // Add to the beginning

    renderAccessRequests();
    accessRequestForm.reset(); // Clear the form
    showFeedback('Access request submitted successfully!');

    // Simulate approval/denial after a delay
    setTimeout(() => {
        const randomIndex = Math.random();
        if (randomIndex < 0.7) { // 70% chance of approval
            newRequest.status = 'Approved';
            showFeedback(`Request for ${newRequest.resource} by ${newRequest.requester} has been Approved!`);
        } else { // 30% chance of denial
            newRequest.status = 'Denied';
            showFeedback(`Request for ${newRequest.resource} by ${newRequest.requester} has been Denied.`, 5000);
        }
        renderAccessRequests(); // Re-render to show updated status
    }, 5000); // Simulate processing time
}

/**
 * Renders the access request cards.
 */
function renderAccessRequests() {
    requestCardsContainer.innerHTML = '';
    accessRequests.forEach(request => {
        const card = document.createElement('div');
        card.classList.add('request-card');
        card.innerHTML = `
            <h4>${request.resource}</h4>
            <p><strong>Requester:</strong> ${request.requester}</p>
            <p><strong>Access Level:</strong> ${request.level}</p>
            <p><strong>Justification:</strong> ${request.justification}</p>
            <p><strong>Requested On:</strong> ${formatDate(request.timestamp)}</p>
            <span class="status-tag ${request.status.toLowerCase()}">${request.status}</span>
            ${request.status === 'Pending' ? `
            <div class="actions">
                <button class="approve" data-id="${request.id}">Approve</button>
                <button class="deny" data-id="${request.id}">Deny</button>
            </div>
            ` : ''}
        `;
        requestCardsContainer.appendChild(card);
    });

    // Add event listeners for approve/deny buttons
    requestCardsContainer.querySelectorAll('.approve').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const req = accessRequests.find(r => r.id === id);
            if (req) {
                req.status = 'Approved';
                renderAccessRequests();
                showFeedback(`Request for ${req.resource} by ${req.requester} Approved!`);
            }
        });
    });

    requestCardsContainer.querySelectorAll('.deny').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const req = accessRequests.find(r => r.id === id);
            if (req) {
                req.status = 'Denied';
                renderAccessRequests();
                showFeedback(`Request for ${req.resource} by ${req.requester} Denied.`, 5000);
            }
        });
    });
}

accessRequestForm.addEventListener('submit', handleSubmitAccessRequest);

// --- Cloud Audit Logs Functions ---

const logMessages = [
    '[INFO] User {user}@company.com accessed S3 bucket {bucket-name}',
    '[ALERT] Admin access granted to {user}@company.com for {resource-type}',
    '[WARNING] Unused IAM role detected: {role-name}',
    '[INFO] Resource {resource-name} modified by {user}@company.com',
    '[DEBUG] API call: {api-call} from {ip-address}',
    '[INFO] New user {user}@company.com created in {provider}',
    '[ALERT] Publicly accessible database instance found: {db-name}',
    '[WARNING] Policy {policy-name} is nearing expiry for {user}@company.com',
    '[INFO] Security group {sg-id} updated by {user}@company.com',
    '[DEBUG] Health check passed for {service-name}',
];

const users = ['raj', 'tanvi', 'priya', 'vikas', 'neha', 'sanjay'];
const buckets = ['prod-data', 'dev-logs', 'customer-assets'];
const resourceTypes = ['EC2', 'RDS', 'Lambda', 'S3', 'VPC'];
const roleNames = ['OldDevRole', 'TestFunctionRole', 'UnusedAdmin'];
const apiCalls = ['DescribeInstances', 'PutObject', 'CreateUser', 'DeletePolicy'];
const ipAddresses = ['192.168.1.1', '10.0.0.5', '172.16.0.10'];
const providers = ['AWS', 'Azure', 'GCP'];
const dbNames = ['prod-mysql-db', 'analytics-pg'];
const policyNames = ['TempAccessPolicy', 'AuditPolicy'];
const sgIds = ['sg-0a1b2c3d', 'sg-f4e5d6c7'];
const serviceNames = ['Web App', 'Auth Service', 'Database'];


/**
 * Generates a random log message.
 * @returns {string} A randomly generated log entry.
 */
function getRandomLogMessage() {
    let message = logMessages[Math.floor(Math.random() * logMessages.length)];
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    message = message.replace('{user}', users[Math.floor(Math.random() * users.length)]);
    message = message.replace('{bucket-name}', buckets[Math.floor(Math.random() * buckets.length)]);
    message = message.replace('{resource-type}', resourceTypes[Math.floor(Math.random() * resourceTypes.length)]);
    message = message.replace('{role-name}', roleNames[Math.floor(Math.random() * roleNames.length)]);
    message = message.replace('{api-call}', apiCalls[Math.floor(Math.random() * apiCalls.length)]);
    message = message.replace('{ip-address}', ipAddresses[Math.floor(Math.random() * ipAddresses.length)]);
    message = message.replace('{provider}', providers[Math.floor(Math.random() * providers.length)]);
    message = message.replace('{db-name}', dbNames[Math.floor(Math.random() * dbNames.length)]);
    message = message.replace('{policy-name}', policyNames[Math.floor(Math.random() * policyNames.length)]);
    message = message.replace('{sg-id}', sgIds[Math.floor(Math.random() * sgIds.length)]);
    message = message.replace('{service-name}', serviceNames[Math.floor(Math.random() * serviceNames.length)]);


    let logType = 'info';
    if (message.includes('[ALERT]')) logType = 'alert';
    else if (message.includes('[WARNING]')) logType = 'warning';
    else if (message.includes('[DEBUG]')) logType = 'debug';

    return `<div class="log-entry ${logType}">[${logType.toUpperCase()}] ${date} ${timestamp} - ${message.replace(`[${logType.toUpperCase()}] `, '')}</div>`;
}

/**
 * Adds a new random log entry to the audit logs display.
 */
function addRandomLogEntry() {
    auditLogsDisplay.innerHTML += getRandomLogMessage();
    auditLogsDisplay.scrollTop = auditLogsDisplay.scrollHeight; // Auto-scroll to bottom
}

// --- Resource Provisioning Simulator Functions ---

/**
 * Handles the submission of a new resource provisioning request.
 * @param {Event} event - The form submission event.
 */
function handleProvisionSubmit(event) {
    event.preventDefault();

    const type = document.getElementById('resource-type').value;
    const region = document.getElementById('resource-region').value;
    const size = document.getElementById('resource-size').value;
    const purpose = document.getElementById('resource-purpose').value;
    const team = document.getElementById('resource-team').value;

    if (!type || !region || !size || !purpose || !team) {
        showFeedback('Please fill all provisioning fields.', 3000);
        return;
    }

    const newResource = {
        id: 'res-' + Math.random().toString(36).substr(2, 6),
        type,
        region,
        size,
        purpose,
        team,
        status: 'Provisioning',
        timestamp: new Date()
    };
    provisionedResources.unshift(newResource); // Add to the beginning

    renderProvisionedResources();
    provisionForm.reset();
    showFeedback(`Provisioning ${type} for ${team}...`);

    // Simulate provisioning completion
    setTimeout(() => {
        newResource.status = 'Completed';
        renderProvisionedResources();
        showFeedback(`${type} (${newResource.id}) provisioned successfully for ${team}!`, 5000);
    }, 4000); // Simulate 4 seconds provisioning time
}

/**
 * Renders the list of provisioned resources.
 */
function renderProvisionedResources() {
    provisionedResourcesContainer.innerHTML = '';
    provisionedResources.forEach(resource => {
        const card = document.createElement('div');
        card.classList.add('provisioned-card');
        card.innerHTML = `
            <h4>${resource.type} (${resource.id})</h4>
            <p><strong>Region:</strong> ${resource.region}</p>
            <p><strong>Size/Config:</strong> ${resource.size}</p>
            <p><strong>Purpose:</strong> ${resource.purpose}</p>
            <p><strong>Team:</strong> ${resource.team}</p>
            <p><strong>Provisioned On:</strong> ${formatDate(resource.timestamp)}</p>
            <span class="status-tag ${resource.status.toLowerCase()}">${resource.status}</span>
            ${resource.status === 'Completed' ? `<button class="delete-btn" data-id="${resource.id}">Delete</button>` : ''}
        `;
        provisionedResourcesContainer.appendChild(card);
    });

    // Add event listeners for delete buttons
    provisionedResourcesContainer.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const idToDelete = e.target.dataset.id;
            provisionedResources = provisionedResources.filter(res => res.id !== idToDelete);
            renderProvisionedResources();
            showFeedback(`Resource ${idToDelete} deleted.`);
        });
    });
}

provisionForm.addEventListener('submit', handleProvisionSubmit);

// --- IAM Policy Expiry Calendar Functions ---

/**
 * Renders the calendar for the given date.
 * @param {Date} date - The date to render the calendar for.
 */
function renderCalendar(date) {
    calendarGrid.innerHTML = '<span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>'; // Reset grid and add day headers
    currentMonthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDays = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= numDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        const currentDay = new Date();
        const isToday = (day === currentDay.getDate() && month === currentDay.getMonth() && year === currentDay.getFullYear());
        if (isToday) {
            dayElement.classList.add('current-day');
        }

        const dateToCheck = new Date(year, month, day);
        const eventsOnThisDay = calendarEvents.filter(event =>
            event.date.getDate() === day &&
            event.date.getMonth() === month &&
            event.date.getFullYear() === year
        );

        if (eventsOnThisDay.length > 0) {
            dayElement.classList.add('has-event');
            const eventDot = document.createElement('div');
            eventDot.classList.add('event-dot');
            dayElement.appendChild(eventDot);
        }

        dayElement.dataset.date = dateToCheck.toISOString().split('T')[0]; // Store date as YYYY-MM-DD
        dayElement.addEventListener('click', (e) => displayExpiryDetails(e.currentTarget.dataset.date));

        calendarGrid.appendChild(dayElement);
    }
}

/**
 * Displays expiry details for a selected date.
 * @param {string} selectedDateString - The date string (YYYY-MM-DD) for which to display details.
 */
function displayExpiryDetails(selectedDateString) {
    expiryDetailsList.innerHTML = '';
    const selectedDate = new Date(selectedDateString + 'T00:00:00'); // Ensure UTC for consistent comparison

    const events = calendarEvents.filter(event =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
    );

    if (events.length === 0) {
        expiryDetailsList.innerHTML = `<p>No events scheduled for ${formatDate(selectedDate)}.</p>`;
    } else {
        events.forEach(event => {
            const item = document.createElement('div');
            let statusClass = 'green';
            if (event.type.includes('Expiry') || event.type.includes('Deadline')) {
                statusClass = 'red';
            } else if (event.type.includes('Reminder') || event.type.includes('Review')) {
                statusClass = 'yellow';
            }

            item.classList.add('expiry-item', statusClass);
            item.innerHTML = `
                <strong>${event.type}</strong><br>
                User: ${event.user}<br>
                Policy: ${event.policy}
            `;
            expiryDetailsList.appendChild(item);
        });
    }
}

// Calendar navigation event listeners
prevMonthBtn.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar(currentCalendarDate);
});

nextMonthBtn.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar(currentCalendarDate);
});

// --- Cloud Hygiene Score Functions ---

/**
 * Updates the simulated hygiene score and health status.
 */
function updateHygieneScore() {
    // Simple logic: 100 - (critical * 15 + warning * 5)
    const criticalIssues = hygieneChecklist.filter(item => item.status === 'critical').length;
    const warningIssues = hygieneChecklist.filter(item => item.status === 'warning').length;

    let score = 100 - (criticalIssues * 15 + warningIssues * 5);
    score = Math.max(0, score); // Ensure score doesn't go below 0

    hygieneScoreValue.textContent = score;

    hygieneHealthStatus.classList.remove('green', 'yellow', 'red');
    if (score >= 80) {
        hygieneHealthStatus.textContent = 'Good Hygiene';
        hygieneHealthStatus.classList.add('green');
    } else if (score >= 50) {
        hygieneHealthStatus.textContent = 'Moderate Hygiene';
        hygieneHealthStatus.classList.add('yellow');
    } else {
        hygieneHealthStatus.textContent = 'Poor Hygiene';
        hygieneHealthStatus.classList.add('red');
    }
}

/**
 * Renders the hygiene checklist.
 */
function renderHygieneChecklist() {
    hygieneChecklistUl.innerHTML = '';
    hygieneChecklist.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('checklist-item', item.status);
        let icon = '';
        if (item.status === 'compliant') icon = 'check_circle';
        else if (item.status === 'warning') icon = 'warning';
        else if (item.status === 'critical') icon = 'error';

        li.innerHTML = `
            <span class="material-icons">${icon}</span>
            ${item.text}
            ${item.hint ? `<span class="action-hint">${item.hint}</span>` : ''}
        `;
        hygieneChecklistUl.appendChild(li);
    });
}


// --- Quick Actions Sidebar Functions ---

/**
 * Handles clicks on quick action buttons.
 * @param {Event} event - The click event.
 */
function handleQuickAction(event) {
    const action = event.target.dataset.action;
    let message = '';

    switch (action) {
        case 'generate-credentials':
            message = 'Generating temporary credentials... (Simulated)';
            showFeedback(message);
            setTimeout(() => showFeedback('Temporary credentials generated and sent to your email.', 4000), 2000);
            break;
        case 'rotate-keys':
            message = 'Initiating key rotation for all active keys... (Simulated)';
            showFeedback(message);
            setTimeout(() => showFeedback('3 keys rotated successfully. Please update your applications.', 5000), 3000);
            break;
        case 'audit-unused':
            message = 'Auditing unused resources... This may take a moment. (Simulated)';
            showFeedback(message);
            setTimeout(() => showFeedback('Audit complete. Found 5 unused resources. Check audit logs.', 5000), 4000);
            // Simulate adding a log entry for the audit
            setTimeout(() => {
                auditLogs.push('[INFO] 2025-07-15 08:30:00 - Audit of unused resources completed. 5 resources identified.');
                if (document.querySelector('#audit-logs.active')) { // Only update if on audit logs page
                    addRandomLogEntry(); // This will add the latest log
                }
            }, 4500);
            break;
        default:
            message = 'Unknown action!';
            showFeedback(message);
    }
}

// Attach event listeners to quick action buttons
quickActionBtns.forEach(btn => {
    btn.addEventListener('click', handleQuickAction);
});

// --- Initial Dashboard Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Render initial data for the default active section (IAM Overview)
    renderIamTable();
    renderAccessRequests(); // Render requests on load, even if section is hidden
    renderProvisionedResources(); // Render provisioned resources on load
    renderCalendar(currentCalendarDate); // Render initial calendar
    updateHygieneScore(); // Calculate and display initial score
    renderHygieneChecklist(); // Render initial checklist

    // Start audit log interval if audit logs is the initial active section
    if (document.getElementById('audit-logs').classList.contains('active')) {
        logInterval = setInterval(addRandomLogEntry, 3000);
    }
});
