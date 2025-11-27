
document.addEventListener('DOMContentLoaded', () => {
    // Prevent duplicate injection
    if (document.getElementById('music-widget-container')) return;

    // --- 1. CONFIGURATION & PLAYLIST ---
    const playlist = [
        { name: "Thư Giãn", src: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3" }, // Ocean/Piano
        { name: "Sóng Biển", src: "https://cdn.pixabay.com/audio/2022/03/24/audio_34b6b663b9.mp3" }, // Nature
        { name: "Acoustic", src: "https://cdn.pixabay.com/audio/2023/01/01/audio_8162594411.mp3" }  // Guitar
    ];
    let currentTrackIndex = 0;

    // Use page specific override if exists, else default to first track
    const pageSpecificMusic = document.body.getAttribute('data-music');
    if (pageSpecificMusic) {
        playlist[0].src = pageSpecificMusic; // Replace first track with page theme
        playlist[0].name = "Chủ Đề";
    }

    const audio = new Audio(playlist[0].src);
    audio.loop = true;
    audio.volume = 0.5;

    // --- 2. CREATE UI ELEMENTS (Draggable Widget) ---
    const container = document.createElement('div');
    container.id = 'music-widget-container';
    container.style.cssText = `
        position: fixed; 
        bottom: 20px; 
        left: 20px; 
        z-index: 9999;
        display: flex;
        align-items: center;
        touch-action: none; /* Important for dragging */
    `;

    const menu = document.createElement('div');
    menu.id = 'music-menu';
    menu.style.cssText = `
        width: 0;
        height: 160px;
        background: rgba(26, 32, 44, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        overflow: hidden;
        transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        white-space: nowrap;
    `;

    const disc = document.createElement('div');
    disc.id = 'music-disc';
    disc.title = "Kéo tôi đi! / Nhấn để mở menu";
    disc.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
        border: 2px solid #C2B280;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        cursor: grab;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.5s ease;
        animation: slowSpin 10s linear infinite paused;
    `;
    
    // Inner styling for Disc (Vinyl look)
    disc.innerHTML = `
        <div style="width: 20px; height: 20px; background: #C2B280; border-radius: 50%; border: 4px solid #1a1a1a; position: relative; z-index: 2;"></div>
        <div style="position: absolute; width: 50px; height: 50px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%;"></div>
        <div style="position: absolute; width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%;"></div>
        <i id="music-icon" class="fas fa-music text-white absolute" style="font-size: 10px; opacity: 0;"></i>
    `;

    // Menu Content
    menu.innerHTML = `
        <div style="padding: 15px; color: white; font-family: 'Quicksand', sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                <span style="font-size: 12px; color: #C2B280; font-weight: bold;">MUSIC PLAYER</span>
                <i class="fas fa-times" id="close-menu" style="cursor: pointer; font-size: 14px;"></i>
            </div>
            
            <div id="playlist-container" style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Tracks injected here -->
            </div>

            <div style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
                 <button id="play-pause-btn" style="width: 30px; height: 30px; border-radius: 50%; background: #C2B280; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #1a202c;">
                    <i class="fas fa-play" style="font-size: 10px;"></i>
                 </button>
                 <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="0.5" style="width: 80px; accent-color: #C2B280; height: 4px;">
            </div>
        </div>
    `;

    // Styles for animations
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes popSpin { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }
        .playing-track { color: #C2B280; font-weight: bold; }
        .track-item { cursor: pointer; font-size: 13px; opacity: 0.8; transition: opacity 0.2s; }
        .track-item:hover { opacity: 1; }
    `;
    document.head.appendChild(styleSheet);

    container.appendChild(disc);
    container.appendChild(menu);
    document.body.appendChild(container);

    // --- 3. LOGIC & FUNCTIONALITY ---

    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistContainer = document.getElementById('playlist-container');

    // Render Playlist
    playlist.forEach((track, index) => {
        const div = document.createElement('div');
        div.className = 'track-item';
        div.innerHTML = `<i class="fas fa-music" style="margin-right: 8px; font-size: 10px;"></i> ${track.name}`;
        div.onclick = () => changeTrack(index);
        playlistContainer.appendChild(div);
    });

    // Toggle Play/Pause
    function togglePlay() {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause" style="font-size: 10px;"></i>';
                disc.style.animationPlayState = 'running';
                highlightTrack(currentTrackIndex);
            }).catch(e => console.log("Audio blocked:", e));
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play" style="font-size: 10px;"></i>';
            disc.style.animationPlayState = 'paused';
        }
    }

    // Change Track
    function changeTrack(index) {
        currentTrackIndex = index;
        audio.src = playlist[index].src;
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause" style="font-size: 10px;"></i>';
        disc.style.animationPlayState = 'running';
        highlightTrack(index);
    }

    function highlightTrack(index) {
        const items = playlistContainer.querySelectorAll('.track-item');
        items.forEach((item, i) => {
            item.className = i === index ? 'track-item playing-track' : 'track-item';
        });
    }

    // Toggle Menu (Spin & Expand)
    let isMenuOpen = false;
    function toggleMenu() {
        if (isDragging) return; // Don't toggle if just finished dragging

        // Spin Effect
        disc.style.animation = 'none'; // Reset
        disc.offsetHeight; // Trigger reflow
        disc.style.animation = 'popSpin 0.6s ease';
        
        setTimeout(() => {
             // Restore looping animation if playing
             if(!audio.paused) disc.style.animation = 'slowSpin 4s linear infinite';
             else disc.style.animation = 'slowSpin 10s linear infinite paused';
        }, 600);

        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            menu.style.width = '200px';
            menu.style.opacity = '1';
        } else {
            menu.style.width = '0';
        }
    }

    // Event Listeners
    playPauseBtn.onclick = togglePlay;
    document.getElementById('close-menu').onclick = (e) => {
        e.stopPropagation(); // Prevent container click
        toggleMenu();
    };
    volumeSlider.oninput = (e) => audio.volume = e.target.value;

    // --- 4. DRAG LOGIC ---
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // Mouse Events
    disc.onmousedown = dragStart;
    
    // Touch Events (Mobile)
    disc.ontouchstart = dragStart;

    function dragStart(e) {
        // Prevent default only if it's not a button click inside (though disc has no buttons)
        if (e.type === 'mousedown') e.preventDefault();

        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }

        initialLeft = container.offsetLeft;
        initialTop = container.offsetTop;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
        
        isDragging = false; // Reset, will set to true if moved
    }

    function elementDrag(e) {
        let clientX, clientY;
        
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const dx = clientX - startX;
        const dy = clientY - startY;

        // If moved significantly, mark as dragging
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            isDragging = true;
            disc.style.cursor = 'grabbing';
            menu.style.width = '0'; // Close menu on drag
            isMenuOpen = false;
        }

        container.style.top = (initialTop + dy) + "px";
        container.style.left = (initialLeft + dx) + "px";
        container.style.bottom = "auto"; // Unset bottom once moved
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        disc.style.cursor = 'grab';

        // Snap to edges logic (Optional - keeps it on screen)
        const rect = container.getBoundingClientRect();
        if (rect.left < 0) container.style.left = '10px';
        if (rect.top < 0) container.style.top = '10px';
        if (rect.right > window.innerWidth) container.style.left = (window.innerWidth - 70) + 'px';
        if (rect.bottom > window.innerHeight) container.style.top = (window.innerHeight - 70) + 'px';
    }

    // Handle Click vs Drag
    disc.addEventListener('click', (e) => {
        if (!isDragging) {
            toggleMenu();
        }
    });

    // --- 5. AUTOPLAY WORKAROUND ---
    // Browsers block audio.play() without interaction.
    // 1. Try to play immediately.
    const autoPlayPromise = audio.play();

    if (autoPlayPromise !== undefined) {
        autoPlayPromise.then(() => {
            // Auto-play started!
            playPauseBtn.innerHTML = '<i class="fas fa-pause" style="font-size: 10px;"></i>';
            disc.style.animationPlayState = 'running';
            highlightTrack(0);
        }).catch(error => {
            // Auto-play was prevented.
            console.log("Autoplay prevented. Waiting for interaction.");
            
            // Add a one-time click listener to the whole document
            const interactionStart = () => {
                audio.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause" style="font-size: 10px;"></i>';
                disc.style.animationPlayState = 'running';
                highlightTrack(0);
                document.removeEventListener('click', interactionStart);
                document.removeEventListener('touchstart', interactionStart);
            };

            document.addEventListener('click', interactionStart);
            document.addEventListener('touchstart', interactionStart);
        });
    }
});
