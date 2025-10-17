import Link from "next/link";
import type { ReactNode } from "react";
import FloatingNav from "@/app/components/FloatingNav";
import InvitationShell from "@/app/components/InvitationShell";
import RevealSection from "@/app/components/RevealSection";
import WeddingGallery from "@/app/components/WeddingGallery";

type SectionConfig = {
  id: string;
  label: string;
  icon: ReactNode;
};

const sections: SectionConfig[] = [
  {
    id: "undangan",
    label: "Undangan",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="6" width="16" height="12" rx="2" ry="2" />
        <path d="M4 8l8 5 8-5" />
      </svg>
    ),
  },
  {
    id: "mempelai",
    label: "Mempelai",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8.5" r="3.5" />
        <circle cx="16" cy="8.5" r="3.5" />
        <path d="M4.5 19c0-2.5 1.8-4.5 3.5-4.5h8c1.7 0 3.5 2 3.5 4.5" />
      </svg>
    ),
  },
  {
    id: "akad",
    label: "Akad",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10l8-6 8 6v10H4z" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
  {
    id: "resepsi",
    label: "Resepsi",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 21v-6l-3-7h14l-3 7v6" />
        <path d="M8 15h8" />
      </svg>
    ),
  },
  {
    id: "galeri",
    label: "Galeri",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
        <path d="M3 14l4-3 4 4 3-3 5 4" />
        <circle cx="8.5" cy="9.5" r="1.5" />
      </svg>
    ),
  },
  {
    id: "lokasi",
    label: "Lokasi",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s-6-5.7-6-11a6 6 0 0 1 12 0c0 5.3-6 11-6 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    id: "cerita",
    label: "Cerita",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" />
      </svg>
    ),
  },
  {
    id: "rsvp",
    label: "RSVP",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="5" width="16" height="14" rx="2" ry="2" />
        <path d="M4 9l8 4 8-4" />
      </svg>
    ),
  },
  {
    id: "ucapan",
    label: "Ucapan",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 11h10" />
        <path d="M7 15h6" />
        <path d="M5 5h14v14H8l-3 3z" />
      </svg>
    ),
  },
];

const timeline = [
  {
    year: "2016",
    title: "Pertemuan Pertama",
    description: "Kami bertemu di Bandung pada sebuah kegiatan kampus dan mulai berbagi mimpi yang sama.",
  },
  {
    year: "2019",
    title: "Langkah Bersama",
    description: "Memulai karier di Jakarta dan saling mendukung dalam proses tumbuh bersama keluarga.",
  },
  {
    year: "2024",
    title: "Lamaran",
    description: "Prosesi lamaran berlangsung hangat di rumah keluarga Dewi dengan kehadiran keluarga terdekat.",
  },
];

const wellWishes = [
  "Terima kasih atas doa dan kasih sayang yang senantiasa mengiringi kami.",
  "Semoga hari bahagia ini menjadi awal perjalanan keluarga yang penuh berkah.",
  "Mohon doa agar rumah tangga kami menjadi keluarga sakinah, mawaddah, warahmah.",
];

const galleryImages = [
  {
    src: "/gallery/main-bridge.svg",
    alt: "Pasangan berjalan di atas jembatan kota saat senja",
    title: "Senja Di Kota",
    description: "Langkah ringan di jembatan kota menjadi simbol perjalanan baru yang dimulai bersama.",
  },
  {
    src: "/gallery/cafe-moment.svg",
    alt: "Pasangan duduk di kafe minimalis sambil tertawa",
    title: "Coffee Date",
    description: "Momen sederhana di kafe favorit yang selalu membuat kami kembali jatuh cinta.",
  },
  {
    src: "/gallery/atrium-light.svg",
    alt: "Interior atrium dengan sorot cahaya hangat",
    title: "Atrium Light",
    description: "Pendar cahaya lembut yang menjadi latar prosesi pemberkatan keluarga inti.",
  },
  {
    src: "/gallery/city-skyline.svg",
    alt: "Silhouette kota dengan langit oranye",
    title: "City Skyline",
    description: "Langit kota Jakarta yang menjadi saksi perjalanan karier dan doa kami.",
  },
  {
    src: "/gallery/family-toast.svg",
    alt: "Keluarga melakukan toast bersama",
    title: "Family Toast",
    description: "Momen keluarga inti merayakan kebersamaan dan restu hangat untuk kami.",
  },
  {
    src: "/gallery/ring-details.svg",
    alt: "Foto detail cincin pernikahan",
    title: "Ring Details",
    description: "Cincin sederhana sebagai pengingat janji untuk saling menjaga seumur hidup.",
  },
  {
    src: "/gallery/photo-07.svg",
    alt: "Pasangan berdiri di balkon gedung tinggi",
    title: "City Balcony",
    description: "Menghirup udara sore sambil memandang jalan cerita yang sudah kami tempuh.",
  },
  {
    src: "/gallery/photo-08.svg",
    alt: "Pasangan berbincang di studio foto minimalis",
    title: "Studio Talk",
    description: "Obrolan ringan yang selalu membuat kami tersenyum dan merasa pulang.",
  },
  {
    src: "/gallery/photo-09.svg",
    alt: "Detail dekorasi meja resepsi",
    title: "Table Detail",
    description: "Dekorasi resepsi dengan nuansa monokrom yang hangat dan elegan.",
  },
  {
    src: "/gallery/photo-10.svg",
    alt: "Pasangan berjalan di lorong hotel",
    title: "Quiet Hallway",
    description: "Lorong sunyi sebelum memasuki ballroom tempat kami merayakan hari bahagia.",
  },
  {
    src: "/gallery/photo-11.svg",
    alt: "Detail buket bunga tangan",
    title: "Bouquet",
    description: "Buket bunga pilihan Dewi dengan nuansa putih dan hijau yang sederhana.",
  },
  {
    src: "/gallery/photo-12.svg",
    alt: "Pasangan berdiri di depan jendela besar",
    title: "Light Filled",
    description: "Pagi yang cerah sebelum kami mengucap janji suci dengan penuh rasa syukur.",
  },
  {
    src: "/gallery/photo-13.svg",
    alt: "Pasangan duduk di tangga kayu",
    title: "Stair Pause",
    description: "Jeda tenang di antara kesibukan persiapan untuk kembali menenangkan hati.",
  },
  {
    src: "/gallery/photo-14.svg",
    alt: "Pasangan tersenyum sambil berdiri di ruang tamu",
    title: "Home Stories",
    description: "Ruang tempat kami banyak berbagi cerita dan menyusun rencana masa depan.",
  },
  {
    src: "/gallery/photo-15.svg",
    alt: "Backdrop minimalis dengan panel monokrom",
    title: "Backdrop",
    description: "Backdrop sederhana yang menjadi latar foto keluarga inti.",
  },
];

export default function WeddingPage() {
  return (
    <InvitationShell
      overlaySubtitle="Undangan Pernikahan"
      overlayTitle="Dewi & Aditya"
      overlayDescription="Kami mengundang Anda untuk menjadi bagian dari perjalanan cinta kami. Tekan tombol di bawah ini untuk membuka undangan."
      buttonLabel="Buka Undangan"
    >
      <main className="relative">
        <FloatingNav sections={sections} />

        <RevealSection
          id="undangan"
          className="hero-gradient mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-10 px-4 py-16 text-center sm:gap-12 sm:px-6 sm:py-24"
        >
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] text-gray-400">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </span>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.35em] text-gray-900 sm:text-5xl">
              Dewi &amp; Aditya
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Dengan sukacita kami mengundang Anda pada resepsi pernikahan kami
            </p>
          </div>

          <div className="grid gap-6 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:grid-cols-3 sm:p-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Tanggal</p>
              <p className="text-2xl font-light text-gray-900">Sabtu, 12 Juli 2025</p>
            </div>
            <div className="hidden h-16 w-px bg-gray-200 sm:block" aria-hidden="true" />
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Lokasi</p>
              <p className="text-base text-gray-600">The Atrium, Jakarta Selatan</p>
            </div>
            <div className="space-y-2 sm:col-span-3">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Catatan</p>
              <p className="text-sm leading-6 text-gray-600">
                Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
                memberikan doa restu.
              </p>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="mempelai"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="space-y-10 rounded-[2.5rem] border border-gray-200 bg-white/70 p-8 text-center shadow-sm backdrop-blur sm:space-y-14 sm:p-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Mempelai</h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="space-y-4">
                <p className="text-lg font-semibold uppercase tracking-[0.32em] text-gray-900">Dewi Anindya Putri</p>
                <p className="text-sm text-gray-600">Putri kedua dari Bapak Surya &amp; Ibu Ratna</p>
                <p className="text-sm text-gray-500">
                  Lahir di Bandung dan tumbuh dengan kecintaan terhadap seni serta pendidikan. Dewi berkarier sebagai
                  desainer interior yang mengedepankan kenyamanan keluarga.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg font-semibold uppercase tracking-[0.32em] text-gray-900">Aditya Pratama Putra</p>
                <p className="text-sm text-gray-600">Putra pertama dari Bapak Anwar &amp; Ibu Sari</p>
                <p className="text-sm text-gray-500">
                  Lahir di Surabaya dengan passion pada teknologi dan fotografi. Aditya kini berkarya sebagai pengusaha
                  kreatif di bidang media digital.
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="akad"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="rounded-[2.5rem] border border-gray-200 bg-white/75 p-8 shadow-sm backdrop-blur sm:p-12">
            <h2 className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Akad Nikah</h2>
            <div className="mt-8 grid gap-8 text-center sm:mt-10 sm:grid-cols-3 sm:gap-10">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Tanggal</p>
                <p className="text-lg font-medium text-gray-900">Sabtu, 12 Juli 2025</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Waktu</p>
                <p className="text-lg font-medium text-gray-900">09.00 WIB</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Tempat</p>
                <p className="text-lg font-medium text-gray-900">Masjid Agung Al-Ikhlas</p>
                <p className="text-sm text-gray-600">Jl. Melati No. 45, Jakarta Selatan</p>
              </div>
            </div>
            <p className="mt-10 text-sm leading-7 text-gray-600">
              Prosesi akad nikah akan dilaksanakan secara khidmat dengan memperhatikan adat dan tata cara menurut
              syariat Islam. Mohon kehadiran tepat waktu agar acara berjalan lancar.
            </p>
          </div>
        </RevealSection>

        <RevealSection
          id="resepsi"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="rounded-[2.5rem] border border-gray-200 bg-white/75 p-8 shadow-sm backdrop-blur sm:p-12">
            <h2 className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Resepsi</h2>
            <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-10">
              <div className="space-y-4 text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Sesi 1</p>
                <p className="text-xl font-medium text-gray-900">12.00 - 14.00 WIB</p>
                <p className="text-sm text-gray-600">
                  Jamuan makan siang dengan konsep buffet premium yang diiringi musik akustik hangat.
                </p>
              </div>
              <div className="space-y-4 text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Sesi 2</p>
                <p className="text-xl font-medium text-gray-900">16.00 - 18.00 WIB</p>
                <p className="text-sm text-gray-600">
                  Sesi ramah tamah dan foto bersama keluarga serta kerabat dengan sajian teh sore.
                </p>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Mohon konfirmasi kehadiran agar kami dapat mengatur kenyamanan tamu pada setiap sesi resepsi.
            </p>
          </div>
        </RevealSection>

        <RevealSection
          id="galeri"
          className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="flex w-full flex-col gap-12">
            <div className="text-center">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Galeri</h2>
              <p className="mt-3 text-sm text-gray-500">
                Koleksi visual yang menangkap ritme keseharian kami -- dari perjalanan kota hingga momen intim bersama
                keluarga.
              </p>
            </div>
            <WeddingGallery images={galleryImages} />
          </div>
        </RevealSection>

        <RevealSection
          id="lokasi"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="rounded-[2.5rem] border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur sm:p-12">
            <h2 className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Lokasi</h2>
            <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2">
              <div className="space-y-4 text-left">
                <p className="text-lg font-light text-gray-900">The Atrium Jakarta</p>
                <p className="text-sm leading-7 text-gray-600">
                  Jl. H. R. Rasuna Said No.12, Kuningan,
                  <br />
                  Jakarta Selatan, DKI Jakarta 12940
                </p>
                <p className="text-sm leading-7 text-gray-500">
                  Area parkir tersedia di lantai dasar dan basement. Petugas kami siap membantu mengarahkan Anda menuju
                  ballroom utama.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="https://maps.app.goo.gl/"
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:bg-gray-700"
                  >
                    Buka di Maps
                  </Link>
                  <Link
                    href="tel:+622114567890"
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-900 transition hover:border-gray-900"
                  >
                    Hubungi Panitia
                  </Link>
                </div>
              </div>
              <div className="relative h-56 overflow-hidden rounded-3xl border border-dashed border-gray-200 bg-gradient-to-br from-gray-100/50 via-white to-gray-200/50 sm:h-64">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-xs uppercase tracking-[0.3em] text-gray-500">
                  <span>Peta Lokasi</span>
                  <span>Klik tombol untuk melihat detail</span>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="cerita"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="flex w-full flex-col gap-10 rounded-[2.5rem] border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur sm:p-12">
            <div className="text-center">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Cerita Kami</h2>
              <p className="mt-3 text-sm text-gray-500">
                Perjalanan yang dipenuhi kepercayaan, dukungan keluarga, dan doa yang tidak pernah putus.
              </p>
            </div>
            <ol className="space-y-8">
              {timeline.map((event) => (
                <li key={event.year} className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/70 p-6 text-left shadow-sm sm:flex-row sm:items-start sm:gap-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500 sm:w-32">
                    {event.year}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-base font-medium uppercase tracking-[0.28em] text-gray-900">{event.title}</p>
                    <p className="text-sm leading-6 text-gray-600">{event.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </RevealSection>

        <RevealSection
          id="rsvp"
          className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="w-full space-y-8 rounded-[2.5rem] border border-gray-200 bg-white/85 p-8 text-center shadow-sm backdrop-blur sm:p-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Konfirmasi Kehadiran</h2>
            <p className="text-sm leading-6 text-gray-600">
              Mohon bantu kami mempersiapkan segala sesuatunya dengan baik dengan mengisi konfirmasi kehadiran sebelum
              tanggal 20 Juni 2025.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="https://forms.gle/"
                className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-gray-700"
              >
                Isi Form RSVP
              </Link>
              <Link
                href="mailto:hello@dewiaditya.id"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-900 transition hover:border-gray-900"
              >
                Kirim Pesan
              </Link>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="ucapan"
          className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="w-full space-y-8 rounded-[2.5rem] border border-gray-200 bg-white/90 p-8 text-center shadow-sm backdrop-blur sm:p-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Ucapan</h2>
            <div className="space-y-6">
              {wellWishes.map((message) => (
                <p key={message} className="text-sm leading-6 text-gray-600">
                  {message}
                </p>
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
              Dengan tulus,
              <br />
              Dewi &amp; Aditya
            </p>
          </div>
        </RevealSection>
      </main>
    </InvitationShell>
  );
}

