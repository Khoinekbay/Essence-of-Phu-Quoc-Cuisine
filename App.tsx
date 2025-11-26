


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
  
  const Slider = ({ name, label, value, onChange, icon }: { name: string, label: string, value: number, onChange: (name: string, value: number) => void, icon: string }) => (
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
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAADIklEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4MslWwAB8yV6EAAAAABJRU5ErkJggg==" alt="Decorative Banana Leaf" className="absolute bottom-0 -left-20 w-64 opacity-20 transform -rotate-45 hidden lg:block" />
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Image */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl h-80 lg:h-full min-h-[400px]">
          <img 
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z"
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
        <div className="relative py-20 lg:py-28 bg-fixed bg-cover bg-center -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]" style={{backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z')"}}>
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
      src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z",
      alt: "Nồi nước lèo Bún Kèn",
      caption: "Nước lèo vàng ươm từ nghệ & cốt dừa"
    },
    {
      src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z",
      alt: "Mâm Bún Kèn đầy đủ",
      caption: "Thưởng thức cùng rau sống và đu đủ bào"
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="py-20 lg:py-28 bg-sand-drift text-ocean-charcoal relative overflow-hidden -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAADIklEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4MslWwAB8yV6EAAAAABJRU5ErkJggg==" alt="Decorative Banana Leaf" className="absolute top-0 -right-24 w-72 opacity-20 transform rotate-45 hidden lg:block" />
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
    
    const AccordionItem = ({ isOpen, onToggle, name, address, price, mapLink }: { isOpen: boolean, onToggle: () => void, name: string, address: string, price: string, mapLink: string }) => (
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
        // FIX: Corrected a syntax error in the style attribute. Added closing curly braces and moved the angle bracket.
        <div className="relative py-20 lg:py-28 bg-cover bg-center text-ocean-charcoal -mt-[50px] sm:-mt-[80px] lg:-mt-[120px]" style={{backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z')"}}>
            <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                 {/* Left Column: Image with dashed border */}
                <div className="p-2 border-2 border-dashed border-ocean-charcoal/40 rounded-lg bg-sand-drift/50 backdrop-blur-sm">
                    <img
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z"
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
                style={{backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z')}}"
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
const RippleImage: React.FC<{ name: string; src: string; glow?: boolean }> = ({ name, src, glow }) => {
  // FIX: Refactored style object creation to be simpler and avoid potential parsing issues in stricter environments.
  const filterStyle = glow ? `drop-shadow(0 0 1.2rem #D9770680)` : 'none';
  const imageStyle = {
    backgroundImage: `url(${src})`,
    filter: filterStyle,
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg w-full h-40 bg-cover bg-center transition-all duration-500"
      style={imageStyle}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 group-hover:backdrop-brightness-90 transition-all duration-500"></div>
      <p className="absolute bottom-2 left-2 text-sm text-sand-drift font-bold drop-shadow-lg">{name}</p>
    </div>
  );
};


// === Reusable YouTube Short Component ===
const YoutubeShortCard: React.FC<{ videoId: string }> = ({ videoId }) => {
  // FIX: Using the robust padding hack for aspect ratio to ensure maximum compatibility.
  return (
    // FIX: Replaced problematic Tailwind JIT class with an inline style for robust aspect ratio handling.
    <div className="col-span-2 rounded-lg overflow-hidden shadow-lg relative h-0" style={{ paddingBottom: '177.77%' }}> {/* 9:16 aspect ratio */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        loading="lazy"
      ></iframe>
    </div>
  );
};


// === Nhum Biển Section Component ===
const NhumBienSection: React.FC = () => {
    const preparations = [
        { name: "Nướng trên than", src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z", glow: true },
        { name: "Nướng mỡ hành", src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z" },
        { name: "Cháo nhum", src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAPl/4he9/z/nTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCt6No2jagD5f8AiF73/P8AnTes/iF73/P+dN6zvIOi3o2jaN6xs6N6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagCt6No2jagCnejaNo3oAq3o2jaNqAKd6No2jagD5f+IXvf8/503rP4he9/z/nTes7yDo9G0b2jaNjZsbRtG9o2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtACbRvaNo2gBNq9o2jaAE2je0bRtAHy/8AEL3v+f8AOndA4/Z23Pz/AJ0zvWd5B0W9G9G1G1Y2bGo3o3qNqAIGo3o3qNqAJG9G9RuajegCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagCTc1G5qjejagD5e+I3vD/P8AnTOs/iN/eH+f86Z1nYkHR707NQNRvasZJmqN6gagajegCSajc1G5qN6AJN6N6j6jegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegCTfRvUbejegD5e+JXvh/n/ADpnet3xBwv/AKy3M/P+dNbrO0g6Jegaj6jag1YyTqNQGoGo3oAkGo3NR9RvQBINSaj6jagCSajcj6jc0ASDUg1R3NS3NAD3NLaqjc0t7QAu5pDNTuaQzQBd3NLc1WN7S3NAFzc1K5qsbmpeagCzuamDVWDUoagCwGpQ1UwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoAsg1KDVcGpA1AFkNS3NVwagGoA8Dx/D/APrc/P8AnTO5qT4iWp3tzPz/AJ0x3rOyDo93o3qPc1G5rGSbmpe1RuaQzQBY3tLfVW5pDNALu9G9VTekM0AW96N6qF6QzQBY3pQ9VA1KGoAsg1KDVYGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoAsg1KDVcGpA1AFsGpQ1VA1IGoA+Yv4hW43tzPz/nTG5q1+I1s7y5n/j/OltWd5B0O9RvUepbVjJN3Ubmo+pWoAkvNS3NUb1K1AEoalc1QvUoegCzuaQzUC9IGoAs70oeq4NSg0AWQaUGq4NLQBYBpaqg0tAFgGlBqAGloAsA0oNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgCwDSoNVwaWgD5k/EawP9XzP/H+dLVZ/Ee+vM/8f50prO0g6Ealao3qValZGSrUoaq1KGoAkVqUGqlalg0ATQ1KDVcGloAnDS1WBpaAIA0oNQ3oBoAlBoaqg0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAE0NKDVcGlBoAnhpaqA0oNAEsNLVcGloAlBpQaqA0oNAH//Z" },
        { name: "Ăn sống (tái chanh)", src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhocGhwaHBwcHBwaHBwhHBoaGhwhICwjHh8pHhwaJTYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QHhISHTMqJCwxMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEkQAAIBAgQDBgIHBQMICQUAAAECEQADBBIhMQVBUWEGEyJxgZEyobEHFEJS0fAVUmLhByOCkrLS8VNzgpOiwtLxFjRjg7PC0//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQACAgICAgIBBQEAAAAAAAAAAQIRAyESMUEEEyJRMhRhI0Jx/9oADAMBAAIRAxEAPwB3WcI0tE3I7d+g61W9yR9k/lV38Qe9/z/AJ03rO8g1pGjC3Z/0yPsn8qf3JH2T+VTd6d6dkBfsXJ7J/Kj3JH2T+VTd6N6dkF+xcnsn8qPckfZP5VO970e9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/YuT2T+VHuSPsn8qne9G9OyC/Ym9yR9k/lR7kj7J/KkQ4m/tq393w7D4n+dIeKj/aW+7K/wA6Pch3R4N2z9h/yrRwm0wYFkIkd/mKqI1y0f/AFUf+H8xV/h99p3W00dx+lQ0NNH7ifEaP+P9qb1Z/EDvf8AP+dNq4v5M64/6PXtG0b17WRt2hvaNq9oAm1G0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AJtG9o2jaAE2je0bRtACbRvaNqNoATaN7RtG0AfL/4he9/z/nTes/iF73/AD/nTes7yDo9G0bRva9qxs2jaN7XtQBMb0bRva9oAmN6No3te1ABNqNo3te0ATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoATavaNqNoA+YPiF73/P+dN6z+IXvf8/503rO8g6PRtG0bRtWNnRtG0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0bRtAgbRtG0bQIG0b2jaAIG9G0