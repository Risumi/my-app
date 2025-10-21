"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { Cinzel, Josefin_Sans } from "next/font/google";
import FloatingNav from "@/app/components/FloatingNav";
import InvitationShell from "@/app/components/InvitationShell";
import RevealSection from "@/app/components/RevealSection";
import WeddingGallery from "@/app/components/WeddingGallery";

const headingFont = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const bodyFont = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SECTION_FRAME = "mx-auto flex min-h-screen max-w-5xl items-center px-4 py-20 sm:px-6 sm:py-28";
const CARD_BASE =
  "relative w-full overflow-hidden rounded-[3rem] border border-[#2f7f88]/45 bg-[#041d29]/85 p-8 text-center shadow-[0_40px_90px_rgba(3,18,32,0.55)] backdrop-blur-xl sm:p-14";
const PANEL_CLASS =
  "rounded-[2rem] border border-[#2f7f88]/45 bg-[#031522]/80 p-6 shadow-[0_20px_60px_rgba(2,18,32,0.45)] sm:p-8";
const KICKER_CLASS = "text-[0.65rem] uppercase tracking-[0.45em] text-teal-200/75";
const PRIMARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#f6e6bb]/70 bg-[#d3b06a] px-7 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#041923] transition hover:border-[#f9f2cf] hover:bg-[#f9f2cf] hover:text-[#041923] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6e6bb]/60";
const SECONDARY_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-full border border-[#2f7f88]/75 px-7 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-100/85 transition hover:border-[#f4e5b5]/70 hover:text-[#f4e5b5]";
const ACCENT_DIVIDER_CLASS =
  "mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#f4e5b5] to-transparent opacity-70";
const INLINE_DIVIDER_CLASS =
  "h-px w-full bg-gradient-to-r from-transparent via-[#2f7f88]/60 to-transparent";
const PROFILE_TAG_CLASS = "text-[0.65rem] uppercase tracking-[0.4em] text-teal-200/70";

const ARABIC_FONT_STACK =
  "'Noto Sans Arabic', 'Cairo', 'Amiri', 'Scheherazade New', 'Traditional Arabic', sans-serif";

const SURAH_VERSE_ARABIC = String.fromCodePoint(
  0x0648,
  0x064e,
  0x0645,
  0x0650,
  0x0646,
  0x0652,
  0x0020,
  0x0622,
  0x064a,
  0x064e,
  0x0627,
  0x062a,
  0x0650,
  0x0647,
  0x0650,
  0x0020,
  0x0623,
  0x064e,
  0x0646,
  0x0652,
  0x0020,
  0x062e,
  0x064e,
  0x0644,
  0x064e,
  0x0642,
  0x064e,
  0x0020,
  0x0644,
  0x064e,
  0x0643,
  0x064f,
  0x0645,
  0x0652,
  0x0020,
  0x0645,
  0x0650,
  0x0651,
  0x0646,
  0x0652,
  0x0020,
  0x0623,
  0x064e,
  0x0646,
  0x0652,
  0x0641,
  0x064f,
  0x0633,
  0x0650,
  0x0643,
  0x064f,
  0x0645,
  0x0652,
  0x0020,
  0x0623,
  0x064e,
  0x0632,
  0x0652,
  0x0648,
  0x064e,
  0x0627,
  0x062c,
  0x064b,
  0x0627,
  0x0020,
  0x0644,
  0x0650,
  0x062a,
  0x064e,
  0x0633,
  0x0652,
  0x0643,
  0x064f,
  0x0646,
  0x064f,
  0x0648,
  0x0627,
  0x0020,
  0x0625,
  0x0650,
  0x0644,
  0x064e,
  0x064a,
  0x0652,
  0x0647,
  0x064e,
  0x0627,
  0x0020,
  0x0648,
  0x064e,
  0x062c,
  0x064e,
  0x0639,
  0x064e,
  0x0644,
  0x064e,
  0x0020,
  0x0628,
  0x064e,
  0x064a,
  0x0652,
  0x0646,
  0x064e,
  0x0643,
  0x064f,
  0x0645,
  0x0652,
  0x0020,
  0x0645,
  0x064e,
  0x0648,
  0x064e,
  0x062f,
  0x0651,
  0x064e,
  0x0629,
  0x064b,
  0x0020,
  0x0648,
  0x064e,
  0x0631,
  0x064e,
  0x062d,
  0x0652,
  0x0645,
  0x064e,
  0x0629,
  0x064b,
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
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8.5" strokeDasharray="2 3" />
        <path d="M12 5l4 6H8z" fill="currentColor" fillOpacity="0.18" />
        <path d="M12 11l4 6H8z" />
        <path d="M8 11l4 6H4z" />
        <path d="M16 11l4 6h-8z" />
      </svg>
    ),
  },
  {
    id: "mempelai",
    label: "Mempelai",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5c2.9 0 5.5 2.1 5.5 5s-2.6 5-5.5 5-5.5-2.1-5.5-5 2.6-5 5.5-5z" />
        <path d="M7 12.5l-2.5 6.5" />
        <path d="M17 12.5l2.5 6.5" />
        <path d="M9.5 17l-1.5 2.5" />
        <path d="M14.5 17l1.5 2.5" />
      </svg>
    ),
  },
  {
    id: "cerita",
    label: "Cerita",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="5" width="14" height="14" rx="3" />
        <path d="M9 9h6" />
        <path d="M9 12h4" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    id: "akad-resepsi",
    label: "Akad & Resepsi",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 18h14" />
        <path d="M6.5 18L12 6l5.5 12" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    id: "galeri",
    label: "Galeri",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 6.5h15v11h-15z" />
        <path d="M6 14l3.5-3.5L14 15l2-2 2 3" />
        <path d="M9 9h.01" />
      </svg>
    ),
  },
  {
    id: "wishes",
    label: "Ucapan",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 6h14v9H9l-4 4z" />
        <path d="M9 10h6" />
        <path d="M9 13h3" />
      </svg>
    ),
  },
];

const coupleProfiles = [
  {
    id: "bride",
    name: "Entin Endah Cahyati",
    role: "Sang Penjaga",
    parents: "Putri pertama dari Bapak Jikan & Ibu Sumiyati",
    description:
      "Entin tumbuh di Surabaya dengan kecintaan pada fotografi serta seni dekorasi. Kini ia berkarya sebagai desainer interior yang merancang ruang sehangat pedesaan Hateno.",
    imageSrc: "/gallery/photo-07.svg",
    imageAlt: "Potret Entin Endah Cahyati",
  },
  {
    id: "groom",
    name: "Rizky Suhaimi",
    role: "Sang Penjelajah",
    parents: "Putra pertama dari Bapak Eka & Ibu Hera",
    description:
      "Rizky besar di Bandung dengan passion pada teknologi dan storytelling. Ia menyalurkan kreasinya lewat usaha media digital yang dirintis, layaknya menjelajah tiap shrine baru penuh rasa ingin tahu.",
    imageSrc: "/gallery/photo-08.svg",
    imageAlt: "Potret Rizky Suhaimi",
  },
];

const timeline = [
  {
    year: "2016",
    title: "Pertemuan Pertama",
    description:
      "Kami bertemu di Bandung dalam sebuah kegiatan kampus -- momen awal petualangan seperti Link dan Zelda yang saling menemukan tujuan.",
  },
  {
    year: "2019",
    title: "Langkah Bersama",
    description:
      "Merantau ke Jakarta membuka gerbang baru. Kami saling menopang seperti memecahkan shrine dengan keberanian dan doa.",
  },
  {
    year: "2024",
    title: "Lamaran",
    description:
      "Di rumah keluarga, janji itu terucap khidmat. Restu kedua orang tua menjadi cahaya pedoman menuju hari pernikahan.",
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
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className={`${bodyFont.className} bg-[#020a10] text-[#e4dcc3] antialiased`}>
      <InvitationShell
        overlaySubtitle="A Hyrule-Inspired Union"
        overlayTitle="Rizky & Entin"
        overlayDescription="Dengan semangat angin bebas Hyrule dan restu keluarga, kami mengundang Anda memasuki petualangan baru kami."
        buttonLabel="Masuki Undangan"
      >
        <main className="relative pb-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-[-12rem] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#1b8a96]/20 blur-[160px]" />
            <div className="absolute bottom-[-18rem] left-[5%] h-[360px] w-[360px] rounded-full bg-[#1a4b63]/22 blur-[150px]" />
            <div className="absolute right-[-10rem] top-[18%] h-[440px] w-[440px] rounded-full bg-[#0a2131]/35 blur-[190px]" />
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1600 1200" aria-hidden="true">
              <defs>
                <pattern id="botw-net" width="140" height="140" patternUnits="userSpaceOnUse">
                  <path d="M0 0h140v140H0z" fill="none" />
                  <path d="M0 0l70 35 70-35M0 70l70 35 70-35" stroke="#0f3f52" strokeWidth="0.6" />
                  <path d="M70 35l35 70-70 0 35-70z" stroke="#0f3f52" strokeWidth="0.6" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#botw-net)" />
            </svg>
          </div>

          <FloatingNav sections={sections} />

          <RevealSection id="undangan" className={SECTION_FRAME}>
            <div className={`${CARD_BASE}`}>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(36,128,140,0.35),_transparent_70%)]" />
                <div className="absolute inset-6 rounded-[2.5rem] border border-[#12303f]/45" />
                <div className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full border border-[#f4e5b5]/25" />
              </div>
              <div className="relative mx-auto flex max-w-3xl flex-col gap-10">
                <div className="space-y-4">
                  <span className={KICKER_CLASS}>Dengan ridha Allah</span>
                  <h1
                    className={`${headingFont.className} text-4xl uppercase tracking-[0.24em] text-[#f6e6bb] drop-shadow-[0_6px_28px_rgba(4,19,31,0.65)] sm:text-5xl`}
                  >
                    Petualangan Baru Kami
                  </h1>
                  <p className="text-sm leading-7 text-teal-100/80">
                    Dalam semangat angin Bebas Hyrule, kami menyiapkan lembaran baru kehidupan. Semoga langkah ini
                    menjadi gerbang berkah bagi keluarga kita.
                  </p>
                </div>
                <div className={`${PANEL_CLASS} space-y-4`}>
                  <p
                    className="text-3xl leading-relaxed text-[#f8eed0] sm:text-[2.3rem]"
                    style={{ fontFamily: ARABIC_FONT_STACK }}
                    lang="ar"
                    dir="rtl"
                  >
                    {SURAH_VERSE_ARABIC}
                  </p>
                  <div className={ACCENT_DIVIDER_CLASS} />
                  <p className="text-sm leading-7 text-teal-100/85">{SURAH_VERSE_TRANSLATION}</p>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection id="mempelai" className={SECTION_FRAME}>
            <div className={`${CARD_BASE} space-y-12`}>
              <div className="space-y-4 text-center">
                <span className={KICKER_CLASS}>Hero &amp; Guardian</span>
                <h2
                  className={`${headingFont.className} text-3xl uppercase tracking-[0.3em] text-[#f4e5b5] sm:text-4xl`}
                >
                  Mempelai
                </h2>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-teal-100/80">
                  Dua jiwa yang tumbuh dari kota berbeda, kini berpadu dalam satu kompas. Kami saling menguatkan seperti
                  pahlawan dan penjaga yang setia menyertai perjalanan.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                {coupleProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="group relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-[2.25rem] border border-[#2f7f88]/45 bg-[#031b28]/80 p-6 text-center shadow-[0_30px_70px_rgba(3,22,36,0.48)] transition duration-300 hover:border-[#f4e5b5]/45 hover:shadow-[0_45px_90px_rgba(14,86,112,0.5)] sm:p-8"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-20">
                      <svg className="h-full w-full" viewBox="0 0 400 400" aria-hidden="true">
                        <defs>
                          <linearGradient id={`${profile.id}-halo`} x1="0" x2="1" y1="0" y2="1">
                            <stop stopColor="#0f4e63" stopOpacity="0.2" offset="0%" />
                            <stop stopColor="#1f8ca0" stopOpacity="0.05" offset="100%" />
                          </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#${profile.id}-halo)`} />
                      </svg>
                    </div>
                    <div className="relative h-40 w-40 overflow-hidden rounded-full border border-[#f6e6bb]/35 bg-[#04131d] p-1 shadow-[0_20px_45px_rgba(2,16,28,0.5)] sm:h-48 sm:w-48">
                      <div className="absolute inset-0 rounded-full border border-[#2f7f88]/40" aria-hidden="true" />
                      <Image
                        src={profile.imageSrc}
                        alt={profile.imageAlt}
                        width={208}
                        height={208}
                        className="h-full w-full rounded-full object-cover"
                        priority={profile.id === "bride"}
                      />
                    </div>
                    <div className="space-y-3">
                      <p className={PROFILE_TAG_CLASS}>{profile.role}</p>
                      <p
                        className={`${headingFont.className} text-lg uppercase tracking-[0.28em] text-[#f6e6bb] sm:text-xl`}
                      >
                        {profile.name}
                      </p>
                      <div className={ACCENT_DIVIDER_CLASS} />
                      <p className="text-xs uppercase tracking-[0.28em] text-teal-100/70">{profile.parents}</p>
                    </div>
                    <p className="text-sm leading-6 text-teal-100/80">{profile.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection id="cerita" className={SECTION_FRAME}>
            <div className={`${CARD_BASE} space-y-12`}>
              <div className="space-y-4 text-center">
                <span className={KICKER_CLASS}>Questline</span>
                <h2
                  className={`${headingFont.className} text-3xl uppercase tracking-[0.3em] text-[#f4e5b5] sm:text-4xl`}
                >
                  Cerita Kami
                </h2>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-teal-100/80">
                  Setiap fase perjalanan kami dirajut dengan doa dan keberanian. Inilah peta kecil yang mempertemukan
                  dua keluarga besar.
                </p>
              </div>
              <ol className="relative space-y-10">
                <div
                  className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#2f7f88]/55 to-transparent md:block"
                  aria-hidden="true"
                />
                {timeline.map((event, index) => (
                  <li
                    key={event.year}
                    className="relative mx-auto flex flex-col items-center gap-4 text-center md:grid md:max-w-3xl md:grid-cols-[auto,1fr] md:items-start md:gap-8 md:text-left"
                  >
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <span className="absolute inset-0 rounded-full border border-[#2f7f88]/55 bg-[#031522]" />
                      <span
                        className={`${headingFont.className} relative text-sm uppercase tracking-[0.28em] text-[#f6e6bb]`}
                      >
                        {event.year}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p
                        className={`${headingFont.className} text-lg uppercase tracking-[0.24em] text-[#f4e5b5] sm:text-xl`}
                      >
                        {event.title}
                      </p>
                      <p className="text-sm leading-6 text-teal-100/80">{event.description}</p>
                    </div>
                    {index < timeline.length - 1 ? (
                      <div
                        className="pointer-events-none absolute left-1/2 top-[4.5rem] hidden h-10 w-px -translate-x-1/2 bg-gradient-to-b from-[#2f7f88]/50 to-transparent md:block"
                        aria-hidden="true"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </RevealSection>

          <RevealSection id="akad-resepsi" className={SECTION_FRAME}>
            <div className={`${CARD_BASE} space-y-12`}>
              <div className="space-y-4 text-center">
                <span className={KICKER_CLASS}>Temple of Vows</span>
                <h2
                  className={`${headingFont.className} text-3xl uppercase tracking-[0.3em] text-[#f4e5b5] sm:text-4xl`}
                >
                  Akad &amp; Resepsi
                </h2>
                <p className="mx-auto max-w-3xl text-sm leading-7 text-teal-100/80">
                  Rangkaian acara berlangsung dalam suasana hangat di lokasi yang sama. Kehadiran Anda menjadi angin
                  keberanian bagi kami.
                </p>
              </div>
              <div className="space-y-8 text-left">
                <div className={`${PANEL_CLASS} space-y-6`}>
                  <div className="space-y-2">
                    <p className={KICKER_CLASS}>Akad Nikah</p>
                    <p
                      className={`${headingFont.className} text-lg uppercase tracking-[0.24em] text-[#f6e6bb] sm:text-xl`}
                    >
                      Jumat, 26 Desember 2025 • 09.00 WIB
                    </p>
                    <p className="text-sm leading-7 text-teal-100/80">
                      Prosesi akad nikah berlangsung khidmat dan penuh doa bersama keluarga inti.
                    </p>
                  </div>
                  <div className={INLINE_DIVIDER_CLASS} />
                  <div className="space-y-2">
                    <p className={KICKER_CLASS}>Resepsi</p>
                    <p
                      className={`${headingFont.className} text-lg uppercase tracking-[0.24em] text-[#f6e6bb] sm:text-xl`}
                    >
                      Sabtu, 27 Desember 2025 • 18.00 WIB
                    </p>
                    <p className="text-sm leading-7 text-teal-100/80">
                      Silaturahmi bersama keluarga, kerabat, dan sahabat dekat dalam suasana penuh syukur.
                    </p>
                  </div>
                  <div className={INLINE_DIVIDER_CLASS} />
                  <div className="space-y-4">
                    <p className={KICKER_CLASS}>Lokasi Acara</p>
                    <div className="space-y-3 text-sm leading-7 text-teal-100/80">
                      <p
                        className={`${headingFont.className} text-base uppercase tracking-[0.22em] text-[#f4e5b5] sm:text-lg`}
                      >
                        Kediaman Keluarga Jikan
                      </p>
                      <p>Dusun Mulyorejo Rt.2 Rw.2 Desa Wringinrejo, Kecamatan Gambiran, Banyuwangi 68486</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="https://www.google.com/maps/place/Jl.+Melati+No.+45,+Banyuwangi"
                        className={PRIMARY_BUTTON_CLASS}
                      >
                        <span aria-hidden="true" className="inline-flex h-3 w-3 items-center justify-center">
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 stroke-[#041923]"
                            strokeWidth="1"
                          >
                            <path d="M6 1.5l4 7H2z" fill="#041923" />
                          </svg>
                        </span>
                        Buka di Google Maps
                      </Link>
                      <button
                        type="button"
                        onClick={() => window.open("https://calendar.google.com", "_blank")}
                        className={SECONDARY_BUTTON_CLASS}
                      >
                        Simpan ke Kalender
                      </button>
                    </div>
                    <div className="overflow-hidden rounded-3xl border border-[#2f7f88]/45 bg-[#021018] shadow-[0_25px_70px_rgba(3,20,32,0.45)]">
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
            </div>
          </RevealSection>

          <RevealSection
            id="galeri"
            className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 py-20 sm:px-6 sm:py-28"
          >
            <div className="relative w-full overflow-hidden rounded-[3rem] border border-[#2f7f88]/45 bg-[#031b28]/80 p-10 shadow-[0_45px_95px_rgba(3,20,34,0.55)] backdrop-blur-xl sm:p-14">
              <div className="pointer-events-none absolute inset-6 rounded-[2.5rem] border border-[#12303f]/45" />
              <div className="relative space-y-6 text-center">
                <span className={KICKER_CLASS}>Chronicles</span>
                <h2
                  className={`${headingFont.className} text-3xl uppercase tracking-[0.3em] text-[#f4e5b5] sm:text-4xl`}
                >
                  Galeri Hyrule Kami
                </h2>
                <p className="mx-auto max-w-3xl text-sm leading-7 text-teal-100/80">
                  Rekaman perjalanan yang menangkap detail kecil kebahagiaan -- dari senja kota hingga detik-detik syahdu
                  jelang akad.
                </p>
              </div>
              <div className="relative mt-10">
                <WeddingGallery images={galleryImages} />
              </div>
            </div>
          </RevealSection>

          <RevealSection id="wishes" className={SECTION_FRAME}>
            <div className={`${CARD_BASE} space-y-10`}>
              <div className="space-y-4 text-center">
                <span className={KICKER_CLASS}>Blessings &amp; Tribute</span>
                <h2
                  className={`${headingFont.className} text-3xl uppercase tracking-[0.3em] text-[#f4e5b5] sm:text-4xl`}
                >
                  Ucapan &amp; Hadiah
                </h2>
                <p className="mx-auto max-w-3xl text-sm leading-7 text-teal-100/80">
                  Doa tulus Anda adalah kekuatan kami. Berikut ruang kecil untuk menampung pesan dan informasi hadiah
                  pernikahan.
                </p>
              </div>
              <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                <div className={`${PANEL_CLASS} flex flex-col gap-6 text-left`}>
                  <div className="space-y-3 text-center sm:text-left">
                    <p className={KICKER_CLASS}>Ucapan Tamu</p>
                    <p className="text-sm leading-6 text-teal-100/80">
                      Terima kasih atas setiap doa dan dukungan yang sudah Anda titipkan untuk perjalanan kami.
                    </p>
                  </div>
                  <div className="space-y-5">
                    {wellWishes.map((message) => (
                      <div
                        key={message}
                        className="rounded-[1.5rem] border border-[#2f7f88]/40 bg-[#04121c]/85 p-5 shadow-[0_18px_45px_rgba(2,16,28,0.45)]"
                      >
                        <p className="text-sm leading-6 text-teal-100/80">{message}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs uppercase tracking-[0.32em] text-teal-200/60 sm:text-left">
                    Dengan tulus,
                    <br />
                    Rizky &amp; Entin
                  </p>
                </div>
                <div className="flex h-full flex-col justify-between gap-6 rounded-[2.25rem] border border-[#2f7f88]/45 bg-[#031522]/80 p-6 text-center shadow-[0_28px_70px_rgba(3,20,32,0.5)] sm:p-8">
                  <div className="space-y-3">
                    <p className={KICKER_CLASS}>Hadiah Pernikahan</p>
                    <p className="text-sm leading-6 text-teal-100/80">
                      Kehadiran dan doa Anda sudah sangat berarti. Bagi yang ingin berbagi tanda kasih, berikut informasi
                      rekening dan e-wallet.
                    </p>
                  </div>
                  <div className="space-y-4 text-left text-sm leading-6 text-teal-100/80">
                    <div className="rounded-[1.25rem] border border-dashed border-[#2f7f88]/60 bg-[#04121c]/85 p-4">
                      <p className={KICKER_CLASS}>Bank BCA</p>
                      <p className="mt-2 text-base font-medium text-[#f6e6bb]">1234567890</p>
                      <p className="text-xs text-teal-200/70">a.n. Entin Endah Cahyati</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-dashed border-[#2f7f88]/60 bg-[#04121c]/85 p-4">
                      <p className={KICKER_CLASS}>QRIS / E-Wallet</p>
                      <p className="mt-2 text-sm text-teal-100/80">
                        Scan melalui tautan berikut untuk dukungan digital envelope.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href="https://wa.me/" className={PRIMARY_BUTTON_CLASS}>
                      <span aria-hidden="true" className="inline-flex h-3 w-3 items-center justify-center">
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 stroke-[#041923]"
                          strokeWidth="0.8"
                        >
                          <path d="M6 1l1.4 2.9L10.5 4.5 7.9 6.7l0.8 3.3L6 8.6 3.3 10l0.8-3.3L1.5 4.5l3.1-0.6z" fill="#041923" />
                        </svg>
                      </span>
                      Konfirmasi Transfer
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsQrModalOpen(true)}
                      className={SECONDARY_BUTTON_CLASS}
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#01090f]/80 px-6 py-12 backdrop-blur"
            onClick={() => setIsQrModalOpen(false)}
            role="presentation"
          >
            <div
              className="relative w-full max-w-sm rounded-[1.9rem] border border-[#2f7f88]/50 bg-[#031522]/95 p-6 text-center shadow-[0_30px_80px_rgba(2,18,32,0.65)] sm:p-8"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="qr-modal-title"
            >
              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#2f7f88]/50 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70 transition hover:border-[#f4e5b5]/60 hover:text-[#f4e5b5]"
                aria-label="Tutup QR digital"
              >
                X
              </button>
              <p id="qr-modal-title" className={KICKER_CLASS}>
                QR Digital
              </p>
              <div className="mx-auto mt-4 h-64 w-64 max-w-full overflow-hidden rounded-[1.5rem] border border-[#2f7f88]/40 bg-[#04121c]/85 p-4 shadow-[0_20px_50px_rgba(2,16,28,0.5)]">
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
              <p className="mt-5 text-sm leading-6 text-teal-100/80">
                Scan kode QRIS ini untuk berbagi hadiah secara digital. Terima kasih atas perhatian Anda.
              </p>
            </div>
          </div>
        ) : null}
      </InvitationShell>
    </div>
  );
}
