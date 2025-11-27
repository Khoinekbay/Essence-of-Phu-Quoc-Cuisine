
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
        "footer.design": "&copy; 2025-2026 10C1 THPT An Thới. Designed with Khởiisthebad."
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
        "footer.design": "&copy; 2025-2026 10C1 High School An Thoi. Designed with Khoiisthebad."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('lang') || 'vi';

    const updateContent = () => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key]; // Use innerHTML to support HTML tags in translation
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
             const key = el.getAttribute('data-i18n-placeholder');
             if (translations[currentLang] && translations[currentLang][key]) {
                 el.placeholder = translations[currentLang][key];
             }
        });

        // Update button text logic if needed, or keep as static "VN | EN"
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'vi' ? 'en' : 'vi';
            localStorage.setItem('lang', currentLang);
            updateContent();
        });
    });

    // Initial load
    updateContent();
});
