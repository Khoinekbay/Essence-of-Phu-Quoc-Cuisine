
const translations = {
    vi: {
        "nav.home": "Trang Chủ",
        "nav.menu": "Thực Đơn",
        "nav.map": "Bản Đồ",
        "nav.about": "Giới Thiệu",
        "nav.contact": "Liên Hệ",
        "hero.subtitle": "Khám phá Đảo Ngọc",
        "hero.title": "Hương Vị <br/> <span class='text-transparent bg-clip-text bg-gradient-to-r from-sand-gold to-yellow-200'>Trăm Năm</span>",
        "hero.desc": "Hành trình ẩm thực đánh thức mọi giác quan, từ vị mặn mòi của biển cả đến hương thơm nồng nàn của tiêu và rượu sim.",
        "hero.btn": "Khám Phá Ngay",
        "scroll.down": "Cuộn xuống",
        "menu.subtitle": "Thực Đơn",
        "menu.title": "Tinh Hoa <span class='italic text-ocean-blue'>Ẩm Thực</span>",
        "dish.bunquay": "Bún Quậy Kiến Xây",
        "dish.bunquay.desc": "Trải nghiệm tự pha nước chấm và thưởng thức hương vị tươi ngon của hải sản xay nhuyễn.",
        "dish.goicatrich": "Gỏi Cá Trích",
        "dish.goicatrich.desc": "Sự kết hợp hoàn hảo giữa cá tươi và dừa.",
        "dish.bunken": "Bún Kèn",
        "dish.ghe": "Ghẹ Hàm Ninh",
        "dish.nhum": "Nhum Biển",
        "dish.garay": "Gà Rẫy Phú Quốc",
        "dish.garay.desc": "Thịt chắc, thơm ngon, hương vị núi rừng.",
        "btn.details": "Xem Chi Tiết",
        "map.title": "Bản Đồ <span class='text-ocean-blue'>Ẩm Thực</span>",
        "map.desc": "Khám phá vị trí những quán ăn ngon nức tiếng tại Phú Quốc. Nhấn vào các biểu tượng để xem chi tiết.",
        "footer.desc": "Dự án quảng bá du lịch và ẩm thực đảo ngọc, lan tỏa hương vị truyền thống đến bạn bè năm châu.",
        "footer.design": "&copy; 2025-2026 10C1 THPT An Thới. Designed with Khởiisthebad.",
        
        // Nutrition Section
        "nutrition.title": "Giá Trị Dinh Dưỡng",
        "nutrition.calories": "Năng Lượng",
        "nutrition.protein": "Chất Đạm",
        "nutrition.ingredients": "Thành Phần Chính",
        
        // Dish Ingredients
        "dish.bunquay.ing": "Mực Tươi, Tôm, Chả Cá, Bún Gạo",
        "dish.goicatrich.ing": "Cá Trích Tươi, Dừa Nạo, Rau Rừng, Bánh Tráng",
        "dish.bunken.ing": "Cá Nhàu/Ngân, Nước Cốt Dừa, Nghệ, Đu Đủ",
        "dish.ghe.ing": "Ghẹ Hàm Ninh Tươi Sống, Muối Tiêu Chanh",
        "dish.nhum.ing": "Gạch Nhum, Trứng Gà, Mỡ Hành, Đậu Phộng",
        "dish.garay.ing": "Gà Thả Vườn, Tiêu Phú Quốc, Nước Mắm"
    },
    en: {
        "nav.home": "Home",
        "nav.menu": "Menu",
        "nav.map": "Map",
        "nav.about": "About",
        "nav.contact": "Contact",
        "hero.subtitle": "Discover Pearl Island",
        "hero.title": "Centuries of <br/> <span class='text-transparent bg-clip-text bg-gradient-to-r from-sand-gold to-yellow-200'>Flavor</span>",
        "hero.desc": "A culinary journey awakening all senses, from the salty sea breeze to the aromatic pepper and sim wine.",
        "hero.btn": "Explore Now",
        "scroll.down": "Scroll Down",
        "menu.subtitle": "The Menu",
        "menu.title": "Culinary <span class='italic text-ocean-blue'>Essence</span>",
        "dish.bunquay": "Kien Xay Bun Quay",
        "dish.bunquay.desc": "Experience making your own dipping sauce and enjoy fresh ground seafood noodles.",
        "dish.goicatrich": "Herring Salad",
        "dish.goicatrich.desc": "Perfect combination of fresh fish and coconut.",
        "dish.bunken": "Bun Ken (Ken Noodles)",
        "dish.ghe": "Ham Ninh Crab",
        "dish.nhum": "Sea Urchin",
        "dish.garay": "Phu Quoc Free-range Chicken",
        "dish.garay.desc": "Firm meat, delicious taste of the wild forest.",
        "btn.details": "View Details",
        "map.title": "Culinary <span class='text-ocean-blue'>Map</span>",
        "map.desc": "Discover famous local food spots in Phu Quoc. Click markers for details.",
        "footer.desc": "A project to promote tourism and cuisine of the Pearl Island, spreading traditional flavors to the world.",
        "footer.design": "&copy; 2025-2026 10C1 High School An Thoi. Designed with Khoiisthebad.",

        // Nutrition Section
        "nutrition.title": "Nutrition Facts",
        "nutrition.calories": "Calories",
        "nutrition.protein": "Protein",
        "nutrition.ingredients": "Main Ingredients",

        // Dish Ingredients
        "dish.bunquay.ing": "Fresh Squid, Shrimp, Fish Cake, Rice Noodles",
        "dish.goicatrich.ing": "Fresh Herring, Grated Coconut, Wild Herbs, Rice Paper",
        "dish.bunken.ing": "Nonu/Ngan Fish, Coconut Milk, Turmeric, Papaya",
        "dish.ghe.ing": "Fresh Blue Crab, Salt & Pepper Lime Sauce",
        "dish.nhum.ing": "Sea Urchin Roe, Egg, Scallion Oil, Peanuts",
        "dish.garay.ing": "Free-range Chicken, Phu Quoc Pepper, Fish Sauce"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get current language
    let currentLang = localStorage.getItem('lang') || 'vi';

    // 2. Function to update text content
    const updateContent = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
             const key = el.getAttribute('data-i18n-placeholder');
             if (translations[lang] && translations[lang][key]) {
                 el.placeholder = translations[lang][key];
             }
        });
    };

    // 3. Function to update UI (Visual Toggle)
    const updateToggleUI = (lang) => {
        document.querySelectorAll('.lang-toggle').forEach(toggle => {
            const indicator = toggle.querySelector('.lang-indicator');
            const textVN = toggle.querySelector('.text-vn');
            const textEN = toggle.querySelector('.text-en');
            
            // Remove all inline styles first to ensure clean state
            indicator.removeAttribute('style');

            if (lang === 'vi') {
                indicator.style.transform = 'translateX(0)';
                textVN.classList.remove('text-white');
                textVN.classList.add('text-ocean-charcoal'); // Active Color
                textEN.classList.remove('text-ocean-charcoal');
                textEN.classList.add('text-white'); // Inactive Color
            } else {
                indicator.style.transform = 'translateX(100%)'; 
                // Adjust for padding if necessary, roughly 28px or 100% of width minus padding
                
                textVN.classList.remove('text-ocean-charcoal');
                textVN.classList.add('text-white'); // Inactive Color
                textEN.classList.remove('text-white');
                textEN.classList.add('text-ocean-charcoal'); // Active Color
            }
        });
    };

    // 4. Bind Events
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        // Clone button to remove old event listeners if any (optional safety)
        // btn.replaceWith(btn.cloneNode(true)); 
        // Re-select after clone if needed, but for now direct bind:
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle Logic
            currentLang = currentLang === 'vi' ? 'en' : 'vi';
            
            // Save & Update
            localStorage.setItem('lang', currentLang);
            updateContent(currentLang);
            updateToggleUI(currentLang);
            
            console.log("Language switched to:", currentLang); // Debug
        });
    });

    // 5. Initial Run
    updateContent(currentLang);
    updateToggleUI(currentLang);
});