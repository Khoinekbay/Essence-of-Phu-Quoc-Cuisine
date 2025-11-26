
import React, { useState, useEffect, useMemo, useRef } from 'react';

// === Reusable Section Divider ===
const SectionDivider: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ transform: 'translateY(1px)' }}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[80px] lg:h-[120px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-17,148.6-18.46,235.1-1.89,68.35,13.1,134.36,54.54,209.7,73.58,69.21,18,138.1,24.88,209.4,13.08,36.15-6,69.85-17.84,104.4-29.34C1282.17,42.44,1200,120,1200,120H0V0C0,0,93.84,56.44,321.39,56.44Z" style={{ fill: color }}></path>
        </svg>
    </div>
  );
};


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
    <div className="bg-[#FFF8F0] py-20 lg:py-28 text-ocean-charcoal relative overflow-hidden">
      <img src="https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/b9487c08-0a6d-4950-84a8-6f5dfb8f2d57.png?alt=media&token=e95ba874-8839-4bb4-a213-333e8a1d1373" alt="Decorative Banana Leaf" className="absolute bottom-0 -left-20 w-64 opacity-20 transform -rotate-45 hidden lg:block" />
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Image */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl h-80 lg:h-full min-h-[400px]">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/da0012b1-1250-482f-87d3-d953112c3325.jpeg?alt=media&token=262071ef-d7cd-4b67-9d7a-2415d8364b4c"
            alt="Bún Quậy Kiến Xây Phú Quốc"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
           <div className="absolute inset-0 bg-black/20"></div>
           <SteamEffect />
        </div>

        {/* Right Column: Interactive Content */}
        <div className="relative">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ocean-charcoal flex items-center">
            Bún Quậy Kiến Xây
            <i className="fas fa-feather-pointed text-2xl text-ocean-charcoal/50 ml-4"></i>
          </h2>
          <p className="font-display text-xl mt-2 italic text-ocean-charcoal/90">Linh Hồn Của Sự Hỗn Loạn Tinh Tế</p>
          <p className="mt-4 text-base leading-relaxed">
            Nguồn gốc từ món Bún Tôm Bình Định, được gia đình Kiến Xây phát triển và "F5" tại Phú Quốc. Cái tên "Bún Quậy" dân dã ra đời do thực khách phải tự tay quậy đều chén nước chấm để gia vị hòa tan, cũng như quậy đều tô bún nóng hổi để chả tôm và cá chín tái. Đây không chỉ là món ăn, mà là một nghi thức trải nghiệm.
          </p>
          
          <div className="mt-8 p-6 bg-white/60 rounded-lg shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-center mb-4 flex items-center justify-center">
              <i className="fa-solid fa-mortar-pestle mr-2 text-chili-red"></i>
              Nghi Thức 'Tự Lao Động': Pha Chén Nước Chấm
            </h3>
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
          <div className="mt-6 text-center">
             <a 
                href="https://bunquay.vn/he-thong-co-so/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-nuoc-mam-amber text-ocean-charcoal font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md min-h-[44px]"
              >
                Tìm cơ sở gần nhất
              </a>
          </div>
        </div>
      </div>
      <SectionDivider color="#13080C" />
    </div>
  );
};

// === Gỏi Cá Trích Section Component ===
const GoiCaTrichSection: React.FC = () => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const VideoModal = () => (
        <div 
          className="fixed inset-0 bg-ocean-charcoal/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="bg-sand-drift rounded-lg shadow-xl w-full max-w-3xl aspect-video relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)} 
              className="absolute -top-3 -right-3 text-sand-drift bg-chili-red rounded-full w-10 h-10 flex items-center justify-center text-xl z-10"
              aria-label="Close video"
            >
                <i className="fa-solid fa-times"></i>
            </button>
            <iframe 
                className="w-full h-full rounded-lg" 
                src="https://www.youtube.com/embed/oWf3IN4Pn_M?autoplay=1" 
                title="Cách ăn gỏi cá trích đúng chuẩn" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
          </div>
        </div>
    );
    
    return (
        <div className="relative py-20 lg:py-28 bg-fixed bg-cover bg-center -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]" style={{backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/2c6c06a8-274e-4e4b-b0b9-509569b76c81.jpeg?alt=media&token=962f3900-5323-455b-abcc-eb6f658ff039')"}}>
            {isVideoModalOpen && <VideoModal />}
            <div className="absolute inset-0 bg-ocean-charcoal/70"></div>
            <div className="relative container mx-auto px-4 sm:px-6 text-center text-white">
                <h2 className="font-display text-4xl lg:text-5xl font-bold">Gỏi Cá Trích</h2>
                <p className="font-display text-xl mt-2 italic">Bản Giao Hưởng Của Rừng Và Biển</p>
                <p className="mt-6 max-w-3xl mx-auto text-gray-300">
                    Sự kết hợp táo bạo giữa cá trích tươi sống tái chanh và dừa nạo béo bùi. Bí quyết nằm ở rổ rau rừng đa dạng và chén nước chấm đậu phộng đậm đà, giúp món ăn hoàn toàn không tanh mà chỉ còn lại vị ngọt thanh khiết của đại dương.
                </p>
                <div className="mt-10">
                    <button 
                        onClick={() => setIsVideoModalOpen(true)}
                        className="inline-block bg-chili-red text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg min-h-[44px]"
                    >
                        <i className="fa-solid fa-play mr-2"></i>
                        Xem cách ăn đúng chuẩn
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-sand-drift/20">
                     <h3 className="font-display text-2xl font-semibold mb-4">Gợi ý địa điểm:</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <p>Nhà hàng Vườn Táo</p>
                        <p>Quán Ra Khơi (131 đường 30/4)</p>
                        <p>Sông Xanh (217 đường 30/4)</p>
                     </div>
                     <p className="mt-4 text-xs uppercase tracking-widest opacity-80">Giá tham khảo: 150.000 - 200.000 VNĐ / dĩa</p>
                </div>
            </div>
            <SectionDivider color="#F9F9F9" />
        </div>
    );
};

// === Bún Kèn Section Component ===
const BunKenSection: React.FC = () => {
  const slides = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/346e9596-f9fe-4467-8488-b2a8f89e1a8a.jpeg?alt=media&token=e939d899-73f1-419b-a010-09a5ab038c9d",
      alt: "Nồi nước lèo Bún Kèn",
      caption: "Nước lèo vàng ươm từ nghệ & cốt dừa"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/42e8d356-9a3c-449e-b8d9-60144983df5a.jpeg?alt=media&token=42ef2753-3c27-4180-b2dd-63a20803c582",
      alt: "Mâm Bún Kèn đầy đủ",
      caption: "Thưởng thức cùng rau sống và đu đủ bào"
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="py-20 lg:py-28 bg-sand-drift text-ocean-charcoal relative overflow-hidden -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]">
        <img src="https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/b9487c08-0a6d-4950-84a8-6f5dfb8f2d57.png?alt=media&token=e95ba874-8839-4bb4-a213-333e8a1d1373" alt="Decorative Banana Leaf" className="absolute top-0 -right-24 w-72 opacity-20 transform rotate-45 hidden lg:block" />
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-12 items-center relative z-10">
        {/* Left Column: Text */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-4xl lg:text-5xl font-bold">Bún Kèn Út Lượm</h2>
          <p className="font-display text-xl mt-2 italic">Vị Ngọt Ngào Của Ký Ức Khmer</p>
          <p className="mt-4 text-base leading-relaxed max-w-2xl">
            Một tuyệt phẩm chịu ảnh hưởng của ẩm thực Khmer. Khác với bún kèn đất liền dùng cá lóc, Bún Kèn Phú Quốc sử dụng cá biển (cá nhồng, cá ngân) xay nhuyễn, nấu cùng nước cốt dừa và nghệ tươi. Vị béo ngậy, ngọt thanh, ăn kèm đu đủ bào giòn tan tạo nên bữa sáng 'gây thương nhớ'.
          </p>
        </div>
        {/* Right Column: Image Slider */}
        <div className="lg:col-span-2 relative h-80 w-full">
          <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl">
            {slides.map((slide, index) => (
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
          <button onClick={prevSlide} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-ocean-charcoal w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all min-h-[44px]">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-ocean-charcoal w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all min-h-[44px]">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <SectionDivider color="#EFEBE9" />
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
        <div className="relative py-20 lg:py-28 bg-cover bg-center text-ocean-charcoal -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]" style={{backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/21a59253-33df-4034-8c83-05b6301389e7.jpeg?alt=media&token=db2a9d86-a249-4113-98fe-d599c90f23fd')"}}>
            <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                 {/* Left Column: Image with dashed border */}
                <div className="p-2 border-2 border-dashed border-ocean-charcoal/40 rounded-lg bg-sand-drift/50 backdrop-blur-sm">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/9a370e06-d249-43c2-aa74-b5a7962eb020.jpeg?alt=media&token=80b3d1b8-2e06-4b68-b80c-c662885994f7"
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
                        <div className="bg-sand-drift/80 backdrop-blur-sm rounded-lg p-4 shadow-inner">
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
            <SectionDivider color="#F9F9F9" />
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
          className="absolute top-2 right-2 text-gray-500 hover:text-chili-red transition-colors w-12 h-12 flex items-center justify-center text-2xl min-h-[44px] min-w-[44px]"
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
  
  return (
    <div className="bg-sand-drift py-20 lg:py-28 overflow-hidden relative -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]">
        <CrabModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image */}
             <div 
                className="w-full h-96 lg:min-h-[450px] rounded-lg shadow-2xl bg-cover bg-center"
                style={{backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/5f6174a7-b08e-4a66-b328-91040449dae3.jpeg?alt=media&token=3b3d9735-961d-444a-9351-29474775083f')"}}
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
        <SectionDivider color="#13080C" />
    </div>
  );
};

// === Reusable Ripple Image Component ===
const RippleImage: React.FC<{ name: string, src: string, glow?: boolean }> = ({ name, src, glow }) => {
    return (
        <div 
            className="relative group overflow-hidden rounded-lg shadow-lg w-full h-40 bg-cover bg-center transition-all duration-500"
            style={{ 
                backgroundImage: `url(${src})`,
                filter: glow ? `drop-shadow(0 0 1.2rem #D9770680)` : 'none'
            }}
        >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 group-hover:backdrop-brightness-90 transition-all duration-500"></div>
            <p className="absolute bottom-2 left-2 text-sm text-sand-drift font-bold drop-shadow-lg">{name}</p>
        </div>
    );
};

// === Reusable YouTube Short Component ===
const YoutubeShortCard: React.FC<{ videoId: string }> = ({ videoId }) => {
  return (
    <div className="col-span-2 rounded-lg overflow-hidden shadow-lg aspect-[9/16]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      ></iframe>
    </div>
  );
};


// === Nhum Biển Section Component ===
const NhumBienSection: React.FC = () => {
    const preparations = [
        { name: "Nướng trên than", src: "https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/6ca31a47-c918-479c-b17f-449a024c08e5.jpeg?alt=media&token=9825b290-9c04-41d3-a5e2-63b7115da7e9", glow: true },
        { name: "Nướng mỡ hành", src: "https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/e0d16c5c-6b3a-446a-93be-101f3e9c8088.jpeg?alt=media&token=60abebc6-302c-47b7-810a-37e40b3951f2", glow: false },
        { name: "Cận cảnh trứng nhum", src: "https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/bd450005-593b-4811-ad81-e3e18a93ac9e.jpeg?alt=media&token=c83a7500-1c64-42f0-a006-03c683b584d4", glow: false },
        { name: "Nướng đậu phộng", src: "https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/c4e7235a-0639-4d0f-96a8-f7b5398d249f.jpeg?alt=media&token=6d5f7566-728b-4b11-9a74-b53298c4302c", glow: false }
    ];

    return (
        <div className="bg-ocean-charcoal py-20 lg:py-28 text-sand-drift overflow-hidden relative -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]">
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
                     <YoutubeShortCard videoId="QvIJB8XohgQ" />
                    {preparations.map(p => (
                       <RippleImage key={p.name} name={p.name} src={p.src} glow={p.glow} />
                    ))}
                </div>
            </div>
        </div>
    );
};


// === Map Placeholder Section ===
const MapSection: React.FC = () => {
  return (
    <section id="map" className="bg-sand-drift py-20 text-center">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-ocean-charcoal">Bản Đồ Ẩm Thực</h2>
        <p className="mt-4 max-w-2xl mx-auto text-ocean-charcoal/80">
          Khám phá vị trí các quán ăn ngon nhất trên bản đồ Phú Quốc. <br/> (Tính năng đang được phát triển)
        </p>
        <div className="mt-8 w-full max-w-4xl mx-auto h-96 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
           <i className="fa-solid fa-map-location-dot text-6xl text-gray-500"></i>
        </div>
      </div>
    </section>
  );
};


// === Footer Component ===
const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-ocean-charcoal text-sand-drift py-12">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h3 className="font-display text-2xl font-bold text-nuoc-mam-amber">Phú Quốc Cuisine</h3>
        <p className="mt-2 text-sm max-w-md mx-auto text-gray-400">
          Website dự thi "Đại sứ văn hóa" của học sinh trường THPT An Thới, với mục tiêu lan tỏa vẻ đẹp ẩm thực Đảo Ngọc.
        </p>
        <div className="mt-6 flex justify-center space-x-6">
          <a href="#" className="hover:text-nuoc-mam-amber transition-colors"><i className="fab fa-facebook-f text-xl"></i></a>
          <a href="#" className="hover:text-nuoc-mam-amber transition-colors"><i className="fab fa-instagram text-xl"></i></a>
          <a href="#" className="hover:text-nuoc-mam-amber transition-colors"><i className="fab fa-youtube text-xl"></i></a>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Trường THPT An Thới. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
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
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="font-display text-xl font-bold tracking-wider">
            <a href="#hero">
                <span className={isScrolled ? 'text-nuoc-mam-amber' : 'text-sand-drift'}>Phú Quốc</span>
                <span className={isScrolled ? 'text-ocean-charcoal' : 'text-sand-drift'}> Cuisine</span>
            </a>
          </div>
          {/* Desktop Menu */}
          <ul className={`hidden md:flex space-x-8 items-center text-sm font-medium tracking-wider uppercase ${isScrolled ? 'text-ocean-charcoal' : 'text-sand-drift'}`}>
            <li><a href="#hero" className="hover:text-chili-red transition-colors">Trang chủ</a></li>
            <li><a href="#dishes" className="hover:text-chili-red transition-colors">Thực đơn</a></li>
            <li><a href="#map" className="hover:text-chili-red transition-colors">Bản đồ</a></li>
            <li><a href="#contact" className="hover:text-chili-red transition-colors">Liên hệ</a></li>
          </ul>
           {/* Mobile Menu Button */}
          <button className="md:hidden z-[101]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <div className={`w-8 h-8 relative flex items-center justify-center`}>
                <div
                    className={`absolute w-full h-1 rounded-full transition-transform duration-300 ease-in-out ${isScrolled ? 'bg-ocean-charcoal' : 'bg-sand-drift'} ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-2 rotate-6'
                    }`}
                ></div>
                <div
                    className={`absolute w-full h-1 rounded-full transition-transform duration-300 ease-in-out ${isScrolled ? 'bg-ocean-charcoal' : 'bg-sand-drift'} ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-2 -rotate-6'
                    }`}
                ></div>
            </div>
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
            style={{backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/ai-studio-projects.appspot.com/o/15f606e3-f67f-4351-8b50-3294332997e3.jpeg?alt=media&token=48f2c34c-d9c9-4a9f-bf44-d922a94f6c44')"}}
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
        
        <MapSection />

      </main>

      <Footer />
    </div>
  );
};

export default App;
