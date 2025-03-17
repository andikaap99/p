// function untuk logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}


//function untuk menampilkan sidebar
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
let isOpenSideBar = false;

menuBtn.addEventListener('click', () => {
    isOpenSideBar = !isOpenSideBar;
    sidebar.classList.toggle('slide-in');
    sidebar.classList.toggle('slide-out');
    menuBtn.innerHTML = isOpenSideBar ? '☰' : '☰';
});


// data point untuk akses materi
let userPoints = 100
const materiData = [
    {
        "file": "pretest.html",
        "level": 0,
    },
    {
        "file": "pendahuluan.html",
        "level": 0,
    },
    {
        "file": "pengertian_sistem_imun.html",
        "level": 1,
    },
    {
        "file": "fungsi_sistem_imun.html",
        "level": 2,
    },
    {
        "file": "organ_sistem_imun.html",
        "level": 3,
    },
    {
        "file": "mekanisme_sistem_imun.html",
        "level": 4,
    },
    {
        "file": "faktor_sistem_imun.html",
        "level": 5,
    },
    {
        "file": "pencegahan_sistem_imun.html",
        "level": 6,
    },
    {
        "file": "posttest.html",
        "level": 7,
    },
    {
        "file": "daftar_pustaka.html",
        "level": 0,
    },
    {
        "file": "profil.html",
        "level": 0,
    },
]


// function untuk menampilkan konten
function loadContent(page) {
    const materi = materiData.find(m => m.file === page);
    if (!materi) {
        alert('Materi tidak ditemukan.');
        return;
    }

    if (materi.level > userPoints + 1) {
        alert('Anda belum bisa mengakses materi ini. Selesaikan materi sebelumnya terlebih dahulu.');
        return;
    }

    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            
            if (materi.level === userPoints + 1) {
                userPoints = materi.level;
            }
            console.log(userPoints);

            // Tutup sidebar hanya jika dalam mode mobile (misalnya di bawah 768px)
            if (window.innerWidth < 768 && isOpenSideBar) {
                isOpenSideBar = false;
                sidebar.classList.remove('slide-in');
                sidebar.classList.add('slide-out');
            }
        })
        .catch(error => console.error('Gagal memuat konten:', error));
}