// Chart.js 圖表初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化圖表
    initChart();
    
    // 初始化打字機效果
    const title = document.querySelector('.blog-post h1');
    if (title) {
        typeWriter(title, title.textContent);
    }
    
    // 為統計摘要標題添加打字機效果
    const statsTitle = document.querySelector('.stats-title');
    if (statsTitle) {
        // 延遲執行，讓主標題先完成
        setTimeout(() => {
            typeWriter(statsTitle, statsTitle.textContent, 80);
        }, 2000);
    }
    
    // 為社會影響分析標題添加打字機效果
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        // 延遲執行，讓統計摘要標題先完成
        setTimeout(() => {
            typeWriter(sectionTitle, sectionTitle.textContent, 70);
        }, 4000);
    }
    
    // 初始化訂閱表單
    initSubscriptionForm();
});

// 圖表初始化函數
function initChart() {
    const ctx = document.getElementById('genderChart').getContext('2d');

    const data = {
        labels: ['103年', '113年'],
        datasets: [
            {
                label: '男性人口（萬）',
                data: [1168.0, 1153.2],
                backgroundColor: 'rgba(23, 238, 113, 0.6)',
                yAxisID: 'y',
            },
            {
                label: '女性人口（萬）',
                data: [1172.0, 1187.2],
                backgroundColor: 'rgb(255, 99, 172)',
                yAxisID: 'y',
            },
            {
                label: '性比例（女=100）',
                data: [99.66, 97.13],
                type: 'line',
                borderColor: 'orange',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y1',
                tension: 0.3,
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: '人口（萬）'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: false,
                    grid: {
                        drawOnChartArea: false
                    },
                    title: {
                        display: true,
                        text: '性比例（女=100）'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '103年與113年 性別人口與性比例比較'
                }
            }
        }
    };

    new Chart(ctx, config);
}

// 訂閱表單初始化
function initSubscriptionForm() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwUXQjHNI34kuzpv-b_SmtC0r5lzISeC4csTu928T40N5UUobkhPlhAYlrsMDGkJBRU/exec';
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('emailInput');
    const button = document.getElementById('submitBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value;

        // 鎖定按鈕
        button.innerHTML = '訂閱中...';
        button.disabled = true;

        const formData = new URLSearchParams();
        formData.append('email', email);

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            // 顯示成功訊息
            alert('感謝訂閱躺平報！我們會將最新文章發送到：' + email);
            emailInput.value = '';
        } catch (err) {
            alert('訂閱失敗，請再試一次😥');
        } finally {
            button.innerHTML = '訂閱 >';
            button.disabled = false;
        }
    });
}

// 打字機效果函數
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}
