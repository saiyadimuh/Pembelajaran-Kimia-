import { Lesson, Quiz, ElementPreset } from './types';

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    babId: "bab1",
    babTitle: "Bab 1: Kimia Hijau",
    title: "Kimia Hijau & 12 Prinsipnya",
    description: "Memahami pengertian kimia hijau serta bagaimana penerapannya dalam kehidupan sehari-hari.",
    duration: "10 Menit",
    badge: "Konsep Dasar",
    content: `## Pengertian Kimia Hijau (Green Chemistry)

Kimia Hijau adalah pendekatan kimia yang bertujuan **mencegah polusi langsung dari sumbernya** dengan merancang produk dan proses kimia yang mengurangi atau menghilangkan penggunaan dan pembuatan zat berbahaya.

Kurikulum Merdeka menekankan Kimia Hijau sebagai solusi utama pembangunan berkelanjutan untuk melindungi bumi kita.

---

## 12 Prinsip Kimia Hijau

Menurut Paul Anastas dan John Warner, terdapat **12 prinsip utama** dalam Kimia Hijau:

1. **Mencegah Limbah (Prevention)**
   Lebih baik mencegah timbulnya limbah daripada mengolah atau membersihkannya setelah terbentuk.
   
2. **Ekonomi Atom (Atom Economy)**
   Metode sintesis harus dirancang untuk memaksimalkan penggabungan semua bahan yang digunakan ke dalam produk akhir.
   
3. **Sintesis Kimia yang Kurang Berbahaya (Less Hazardous Chemical Syntheses)**
   Merancang proses sintesis yang menggunakan dan menghasilkan zat dengan toksisitas rendah atau tidak ada bagi manusia dan lingkungan.
   
4. **Merancang Bahan Kimia yang Lebih Aman (Designing Safer Chemicals)**
   Produk kimia harus dirancang agar tetap efektif namun memiliki tingkat racun yang minimal.
   
5. **Pelarut dan Alat Bantu yang Lebih Aman (Safer Solvents and Auxiliaries)**
   Sebisa mungkin menghindari pelarut organik berbahaya, atau menggantinya dengan pelarut ramah lingkungan seperti air atau CO2 superkritis.
   
6. **Desain untuk Efisiensi Energi (Design for Energy Efficiency)**
   Reaksi kimia sebaiknya dilakukan pada suhu dan tekanan ruang untuk menghemat konsumsi energi.
   
7. **Penggunaan Bahan Baku Terbarukan (Use of Renewable Feedstocks)**
   Bahan baku harus diperoleh dari sumber pertanian/alam yang dapat diperbarui daripada mengeksploitasi bahan bakar fosil habis pakai.
   
8. **Mengurangi Derivatif/Turunan Kimia (Reduce Derivatives)**
   Mengurangi tahapan modifikasi sementara untuk meminimalkan limbah tambahan.
   
9. **Katalisis (Catalysis)**
   Menggunakan katalisator yang selektif untuk mempercepat reaksi tanpa habis dikonsumsi, mengurangi kebutuhan energi dan meminimalkan produk sampingan.
   
10. **Desain untuk Degradasi (Design for Degradation)**
    Produk kimia harus dirancang agar setelah digunakan dapat terurai menjadi zat tidak berbahaya di lingkungan (biodegradable).
    
11. **Analisis Real-time untuk Pencegahan Polusi (Real-time Analysis for Pollution Prevention)**
    Pengembangan metodologi analitik yang memungkinkan pemantauan dan pengendalian proses secara langsung selama reaksi untuk mencegah terbentuknya zat berbahaya.
    
12. **Mencegah Potensi Kecelakaan (Inherently Safer Chemistry for Accident Prevention)**
    Memilih bahan kimia yang minim risiko kecelakaan kerja seperti ledakan, kebakaran, atau kebocoran gas beracun.

---

## Contoh Penerapan Sehari-hari
* **Plastik Biodegradable**: Plastik berbahan dasar pati singkong yang mudah terurai oleh mikroba tanah.
* **Cat Ramah Lingkungan**: Cat berbahan dasar air (*water-based*) yang tidak melepaskan senyawa organik mudah menguap (VOC) berbahaya.
* **Pestisida Alami**: Menggunakan ekstrak tanaman (seperti daun mimba) untuk mengusir hama tanaman tanpa mencemari tanah.`
  },
  {
    id: "l2",
    babId: "bab1",
    babTitle: "Bab 1: Kimia Hijau",
    title: "Kimia Hijau & Pembangunan Berkelanjutan",
    description: "Menghubungkan prinsip kimia hijau dengan aksi mitigasi perubahan iklim global.",
    duration: "8 Menit",
    badge: "Aplikasi Makro",
    content: `## Mitigasi Perubahan Iklim

Pembakaran bahan bakar fosil melepaskan gas rumah kaca utama seperti karbon dioksida ($CO_2$), metana ($CH_4$), dan dinitrogen oksida ($N_2O$). Kimia hijau ikut berperan dalam merancang teknologi alternatif guna mengatasi persoalan ini.

### 1. Energi Bersih & Terbarukan
Pengembangan **sel surya berbasis hidrogen**, bahan bakar **biodiesel generasi baru** dari minyak jelantah, serta pemanfaatan energi biomassa adalah wujud nyata upaya kimia hijau mengurangi ketergantungan pada minyak bumi.

### 2. Pengurangan Emisi Gas Karbon
Konsep *Carbon Capture and Storage (CCS)* merupakan teknik menangkap emisi CO2 hasil industri kemudian menyimpannya di lapisan geologi bawah tanah, atau mengubahnya menjadi bahan kimia bernilai tinggi menggunakan katalis khusus.

---

## Agenda Pembangunan Berkelanjutan (SDGs)

Aplikasi Kimia Hijau mendukung langsung beberapa tujuan pembangunan berkelanjutan PBB (Sustainable Development Goals / SDGs):

| No SDGs | Nama SDGs | Kontribusi Kimia Hijau |
|---|---|---|
| **SDG 3** | Kehidupan Sehat dan Sejahtera | Mengurangi bahan beracun dalam obat-obatan dan kosmetik sehingga aman dikonsumsi manusia. |
| **SDG 6** | Air Bersih dan Sanitasi Layak | Menciptakan teknologi pengolahan limbah air industri tanpa menggunakan klorin atau zat korosif. |
| **SDG 12**| Konsumsi dan Produksi yang Bertanggung Jawab | Mendesain kemasan biodegradable untuk mereduksi sampah plastik laut. |
| **SDG 13**| Penanganan Perubahan Iklim | Mensintesis material penyerap emisi gas rumah kaca secara efisien. |`
  },
  {
    id: "l3",
    babId: "bab2",
    babTitle: "Bab 2: Struktur Atom & Tabel Periodik",
    title: "Sejarah Teori Atom & Partikel Penyusun",
    description: "mempelajari evolusi model atom dari Dalton hingga mekanika kuantum serta partikel subatom dasar.",
    duration: "12 Menit",
    badge: "Teori & Eksperimen",
    content: `## Evolusi Model Atom

Model atom terus berkembang seiring penemuan eksperimental baru sepanjang sejarah:

### 1. Model Dalton (1803)
* **Konsep**: Atom adalah bola pejal yang sangat kecil, tidak dapat dibagi, diciptakan, atau dimusnahkan.
* **Analogi**: Bola biliar.

### 2. Model Thomson (1897)
* **Penemuan**: Menemukan elektron melalui percobaan sinar katode.
* **Konsep**: Atom adalah bola bermuatan positif yang di permukaannya tersebar elektron bermuatan negatif secara merata.
* **Analogi**: Roti kismis.

### 3. Model Rutherford (1911)
* **Penemuan**: Inti atom bermuatan positif melalui penembakan lempeng emas tipis dengan partikel alfa.
* **Konsep**: Sebagian besar atom adalah ruang hampa. Di tengahnya terdapat inti yang padat dan sangat kecil bermuatan positif, dikelilingi oleh elektron pada jarak yang cukup jauh.

### 4. Model Niels Bohr (1913)
* **Konsep**: Elektron mengelilingi inti atom pada lintasan-lintasan tertentu yang disebut **kulit atom** atau tingkat energi statis tanpa memancarkan energi. Elektron dapat berpindah kulit dengan menyerap atau melepaskan energi (*kuantum*).
* **Analogi**: Miniatur sistem tata surya.

### 5. Model Mekanika Kuantum / Kuantum Modern (Schrödinger & Heisenberg)
* **Konsep**: Posisi elektron tidak dapat ditentukan secara pasti (Prinsip Ketidakpastian Heisenberg). Yang dapat ditentukan adalah kebolehjadian terbesar menemukan elektron di dalam ruang yang disebut **orbital**.

---

## Partikel Penyusun Atom (Subatom)

Setiap atom netral terdiri dari tiga jenis partikel subatomis utama:

1. **Proton ($p^+$)**:
   * Muatan: Positif ($+1$)
   * Lokasi: Di dalam inti atom (*nukleus*)
   * Penemu: Goldstein / Rutherford
2. **Neutron ($n^0$)**:
   * Muatan: Netral ($0$)
   * Lokasi: Di dalam inti atom (*nukleus*)
   * Penemu: James Chadwick
3. **Elektron ($e^-$)**:
   * Muatan: Negatif ($-1$)
   * Lokasi: Berada di kulit atom, bergerak melingkari inti
   * Penemu: J.J. Thomson

---

## Notasi Unsur Atom

Penulisan spesies atom sering kali disimbolkan sebagai:

$$\\huge {}^{A}_{Z}X$$

* **$X$**: Lambang Unsur (misal: O untuk Oksigen, C untuk Karbon)
* **$A$**: **Nomor Massa** = Jumlah Proton ($p$) + Jumlah Neutron ($n$)
* **$Z$**: **Nomor Atom** = Jumlah Proton ($p$) = Jumlah Elektron ($e$) (dalam keadaan netral)

**Rumus Cepat Menghitung Jumlah Neutron:**
$$Neutron = A - Z$$`
  },
  {
    id: "l4",
    babId: "bab2",
    babTitle: "Bab 2: Struktur Atom & Tabel Periodik",
    title: "Konfigurasi Elektron & Golongan/Periode",
    description: "Cara membagikan elektron pada lintasan Bohr untuk menentukan letak unsur dalam Tabel Periodik.",
    duration: "10 Menit",
    badge: "Keterampilan Kimia",
    content: `## Konfigurasi Elektron Niels Bohr

Menurut Niels Bohr, elektron didistribusikan dalam beberapa kulit atom. Setiap kulit memiliki daya tampung maksimal elektron berdasarkan rumus matematika:

$$\\text{Jumlah Maksimum elektron pada kulit ke-}n = 2n^2$$

Berikut adalah tabel kapasitas elektron pada setiap kulit utama:

| Nama Kulit | Nilai n | Kapasitas Maksimal |
|:---:|:---:|:---:|
| **Kulit K** | $n = 1$ | $2 \\times 1^2 = 2$ elektron |
| **Kulit L** | $n = 2$ | $2 \\times 2^2 = 8$ elektron |
| **Kulit M** | $n = 3$ | $2 \\times 3^2 = 18$ elektron |
| **Kulit N** | $n = 4$ | $2 \\times 4^2 = 32$ elektron |

---

## Aturan Pengisian Elektron Bohr (Unsur Golongan Utama / A)

1. Isilah kulit mulai dari kulit terdekat dengan inti (K), lalu berpindah ke kulit selanjutnya jika sudah terisi penuh atau mengikuti aturan kestabilan.
2. Jumlah elektron pada **kulit terluar (disebut Elektron Valensi)** tidak boleh melebihi **8 elektron**.
3. Jika elektron tersisa kurang dari kapasitas maksimum kulit berikutnya, maka isi kulit tersebut dengan jumlah maksimal kulit sebelumnya yang terdekat (misal sisa 11 padahal kapasitas kulit M adalah 18, maka diisi 8 terlebih dahulu, sisanya 3 diletakkan di kulit N).

### Contoh Konfigurasi Unsur Netral:
* **\${}_6C$** (Karbon): **2, 4** (Elektron valensi = 4)
* **\${}_{11}Na$** (Natrium): **2, 8, 1** (Elektron valensi = 1)
* **\${}_{20}Ca$** (Kalsium): **2, 8, 8, 2** (Elektron valensi = 2)

---

## Menentukan Golongan & Periode dari Konfigurasi Elektron Bohr

Letak suatu unsur dalam Sistem Periodik Unsur (SPU) bisa langsung ditebak dari susunan elektron luarnya:

1. **Golongan** ditentukan oleh **Jumlah Elektron Valensi** (kulit terluar).
   * Ditulis dengan angka romawi ditambah huruf A (misal Elektron Valensi = 2, maka Golongan IIA).
2. **Periode** ditentukan oleh **Jumlah Kulit** yang terisi elektron.
   * Ditulis dengan angka biasa (misal terisi kulit K, L, M -> Jumlah Kulit = 3, maka Periode 3).

### Ilustrasi Kasus:
Unsur Kalium (\${}_{19}K$) memiliki nomor atom 19.
* Konfigurasi elektron: **2, 8, 8, 1**
* Jumlah kulit terisi: 4 kulit (K, L, M, N) $\\rightarrow$ **Periode 4**
* Elektron valensi: 1 $\\rightarrow$ **Golongan IA**`
  },
  {
    id: "l5",
    babId: "bab3",
    babTitle: "Bab 3: Hukum Dasar Kimia",
    title: "Hukum Lavoisier & Hukum Proust",
    description: "Memahami fondasi stoikiometri melalui hukum kekekalan massa dan perbandingan tetap.",
    duration: "10 Menit",
    badge: "Kuantitatif",
    content: `## Pengantar Stoikiometri

Kuantitas reaktan dan produk dalam reaksi kimia diatur oleh hukum-hukum fundamental yang dirumuskan oleh ilmuwan klasik. Di Kelas X Kurikulum Merdeka, kita fokus pada dua hukum dasar pertama:

---

## 1. Hukum Kekekalan Massa (Hukum Lavoisier)

Dirumuskan oleh **Antoine Laurent Lavoisier** (1785) setelah melakukan pembakaran merkuri oksida tertutup:

> *"Dalam sistem tertutup, massa zat sebelum reaksi adalah sama dengan massa zat setelah reaksi."*

Artinya, tidak ada atom yang menghilang atau tercipta secara gaib. Atom-atom hanya menata ulang ikatannya membentuk senyawa baru.

### Contoh Kasus:
Serbuk besi berdarah ($Fe$) sebanyak 56 gram direaksikan secara sempurna dengan belerang ($S$) sebanyak 32 gram. Sesuai hukum Lavoisier, massa produk besi(II) sulfida ($FeS$) yang terbentuk wajib sejumlah:

$$\\text{Massa } Fe + \\text{Massa } S = \\text{Massa } FeS$$
$$56\\text{ g} + 32\\text{ g} = 88\\text{ gram}$$

---

## 2. Hukum Perbandingan Tetap (Hukum Proust)

Dirumuskan oleh **Joseph Louis Proust** (1799):

> *"Perbandingan massa unsur-unsur penyusun suatu senyawa selalu tetap dan tertentu, tidak tergantung dari asal-usul senyawa tersebut."*

Misalnya, molekul air ($H_2O$) selalu tersusun atas Hidrogen dan Oksigen dengan perbandingan massa **1 : 8**. Berapapun air yang Anda ambil, perbandingan massa penyusunnya selalu identik.

### Contoh Kasus:
Jika air memiliki perbandingan massa $H : O = 1 : 8$. Kita mereaksikan 2 gram gas Hidrogen dengan 16 gram gas Oksigen. 
* Massa hidrogen terpilih: $2\\text{ g}$
* Massa oksigen terpilih: $16\\text{ g}$
Karena perbandingannya $1:8$ dan rasio nyata kitapun $2:16$ (alias $1:8$), semua zat habis bereaksi menghasilkan 18 gram air tanpa ada sisa reaktan.`
  },
  {
    id: "l6",
    babId: "bab3",
    babTitle: "Bab 3: Hukum Dasar Kimia",
    title: "Penyetaraan Persamaan Reaksi Kimia",
    description: "Keterampilan dasar menuliskan persamaan reaksi setara sesuai hukum Lavoisier.",
    duration: "12 Menit",
    badge: "Keterampilan Praktis",
    content: `## Apa itu Persamaan Reaksi Kimia?

Persamaan reaksi menggambarkan perubahan zat pereaksi (reaktan) menjadi zat hasil reaksi (produk) menggunakan rumus kimia dan simbol kimia tertentu.

$$\\text{Reaktan } \\rightarrow \\text{ Produk}$$

* Di sebelah kiri tanda panah: **Reaktan**
* Di sebelah kanan tanda panah: **Produk**
* Angka di depan rumus kimia: **Koefisien Reaksi** (menunjukkan jumlah molekul)
* Huruf kecil dalam tanda kurung: **Wujud Zat**
  * $(s)$ = *solid* (padat)
  * $(g)$ = *gas*
  * $(l)$ = *liquid* (cair murni)
  * $(aq)$ = *aqueous* (larutan dalam air)

---

## Pentingnya Penyetaraan Reaksi

Suatu persamaan reaksi dikatakan **setara** apabila jumlah atom setiap unsur di sisi kiri (reaktan) sama dengan jumlah atom unsur tersebut di sisi kanan (produk). Ini adalah perwujudan langsung dari Hukum Lavoisier.

**Ingat:** Kita HANYA boleh mengubah **Koefisien** di depan zat, dan **DILARANG** mengubah indeks angka kecil di dalam rumus kimia zat tersebut!

### Contoh Reaksi Belum Setara:
$$H_2(g) + O_2(g) \\rightarrow H_2O(l)$$

Mari kita hitung jumlah masing-masing atomnya:
* Sisi Kiri: $2$ atom H, $2$ atom O
* Sisi Kanan: $2$ atom H, $1$ atom O (Oksigen tidak setara!)

### Proses Penyetaraan:
1. Kalikan molekul air ($H_2O$) dengan koefisien **2** agar jumlah atom O menjadi sama berdua di kanan:
   $$H_2(g) + O_2(g) \\rightarrow 2H_2O(l)$$
   * Sekarang sisi kanan: $4$ atom H, $2$ atom O.
2. Sisi kiri baru memiliki 2 atom H. Kalikan gas $H_2$ dengan koefisien **2** agar atom H menjadi 4 di kiri:
   $$2H_2(g) + O_2(g) \\rightarrow 2H_2O(l)$$
   
* Mari kita hitung ulang:
  * Kiri: $4$ atom H, $2$ atom O
  * Kanan: $4$ atom H, $2$ atom O
* **Selamat! Persamaan reaksi telah setara.**`
  }
];

export const QUIZZES: Quiz[] = [
  {
    babId: "bab1",
    babTitle: "Kuis Bab 1: Kimia Hijau",
    questions: [
      {
        id: "q1_1",
        question: "Pendekatan dalam industri kimia yang menitikberatkan pada pencegahan limbah berbahaya langsung dari sumbernya disebut...",
        options: [
          "Kimia Organik Baru",
          "Kimia Hijau (Green Chemistry)",
          "Petrokimia Ramah",
          "Kimia Sintetis Makro"
        ],
        correctAnswer: 1,
        explanations: [
          "Salah. Kimia organik adalah cabang ilmu kimia yang mempelajari senyawa karbon saja.",
          "Benar! Kimia Hijau difokuskan mengurangi atau meniadakan limbah berbahaya langsung pada sumbernya.",
          "Salah. Petrokimia mengacu pada turunan minyak bumi, bukan istilah untuk konsep preventif global.",
          "Salah. Kimia sintetis makro berurusan dengan polimer skala besar, bukan paradigma ramah lingkungan secara luas."
        ]
      },
      {
        id: "q1_2",
        question: "Berikut ini yang merupakan salah satu dari 12 prinsip utama Kimia Hijau adalah...",
        options: [
          "Membuat reaksi pada suhu setinggi mungkin supaya selesai cepat",
          "Membakar limbah kimia di luar area industri agar aman",
          "Memaksimalkan penggunaan bahan bakar fosil demi efisiensi",
          "Mencegah terbentuknya limbah daripada mengolahnya setelah terbentuk"
        ],
        correctAnswer: 3,
        explanations: [
          "Salah. Reaksi justru sebaiknya didorong terjadi pada suhu dan tekanan ruang untuk hemat energi.",
          "Salah. Pembakaran limbah di tempat terbuka menyebarkan polutan udara dan melanggar konsep bebas emisi.",
          "Salah. Kimia hijau menganjurkan pemakaian bahan baku terbarukan, bukan mengeksploitasi bahan bakar fosil.",
          "Benar! Prinsip nomor 1 menyatakan tindakan pencegahan limbah jauh lebih unggul dan efisien daripada penanganan pasca-reaksi."
        ]
      },
      {
        id: "q1_3",
        question: "Mengapa kantong belanja plastik berbahan dasar pati singkong dianggap menerapkan prinsip kimia hijau?",
        options: [
          "Karena warnanya pasti berwarna hijau alami",
          "Karena tidak bisa sobek sama sekali",
          "Karena mudah terurai oleh mikroba tanah menjadi zat tak berbahaya (biodegradable)",
          "Karena biayanya seratus kali lebih murah daripada plastik minyak bumi"
        ],
        correctAnswer: 2,
        explanations: [
          "Salah. Kimia hijau tidak berkaitan dengan pigmen warna visual produk.",
          "Salah. Plastik biodegradable pati singkong umumnya justru memiliki daya renggang lebih lembut dibanding plastik polietilena biasa.",
          "Benar! Plastik ini mendukung prinsip 'Desain untuk Degradasi', terurai alami di tanah tanpa menimbulkan mikroplastik beracun.",
          "Salah. Saat ini plastik singkong justru sedikit lebih mahal karena skala produksinya yang belum semasif polimer konvensional purba."
        ]
      }
    ]
  },
  {
    babId: "bab2",
    babTitle: "Kuis Bab 2: Struktur Atom & Tabel Periodik",
    questions: [
      {
        id: "q2_1",
        question: "Model atom yang menganalogikan struktur atom seperti sebuah roti kismis dengan elektron bermuatan negatif tersebar di permukaan bola pejal bermuatan positif dikemukakan oleh...",
        options: [
          "John Dalton",
          "Ernest Rutherford",
          "J.J. Thomson",
          "Niels Bohr"
        ],
        correctAnswer: 2,
        explanations: [
          "Salah. Dalton merumuskan atom sebagai bola pejal kosong tanpa partikel subatom didalamnya.",
          "Salah. Rutherford menemukan konsep inti atom terpusat dengan ruang kosong di sekelilingnya.",
          "Benar! Thomson mengusulkan model roti kismis (Plum Pudding Model) sesaat setelah secara historis sukses mendeteksi adanya elektron bermuatan negatif.",
          "Salah. Niels Bohr menjabarkan elektron berada di orbit lintasan bertingkat energi statis."
        ]
      },
      {
        id: "q2_2",
        question: "Lambang atom Natrium dituliskan sebagai {}^{23}_{11}Na. Berapakah jumlah proton, neutron, dan elektron secara berurutan dalam atom netral Natrium tersebut?",
        options: [
          "11 proton, 12 neutron, 11 elektron",
          "11 proton, 11 neutron, 12 elektron",
          "12 proton, 11 neutron, 11 elektron",
          "23 proton, 11 neutron, 23 elektron"
        ],
        correctAnswer: 0,
        explanations: [
          "Benar! Nomor atom (elemen bawah Z = 11) mewakili jumlah proton dan elektron = 11. Nomor massa (elemen atas A = 23). Jumlah neutron = A - Z = 23 - 11 = 12 neutron.",
          "Salah. Jumlah neutron penaksirannya keliru jika langsung sama dengan jumlah proton.",
          "Salah. Jumlah Proton dipatok oleh nomor atom di bawah yaitu 11, bukan 12.",
          "Salah. 23 adalah nomor massa keseluruhan inti atom, bukan representasi satuan pembawa muatan positif."
        ]
      },
      {
        id: "q2_3",
        question: "Sebuah unsur memiliki nomor atom 19. Dimanakah letak unsur tersebut dalam Tabel Periodik Unsur?",
        options: [
          "Golongan IA, Periode 3",
          "Golongan IIA, Periode 4",
          "Golongan IA, Periode 4",
          "Golongan VIIA, Periode 3"
        ],
        correctAnswer: 2,
        explanations: [
          "Salah. Unsur periode 3 dengan konfigurasi 2, 8, 1 adalah Natrium (nomor atom 11).",
          "Salah. Unsur golongan IIA periode 4 dengan konfigurasi 2, 8, 8, 2 adalah Kalsium (nomor atom 20).",
          "Benar! Konfigurasi elektron Bohr dari 19 adalah 2, 8, 8, 1. Terisi 4 kulit (K, L, M, N) sehingga Periode 4. Dan elektron valensi terluar = 1 sehingga Golongan IA.",
          "Salah. Unsur 19 memiliki 1 elektron valensi, bukan 7."
        ]
      }
    ]
  },
  {
    babId: "bab3",
    babTitle: "Kuis Bab 3: Hukum Dasar Kimia",
    questions: [
      {
        id: "q3_1",
        question: "Menurut Hukum Kekekalan Massa (Hukum Lavoisier), jika kita membakar 12 gram karbon dengan gas oksigen di ruangan tertutup dan menghasilkan 44 gram karbon dioksida secara sempurna, berapakah jumlah massa gas oksigen yang terpakai?",
        options: [
          "56 gram",
          "32 gram",
          "12 gram",
          "44 gram"
        ],
        correctAnswer: 1,
        explanations: [
          "Salah. Angka 56 adalah hasil penjumlahan 44 + 12 yang melanggar logika pertimbangan neraca massa.",
          "Benar! Massa sebelum reaksi = Massa sesudah reaksi. Massa Karbon + Massa Oksigen = Massa Karbon Dioksida. Maka, 12 g + X = 44 g -> X = 32 gram.",
          "Salah. 12 gram merupakan massa reaktan murni Karbon.",
          "Salah. Reaktan oksigen harus menghasilkan selisih massa tertinggal, tidak mungkin setara dengan produk murni dioksida secara mutlak."
        ]
      },
      {
        id: "q3_2",
        question: "Jika persamaan reaksi pembakaran gas gas metana: a CH4 + b O2 -> c CO2 + d H2O disetarakan secara tepat, berapakah nilai koefisien reaksi a, b, c, dan d?",
        options: [
          "1, 1, 1, 1",
          "1, 2, 1, 2",
          "1, 3, 1, 3",
          "2, 2, 2, 4"
        ],
        correctAnswer: 1,
        explanations: [
          "Salah. Jika semua berkoefisien 1, atom O di kiri hanya ada 2 sedangkan di kanan ada 3. Tidak setuju hukum Lavoisier.",
          "Benar! Reaksi setaranya adalah: 1 CH4 + 2 O2 -> 1 CO2 + 2 H2O. Mari periksa jumlah atom di kiri & kanan: Atom C (1 Kiri, 1 Kanan), Atom H (4 Kiri, 4 Kanan), Atom O (4 Kiri, 4 Kanan). Semua setara sempurna!",
          "Salah. Koefisien atom akan berlebihan dan tidak seimbang pada atom-atom hidrogen maupun oksigen.",
          "Salah. Meskipun rasionya mirip, muatan oksigen kiri 4 tapi kanan ada 8 atom O. Hasilnya tidak seimbang."
        ]
      }
    ]
  }
];

export const ELEMENT_PRESETS: ElementPreset[] = [
  {
    name: "Hidrogen",
    symbol: "H",
    protons: 1,
    neutrons: 0,
    electrons: 1,
    group: "IA",
    period: 1,
    category: "Non-logam Reaktif",
    description: "Unsur paling sederhana dan paling melimpah di alam semesta. Merupakan gas tanpa warna, tanpa bau, dan sangat mudah terbakar.",
    funFact: "Sekitar 75% massa unsur di alam semesta merupakan bentuk atom Hidrogen!"
  },
  {
    name: "Helium",
    symbol: "He",
    protons: 2,
    neutrons: 2,
    electrons: 2,
    group: "VIIIA",
    period: 1,
    category: "Gas Mulia",
    description: "Gas mulia yang sangat stabil dan ringan. Tidak mudah bereaksi dengan materi apa pun di bawah kondisi standar.",
    funFact: "Helium memiliki titik didih terendah di antara seluruh unsur eksis, yakni -268.9°C!"
  },
  {
    name: "Litium",
    symbol: "Li",
    protons: 3,
    neutrons: 4,
    electrons: 3,
    group: "IA",
    period: 2,
    category: "Logam Alkali",
    description: "Logam padat teringan di dunia. Memiliki reaktivitas tinggi dengan air sehingga harus disimpan terendam di dalam minyak.",
    funFact: "Litium adalah komponen penting dalam pembuatan baterai isi ulang gadet modern dan mobil listrik saat ini!"
  },
  {
    name: "Karbon",
    symbol: "C",
    protons: 6,
    neutrons: 6,
    electrons: 6,
    group: "IVA",
    period: 2,
    category: "Non-logam",
    description: "Unsur dasar segala kehidupan organik di bumi. Mampu membentuk jutaan variasi molekul rantai karbon kompleks.",
    funFact: "Intan berharga jutaan rupiah dan isi pensil grafit murah Anda terbuat dari atom yang sama persis: Karbon!"
  },
  {
    name: "Oksigen",
    symbol: "O",
    protons: 8,
    neutrons: 8,
    electrons: 8,
    group: "VIA",
    period: 2,
    category: "Non-logam Reaktif",
    description: "Gas penyokong utama respirasi makhluk hidup. Sangat kaya reaktivitas oksidasi membentuk karat besi dan pembakaran api.",
    funFact: "Oksigen cair sangat dingin dan memiliki sifat paramagnetik unik yang memungkinkannya ditarik oleh magnet!"
  },
  {
    name: "Neon",
    symbol: "Ne",
    protons: 10,
    neutrons: 10,
    electrons: 10,
    group: "VIIIA",
    period: 2,
    category: "Gas Mulia",
    description: "Gas inert stabil yang tidak berwarna dan tidak berbau. Memancarkan cahaya merah oranye yang khas jika diberi tegangan listrik tinggi.",
    funFact: "Neon banyak digunakan dalam lampu hias reklame pertokoan gemerlap perkotaan malam hari!"
  },
  {
    name: "Natrium",
    symbol: "Na",
    protons: 11,
    neutrons: 12,
    electrons: 11,
    group: "IA",
    period: 3,
    category: "Logam Alkali",
    description: "Logam alkali lunak berwarna keperakan yang sangat reaktif. Akan bereaksi meledak spontan jika dilempar ke air.",
    funFact: "Jika digabungkan dengan gas Klorin yang beracun, ia membentuk senyawa Garam Dapur (NaCl) lezat yang kita makan sehari-hari!"
  },
  {
    name: "Magnesium",
    symbol: "Mg",
    protons: 12,
    neutrons: 12,
    electrons: 12,
    group: "IIA",
    period: 3,
    category: "Logam Alkali Tanah",
    description: "Logam paduan struktural kokoh dan ringan. Penting dalam fotosintesis tanaman sebagai atom pusat klorofil.",
    funFact: "Magnesium terbakar di udara menghasilkan nyala putih cemerlang menyilaukan yang sering dipakai untuk kembang api!"
  }
];
