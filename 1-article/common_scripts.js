/**
 * 通用腳本 - Information is Delicious
 * 適用於所有文章頁面的基礎功能
 */

/* ==========================================================================
   響應式導覽列功能
   ========================================================================== */

/**
 * 初始化響應式導覽選單
 */
function initResponsiveNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // 漢堡選單點擊事件
        mobileMenuBtn.addEventListener('click', function() {
            // 切換選單狀態
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // 更新 aria-expanded 屬性
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // 點擊導覽連結時關閉選單
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // 點擊頁面其他地方時關閉選單
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // ESC 鍵關閉選單
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ==========================================================================
   Chart.js 通用設定
   ========================================================================== */

/**
 * Chart.js 預設配置
 */
const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
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
            ticks: {
                font: {
                    size: 11
                }
            }
        },
        x: {
            ticks: {
                font: {
                    size: 11
                }
            }
        }
    },
    interaction: {
        intersect: false,
        mode: 'index'
    }
};

/**
 * 建立線圖的通用函數
 * @param {string} canvasId - Canvas元素的ID
 * @param {Object} chartData - 圖表資料
 * @param {Object} customOptions - 自訂選項
 */
function createLineChart(canvasId, chartData, customOptions = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.error(`找不到ID為 ${canvasId} 的canvas元素`);
        return null;
    }

    // 合併預設選項與自訂選項
    const options = mergeDeep(defaultChartOptions, customOptions);
    
    return new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: chartData,
        options: options
    });
}

/**
 * 建立長條圖的通用函數
 * @param {string} canvasId - Canvas元素的ID
 * @param {Object} chartData - 圖表資料
 * @param {Object} customOptions - 自訂選項
 */
function createBarChart(canvasId, chartData, customOptions = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.error(`找不到ID為 ${canvasId} 的canvas元素`);
        return null;
    }

    const options = mergeDeep(defaultChartOptions, customOptions);
    
    return new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: chartData,
        options: options
    });
}

/* ==========================================================================
   工具函數
   ========================================================================== */

/**
 * 深度合併物件
 * @param {Object} target - 目標物件
 * @param {Object} source - 來源物件
 */
function mergeDeep(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

/**
 * 檢查是否為物件
 * @param {*} item - 要檢查的項目
 */
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/* ==========================================================================
   常用顏色調色盤
   ========================================================================== */

const colorPalette = {
    // 主要色彩
    primary: ['#dc2626', '#2563eb', '#059669', '#d97706', '#7c3aed', '#e11d48', '#0891b2', '#9333ea'],
    
    // 背景色彩（透明度10%）
    backgroundColors: [
        'rgba(220, 38, 38, 0.1)',
        'rgba(37, 99, 235, 0.1)',
        'rgba(5, 150, 105, 0.1)',
        'rgba(217, 119, 6, 0.1)',
        'rgba(124, 58, 237, 0.1)',
        'rgba(225, 29, 72, 0.1)',
        'rgba(8, 145, 178, 0.1)',
        'rgba(147, 51, 234, 0.1)'
    ],
    
    // 取得指定索引的顏色
    getColor: function(index) {
        return this.primary[index % this.primary.length];
    },
    
    // 取得指定索引的背景色
    getBackgroundColor: function(index) {
        return this.backgroundColors[index % this.backgroundColors.length];
    }
};

/* ==========================================================================
   響應式圖表處理
   ========================================================================== */

/**
 * 處理圖表響應式高度
 */
function handleChartResponsiveness() {
    const chartWrappers = document.querySelectorAll('.chart-wrapper');
    
    function updateChartHeight() {
        chartWrappers.forEach(wrapper => {
            if (window.innerWidth <= 768) {
                wrapper.style.height = '400px';
            } else {
                wrapper.style.height = '500px';
            }
        });
    }
    
    // 初始設定
    updateChartHeight();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', updateChartHeight);
}

/* ==========================================================================
   表格響應式處理
   ========================================================================== */

/**
 * 處理表格在小螢幕上的滾動
 */
function handleTableResponsiveness() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        // 如果表格寬度超過容器，添加水平滾動
        if (table.scrollWidth > table.clientWidth) {
            table.style.overflowX = 'auto';
        }
    });
}

/* ==========================================================================
   初始化
   ========================================================================== */

/**
 * DOM載入完成後執行
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化響應式導覽 (新增)
    initResponsiveNavigation();
    
    // 處理響應式功能
    handleChartResponsiveness();
    handleTableResponsiveness();
    
    // 為所有外部連結添加target="_blank"
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // 平滑滾動到錨點
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Information is Delicious - 通用腳本已載入 (包含響應式導覽)');
});