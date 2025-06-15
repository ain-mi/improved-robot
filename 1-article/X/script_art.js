// Chart.js 設定
const ctx = document.getElementById('aiTrendChart').getContext('2d');

const aiTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
            {
                label: '製造業🏭',
                data: [3, 4, 5, 6, 6, 7],
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: '電信業📡',
                data: [3, 4, 5, 5, 6, 7],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: '醫療健康🏥',
                data: [3, 4, 5, 5, 6, 6],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: '資安產業🛡️',
                data: [2, 2, 3, 4, 4, 5],
                borderColor: '#d97706',
                backgroundColor: 'rgba(217, 119, 6, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: '金融科技💸',
                data: [3, 4, 5, 5, 5, 5],
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: '零售與行銷🛍️',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: '#e11d48',
                backgroundColor: 'rgba(225, 29, 72, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: '自駕＆IoT🚗🌐',
                data: [1, 2, 3, 4, 4, 5],
                borderColor: '#0891b2',
                backgroundColor: 'rgba(8, 145, 178, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: '教育與創意🎨📚',
                data: [1, 1, 2, 3, 4, 6],
                borderColor: '#9333ea',
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'AI投入程度趨勢圖 (2020-2025)',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 7,
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        return value + '分';
                    }
                },
                title: {
                    display: true,
                    text: 'AI投入程度 (1-7分)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: '年份'
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }
});