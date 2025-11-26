
import React, { useState, useEffect, useMemo, useRef } from 'react';

// === Reusable Chopsticks Icon for Mobile Menu ===
const ChopsticksIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <div className="w-8 h-8 relative flex items-center justify-center">
      <div
        className={`absolute w-full h-1 bg-ocean-charcoal rounded-full transition-transform duration-300 ease-in-out ${
          isOpen ? 'rotate-45' : '-translate-y-2 rotate-6'
        }`}
      ></div>
      <div
        className={`absolute w-full h-1 bg-ocean-charcoal rounded-full transition-transform duration-300 ease-in-out ${
          isOpen ? '-rotate-45' : 'translate-y-2 -rotate-6'
        }`}
      ></div>
    </div>
);


// === Reusable Steam Effect Component ===
const SteamEffect: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden" aria-hidden="true">
    {Array.from({ length: 7 }).map((_, i) => (
      <span
        key={i}
        className="absolute bottom-1/3 block bg-white/40 rounded-full animate-steam-rise blur-md"
        style={{
          width: `${20 + Math.random() * 30}px`,
          height: `${20 + Math.random() * 30}px`,
          left: `${10 + Math.random() * 80}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${4 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
);


// === Bún Quậy Section Component ===
const BunQuaySection: React.FC = () => {
  const [sauce, setSauce] = useState({
    chili: 25,
    sugar: 30,
    salt: 15,
    calamansi: 40,
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleSauceChange = (ingredient: keyof typeof sauce, value: number) => {
    setSauce(prev => ({ ...prev, [ingredient]: value }));
    if (message) setMessage(null); // Reset message on change
  };

  const sauceColor = useMemo(() => {
    const r = 255;
    const g = 240 - (sauce.chili * 1.5) - (sauce.sugar * 0.3);
    const b = 220 - (sauce.chili * 1.8) - (sauce.sugar * 0.5);
    return `rgb(${Math.max(r, 200)}, ${Math.max(g, 80)}, ${Math.max(b, 60)})`;
  }, [sauce]);

  const handleCheckRecipe = () => {
    const { chili, sugar, salt, calamansi } = sauce;
    const isPerfect = chili > 60 && sugar > 25 && sugar < 55 && salt > 10 && salt < 40 && calamansi > 30 && calamansi < 65;
    
    setMessage(isPerfect ? "Chuẩn vị Phú Quốc!" : "Cần điều chỉnh thêm một chút!");
    
    setTimeout(() => setMessage(null), 3000);
  };
  
  const Slider = ({ name, label, value, onChange, icon }) => (
    <div className="space-y-2">
      <label htmlFor={name} className="flex items-center text-sm font-medium text-ocean-charcoal/80">
        <i className={`fa-solid ${icon} w-5 mr-2 text-chili-red`}></i> {label}
      </label>
      <input
        id={name}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(name, parseInt(e.target.value, 10))}
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-chili-red"
      />
    </div>
  );

  return (
    <div className="bg-[#FFF8F0] py-20 lg:py-28 text-ocean-charcoal">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Image */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl h-80 lg:h-full min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1627343521619-563b72948712?q=80&w=1974&auto=format&fit=crop"
            alt="Bún Quậy Phú Quốc"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
           <div className="absolute inset-0 bg-black/20"></div>
           <SteamEffect />
        </div>

        {/* Right Column: Interactive Content */}
        <div className="relative">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-chili-red">Bún Quậy</h2>
          <p className="font-display text-xl mt-2 italic text-ocean-charcoal/90">Trải nghiệm tự tay pha chế</p>
          <p className="mt-4 text-base leading-relaxed">
            Điểm độc đáo của Bún Quậy chính là chén nước chấm "thần thánh" do chính bạn tự tay pha chế. Từng muỗng ớt, đường, muối và tắc được gia giảm theo khẩu vị riêng, tạo nên một bản giao hưởng hương vị không thể nào quên.
          </p>
          
          <div className="mt-8 p-6 bg-white/60 rounded-lg shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-center mb-4">Góc Tương Tác: Pha Nước Chấm</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Slider name="chili" label="Ớt" value={sauce.chili} onChange={handleSauceChange} icon="fa-pepper-hot" />
              <Slider name="sugar" label="Đường" value={sauce.sugar} onChange={handleSauceChange} icon="fa-cubes-stacked" />
              <Slider name="salt" label="Muối" value={sauce.salt} onChange={handleSauceChange} icon="fa-gem" />
              <Slider name="calamansi" label="Tắc" value={sauce.calamansi} onChange={handleSauceChange} icon="fa-lemon" />
            </div>
            <div className="flex justify-center items-center gap-6 mt-6">
               <div className="w-24 h-24 rounded-full border-4 border-white shadow-inner flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: sauceColor }}>
                 <span className="text-xs font-bold text-white drop-shadow-md select-none">Màu Nước Chấm</span>
               </div>
               <div className="flex-1">
                 <button onClick={handleCheckRecipe} className="w-full bg-chili-red text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md min-h-[44px]">
                   Hoàn Thành
                 </button>
                 {message && <p className="text-center text-sm font-semibold mt-2 text-banana-leaf animate-pulse">{message}</p>}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// === Gỏi Cá Trích Section Component ===
const GoiCaTrichSection: React.FC = () => {
    const ingredients = [
        { name: "Cá Trích Tươi", description: "Đánh bắt trong ngày, đảm bảo vị ngọt và độ săn chắc.", icon: "fa-fish-fins" },
        { name: "Dừa Nạo", description: "Vị béo ngậy tự nhiên từ dừa xiêm Phú Quốc.", icon: "fa-stroopwafel" },
        { name: "Đậu Phộng & Hành", description: "Rang tay giòn tan, tăng cường kết cấu cho món ăn.", icon: "fa-seedling" },
        { name: "Rau Rừng", description: "Hơn 10 loại rau rừng độc đáo chỉ có tại đảo Ngọc.", icon: "fa-leaf" }
    ];
    
    return (
        <div className="relative py-20 lg:py-28 bg-fixed bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1615478503562-ec2d82e85b8a?q=80&w=2070&auto=format&fit=crop')"}}>
            <div className="absolute inset-0 bg-banana-leaf/70"></div>
            <div className="relative container mx-auto px-4 sm:px-6 text-center text-white">
                <h2 className="font-display text-4xl lg:text-5xl font-bold">Gỏi Cá Trích</h2>
                <p className="font-display text-xl mt-2 italic">Vị Biển Trong Lành</p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ingredients.map((item) => (
                        <div key={item.name} className="bg-sand-drift/10 backdrop-blur-md rounded-lg p-6 border border-sand-drift/20 transform transition-all duration-300 hover:scale-105 hover:-rotate-3 hover:bg-sand-drift/20 shadow-lg">
                            <i className={`fa-solid ${item.icon} text-4xl text-nuoc-mam-amber`}></i>
                            <h3 className="font-display text-2xl mt-4 font-semibold">{item.name}</h3>
                            <p className="mt-2 text-sm text-gray-200">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// === Bún Kèn Section Component ===
const BunKenSection: React.FC = () => {
  const fishSlides = [
    {
      src: "https://images.unsplash.com/photo-1574948493823-6c99803657cb?q=80&w=2070&auto=format&fit=crop",
      alt: "Cá Nhồng",
      caption: "Cá Nhồng (Barracuda)"
    },
    {
      src: "https://images.unsplash.com/photo-1628109325514-433a5626a57c?q=80&w=2070&auto=format&fit=crop",
      alt: "Cá Lóc",
      caption: "Cá Lóc (Snakehead fish)"
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % fishSlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + fishSlides.length) % fishSlides.length);

  return (
    <div className="py-20 lg:py-28 bg-sand-drift text-ocean-charcoal">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-12 items-center">
        {/* Left Column: Text */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-4xl lg:text-5xl font-bold">Bún Kèn</h2>
          <p className="font-display text-xl mt-2 italic">Viên ngọc ẩn mình</p>
          <p className="mt-4 text-base leading-relaxed max-w-2xl">
            Bún Kèn là một món ăn dân dã, mang đậm dấu ấn giao thoa văn hóa Khmer. "Kèn" trong tiếng Khmer có nghĩa là "nấu bằng nước cốt dừa". Nước dùng béo ngậy từ dừa, vàng ươm màu nghệ từ <span className="font-bold text-nuoc-mam-amber">nước mắm cốt</span>, quyện với vị ngọt của cá xay nhuyễn, tạo nên một hương vị độc đáo khó tìm.
          </p>
        </div>
        {/* Right Column: Image Slider */}
        <div className="lg:col-span-2 relative h-80 w-full">
          <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl">
            {fishSlides.map((slide, index) => (
              <div
                key={slide.alt}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
                <p className="absolute bottom-4 left-4 font-display text-white text-lg drop-shadow-md">{slide.caption}</p>
              </div>
            ))}
            <SteamEffect />
          </div>
          <button onClick={prevSlide} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-ocean-charcoal w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-colors">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-ocean-charcoal w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-colors">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// === Gà Rẫy Section Component ===
const GaRaySection: React.FC = () => {
    const restaurants = [
        { name: "Gà Rẫy 7 Tẩu", address: "Đường 30/4, Dương Đông", price: "300k - 500k / con", mapLink: "#" },
        { name: "Tiệm Gà Khói", address: "100 Trần Hưng Đạo, Dương Tơ", price: "Khoảng 450k / con", mapLink: "#" }
    ];
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);
    
    const AccordionItem = ({ isOpen, onToggle, name, address, price, mapLink }) => (
        <div className="border-b border-dashed border-ocean-charcoal/30">
            <h2>
                <button
                    type="button"
                    className="flex justify-between items-center w-full py-5 font-display text-xl text-left text-ocean-charcoal"
                    onClick={onToggle}
                >
                    <span>{name}</span>
                    <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </button>
            </h2>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="pb-5 pr-4 text-ocean-charcoal/80 space-y-2">
                        <p><i className="fa-solid fa-location-dot w-5 mr-2 text-chili-red"></i> {address}</p>
                        <p><i className="fa-solid fa-tags w-5 mr-2 text-chili-red"></i> {price}</p>
                        <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-banana-leaf font-bold hover:underline">
                            Chỉ đường <i className="fa-solid fa-arrow-right text-xs ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="py-20 lg:py-28 bg-kraft-paper text-ocean-charcoal">
            <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                 {/* Left Column: Image with dashed border */}
                <div className="p-2 border-2 border-dashed border-ocean-charcoal/40 rounded-lg">
                    <img
                        src="https://images.unsplash.com/photo-1618018094441-073c1c91535a?q=80&w=1974&auto=format&fit=crop"
                        alt="Gà Rẫy Phú Quốc luộc"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                {/* Right Column: Content & Accordion */}
                <div>
                    <h2 className="font-display text-4xl lg:text-5xl font-bold">Gà Rẫy</h2>
                    <p className="font-display text-xl mt-2 italic">Hương vị mộc mạc của đất liền</p>
                    <p className="mt-4 text-base leading-relaxed">
                        Gà rẫy Phú Quốc được nuôi thả tự nhiên, thịt săn chắc và ngọt đậm đà. Thưởng thức gà luộc chấm muối tiêu chanh, gỏi gà, hay cháo gà là cách tuyệt vời để cảm nhận trọn vẹn sự tinh túy của ẩm thực địa phương.
                    </p>
                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-2">Gợi ý quán ngon:</h3>
                        <div className="bg-white/50 rounded-lg p-4 shadow-inner">
                            {restaurants.map((resto, index) => (
                                <AccordionItem
                                    key={resto.name}
                                    isOpen={openAccordion === index}
                                    onToggle={() => setOpenAccordion(openAccordion === index ? null : index)}
                                    {...resto}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// === Ghẹ Hàm Ninh Modal Component ===
const CrabModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-ocean-charcoal/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-sand-drift text-ocean-charcoal rounded-lg shadow-xl max-w-lg w-full p-8 relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-chili-red transition-colors w-12 h-12 flex items-center justify-center text-2xl"
          aria-label="Close modal"
        >
            <i className="fa-solid fa-times"></i>
        </button>
        <h3 className="font-display text-2xl font-bold text-chili-red">Bí quyết chọn ghẹ chắc thịt</h3>
        <ul className="mt-4 space-y-3 text-left list-none text-gray-700">
            <li className="flex items-start"><i className="fa-solid fa-weight-hanging text-chili-red w-5 mr-3 mt-1"></i><div><span className="font-bold">Cảm nhận độ nặng:</span> Cầm ghẹ lên thấy nặng tay so với kích thước, đó là ghẹ chắc thịt.</div></li>
            <li className="flex items-start"><i className="fa-solid fa-hand-pointer text-chili-red w-5 mr-3 mt-1"></i><div><span className="font-bold">Bóp yếm ghẹ:</span> Dùng tay bấm nhẹ vào yếm (phần tam giác dưới bụng), nếu yếm cứng, không bị lún là ghẹ tươi và đầy thịt.</div></li>
            <li className="flex items-start"><i className="fa-solid fa-palette text-chili-red w-5 mr-3 mt-1"></i><div><span className="font-bold">Quan sát màu sắc:</span> Ghẹ có màu sắc tươi sáng, các khớp linh hoạt. Tránh những con có màu tái, yếm mềm.</div></li>
            <li className="flex items-start"><i className="fa-solid fa-venus text-chili-red w-5 mr-3 mt-1"></i><div><span className="font-bold">Chọn ghẹ gạch:</span> Với ghẹ cái, yếm sẽ to tròn. Nếu muốn ăn ghẹ gạch, hãy chọn những con yếm hơi hồng hoặc đỏ.</div></li>
        </ul>
      </div>
    </div>
  );
};


// === Ghẹ Hàm Ninh Section Component ===
const GheHamNinhSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rippleElement = rippleRef.current;
    if (rippleElement && (window as any).jQuery) {
      (window as any).jQuery(rippleElement).ripples({ perturbance: 0.04 });
      return () => {
        if ((window as any).jQuery(rippleElement).data('ripples')) {
          (window as any).jQuery(rippleElement).ripples('destroy');
        }
      };
    }
  }, []);

  return (
    <div className="bg-sand-drift py-20 lg:py-28 overflow-hidden">
        <CrabModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image */}
             <div 
                ref={rippleRef}
                className="w-full h-96 lg:min-h-[450px] rounded-lg shadow-2xl bg-cover bg-center"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1596818161746-2f085c33230a?q=80&w=1974&auto=format&fit=crop')"}}
                aria-label="Ghẹ Hàm Ninh hấp"
            ></div>
            {/* Right Column: Content */}
            <div className="text-ocean-charcoal">
                <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-chili-red tracking-wider">Ghẹ Hàm Ninh</h2>
                <p className="font-display text-xl mt-2 italic">Nhỏ Mà Chắc, Ăn Là Ghiền</p>
                <p className="mt-4 text-base leading-relaxed">
                    Đến làng chài cổ Hàm Ninh, đừng tìm những con ghẹ to xác. Ghẹ ở đây tuy nhỏ nhưng thịt chắc nịch, ngọt đậm đà vị biển. Chỉ cần hấp bia hoặc luộc, chấm muối tiêu chanh là đủ để đánh gục mọi thực khách sành ăn.
                </p>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="mt-8 inline-block bg-chili-red text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg min-h-[44px]"
                >
                    <i className="fa-solid fa-lightbulb mr-2"></i>
                    Bí quyết chọn ghẹ
                </button>
                <div className="mt-8 text-sm space-y-2 border-t border-dashed border-ocean-charcoal/20 pt-6">
                    <h3 className="font-bold text-base mb-2">Gợi ý địa điểm:</h3>
                    <p><i className="fa-solid fa-map-marker-alt w-5 mr-2 text-chili-red"></i> Làng chài Hàm Ninh (Nhà bè Bé Ghẹ, Tư Thắng, Biển Xanh)</p>
                    <h3 className="font-bold text-base mt-4 mb-2">Giá tham khảo:</h3>
                    <p><i className="fa-solid fa-money-bill-wave w-5 mr-2 text-chili-red"></i> 500k - 800k / kg (Loại 1). <span className="italic opacity-80">Giá thay đổi theo ngày.</span></p>
                </div>
            </div>
        </div>
    </div>
  );
};

// === Reusable Ripple Image Component ===
const RippleImage: React.FC<{ name: string, src: string, glow?: boolean }> = ({ name, src, glow }) => {
    const rippleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rippleElement = rippleRef.current;
        if (rippleElement && (window as any).jQuery) {
            (window as any).jQuery(rippleElement).ripples({
                perturbance: 0.04,
            });
            return () => {
                if ((window as any).jQuery(rippleElement).data('ripples')) {
                    (window as any).jQuery(rippleElement).ripples('destroy');
                }
            };
        }
    }, []);

    return (
        <div 
            ref={rippleRef} 
            className="relative group overflow-hidden rounded-lg shadow-lg w-full h-40 bg-cover bg-center transition-all duration-500"
            style={{ 
                backgroundImage: `url(${src})`,
                // FIX: Replaced undefined `tailwind` variable with a hardcoded hex color string.
                filter: glow ? `drop-shadow(0 0 1.2rem #D9770680)` : 'none'
            }}
        >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 group-hover:backdrop-brightness-90 transition-all duration-500"></div>
            <p className="absolute bottom-2 left-2 text-sm text-sand-drift font-bold drop-shadow-lg">{name}</p>
        </div>
    );
};


// === Nhum Biển Section Component ===
const NhumBienSection: React.FC = () => {
    const preparations = [
        { name: "Nướng mỡ hành", src: "https://images.unsplash.com/photo-1599665324458-57a312e726ae?q=80&w=1974&auto=format&fit=crop", glow: true },
        { name: "Ăn sống (Sashimi)", src: "https://images.unsplash.com/photo-1626203322979-53758b9b4f2c?q=80&w=2070&auto=format&fit=crop", glow: false },
        { name: "Cháo nhum", src: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1964&auto=format&fit=crop", glow: false },
        { name: "Trứng hấp", src: "https://plus.unsplash.com/premium_photo-1673833249971-4a11f7c32b53?q=80&w=1974&auto=format&fit=crop", glow: false }
    ];

    return (
        <div className="bg-ocean-charcoal py-20 lg:py-28 text-sand-drift overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Content (order reversed on desktop) */}
                <div className="order-2 lg:order-1">
                    <h2 className="font-display text-4xl lg:text-5xl font-bold">Nhum Biển</h2>
                    <p className="font-display text-xl mt-2 italic text-nuoc-mam-amber">"Nhân sâm" của đại dương</p>
                    <p className="mt-4 text-base leading-relaxed text-gray-300">
                        Nhum biển, hay Cầu Gai, là một đặc sản bổ dưỡng với vị béo ngậy, thơm lừng đặc trưng. Trứng nhum vàng ươm có thể ăn sống với mù tạt, nướng mỡ hành trên bếp than hồng, hoặc nấu cháo để bồi bổ sức khỏe.
                    </p>
                </div>
                {/* Right Column: Image Grid (order first on desktop) */}
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                    {preparations.map(p => (
                       <RippleImage key={p.name} name={p.name} src={p.src} glow={p.glow} />
                    ))}
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <div className="bg-sand-drift min-h-screen font-body text-ocean-charcoal antialiased">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out text-ocean-charcoal ${
          isScrolled 
            ? 'bg-sand-drift/95 backdrop-blur-sm shadow-md' 
            : 'bg-transparent text-white'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="font-display text-xl font-bold tracking-wider">
            <a href="#hero">
                <span className={isScrolled ? 'text-nuoc-mam-amber' : 'text-sand-drift'}>Phú Quốc</span> Cuisine
            </a>
          </div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center text-sm font-medium tracking-wider uppercase">
            <li><a href="#hero" className="hover:text-chili-red transition-colors">Trang chủ</a></li>
            <li><a href="#dishes" className="hover:text-chili-red transition-colors">Thực đơn</a></li>
            <li><a href="#map" className="hover:text-chili-red transition-colors">Bản đồ</a></li>
            <li><a href="#contact" className="hover:text-chili-red transition-colors">Liên hệ</a></li>
          </ul>
           {/* Mobile Menu Button */}
          <button className="md:hidden z-[101]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <ChopsticksIcon isOpen={isMenuOpen} />
          </button>
        </nav>
      </header>
      
      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-0 z-[100] transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-ocean-charcoal/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className="absolute right-0 top-0 h-full w-2/3 max-w-sm bg-sand-drift p-8 shadow-2xl">
           <ul className="flex flex-col space-y-8 items-start text-lg font-medium tracking-wider uppercase mt-20">
            <li><a href="#hero" onClick={() => setIsMenuOpen(false)} className="hover:text-chili-red transition-colors">Trang chủ</a></li>
            <li><a href="#dishes" onClick={() => setIsMenuOpen(false)} className="hover:text-chili-red transition-colors">Thực đơn</a></li>
            <li><a href="#map" onClick={() => setIsMenuOpen(false)} className="hover:text-chili-red transition-colors">Bản đồ</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-chili-red transition-colors">Liên hệ</a></li>
          </ul>
        </div>
      </div>


      <main>
        <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
          {/* Layer 1: Sea Background */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed" 
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1541633596482-a1a7a39d5b03?q=80&w=2070&auto=format&fit=crop')"}}
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 z-1 bg-ocean-charcoal/60" aria-hidden="true"></div>

          {/* Layer 2: Floating Food Items (Placeholder for Parallax) */}
          <div className="absolute inset-0 z-20 opacity-30" aria-hidden="true">
             <i className="fa-solid fa-shrimp text-chili-red text-8xl absolute top-[20%] left-[15%] animate-pulse" style={{ animationDuration: '5s' }}></i>
             <i className="fa-regular fa-lemon text-nuoc-mam-amber text-6xl absolute bottom-[15%] right-[20%] animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></i>
             <i className="fa-solid fa-leaf text-banana-leaf text-5xl absolute top-[25%] right-[10%] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></i>
          </div>

          {/* Layer 3: Text Content */}
          <div className="relative z-30 max-w-4xl px-4 sm:px-6">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-sand-drift drop-shadow-lg leading-tight">
              Hương Vị Đảo Ngọc - Ký Ức Vượt Thời Gian
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
              Hành trình khám phá 6 tuyệt tác ẩm thực từ truyền thống đến hiện đại.
            </p>
            <div className="mt-10">
              <a 
                href="#dishes" 
                className="inline-block bg-nuoc-mam-amber text-ocean-charcoal font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg min-h-[44px]"
              >
                Khám phá ngay
              </a>
            </div>
          </div>
        </section>
        
        <section id="dishes">
          <BunQuaySection />
          <GoiCaTrichSection />
          <BunKenSection />
          <GaRaySection />
          <GheHamNinhSection />
          <NhumBienSection />
        </section>
        
        {/* Placeholder for future sections */}
        <div id="map" className="h-32"></div>
        <div id="contact" className="h-32"></div>
      </main>
    </div>
  );
};

export default App;
