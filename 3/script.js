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

// 投票功能
let voteCount = 0;
const voteCountElement = document.getElementById('vote-count');

function vote(type) {
    if (type === 'up') {
        voteCount++;
    } else if (type === 'down') {
        voteCount--;
    }
    voteCountElement.textContent = voteCount;
    
    // 添加動畫效果
    voteCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        voteCountElement.style.transform = 'scale(1)';
    }, 200);
}

// 留言功能
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const textarea = this.querySelector('textarea');
    const commentText = textarea.value.trim();
    
    if (commentText) {
        addComment(commentText);
        textarea.value = '';
    }
});

function addComment(text) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-TW');
    const timeStr = now.toLocaleTimeString('zh-TW');
    
    commentDiv.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">> 訪客</span>
            <span class="comment-date">${dateStr} ${timeStr}</span>
        </div>
        <div class="comment-content">${text}</div>
    `;
    
    commentDiv.style.opacity = '0';
    commentDiv.style.transform = 'translateY(20px)';
    commentsList.insertBefore(commentDiv, commentsList.firstChild);
    
    // 添加淡入動畫
    setTimeout(() => {
        commentDiv.style.transition = 'all 0.5s ease';
        commentDiv.style.opacity = '1';
        commentDiv.style.transform = 'translateY(0)';
    }, 10);
}

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
            alert('感謝訂閱！我們會將最新文章發送到：' + email);
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