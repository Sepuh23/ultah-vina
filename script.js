// Variabel global
let musicStarted = false;
let countdownFinished = false;

// Fungsi untuk memulai musik (hanya dipanggil dari tombol START)
function startMusic() {
  const music = document.getElementById('background-music');
  if (music && !musicStarted) {
    music.play().catch(e => console.log('Audio play gagal:', e));
    musicStarted = true;
    console.log('🎵 Musik diputar!');
  }
}

// Fungsi untuk memulai semua konten setelah tombol START diklik
function startContent() {
  if (!countdownFinished) return;
  
  // Sembunyikan tombol START
  const startContainer = document.getElementById('startButtonContainer');
  if (startContainer) startContainer.classList.add('d-none');
  
  // Putar musik
  startMusic();
  
  // Tampilkan konfeti
  confetti();
  
  // Mulai slide pertama
  _slideSatu();
}

const timer = document.getElementById('timer');

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

// TANGGAL ULANG TAHUN: 24 MARET 2026 JAM 00:00 (TENGAH MALAM)
// Format: Tahun, Bulan (0-11), Tanggal, Jam, Menit, Detik
// Bulan 2 = Maret (karena Januari=0, Februari=1, Maret=2)
let countDown = new Date(2026, 2, 24, 0, 0, 0).getTime();

let x = setInterval(function () {
  let now = new Date().getTime();
  let distance = countDown - now;
  
  if (distance > 0) {
    // Hitung hari, jam, menit, detik
    let days = Math.floor(distance / (day));
    let hours = Math.floor((distance % (day)) / (hour));
    let minutes = Math.floor((distance % (hour)) / (minute));
    let seconds = Math.floor((distance % (minute)) / second);
    
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }

  if (distance < 0) {
    // Countdown selesai
    timer.classList.add('d-none');
    clearInterval(x);
    countdownFinished = true;
    
    // Tampilkan tombol START
    const startContainer = document.getElementById('startButtonContainer');
    if (startContainer) {
      startContainer.classList.remove('d-none');
      // Tambahkan animasi tambahan
      const startBtn = document.getElementById('startBtn');
      if (startBtn) {
        startBtn.classList.add('animate__pulse', 'animate__infinite');
      }
    }
  }
}, second);

// Event listener untuk tombol START
const startBtn = document.getElementById('startBtn');
if (startBtn) {
  startBtn.addEventListener('click', function() {
    startContent();
  });
}

const _slideSatu = function () {
  const tap = document.getElementById('tap');
  const slideSatu = document.getElementById('slideSatu');
  
  if (slideSatu) {
    slideSatu.classList.remove('d-none');
  }
  
  setTimeout(function () {
    if (tap) {
      tap.classList.remove('d-none');
    }
    document.body.addEventListener('click', function handler() {
      document.body.removeEventListener('click', handler);
      _slideDua();
    }, { once: true });
  }, 5000);
};

const _slideDua = function () {
  const slideSatu = document.getElementById('slideSatu');
  const tap = document.getElementById('tap');
  const slideDua = document.getElementById('slideDua');

  if (slideSatu) {
    slideSatu.classList.replace('animate__slideInDown', 'animate__backOutDown');
    if (tap) tap.classList.add('d-none');
    setTimeout(function () {
      if (slideSatu) slideSatu.classList.add('d-none');
    }, 1000);
  }

  if (slideDua) {
    slideDua.classList.remove('d-none');
    setTimeout(function () {
      if (tap) tap.classList.remove('d-none');
      document.body.addEventListener('click', function handler() {
        document.body.removeEventListener('click', handler);
        if (slideDua) {
          slideDua.classList.replace('animate__zoomInDown', 'animate__fadeOutLeft');
          slideDua.classList.remove('animate__delay-2s', 'animate__slow');
        }
        if (tap) tap.classList.add('d-none');
        setTimeout(function () {
          if (slideDua) slideDua.remove();
          _slideTiga();
        }, 1000);
      }, { once: true });
    }, 35000);
  }
};

const _slideTiga = function () {
  const tap = document.getElementById('tap');
  const slideTiga = document.getElementById('slideTiga');

  if (slideTiga) {
    slideTiga.classList.remove('d-none');
    setTimeout(function () {
      if (tap) tap.classList.remove('d-none');
      document.body.addEventListener('click', function handler() {
        document.body.removeEventListener('click', handler);
        if (slideTiga) {
          slideTiga.classList.remove('animate__delay-2s', 'animate__slow');
          slideTiga.classList.replace('animate__fadeInRight', 'animate__fadeOut');
        }
        if (tap) tap.remove();
        setTimeout(function () {
          if (slideTiga) slideTiga.remove();
          _slideEmpat();
        }, 1000);
      }, { once: true });
    }, 38000);
  }
};

function getRandomPosition(element) {
  var x = document.body.offsetHeight - element.clientHeight - 100;
  var y = document.body.offsetWidth - element.clientWidth;
  var randomX = Math.floor(Math.random() * Math.max(0, x));
  var randomY = Math.floor(Math.random() * Math.max(0, y));
  return [randomX, randomY];
}

const _slideEmpat = function () {
  const slideEmpat = document.getElementById('slideEmpat');
  const btns = document.getElementsByTagName('button');
  
  if (slideEmpat) {
    slideEmpat.classList.remove('d-none');
  }

  if (btns[0]) {
    btns[0].addEventListener('click', function () {
      if (slideEmpat) {
        var xy = getRandomPosition(slideEmpat);
        slideEmpat.style.top = xy[0] + 'px';
        // Efek kecil saat tombol diklik
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 100);
      }
    });
  }

  if (btns[1]) {
    btns[1].addEventListener('click', function () {
      if (slideEmpat) {
        slideEmpat.classList.replace('animate__fadeInDown', 'animate__bounceOut');
        slideEmpat.classList.remove('animate__delay-2s');
        setTimeout(function () {
          if (slideEmpat) slideEmpat.remove();
          setTimeout(() => {
            _slideLima();
          }, 500);
        }, 1000);
      }
    });
  }
};

const _slideLima = function () {
  const slideLima = document.getElementById('slideLima');
  const trims = document.getElementById('trims');
  
  if (slideLima) {
    slideLima.classList.remove('d-none');
  }

  setTimeout(() => {
    if (trims) {
      trims.classList.remove('d-none');
    }
  }, 1000);

  if (slideLima) {
    slideLima.addEventListener('animationend', () => {
      slideLima.classList.add('animate__delay-3s');
      slideLima.classList.replace('animate__bounceIn', 'animate__fadeOut');
      if (trims) {
        trims.classList.add('animate__animated', 'animate__fadeOut', 'animate__delay-3s');
      }
      setTimeout(() => {
        if (trims) trims.remove();
        setTimeout(() => {
          if (slideLima) slideLima.remove();
          _slideEnam();
        }, 1000);
      }, 6000);
    });
  }
};

const _slideEnam = function () {
  const slideEnam = document.getElementById('slideEnam');
  if (slideEnam) {
    slideEnam.classList.remove('d-none');
    // Konfeti lagi untuk perayaan
    setTimeout(() => {
      confetti();
    }, 500);
  }
};

// Inisialisasi TypeIt setelah elemen ada
const initTypeIt = setInterval(() => {
  const teks1 = document.getElementById('teks1');
  const teks2 = document.getElementById('teks2');
  const trims = document.getElementById('trims');
  
  if (teks1 && !teks1.hasAttribute('data-typed')) {
    teks1.setAttribute('data-typed', 'true');
    new TypeIt("#teks1", {
      strings: [
        "Halo Calista Devina! 🎀",
        "Hari ini adalah hari yang istimewa...",
        "Selamat ulang tahun yang ke-18 🎂",
        "Semoga di usia yang baru ini, kamu semakin bahagia ✨",
        "Semoga semua mimpi dan harapanmu tercapai 🌟",
        "Teruslah menjadi pribadi yang luar biasa 💫"
      ],
      startDelay: 4000,
      speed: 75,
      waitUntilVisible: true
    }).go();
  }
  
  if (teks2 && !teks2.hasAttribute('data-typed')) {
    teks2.setAttribute('data-typed', 'true');
    new TypeIt("#teks2", {
      strings: [
        "Calista, kamu adalah seseorang yang sangat berharga 💖",
        "Jangan pernah ragu dengan kemampuanmu 💪",
        "Selamat ulang tahun, Calista Devina! 🎂🎉",
        "",
        "24 Maret 2026 - Hari yang spesial untukmu ✨",
        "",
        "Semoga selalu sehat dan tersenyumlah selalu 😊",
        "",
        "- Dari seseorang yang selalu mendoakan yang terbaik ✨"
      ],
      startDelay: 2000,
      speed: 75,
      waitUntilVisible: true
    }).go();
  }
  
  if (trims && !trims.hasAttribute('data-typed')) {
    trims.setAttribute('data-typed', 'true');
    new TypeIt("#trims", {
      strings: ["💕 Happy Birthday Calista Devina! 💕"],
      startDelay: 2000,
      speed: 100,
      loop: false,
      waitUntilVisible: true,
    }).go();
    clearInterval(initTypeIt);
  }
}, 500);

// Fungsi Konfeti
function confetti() {
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);
  
  for (var i = 0; i < 200; i++) {
    var conf = document.createElement('div');
    conf.style.position = 'absolute';
    conf.style.width = Math.random() * 10 + 5 + 'px';
    conf.style.height = Math.random() * 10 + 5 + 'px';
    conf.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
    conf.style.left = Math.random() * window.innerWidth + 'px';
    conf.style.top = '-20px';
    conf.style.borderRadius = '2px';
    conf.style.opacity = '0.8';
    conf.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    container.appendChild(conf);
  }
  
  // Tambahkan animasi fall
  var style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    container.remove();
    style.remove();
  }, 5000);
}

// Efek tambahan: menampilkan pesan selamat di console
console.log('%c🎂 HAPPY BIRTHDAY CALISTA DEVINA! 🎂', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
console.log('%c24 Maret 2026 - Semoga hari-harimu selalu indah ✨', 'color: #4ecdc4; font-size: 14px;');
console.log('%c🎵 Musik akan diputar setelah tombol START diklik!', 'color: #feca57; font-size: 12px;');