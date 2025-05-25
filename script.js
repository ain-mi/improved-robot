// 打字機效果
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

// 初始化頁面效果
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.blog-post h1');
    typeWriter(title, title.textContent);
});

// 訂閱功能
const subscribeForm = document.getElementById('subscribe-form');

subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
        // 添加提交動畫
        const button = this.querySelector('button');
        button.innerHTML = '處理中...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('感謝訂閱躺平報！我們會將最新文章發送到：' + email);
            emailInput.value = '';
            button.innerHTML = '訂閱 >';
            button.disabled = false;
        }, 1000);
    }
});

// 游標閃爍效果
const blink = document.querySelector('.blink');
setInterval(() => {
    blink.style.opacity = blink.style.opacity === '0' ? '1' : '0';
}, 500); 