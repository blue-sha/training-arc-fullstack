// Ambil semua button yang ada di dalam container tertentu
const buttons = document.querySelectorAll('.filter-btn');

// Berikan style Tailwind secara masal
const baseStyle = "px-4 py-2 bg-white shadow-lg w-35 rounded-md hover:bg-slate-200 transition";
const searchInput = document.getElementById('search-input');
let activeCategory = 'all';
let searchWord = '';

buttons.forEach(btn => {
  // Tambahkan class ke setiap button
  btn.className = baseStyle; 
  btn.addEventListener('click', () => {
    activeCategory = btn.getAttribute('data-category');
    updateActiveButton(btn);
    filtering();
  })
});

function filtering() {
  const result = gears.filter(item => {
    const fitCategory = (activeCategory === 'all' || item.kategori === activeCategory);

    const fitName = item.nama.toLowerCase().includes(searchWord.toLowerCase());

    return fitCategory && fitName;
  });
  renderGears(result);
}

searchInput.addEventListener('input', (e) => {
  searchWord = e.target.value;
  filtering();
});

const gears = [
  { id: 1, nama: "Infinix XBook B14", kategori: "laptop", harga: "Rp7.199.999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0QMkR5wEu9oK-lQ-PVulNvPnpnlNbTgRrQ&s" },
  { id: 2, nama: "Aula F75", kategori: "keyboard", harga: "Rp699.999", image: "https://epomaker.au/cdn/shop/files/203A5822.jpg?v=1712648013" },
  { id: 3, nama: "Logitech G Pro", kategori: "mouse", harga: "Rp1.200.000", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL9g1sJYdCVo7Rot01zKX8Kcl2NlxGLdcRzg&s" },
  { id: 4, nama: "Macbook Neo", kategori: "laptop", harga: "Rp11.800.000", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-neo-color-select-202603-silver-256gb_AV1_GEO_GB_FMT_WHH?wid=690&hei=720&fmt=p-jpg&qlt=80&.v=TytZbDBUUnRqRElRcFlBSHpmZVVDNFdhaFd1bmVlZEFaaDd5ZjhzZmNGaFRBcEVoWjNEMkMzaXExams1Z3VtalRWQkh5eXU1UjZTZDJsZDRpZkIxRDdEeVkvQ3Irdm1GbWRpa2U3N3hPdE5zb1V2QVBtaDVvQ0NNMkt6OURFWUpLRXpqbVlFZzhFazBFVkZaRCtJYU9ibTN6OWFscEplRXJVNDhWeU9jWUtF&traceId=1"},
  { id:5, nama: "ZIFRIEND AG61", kategori: "keyboard", harga: "Rp229.000", image: "https://manuals.plus/ae/1005007355151718.jpg"}
];

function renderGears(data) {
  const container = document.getElementById('gear-container');
  container.innerHTML = ''; // Kosongkan dulu sebelum diisi ulang

  data.forEach(item => {
    container.innerHTML += `
      <div class="flex flex-col justify-center items-center bg-white p-4 rounded-xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all">
        <img src="${item.image}" class="rounded-lg mb-4 w-25">
        <h3 class="font-bold text-lg">${item.nama}</h3>
        <p class="text-gray-500 text-sm">${item.kategori}</p>
        <p class="text-blue-600 font-semibold mt-2">${item.harga}</p>
      </div>
    `;
  });
}

function updateActiveButton(activeBtn){
    buttons.forEach(btn => {
    // Reset semua tombol ke warna putih
    btn.classList.remove('bg-blue-500', 'text-white');
    btn.classList.add('bg-white', 'text-black');
  });

  // Beri warna biru ke tombol yang diklik
  activeBtn.classList.remove('bg-white', 'text-black'); // Hapus warna lamanya!
  activeBtn.classList.add('bg-blue-500', 'text-white');
}

renderGears(gears);