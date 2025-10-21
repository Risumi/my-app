"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat_Alternates, Raleway } from "next/font/google";
import { type CSSProperties, type ReactNode, useMemo, useState } from "react";
import FloatingNav from "@/app/components/FloatingNav";
import InvitationShell from "@/app/components/InvitationShell";
import RevealSection from "@/app/components/RevealSection";
import WeddingGallery from "@/app/components/WeddingGallery";

const displayFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const starFieldStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(1px 1px at 20px 40px, rgba(240, 240, 245, 0.45) 0, transparent 55%), radial-gradient(1px 1px at 140px 120px, rgba(201, 169, 225, 0.4) 0, transparent 55%), radial-gradient(1px 1px at 70px 180px, rgba(233, 196, 106, 0.35) 0, transparent 55%)",
  backgroundSize: "200px 200px",
};

const distantStarsStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(2px 2px at 30px 160px, rgba(240, 240, 245, 0.25) 0, transparent 60%), radial-gradient(2px 2px at 220px 80px, rgba(201, 169, 225, 0.3) 0, transparent 60%), radial-gradient(2px 2px at 160px 200px, rgba(233, 196, 106, 0.25) 0, transparent 60%)",
  backgroundSize: "320px 320px",
};

type FloatingParticle = {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: string;
};

const floatingParticles: FloatingParticle[] = [
  { left: "12%", top: "22%", size: "h-2 w-2", delay: "0s", duration: "7s", opacity: "opacity-60" },
  { left: "28%", top: "65%", size: "h-3 w-3", delay: "1.5s", duration: "9s", opacity: "opacity-70" },
  { left: "48%", top: "18%", size: "h-2.5 w-2.5", delay: "0.8s", duration: "8s", opacity: "opacity-75" },
  { left: "76%", top: "28%", size: "h-2 w-2", delay: "2.2s", duration: "10s", opacity: "opacity-60" },
  { left: "82%", top: "58%", size: "h-2.5 w-2.5", delay: "3.5s", duration: "12s", opacity: "opacity-80" },
  { left: "60%", top: "78%", size: "h-2 w-2", delay: "1.2s", duration: "9s", opacity: "opacity-65" },
  { left: "35%", top: "40%", size: "h-1.5 w-1.5", delay: "2.8s", duration: "11s", opacity: "opacity-75" },
  { left: "18%", top: "78%", size: "h-2 w-2", delay: "4.1s", duration: "13s", opacity: "opacity-55" },
];

type BlinkingStar = {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
  blurClass?: string;
};

const blinkingStars: BlinkingStar[] = [
  { left: "15%", top: "14%", size: "h-1.5 w-1.5", delay: "0s", duration: "4s", opacity: 0.9 },
  { left: "35%", top: "10%", size: "h-1 w-1", delay: "1.2s", duration: "5.5s", opacity: 0.75, blurClass: "blur-[0.5px]" },
  { left: "58%", top: "12%", size: "h-1.5 w-1.5", delay: "2.4s", duration: "4.8s", opacity: 0.85 },
  { left: "78%", top: "16%", size: "h-1 w-1", delay: "3.1s", duration: "5.2s", opacity: 0.7 },
  { left: "22%", top: "32%", size: "h-1.5 w-1.5", delay: "1.8s", duration: "3.8s", opacity: 0.88 },
  { left: "48%", top: "30%", size: "h-1 w-1", delay: "2.5s", duration: "4.3s", opacity: 0.72, blurClass: "blur-[0.5px]" },
  { left: "68%", top: "34%", size: "h-1.5 w-1.5", delay: "0.9s", duration: "4.6s", opacity: 0.82 },
  { left: "84%", top: "38%", size: "h-1 w-1", delay: "4.4s", duration: "5.1s", opacity: 0.68, blurClass: "blur-[0.5px]" },
  { left: "28%", top: "54%", size: "h-1.5 w-1.5", delay: "3.7s", duration: "4.9s", opacity: 0.86 },
  { left: "52%", top: "58%", size: "h-1 w-1", delay: "0.6s", duration: "4.2s", opacity: 0.74 },
  { left: "74%", top: "56%", size: "h-1.5 w-1.5", delay: "2.9s", duration: "5.4s", opacity: 0.8 },
  { left: "40%", top: "70%", size: "h-1.5 w-1.5", delay: "4.6s", duration: "5.6s", opacity: 0.78 },
  { left: "62%", top: "74%", size: "h-1 w-1", delay: "1.4s", duration: "4s", opacity: 0.7, blurClass: "blur-[0.5px]" },
  { left: "18%", top: "68%", size: "h-1 w-1", delay: "2s", duration: "5.3s", opacity: 0.65 },
];

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

  return (
    <InvitationShell
      overlaySubtitle="Wedding Invitation"
      overlayTitle="Rizky & Entin"
      overlayDescription="Kami mengundang Anda untuk menjadi bagian dari perjalanan kami."
      buttonLabel="Buka Undangan"
    >
      <main className={`${bodyFont.className} relative min-h-screen bg-[#0b0d21] text-[#F0F0F5] antialiased`}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(201,169,225,0.24),transparent_60%),radial-gradient(circle_at_80%_15%,rgba(75,63,114,0.45),transparent_65%),linear-gradient(180deg,#0b0d21_0%,#1A1B33_55%,#0b0d21_100%)]" />
          <div className="absolute inset-0 blur-3xl bg-[radial-gradient(circle_at_50%_-10%,rgba(233,196,106,0.28),transparent_65%)] opacity-70" />
          <div className="absolute inset-0 opacity-60" style={starFieldStyle} />
          <div className="absolute inset-0 opacity-40" style={distantStarsStyle} />
          <div className="absolute -left-40 top-1/5 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,169,225,0.38),transparent_70%)] blur-[130px]" />
          <div className="absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(233,196,106,0.32),transparent_70%)] blur-[150px]" />
          {blinkingStars.map((star, index) => (
            <div
              key={`blinking-star-${index}`}
              className={`pointer-events-none absolute rounded-full bg-[#F0F0F5] shadow-[0_0_10px_rgba(240,240,245,0.65)] ${star.size} ${star.blurClass ?? ""}`}
              style={{
                left: star.left,
                top: star.top,
                opacity: star.opacity,
                animation: `pulse ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
        {floatingParticles.map((particle, index) => (
          <span
            key={`${particle.left}-${particle.top}-${index}`}
            className={`pointer-events-none absolute rounded-full bg-[#F0F0F5]/80 shadow-[0_0_12px_rgba(240,240,245,0.6)] ${particle.size} ${particle.opacity} animate-pulse`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
        <div className="relative z-10">
          <FloatingNav sections={sections} />

          <RevealSection
            id="undangan"
            className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
          >
            <div className="relative w-full overflow-hidden rounded-[2.75rem] border border-white/15 bg-white/5 p-8 text-center shadow-[0_25px_120px_-45px_rgba(8,6,24,0.9)] backdrop-blur-2xl sm:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,225,0.2),transparent_65%),radial-gradient(circle_at_bottom,rgba(75,63,114,0.3),transparent_70%)]" />
                <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,196,106,0.32),transparent_65%)] blur-3xl" />
              </div>
              <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-12">
                
                <div className="flex flex-col items-center gap-4">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#E9C46A]/80 to-transparent" />
                  
                  <p
                    className="text-[1.6rem] leading-normal text-[#F0F0F5] sm:text-[1.9rem] lg:text-[2.25rem] lg:leading-tight"
                    lang="ar"
                    dir="rtl"
                    style={{ fontFamily: ARABIC_FONT_STACK }}
                  >
                    {SURAH_VERSE_ARABIC}
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-8">
                    {SURAH_VERSE_TRANSLATION}
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
          <RevealSection
            id="mempelai"
            className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
          >
            <div className="relative w-full space-y-12 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-8 text-center shadow-[0_25px_120px_-45px_rgba(8,6,24,0.9)] backdrop-blur-2xl sm:space-y-16 sm:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,225,0.2),transparent_65%)]" />
              </div>
              <div className="relative space-y-3">
                <h2
                  className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.55em] text-[#E9C46A] sm:text-sm lg:text-base lg:tracking-[0.6em]`}
                >
                  Mempelai
                </h2>
                <p className="mx-auto max-w-2xl text-sm leading-6 text-[#F0F0F5]/75 sm:text-base lg:text-lg lg:leading-7">
                  Perkenalan singkat Entin dan Rizky yang saling melengkapi dalam perjalanan hidup, mimpi, dan doa.
                </p>
              </div>
              <div className="relative grid gap-8 sm:gap-10 lg:gap-12">
                {coupleProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="relative flex h-full flex-col items-center gap-5 overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#1A1B33]/80 via-[#1A1B33]/60 to-[#4B3F72]/60 p-6 text-center shadow-[0_20px_60px_-35px_rgba(10,7,30,0.9)] backdrop-blur-lg sm:p-8"
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(233,196,106,0.22),transparent_70%)] blur-3xl" />
                    </div>
                    <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-[0_15px_45px_-25px_rgba(10,7,30,0.9)]">
                      <Image
                        src={profile.imageSrc}
                        alt={profile.imageAlt}
                        fill
                        sizes="160px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="relative space-y-2">
                      <p className={`${displayFont.className} text-lg font-semibold text-[#F0F0F5] lg:text-xl`}>
                        {profile.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.4em] text-[#E9C46A]/80 sm:text-sm">{profile.role}</p>
                      <p className="text-xs text-[#C9A9E1]/80 sm:text-sm">{profile.parents}</p>
                    </div>
                    <p className="text-sm leading-6 text-[#F0F0F5]/75 sm:text-base lg:text-lg lg:leading-7">
                      {profile.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection
            id="cerita"
            className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
          >
            <div className="relative flex w-full flex-col gap-10 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-8 shadow-[0_25px_120px_-45px_rgba(8,6,24,0.9)] backdrop-blur-2xl sm:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,225,0.2),transparent_65%)]" />
              </div>
              <div className="relative text-center">
                <h2
                  className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.55em] text-[#E9C46A] sm:text-sm lg:text-base lg:tracking-[0.6em]`}
                >
                  Cerita Kami
                </h2>
                <p className="mt-3 text-sm text-[#F0F0F5]/75 sm:text-base lg:text-lg">
                  Perjalanan yang dipenuhi kepercayaan, dukungan keluarga, dan doa yang tidak pernah putus.
                </p>
              </div>
              <ol className="relative space-y-8">
                {timeline.map((event) => (
                  <li
                    key={event.year}
                    className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A1B33]/75 via-[#1A1B33]/55 to-[#4B3F72]/60 p-6 text-left shadow-[0_18px_60px_-40px_rgba(8,6,24,0.9)] backdrop-blur sm:flex-row sm:items-start sm:gap-6"
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#E9C46A]/40 to-transparent" />
                    </div>
                    <div className="relative text-xs font-semibold uppercase tracking-[0.45em] text-[#E9C46A]/80 sm:w-32 sm:text-sm">
                      {event.year}
                    </div>
                    <div className="relative flex-1 space-y-2">
                      <p className={`${displayFont.className} text-base uppercase tracking-[0.3em] text-[#F0F0F5] lg:text-lg`}>
                        {event.title}
                      </p>
                      <p className="text-sm leading-6 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-7">
                        {event.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </RevealSection>

          <RevealSection
            id="akad-resepsi"
            className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
          >
            <div className="relative w-full space-y-8 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-8 shadow-[0_25px_120px_-45px_rgba(8,6,24,0.9)] backdrop-blur-2xl sm:space-y-10 sm:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,225,0.2),transparent_65%)]" />
              </div>
              <div className="relative text-center">
                <h2
                  className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.55em] text-[#E9C46A] sm:text-sm lg:text-base lg:tracking-[0.6em]`}
                >
                  Akad &amp; Resepsi
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#F0F0F5]/75 sm:text-base lg:text-lg lg:leading-7">
                  Rangkaian acara pernikahan Entin dan Rizky akan berlangsung dalam suasana hangat di lokasi yang sama.
                  Berikut jadwal lengkapnya.
                </p>
              </div>
              <div className="relative space-y-6 overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-[#1A1B33]/75 via-[#1A1B33]/55 to-[#4B3F72]/65 p-6 shadow-[0_20px_70px_-40px_rgba(8,6,24,0.9)] sm:p-10">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(233,196,106,0.25),transparent_70%)] blur-3xl" />
                </div>
                <div className="relative space-y-3">
                  <p className="text-xs uppercase tracking-[0.45em] text-[#E9C46A]/80 sm:text-sm">Akad Nikah</p>
                  <p className={`${displayFont.className} text-lg font-semibold text-[#F0F0F5] lg:text-xl`}>
                    Jumat, 26 Desember 2025 &bull; 09.00 WIB
                  </p>
                  <p className="text-sm leading-7 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-8">
                    Prosesi akad nikah berlangsung khidmat dan penuh doa bersama keluarga inti.
                  </p>
                </div>
                <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="relative space-y-3">
                  <p className="text-xs uppercase tracking-[0.45em] text-[#E9C46A]/80 sm:text-sm">Resepsi</p>
                  <p className={`${displayFont.className} text-lg font-semibold text-[#F0F0F5] lg:text-xl`}>
                    Sabtu, 27 Desember 2025 &bull; 18.00 WIB
                  </p>
                  <p className="text-sm leading-7 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-8">
                    Sesi ramah tamah dan silaturahmi bersama keluarga, kerabat, dan sahabat dekat.
                  </p>
                </div>
                <div className="relative border-t border-white/10 pt-6 text-left">
                  <p className="text-xs uppercase tracking-[0.45em] text-[#E9C46A]/80 sm:text-sm">Lokasi Acara</p>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-8">
                    <p className={`${displayFont.className} text-base font-semibold text-[#F0F0F5] lg:text-lg`}>
                      Kediaman Keluarga Jikan
                    </p>
                    <p>Dusun Mulyorejo Rt.2 Rw.2 Desa Wringinrejo, Kecamatan Gambiran, Banyuwangi 68486</p>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="https://www.google.com/maps/place/Jl.+Melati+No.+45,+Banyuwangi"
                      className="inline-flex items-center justify-center rounded-full bg-[#E9C46A] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#1A1B33] transition hover:bg-[#f1d498]"
                    >
                      Buka di Google Maps
                    </Link>
                  </div>
                  <div className="mt-5 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.08] shadow-[inset_0_0_30px_rgba(12,10,38,0.45)]">
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
            className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
          >
            <div className="flex w-full flex-col gap-12">
              <div className="text-center">
                <h2
                  className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.55em] text-[#E9C46A] sm:text-sm lg:text-base lg:tracking-[0.6em]`}
                >
                  Galeri
                </h2>
                <p className="mt-3 text-sm text-[#F0F0F5]/75 sm:text-base lg:text-lg">
                  Koleksi visual yang menangkap ritme keseharian kami -- dari perjalanan kota hingga momen intim bersama
                  keluarga.
                </p>
              </div>
              <WeddingGallery images={galleryImages} />
            </div>
          </RevealSection>

          <RevealSection
            id="wishes"
            className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
          >
            <div className="relative w-full space-y-10 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-8 shadow-[0_25px_120px_-45px_rgba(8,6,24,0.9)] backdrop-blur-2xl sm:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,225,0.2),transparent_65%)]" />
              </div>
              <div className="relative text-center">
                <h2
                  className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.55em] text-[#E9C46A] sm:text-sm lg:text-base lg:tracking-[0.6em]`}
                >
                  Ucapan &amp; Hadiah
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#F0F0F5]/75 sm:text-base lg:text-lg lg:leading-7">
                  Bagikan doa terbaik Anda dan temukan informasi hadiah pernikahan di satu tempat.
                </p>
              </div>
              <div className="relative grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                <div className="flex flex-col gap-6 rounded-[2rem] border border-white/12 bg-gradient-to-br from-[#1A1B33]/75 via-[#1A1B33]/55 to-[#4B3F72]/65 p-6 text-left shadow-[0_20px_70px_-40px_rgba(8,6,24,0.9)] backdrop-blur sm:p-8">
                  <div className="space-y-3 text-center sm:text-left">
                    <p className="text-xs uppercase tracking-[0.45em] text-[#E9C46A]/80 sm:text-sm">Ucapan Tamu</p>
                    <p className="text-sm leading-6 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-7">
                      Terima kasih atas setiap doa dan dukungan yang telah Anda titipkan untuk perjalanan kami.
                    </p>
                  </div>
                  <div className="space-y-5">
                    {paginatedWishes.map((message) => (
                      <div
                        key={message}
                        className="rounded-2xl border border-white/12 bg-white/10 p-5 shadow-[0_18px_50px_-35px_rgba(8,6,24,0.9)]"
                      >
                        <p className="text-sm leading-6 text-[#F0F0F5]/75 sm:text-base lg:text-lg lg:leading-7">
                          {message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-white/12 bg-gradient-to-br from-[#1A1B33]/75 via-[#1A1B33]/55 to-[#4B3F72]/65 p-6 text-center shadow-[0_20px_70px_-40px_rgba(8,6,24,0.9)] backdrop-blur sm:p-8">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.45em] text-[#E9C46A]/80 sm:text-sm">Hadiah Pernikahan</p>
                    <p className="text-sm leading-6 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-7">
                      Kehadiran dan doa Anda sudah sangat berarti. Bagi yang ingin berbagi tanda kasih, berikut informasi
                      rekening dan e-wallet yang dapat digunakan.
                    </p>
                  </div>
                  <div className="space-y-4 text-left text-sm leading-6 text-[#F0F0F5]/80 sm:text-base lg:text-lg lg:leading-7">
                    <div className="rounded-xl border border-dashed border-white/20 bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#E9C46A]/75 sm:text-sm">Bank BCA</p>
                      <p className={`${displayFont.className} mt-1 text-lg text-[#F0F0F5] lg:text-xl`}>1234567890</p>
                      <p className="text-xs text-[#C9A9E1]/80 sm:text-sm">a.n. Entin Endah Cahyati</p>
                    </div>
                    <div className="rounded-xl border border-dashed border-white/20 bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#E9C46A]/75 sm:text-sm">QRIS / E-Wallet</p>
                      <p className="mt-1 text-[#F0F0F5]/80">
                        Scan melalui tautan berikut untuk dukungan digital envelope.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                      href="https://wa.me/"
                      className="inline-flex items-center justify-center rounded-full bg-[#E9C46A] px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1A1B33] transition hover:bg-[#f1d498]"
                    >
                      Konfirmasi Transfer
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsQrModalOpen(true)}
                      className="inline-flex items-center justify-center rounded-full border border-[#E9C46A]/60 px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#F0F0F5] transition hover:bg-[#E9C46A]/10"
                    >
                      Lihat QR Digital
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </main>
      {isQrModalOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#05071a]/80 px-6 py-12"
          onClick={() => setIsQrModalOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-br from-[#1A1B33]/95 to-[#4B3F72]/90 p-6 text-center shadow-[0_25px_80px_-35px_rgba(5,5,20,0.9)] backdrop-blur-xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
          >
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold uppercase tracking-[0.25em] text-[#F0F0F5]/70 transition hover:border-[#E9C46A]/70 hover:text-[#E9C46A]"
              aria-label="Tutup QR digital"
            >
              X
            </button>
            <p
              id="qr-modal-title"
              className={`${displayFont.className} text-xs uppercase tracking-[0.5em] text-[#E9C46A]/85`}
            >
              QR Digital
            </p>
            <div className="mx-auto mt-5 h-64 w-64 max-w-full overflow-hidden rounded-[1.25rem] border border-dashed border-white/20 bg-white/10 p-4">
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
            <p className="mt-5 text-sm leading-6 text-[#F0F0F5]/75">
              Scan kode QRIS ini untuk berbagi hadiah secara digital. Terima kasih atas perhatian Anda.
            </p>
          </div>
        </div>
      ) : null}
    </InvitationShell>
  );
}
