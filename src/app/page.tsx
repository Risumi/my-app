"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
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
  {
    id: "hadiah",
    label: "Hadiah",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 7h16v14H4z" />
        <path d="M4 11h16" />
        <path d="M12 7v14" />
        <path d="M12 7c-2 0-4-1.4-4-3s1.5-2.5 3-1.2C11.7 3.5 12 5 12 5" />
        <path d="M12 7c2 0 4-1.4 4-3s-1.5-2.5-3-1.2C12.3 3.5 12 5 12 5" />
      </svg>
    ),
  },
];

const floatingNavHiddenSectionIds: string[] = ["undangan", "terima-kasih"].filter(
  (id): id is string => Boolean(id),
);

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

const scheduleDetails = [
  {
    id: "akad",
    label: "Akad Nikah",
    datetime: "Jumat, 26 Desember 2025",
    time: "09.00 WIB",
    description: "Prosesi sakral yang disaksikan keluarga inti dan sahabat terdekat.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-gray-900">
        <path
          d="M7 7a5 5 0 0 1 10 0v3a5 5 0 0 1-10 0z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M4.5 20.5h15v-4.75a3.75 3.75 0 0 0-3.75-3.75h-7.5A3.75 3.75 0 0 0 4.5 15.75z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: "resepsi",
    label: "Resepsi",
    datetime: "Sabtu, 27 Desember 2025",
    time: "18.00 WIB",
    description: "Berbagi kebahagiaan penuh canda dan cerita bersama keluarga, kerabat, dan sahabat.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-gray-900">
        <path
          d="M4 12h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
        <path
          d="M6 6h12l-1 12H7z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="18" r="1" fill="currentColor" />
        <circle cx="15" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const eventLocation = {
  title: "Kediaman Keluarga Jikan",
  address: "Dusun Mulyorejo Rt.2 Rw.2 Desa Wringinrejo, Kecamatan Gambiran, Banyuwangi 68486",
  mapHref: "https://www.google.com/maps/place/Jl.+Melati+No.+45,+Banyuwangi",
};

type GuestWish = {
  id: string;
  name: string;
  message: string;
};

const initialWishes: GuestWish[] = [
  {
    id: "wish-1",
    name: "Dewi & Aditya",
    message: "Terima kasih atas doa dan kasih sayang yang senantiasa mengiringi kami.",
  },
  {
    id: "wish-2",
    name: "Rina Setiawan",
    message: "Semoga hari bahagia ini menjadi awal perjalanan keluarga yang penuh berkah.",
  },
  {
    id: "wish-3",
    name: "Arman & Keluarga",
    message:
      "Mohon doa agar rumah tangga kami menjadi keluarga sakinah, mawaddah, warahmah. Semoga setiap langkah kalian selalu diberkahi Allah SWT dan dikaruniai buah hati yang menyejukkan jiwa.",
  },
  {
    id: "wish-4",
    name: "Nadia Pratiwi",
    message: "Semoga seluruh persiapan lancar sampai hari bahagia tiba.",
  },
  {
    id: "wish-5",
    name: "Farhan & Laila",
    message: "Selamat menempuh hidup baru, semoga semakin kompak dalam setiap langkah.",
  },
  {
    id: "wish-6",
    name: "Budi Santoso",
    message: "Turut berbahagia, semoga rumah tangga kalian penuh tawa dan rasa syukur.",
  },
  {
    id: "wish-7",
    name: "Aline Puspita",
    message: "Semoga setiap tantangan diselesaikan dengan cinta dan saling pengertian.",
  },
  {
    id: "wish-8",
    name: "Irfan & Maya",
    message: "Selamat, semoga menjadi keluarga yang saling menguatkan dalam suka dan duka.",
  },
  {
    id: "wish-9",
    name: "Kakak Rani",
    message: "Jaga selalu kepercayaan dan saling mendukung di setiap fase kehidupan.",
  },
  {
    id: "wish-10",
    name: "Rekan Kantor Rizky",
    message: "Kami mendoakan agar pernikahan ini membawa kebahagiaan dan kesuksesan baru.",
  },
  {
    id: "wish-11",
    name: "Fahri Hakim",
    message: "Semoga niat baik ini menjadi jalan untuk melahirkan generasi yang shalih.",
  },
  {
    id: "wish-12",
    name: "Nenek Aminah",
    message: "Doa terbaik selalu menyertai cucuku tercinta, semoga langgeng selamanya.",
  },
  {
    id: "wish-4",
    name: "Nadia Pratiwi",
    message: "Semoga seluruh persiapan lancar sampai hari bahagia tiba.",
  },
  {
    id: "wish-5",
    name: "Farhan & Laila",
    message: "Selamat menempuh hidup baru, semoga semakin kompak dalam setiap langkah.",
  },
  {
    id: "wish-6",
    name: "Budi Santoso",
    message: "Turut berbahagia, semoga rumah tangga kalian penuh tawa dan rasa syukur.",
  },
  {
    id: "wish-7",
    name: "Aline Puspita",
    message: "Semoga setiap tantangan diselesaikan dengan cinta dan saling pengertian.",
  },
  {
    id: "wish-8",
    name: "Irfan & Maya",
    message: "Selamat, semoga menjadi keluarga yang saling menguatkan dalam suka dan duka.",
  },
  {
    id: "wish-9",
    name: "Kakak Rani",
    message: "Jaga selalu kepercayaan dan saling mendukung di setiap fase kehidupan.",
  },
  {
    id: "wish-10",
    name: "Rekan Kantor Rizky",
    message:
      "Kami mendoakan agar pernikahan ini membawa kebahagiaan dan kesuksesan baru. Terima kasih sudah menginspirasi kami lewat kerja keras dan sikap rendah hatimu di kantor. Semoga energi positif itu terus mewarnai kehidupan rumah tanggamu.",
  },
  {
    id: "wish-11",
    name: "Fahri Hakim",
    message: "Semoga niat baik ini menjadi jalan untuk melahirkan generasi yang shalih.",
  },
  {
    id: "wish-12",
    name: "Nenek Aminah",
    message:
      "Doa terbaik selalu menyertai cucuku tercinta, semoga langgeng selamanya. Nenek bangga melihat kalian tumbuh bersama, jangan lupa saling jaga dan saling mengingatkan untuk terus bersyukur.",
  },
  {
    id: "wish-13",
    name: "Tim Kreatif Studio",
    message:
      "Terima kasih sudah mempercayakan dokumentasi pada kami. Melihat kalian berdua melalui lensa kamera membuat kami yakin bahwa cinta bisa sesederhana saling mendengarkan. Semoga perjalanan setelah hari pernikahan ini terus dipenuhi cerita yang layak dikenang selamanya.",
  },
  {
    id: "wish-14",
    name: "Pak Anton",
    message: "Selamat menempuh hidup baru, semoga rezekinya makin luas dan berkah.",
  },
  {
    id: "wish-15",
    name: "Rizky Squad Jogja",
    message:
      "Brother, akhirnya sampai di momen ini juga! Kami semua di Jogja titip rindu dan doa supaya kehidupan barumu penuh petualangan seru, tapi sekarang bersama partner terbaikmu.",
  },
  {
    id: "wish-16",
    name: "Mentor Startup",
    message:
      "Selamat, Rizky dan Entin. Di kelas kita sering bicara soal visi jangka panjang; sekarang kalian punya visi baru sebagai keluarga. Terapkan pola komunikasi terbuka dan refleksi rutin seperti saat membangun produk—itulah kunci ketahanan hubungan.",
  },
  {
    id: "wish-17",
    name: "Sahabat SD Entin",
    message: "Tidak menyangka teman main enggrang dulu kini sebentar lagi jadi istri. Bangga sekali!",
  },
  {
    id: "wish-18",
    name: "Teteh Dini",
    message:
      "Selamat menempuh hidup baru, dek. Jangan lupa bahagia bareng dan tetap jadi tim yang saling menguatkan saat cuaca sedang cerah maupun hujan.",
  },
];

const WISHES_PER_PAGE = 3;
const WISH_CARD_MIN_HEIGHT = 180;

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
  const [wishes, setWishes] = useState<GuestWish[]>(initialWishes);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const totalPages = Math.max(1, Math.ceil(wishes.length / WISHES_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paginatedWishes = useMemo(() => {
    const start = (page - 1) * WISHES_PER_PAGE;
    return wishes.slice(start, start + WISHES_PER_PAGE);
  }, [page, wishes]);
  const displayedWishSlots = Math.max(WISHES_PER_PAGE, paginatedWishes.length || 1);
  const wishListMinHeight = displayedWishSlots * WISH_CARD_MIN_HEIGHT;
  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);
  const shouldCondensePagination = totalPages > 3;
  const visiblePageNumbers = useMemo(() => {
    if (!shouldCondensePagination) {
      return pageNumbers;
    }

    if (page === 1) {
      return [1, 2, 3];
    }

    if (page === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages].filter((value) => value >= 1);
    }

    return [page - 1, page, page + 1];
  }, [shouldCondensePagination, pageNumbers, page, totalPages]);
  const paginatedPageNumbers = shouldCondensePagination ? visiblePageNumbers : pageNumbers;
  const hasLeadingEllipsis = shouldCondensePagination && paginatedPageNumbers[0] > 1;
  const hasTrailingEllipsis =
    shouldCondensePagination && paginatedPageNumbers[paginatedPageNumbers.length - 1] < totalPages;
  const mobilePageNumbers = useMemo(() => {
    if (totalPages <= 3) {
      return pageNumbers.slice(0, totalPages);
    }

    if (page === 1) {
      return [1, 2, 3];
    }

    if (page === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [page - 1, page, page + 1];
  }, [page, pageNumbers, totalPages]);
  const renderPageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      type="button"
      onClick={() => setCurrentPage(pageNumber)}
      className={`h-9 w-9 rounded-full text-[0.7rem] font-semibold transition sm:h-10 sm:w-10 sm:text-xs lg:h-11 lg:w-11 lg:text-sm ${
        pageNumber === page ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
      }`}
      aria-current={pageNumber === page ? "page" : undefined}
    >
      {pageNumber}
    </button>
  );
  const handleWishSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = guestName.trim();
    const trimmedMessage = guestMessage.trim();

    if (!trimmedName || !trimmedMessage) {
      return;
    }

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: trimmedName,
      message: trimmedMessage,
    };

    setWishes((previous) => [newWish, ...previous]);
    setGuestName("");
    setGuestMessage("");
    setCurrentPage(1);
  };
  const isWishFormValid = guestName.trim().length > 0 && guestMessage.trim().length > 0;

  return (
    <InvitationShell
      overlaySubtitle="Wedding Invitation"
      overlayTitle="Rizky & Entin"
      overlayDescription="Kami mengundang Anda untuk menjadi bagian dari perjalanan kami."
      buttonLabel="Buka Undangan"
    >
      <main className="relative">
        <FloatingNav sections={sections} hiddenSectionIds={floatingNavHiddenSectionIds} />

        <RevealSection
          id="undangan"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="relative w-full overflow-hidden rounded-[2.75rem] border border-gray-200 bg-white/85 p-8 shadow-lg backdrop-blur sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 -left-24 h-56 w-56 rounded-full bg-gradient-to-br from-gray-100/80 via-white to-gray-200/60 opacity-80 blur-3xl" />
              <div className="absolute -bottom-40 right-[-8rem] h-80 w-80 rounded-full bg-gradient-to-tr from-gray-200/70 via-white to-gray-100/70 opacity-90 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/15 backdrop-blur-sm" />
            </div>
            <div className="relative mx-auto grid max-w-4xl text-left  lg:items-start">
              
              <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/75 p-6 shadow-inner sm:p-8">
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/0 via-white/40 to-white/0 opacity-80" />
                <div className="relative space-y-4 text-center">
                  <p
                    className="text-3xl font-semibold leading-relaxed text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight"
                    lang="ar"
                    dir="rtl"
                  >
                    {SURAH_VERSE_ARABIC}
                  </p>
                  <p className="text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 lg:text-lg lg:leading-8">
                    {SURAH_VERSE_TRANSLATION}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="mempelai"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="space-y-12 rounded-[2.5rem] border border-gray-200 bg-white/70 p-8 text-center shadow-sm backdrop-blur sm:space-y-16 sm:p-12 lg:space-y-20">
            <div className="space-y-3 lg:space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700 sm:text-sm sm:tracking-[0.32em] lg:text-base lg:tracking-[0.22em]">
                Mempelai
              </h2>
              <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                Perkenalan singkat Entin dan Rizky yang saling melengkapi dalam perjalanan hidup, mimpi, dan doa.
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 lg:gap-12">
              {coupleProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="relative flex h-full max-w-[32rem] flex-col items-center gap-5 rounded-[2rem] border border-gray-200 bg-white/85 p-6 text-center shadow-md backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl before:absolute before:-inset-6 before:-z-10 before:rounded-[2.75rem] before:bg-gradient-to-br before:from-white/60 before:via-gray-100/50 before:to-gray-200/40 before:blur-3xl before:content-[''] sm:p-8 lg:gap-6 lg:p-10"
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
                  <div className="space-y-2 text-center lg:space-y-3 lg:text-left">
                    <p className="text-xs uppercase tracking-[0.24em] text-gray-500 sm:text-sm sm:tracking-[0.2em] lg:text-base lg:tracking-[0.16em]">
                      {profile.role}
                    </p>
                    <p className="text-lg font-semibold uppercase tracking-[0.18em] text-gray-900 sm:text-xl sm:tracking-[0.15em] lg:text-2xl lg:tracking-[0.12em]">
                      {profile.name}
                    </p>
                    <p className="text-sm text-gray-600 sm:text-base lg:text-lg">{profile.parents}</p>
                  </div>
                  <p className="text-sm leading-6 text-gray-500 sm:text-base sm:leading-7 lg:text-lg lg:leading-8 lg:text-left">
                    {profile.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="cerita"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="flex w-full flex-col gap-10 rounded-[2.5rem] border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur sm:p-12 lg:gap-14 lg:p-16">
            <div className="text-center lg:text-left">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700 sm:text-sm sm:tracking-[0.32em] lg:text-base lg:tracking-[0.22em]">
                Cerita Kami
              </h2>
              <p className="mt-3 text-sm text-gray-500 sm:text-base sm:leading-7 lg:mt-4 lg:text-lg lg:leading-8">
                Perjalanan yang dipenuhi kepercayaan, dukungan keluarga, dan doa yang tidak pernah putus.
              </p>
            </div>
            <ol className="relative space-y-10 lg:space-y-14">
              {timeline.map((event, index) => (
                <li key={event.year} className="relative pl-12 lg:pl-16">
                  <div className="absolute left-0 top-2 flex h-full flex-col items-center">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-md sm:h-9 sm:w-9 sm:text-sm"
                      aria-hidden="true"
                    >
                      {event.year.slice(-2)}
                    </span>
                    <span className="sr-only">{event.year}</span>
                    {index < timeline.length - 1 ? (
                      <span className="mt-2 h-full w-px bg-gradient-to-b from-gray-900/10 via-gray-400/20 to-transparent" />
                    ) : null}
                  </div>
                  <div className="rounded-[1.75rem] border border-gray-200 bg-white/75 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-9">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.22em]">
                      {event.year}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-gray-900 sm:text-xl lg:text-2xl">{event.title}</p>
                    <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
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
          className="mx-auto flex min-h-screen max-w-4xl items-center px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="w-full space-y-8 rounded-[2.5rem] border border-gray-200 bg-white/75 p-8 shadow-sm backdrop-blur sm:space-y-10 sm:p-12 lg:space-y-12 lg:p-16">
            <div className="text-center lg:text-left">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700 sm:text-sm sm:tracking-[0.32em] lg:text-base lg:tracking-[0.22em]">
                Akad &amp; Resepsi
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:mt-4 lg:text-lg lg:leading-8">
                Rangkaian acara pernikahan Entin dan Rizky akan berlangsung dalam suasana hangat di lokasi yang sama.
                Berikut jadwal lengkapnya.
              </p>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {scheduleDetails.map((detail) => (
                  <div
                    key={detail.id}
                    className="h-full rounded-[1.75rem] border border-gray-200 bg-white/80 p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900/90 text-white shadow-md">
                        {detail.icon}
                      </span>
                      <div className="flex-1 space-y-2">
                        <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.22em]">
                          {detail.label}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 sm:text-xl lg:text-2xl">{detail.datetime}</p>
                        <p className="text-sm font-medium text-gray-500 sm:text-base">{detail.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-6 rounded-[2rem] border border-gray-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:p-10">
                <div className="space-y-3 text-center lg:text-left">
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.22em]">
                    Lokasi Acara
                  </p>
                  <p className="text-lg font-semibold text-gray-900 sm:text-xl lg:text-2xl">{eventLocation.title}</p>
                  <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                    {eventLocation.address}
                  </p>
                  <Link
                    href={eventLocation.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-gray-700 sm:text-sm sm:tracking-[0.18em]"
                  >
                    Buka di Google Maps
                  </Link>
                </div>
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-100/80 shadow-inner">
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
          <div className="w-full space-y-12 rounded-[2.75rem] border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur sm:space-y-14 sm:p-12 lg:space-y-16 lg:p-16">
            <div className="flex flex-col gap-2 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700 sm:text-sm sm:tracking-[0.32em] lg:text-base lg:tracking-[0.22em]">
                  Galeri
                </h2>
                <p className="text-sm text-gray-500 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                  Kilasan visual yang mendokumentasikan perjalanan kami—dari momen raw di kota hingga detik-detik penuh
                  doa bersama keluarga.
                </p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-gray-200/80 bg-white/75 p-4 shadow-inner sm:p-6">
              <WeddingGallery images={galleryImages} />
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="wishes"
          className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="w-full space-y-10 rounded-[2.5rem] border border-gray-200 bg-white/85 p-8 shadow-sm backdrop-blur sm:p-12 lg:space-y-14 lg:p-14">
            <div className="text-center lg:text-left">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700 sm:text-sm sm:tracking-[0.32em] lg:text-base lg:tracking-[0.22em]">
                Ucapan
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:mt-4 lg:text-lg lg:leading-8">
                Bagikan doa terbaik Anda untuk keberkahan rumah tangga kami.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <form
                onSubmit={handleWishSubmit}
                className="flex flex-col gap-5 rounded-[2rem] border border-gray-200 bg-white/90 p-6 text-left shadow-sm sm:p-8 lg:gap-6 lg:p-10"
              >
                <div className="space-y-3 text-center sm:text-left lg:space-y-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.22em] lg:text-base lg:tracking-[0.16em]">
                    Sampaikan Ucapan
                  </p>
                  <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                    Tuliskan nama dan pesan terbaik Anda. Ucapan akan tampil setelah berhasil dikirim.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="guest-name"
                      className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-sm sm:tracking-[0.24em]"
                    >
                      Nama
                    </label>
                    <input
                      id="guest-name"
                      name="name"
                      type="text"
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      placeholder="Nama lengkap Anda"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="guest-message"
                      className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-sm sm:tracking-[0.24em]"
                    >
                      Ucapan
                    </label>
                    <textarea
                      id="guest-message"
                      name="message"
                      value={guestMessage}
                      onChange={(event) => setGuestMessage(event.target.value)}
                      placeholder="Tuliskan ucapan dan doa terbaik Anda untuk pasangan"
                      rows={4}
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 sm:text-base"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!isWishFormValid}
                  className="inline-flex w-full items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto sm:px-8 sm:text-sm sm:tracking-[0.2em] lg:px-10 lg:py-3.5 lg:text-base lg:tracking-[0.14em]"
                >
                  Kirim Ucapan
                </button>
              </form>
              <div className="flex h-full flex-col gap-6 rounded-[2rem] border border-gray-200 bg-white/90 p-6 text-left shadow-sm sm:p-8 lg:gap-8 lg:p-10">
                <div className="space-y-3 text-center sm:text-left lg:space-y-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.22em] lg:text-base lg:tracking-[0.16em]">
                    Ucapan Tamu
                  </p>
                  <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                    Terima kasih atas setiap doa dan dukungan yang telah Anda titipkan untuk perjalanan kami.
                  </p>
                </div>
                <div
                  className="flex flex-1 flex-col gap-5 lg:gap-6"
                  style={{ minHeight: wishListMinHeight }}
                >
                  {paginatedWishes.length > 0 ? (
                    paginatedWishes.map((wish) => (
                      <div
                        key={wish.id}
                        className="space-y-3 rounded-2xl border border-gray-200 bg-white/95 p-5 shadow-sm"
                        style={{ minHeight: WISH_CARD_MIN_HEIGHT }}
                      >
                        <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                          {wish.message}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.22em] lg:text-base lg:tracking-[0.16em]">
                          {wish.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p
                      className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-5 text-sm font-medium uppercase tracking-[0.32em] text-gray-400 sm:text-base sm:tracking-[0.26em] lg:text-lg lg:tracking-[0.18em]"
                      style={{ minHeight: WISH_CARD_MIN_HEIGHT }}
                    >
                      Ucapan akan tampil di sini setelah tersimpan.
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 rounded-3xl border border-gray-200 bg-white/95 p-4 text-[0.65rem] uppercase tracking-[0.18em] text-gray-600 sm:gap-4 sm:text-xs sm:tracking-[0.25em]">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="inline-flex flex-shrink-0 items-center justify-center rounded-full px-3 py-2 font-semibold transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span aria-hidden="true" className="text-lg">⟵</span>
                    <span className="sr-only">Halaman sebelumnya</span>
                  </button>
                  <div className="flex min-w-0 flex-1 items-center justify-center">
                    <div className="flex items-center gap-2 sm:hidden">
                      {mobilePageNumbers.map((pageNumber) => renderPageButton(pageNumber))}
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      {hasLeadingEllipsis ? <span className="px-2 text-gray-400">&hellip;</span> : null}
                      {paginatedPageNumbers.map((pageNumber) => renderPageButton(pageNumber))}
                      {hasTrailingEllipsis ? <span className="px-2 text-gray-400">&hellip;</span> : null}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="inline-flex flex-shrink-0 items-center justify-center rounded-full px-3 py-2 font-semibold transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="sr-only">Halaman selanjutnya</span>
                    <span aria-hidden="true" className="text-lg">⟶</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
        <RevealSection
          id="hadiah"
          className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="w-full space-y-10 rounded-[2.5rem] border border-gray-200 bg-white/85 p-8 shadow-sm backdrop-blur sm:p-12 lg:space-y-14 lg:p-14">
            <div className="text-center lg:text-left">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-700 sm:text-sm sm:tracking-[0.32em] lg:text-base lg:tracking-[0.22em]">
                Hadiah
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:mt-4 lg:text-lg lg:leading-8">
                Kehadiran dan doa Anda sudah sangat berarti. Bagi yang ingin berbagi tanda kasih, berikut informasi yang dapat digunakan.
              </p>
            </div>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-gray-200 bg-white/90 p-6 text-center shadow-sm sm:p-8 lg:gap-8 lg:p-10">
              <div className="space-y-3 lg:space-y-4">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.22em] lg:text-base lg:tracking-[0.16em]">
                  Hadiah Pernikahan
                </p>
                <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                  Gunakan salah satu opsi berikut untuk menyampaikan dukungan Anda.
                </p>
              </div>
              <div className="space-y-4 text-left text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:space-y-5 lg:text-lg lg:leading-8">
                <div className="rounded-xl border border-dashed border-gray-300 bg-white/95 p-4 lg:p-5">
                  <p className="text-xs uppercase tracking-[0.26em] text-gray-500 sm:text-sm sm:tracking-[0.2em] lg:text-base lg:tracking-[0.14em]">
                    Bank BCA
                  </p>
                  <p className="mt-1 font-medium text-gray-900 sm:text-lg lg:text-xl">1234567890</p>
                  <p className="text-xs text-gray-500 sm:text-sm lg:text-base">a.n. Entin Endah Cahyati</p>
                </div>
                <div className="rounded-xl border border-dashed border-gray-300 bg-white/95 p-4 lg:p-5">
                  <p className="text-xs uppercase tracking-[0.26em] text-gray-500 sm:text-sm sm:tracking-[0.2em] lg:text-base lg:tracking-[0.14em]">
                    QRIS / E-Wallet
                  </p>
                  <p className="mt-1 text-gray-600 sm:text-base lg:text-lg">
                    Scan melalui tautan berikut untuk dukungan digital envelope.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gray-700 sm:px-9 sm:text-sm sm:tracking-[0.16em] lg:px-11 lg:py-3.5 lg:text-base lg:tracking-[0.12em]"
                >
                  Konfirmasi Transfer
                </Link>
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 transition hover:border-gray-900 sm:px-9 sm:text-sm sm:tracking-[0.16em] lg:px-11 lg:py-3.5 lg:text-base lg:tracking-[0.12em]"
                >
                  Lihat QR Digital
                </button>
              </div>
            </div>
          </div>
        </RevealSection>
        <RevealSection
          id="terima-kasih"
          className="mx-auto flex min-h-screen max-w-4xl items-center px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/85 p-8 text-center shadow-sm backdrop-blur sm:p-12 lg:p-16">
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center text-gray-900 sm:gap-8">
              <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
              </p>
              <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                Atas doa dan restunya kami ucapkan terima kasih.
              </p>
              <div className="pt-4 text-center text-base font-semibold uppercase tracking-[0.28em] text-gray-900 sm:text-lg sm:tracking-[0.22em]">
                Rizky &amp; Entin
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
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 transition hover:border-gray-900 hover:text-gray-900 sm:text-sm sm:tracking-[0.18em] lg:h-10 lg:w-10 lg:text-base lg:tracking-[0.14em]"
              aria-label="Tutup QR digital"
            >
              X
            </button>
            <p
              id="qr-modal-title"
              className="text-xs uppercase tracking-[0.3em] text-gray-500 sm:text-sm sm:tracking-[0.26em] lg:text-base lg:tracking-[0.18em]"
            >
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
            <p className="mt-5 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              Scan kode QRIS ini untuk berbagi hadiah secara digital. Terima kasih atas perhatian Anda.
            </p>
          </div>
        </div>
      ) : null}
    </InvitationShell>
  );
}



