// 为Intersection Observer API添加polyfill支持（针对旧浏览器）
if (!('IntersectionObserver' in window)) {
    (function() {
        function IntersectionObserver(callback, options) {
            this.callback = callback;
            this.options = options || {};
            this.threshold = this.options.threshold || 0;
            this.rootMargin = this.options.rootMargin || '0px';
            this.observers = [];
            
            // 简单的滚动监听实现
            this.checkIntersections = function() {
                this.observers.forEach(function(observer) {
                    var rect = observer.element.getBoundingClientRect();
                    var isVisible = (
                        rect.top < (window.innerHeight || document.documentElement.clientHeight) * (1 + this.threshold) &&
                        rect.bottom > 0
                    );
                    
                    if (isVisible && !observer.visible) {
                        observer.visible = true;
                        this.callback([{
                            isIntersecting: true,
                            target: observer.element
                        }]);
                    }
                }.bind(this));
            };
            
            window.addEventListener('scroll', this.checkIntersections.bind(this));
            window.addEventListener('resize', this.checkIntersections.bind(this));
        }
        
        IntersectionObserver.prototype.observe = function(element) {
            this.observers.push({
                element: element,
                visible: false
            });
            this.checkIntersections();
        };
        
        IntersectionObserver.prototype.unobserve = function(element) {
            this.observers = this.observers.filter(function(observer) {
                return observer.element !== element;
            });
        };
        
        window.IntersectionObserver = IntersectionObserver;
    })();
}

// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 汉堡菜单功能
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单
        const navItems = navLinks.querySelectorAll('li a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // 平滑滚动
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动监听 - 导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
                navbar.style.padding = '15px 0';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                navbar.style.padding = '20px 0';
            }
        }
    });
    
    // 作品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // 筛选作品
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // 添加动画效果
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // 滚动动画 - 元素进入视口时的动画
    const animatedElements = document.querySelectorAll('.about-preview, .portfolio-preview, .skills-preview, .skill-item, .portfolio-item, .contact-item, section h2, .animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 为元素添加动画类
                entry.target.classList.add('animate');
                
                // 为不同类型的元素设置不同的延迟
                if (entry.target.classList.contains('animate-on-scroll')) {
                    const delay = index * 0.1; // 依次延迟
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        // 为元素添加适当的动画类（如果没有的话）
        if (!element.classList.contains('animate-on-scroll') && 
            element.tagName.toLowerCase() !== 'h2') {
            element.classList.add('animate-on-scroll', 'fade-in-up');
        }
        
        observer.observe(element);
    });
    
    // 表单验证
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // 这里可以添加AJAX提交逻辑
            // 目前使用简单的模拟提交
            alert('表单提交成功！我会尽快与您联系。');
            contactForm.reset();
        });
    }
    
    // 回到顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});