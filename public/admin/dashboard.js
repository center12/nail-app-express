// Check if user is authenticated
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/admin/login.html';
}

// API endpoints
const API_BASE_URL = '/api';
const endpoints = {
    users: `${API_BASE_URL}/users`,
    intakeForms: `${API_BASE_URL}/intake-forms`,
    subscriptions: `${API_BASE_URL}/subscriptions`,
    stats: `${API_BASE_URL}/stats`
};

// Fetch data with authentication
async function fetchData(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                window.location.href = '/admin/login.html';
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Update dashboard statistics
async function updateStats() {
    try {
        const stats = await fetchData(endpoints.stats);
        
        // Update statistics cards
        document.getElementById('totalUsers').textContent = stats.totalUsers || 0;
        document.getElementById('totalIntakeForms').textContent = stats.totalIntakeForms || 0;
        document.getElementById('activeSubscriptions').textContent = stats.activeSubscriptions || 0;
        document.getElementById('totalRevenue').textContent = `$${stats.totalRevenue || 0}`;

        // Update charts
        updateUserGrowthChart(stats.userGrowth);
        updateRevenueChart(stats.revenueData);
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Update user growth chart
function updateUserGrowthChart(data) {
    const ctx = document.getElementById('userGrowthChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'New Users',
                data: data.values,
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Update revenue chart
function updateRevenueChart(data) {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Revenue',
                data: data.values,
                backgroundColor: '#eab308',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => `$${value}`
                    }
                }
            }
        }
    });
}

// Update recent activity table
async function updateRecentActivity() {
    try {
        const activities = await fetchData(`${endpoints.stats}/recent-activity`);
        const tableBody = document.getElementById('recentActivityTable');
        tableBody.innerHTML = '';

        activities.forEach(activity => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900">${activity.user}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${activity.action}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">${new Date(activity.date).toLocaleDateString()}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }">
                        ${activity.status}
                    </span>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error updating recent activity:', error);
    }
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login.html';
});

// Initialize dashboard
async function initDashboard() {
    await updateStats();
    await updateRecentActivity();
    
    // Refresh data every 5 minutes
    setInterval(async () => {
        await updateStats();
        await updateRecentActivity();
    }, 5 * 60 * 1000);
}

// Start the dashboard
initDashboard(); 