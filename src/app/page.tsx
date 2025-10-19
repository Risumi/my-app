"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";
import FloatingNav from "@/app/components/FloatingNav";
import InvitationShell from "@/app/components/InvitationShell";
import RevealSection from "@/app/components/RevealSection";
import WeddingGallery from "@/app/components/WeddingGallery";

const ARABIC_FONT_STACK =
  "'Noto Sans Arabic', 'Cairo', 'Amiri', 'Scheherazade New', 'Traditional Arabic', sans-serif";

const SURAH_VERSE_ARABIC = String.fromCodePoint(
  0x0648, 0x064e, 0x0645, 0x0650, 0x0646, 0x0652, 0x0020,
  0x0622, 0x064a, 0x064e, 0x0627, 0x062a, 0x0650, 0x0647, 0x0650, 0x0020,
  0x0623, 0x064e, 0x0646, 0x0652, 0x0020,
  0x062e, 0x064e, 0x0644, 0x064e, 0x0642, 0x064e, 0x0020,
  0x0644, 0x064e, 0x0643, 0x064f, 0x0645, 0x0652, 0x0020,
  0x0645, 0x0650, 0x0651, 0x0646, 0x0652, 0x0020,
  0x0623, 0x064e, 0x0646, 0x0652, 0x0641, 0x064f, 0x0633, 0x0650, 0x0643, 0x064f, 0x0645, 0x0652, 0x0020,
  0x0623, 0x064e, 0x0632, 0x0652, 0x0648, 0x064e, 0x0627, 0x062c, 0x064b, 0x0627, 0x0020,
  0x0644, 0x0650, 0x062a, 0x064e, 0x0633, 0x0652, 0x0643, 0x064f, 0x0646, 0x064f, 0x0648, 0x0627, 0x0020,
  0x0625, 0x0650, 0x0644, 0x064e, 0x064a, 0x0652, 0x0647, 0x064e, 0x0627, 0x0020,
  0x0648, 0x064e, 0x062c, 0x064e, 0x0639, 0x064e, 0x0644, 0x064e, 0x0020,
  0x0628, 0x064e, 0x064a, 0x0652, 0x0646, 0x064e, 0x0643, 0x064f, 0x0645, 0x0652, 0x0020,
  0x0645, 0x064e, 0x0648, 0x064e, 0x062f, 0x0651, 0x064e, 0x0629, 0x064b, 0x0020,
  0x0648, 0x064e, 0x0631, 0x064e, 0x062d, 0x0652, 0x0645, 0x064e, 0x0629, 0x064b
);

const SURAH_VERSE_TRANSLATION =
  '"Dan di antara tanda-tanda (kebesaran)-Nya adalah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang." (QS. Ar-Rum: 21)';

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
    id: "akad-resepsi",
    label: "Akad & Resepsi",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10l8-6 8 6v10H4z" />
        <path d="M10 18h4" />
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
    id: "wishes",
    label: "Ucapan",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="5" width="16" height="14" rx="2" ry="2" />
        <path d="M4 9l8 4 8-4" />
      </svg>
    ),
  },
];

const coupleProfiles = [
  {
    id: "bride",
    name: "Entin Endah Cahyati",
    role: "Mempelai Wanita",
    parents: "Putri pertama dari Bapak Jikan & Ibu Sumiyati",
    description:
      "Entin tumbuh di Surabaya dengan kecintaan pada fotografi serta seni dekorasi. Ia kini berkarya sebagai desainer interior yang menghadirkan ruang nyaman untuk keluarga.",
    imageSrc: "/gallery/photo-07.svg",
    imageAlt: "Potret Entin Endah Cahyati",
  },
  {
    id: "groom",
    name: "Rizky Suhaimi",
    role: "Mempelai Pria",
    parents: "Putra pertama dari Bapak Eka & Ibu Hera",
    description:
      "Rizky besar di Bandung dengan passion pada teknologi dan storytelling. Ia menyalurkan kreasinya lewat usaha media digital yang dirintis bersama sahabat-sahabatnya.",
    imageSrc: "/gallery/photo-08.svg",
    imageAlt: "Potret Rizky Suhaimi",
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

const WISHES_PER_PAGE = 2;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const totalPages = Math.max(1, Math.ceil(wellWishes.length / WISHES_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paginatedWishes = useMemo(() => {
    const start = (page - 1) * WISHES_PER_PAGE;
    return wellWishes.slice(start, start + WISHES_PER_PAGE);
  }, [page]);
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  return (
    <InvitationShell
      overlaySubtitle="Wedding Invitation"
      overlayTitle="Rizky & Entin"
      overlayDescription="Kami mengundang Anda untuk menjadi bagian dari perjalanan kami."
      buttonLabel="Buka Undangan"
    >
      <main className="relative">
        <FloatingNav sections={sections} />

        <RevealSection
          id="undangan"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="relative w-full overflow-hidden rounded-[2.75rem] border border-gray-200 bg-white/80 p-8 text-center shadow-sm backdrop-blur sm:p-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-32 -left-20 h-56 w-56 rounded-full bg-gradient-to-br from-gray-100/70 via-white to-gray-200/50 opacity-75 blur-3xl" />
              <div className="absolute -bottom-36 right-[-6rem] h-72 w-72 rounded-full bg-gradient-to-tr from-gray-200/60 via-white to-gray-100/80 opacity-80 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm" />
            </div>
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8">
              <div className="space-y-4">
                <p
                  className="text-3xl font-semibold text-gray-900 leading-relaxed sm:text-4xl"
                  lang="ar"
                  dir="rtl"
                  
                >
                  {SURAH_VERSE_ARABIC}
                </p>
                <p className="text-sm leading-7 text-gray-600 sm:text-base">{SURAH_VERSE_TRANSLATION}</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="mempelai"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="space-y-12 rounded-[2.5rem] border border-gray-200 bg-white/70 p-8 text-center shadow-sm backdrop-blur sm:space-y-16 sm:p-12">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Mempelai</h2>
              <p className="text-sm leading-6 text-gray-600">
                Perkenalan singkat Entin dan Rizky yang saling melengkapi dalam perjalanan hidup, mimpi, dan doa.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {coupleProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex h-full flex-col items-center gap-5 rounded-[2rem] border border-gray-200 bg-white/80 p-6 text-center shadow-sm sm:p-8"
                >
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border border-gray-200 bg-white/90 shadow-sm sm:h-48 sm:w-48">
                    <Image
                      src={profile.imageSrc}
                      alt={profile.imageAlt}
                      width={192}
                      height={192}
                      className="h-full w-full object-cover"
                      priority={profile.id === "bride"}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">{profile.role}</p>
                    <p className="text-lg font-semibold uppercase tracking-[0.32em] text-gray-900">{profile.name}</p>
                    <p className="text-sm text-gray-600">{profile.parents}</p>
                  </div>
                  <p className="text-sm leading-6 text-gray-500">{profile.description}</p>
                </div>
              ))}
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
          id="akad-resepsi"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="w-full space-y-8 rounded-[2.5rem] border border-gray-200 bg-white/75 p-8 shadow-sm backdrop-blur sm:space-y-10 sm:p-12">
            <div className="text-center">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Akad &amp; Resepsi</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Rangkaian acara pernikahan Entin dan Rizky akan berlangsung dalam suasana hangat di lokasi yang sama.
                Berikut jadwal lengkapnya.
              </p>
            </div>
            <div className="space-y-6 rounded-[2rem] border border-gray-200 bg-white/80 p-6 shadow-sm sm:p-10">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Akad Nikah</p>
                <p className="text-lg font-medium text-gray-900">Jumat, 26 Desember 2025 &bull; 09.00 WIB</p>
                <p className="text-sm leading-7 text-gray-600">
                  Prosesi akad nikah berlangsung khidmat dan penuh doa bersama keluarga inti.
                </p>
              </div>
              <div className="h-px w-full bg-gray-200" />
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Resepsi</p>
                <p className="text-lg font-medium text-gray-900">Sabtu, 27 Desember 2025 &bull; 18.00 WIB</p>
                <p className="text-sm leading-7 text-gray-600">
                  Sesi ramah tamah dan silaturahmi bersama keluarga, kerabat, dan sahabat dekat.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-6 text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Lokasi Acara</p>
                <div className="mt-3 space-y-3 text-sm leading-7 text-gray-600">
                  <p className="text-base font-medium text-gray-900">Kediaman Keluarga Jikan</p>
                  <p>Dusun Mulyorejo Rt.2 Rw.2 Desa Wringinrejo, Kecamatan Gambiran, Banyuwangi 68486</p>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="https://www.google.com/maps/place/Jl.+Melati+No.+45,+Banyuwangi"
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-gray-700"
                  >
                    Buka di Google Maps
                  </Link>
                </div>
                <div className="mt-5 overflow-hidden rounded-3xl border border-gray-200 bg-gray-100/80 shadow-inner">
                  <iframe
                    title="Peta Kediaman Keluarga Jikan"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7894.228552596835!2d114.1737971254337!3d-8.390419952329909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1760877238332!5m2!1sen!2sid"
                    className="h-72 w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
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
          id="wishes"
          className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="w-full space-y-10 rounded-[2.5rem] border border-gray-200 bg-white/85 p-8 shadow-sm backdrop-blur sm:p-12">
            <div className="text-center">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700">Ucapan &amp; Hadiah</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Bagikan doa terbaik Anda dan temukan informasi hadiah pernikahan di satu tempat.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="flex flex-col gap-6 rounded-[2rem] border border-gray-200 bg-white/90 p-6 text-left shadow-sm sm:p-8">
                <div className="space-y-3 text-center sm:text-left">
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Ucapan Tamu</p>
                  <p className="text-sm leading-6 text-gray-600">
                    Terima kasih atas setiap doa dan dukungan yang telah Anda titipkan untuk perjalanan kami.
                  </p>
                </div>
                <div className="space-y-5">
                  {paginatedWishes.map((message) => (
                    <div key={message} className="rounded-2xl border border-gray-200 bg-white/95 p-5 shadow-sm">
                      <p className="text-sm leading-6 text-gray-600">{message}</p>
                    </div>
                  ))}
                </div>
                {/* <p className="text-center text-xs uppercase tracking-[0.35em] text-gray-400 sm:text-left">
                  Dengan tulus,
                  <br />
                  Dewi &amp; Aditya
                </p> */}
                {/* <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white/95 p-4 text-[0.65rem] uppercase tracking-[0.18em] text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-xs sm:tracking-[0.25em]">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 font-semibold transition hover:text-gray-900 disabled:opacity-40 sm:w-auto"
                  >
                    <span aria-hidden="true">â†</span>
                    Sebelumnya
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`h-9 w-9 rounded-full text-[0.7rem] font-semibold transition ${
                          pageNumber === page
                            ? "bg-gray-900 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                        }`}
                        aria-current={pageNumber === page ? "page" : undefined}
                      >
                        {String(pageNumber).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 font-semibold transition hover:text-gray-900 disabled:opacity-40 sm:w-auto"
                  >
                    Selanjutnya
                    <span aria-hidden="true">â†’</span>
                  </button>
                </div> */}
              </div>
              <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-gray-200 bg-white/90 p-6 text-center shadow-sm sm:p-8">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Hadiah Pernikahan</p>
                  <p className="text-sm leading-6 text-gray-600">
                    Kehadiran dan doa Anda sudah sangat berarti. Bagi yang ingin berbagi tanda kasih, berikut informasi
                    rekening dan e-wallet yang dapat digunakan.
                  </p>
                </div>
                <div className="space-y-4 text-left text-sm leading-6 text-gray-600">
                  <div className="rounded-xl border border-dashed border-gray-300 bg-white/95 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Bank BCA</p>
                    <p className="mt-1 font-medium text-gray-900">1234567890</p>
                    <p className="text-xs text-gray-500">a.n. Entin Endah Cahyati</p>
                  </div>
                  <div className="rounded-xl border border-dashed border-gray-300 bg-white/95 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">QRIS / E-Wallet</p>
                    <p className="mt-1 text-gray-600">Scan melalui tautan berikut untuk dukungan digital envelope.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="https://wa.me/"
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-gray-700"
                  >
                    Konfirmasi Transfer
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-900 transition hover:border-gray-900"
                  >
                    Lihat QR Digital
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>
      {isQrModalOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-6 py-12"
          onClick={() => setIsQrModalOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-sm rounded-[1.75rem] border border-gray-200 bg-white p-6 text-center shadow-xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
          >
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 transition hover:border-gray-900 hover:text-gray-900"
              aria-label="Tutup QR digital"
            >
              X
            </button>
            <p id="qr-modal-title" className="text-xs uppercase tracking-[0.3em] text-gray-500">
              QR Digital
            </p>
            <div className="mx-auto h-64 w-64 max-w-full overflow-hidden rounded-[1.25rem] border border-dashed border-gray-300 bg-gray-50 p-4">
              <div className="relative h-full w-full">
                <Image
                  src="/gallery/qris.svg"
                  alt="QRIS untuk dukungan digital envelope"
                  fill
                  className="object-contain"
                  sizes="256px"
                  priority
                />
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-gray-600">
              Scan kode QRIS ini untuk berbagi hadiah secara digital. Terima kasih atas perhatian Anda.
            </p>
          </div>
        </div>
      ) : null}
    </InvitationShell>
  );
}


