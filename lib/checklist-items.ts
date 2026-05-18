export type ChecklistItem = {
  number: number;
  title: string;
  description: string;
  iconName: string; // a Lucide icon name (e.g. "Plane", "Stamp")
  // Affiliate link — rendered with rel="sponsored".
  cta?: { label: string; url: string };
  // Generic helpful link — same style, no sponsored rel.
  resource?: { label: string; url: string };
  // University-personalized link — URL resolved at render time from UNIVERSITY_LINKS.
  universityResource?: {
    link: "campusMap" | "studentPortal" | "homepage";
    label: string;
  };
};

export type ChecklistPhase = {
  number: number;
  name: string;
  items: ChecklistItem[];
};

const TRIP_AFFILIATE_URL = "https://www.trip.com/t/9ReTzIpxkU2";
const KLOOK_AFFILIATE_URL =
  "https://affiliate.klook.com/redirect?aid=121704&aff_adid=1279987&k_site=https%3A%2F%2Fwww.klook.com%2F";

export const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    number: 1,
    name: "Pre-Arrival",
    items: [
      {
        number: 1,
        title: "Apply for D-2 visa",
        iconName: "Stamp",
        description:
          "Apply at the Korean consulate. Allow 4-6 weeks processing.",
        resource: {
          label: "Korean visa portal",
          url: "https://www.visa.go.kr/openPage.do?MENU_ID=10101",
        },
      },
      {
        number: 2,
        title: "Get your CoA",
        iconName: "FileText",
        description:
          "Get your Certificate of Admission from your university. Save digital + printed copies.",
      },
      {
        number: 3,
        title: "Book your flight",
        iconName: "Plane",
        description:
          "Book a one-way flight to Incheon (ICN). Round-trip not required for D-2.",
        cta: { label: "Search flights on Trip.com", url: TRIP_AFFILIATE_URL },
      },
      {
        number: 4,
        title: "Book temp accommodation",
        iconName: "Hotel",
        description:
          "Book 2-4 weeks. Don't sign long-term before seeing the place.",
        cta: { label: "Search hotels on Trip.com", url: TRIP_AFFILIATE_URL },
      },
      {
        number: 5,
        title: "Browse long-term housing",
        iconName: "Search",
        description:
          "Bookmark options on Enkostay, 33m2, Korean Facebook expat groups, Airbnb monthly.",
        resource: { label: "Browse Enkostay", url: "https://enkostay.com/" },
      },
      {
        number: 6,
        title: "Research your neighborhood",
        iconName: "MapPin",
        description: "Pick somewhere within 30 min of campus by subway/bus.",
        universityResource: { link: "campusMap", label: "View on Naver Map" },
      },
      {
        number: 7,
        title: "Save the ARC checklist",
        iconName: "ListChecks",
        description: "You'll apply for ARC within 90 days of arrival.",
        resource: {
          label: "HiKorea ARC info",
          url: "https://www.hikorea.go.kr/info/InfoDetailR_en.pt?CAT_SEQ=341&PARENT_ID=1",
        },
      },
      {
        number: 8,
        title: "Set up Wise",
        iconName: "Banknote",
        description:
          "For sending money to Korea before opening a Korean account.",
      },
      {
        number: 9,
        title: "Sort your phone plan",
        iconName: "Smartphone",
        description:
          "Activate international roaming, OR buy a temp SIM via Klook to pick up at Incheon.",
        cta: { label: "Get a Klook eSIM", url: KLOOK_AFFILIATE_URL },
      },
    ],
  },
  {
    number: 2,
    name: "First Week in Korea",
    items: [
      {
        number: 10,
        title: "Get a Korean SIM",
        iconName: "Smartphone",
        description: "Prepaid plan is fine until your ARC arrives.",
      },
      {
        number: 11,
        title: "Open a bank account",
        iconName: "Landmark",
        description:
          "KB Kookmin, Woori, or Shinhan are most foreigner-friendly. Bring passport, CoA, Korean phone number.",
      },
      {
        number: 12,
        title: "Visit housing in person",
        iconName: "Home",
        description: "Never sign a lease without seeing the place yourself.",
      },
      {
        number: 13,
        title: "Visit your campus",
        iconName: "GraduationCap",
        description: "Pick up your student ID + housing keys if applicable.",
        universityResource: { link: "homepage", label: "University website" },
      },
      {
        number: 14,
        title: "Register on student portal",
        iconName: "UserCog",
        description: "Your university's international student portal.",
        universityResource: {
          link: "studentPortal",
          label: "Open student portal",
        },
      },
      {
        number: 15,
        title: "Get a T-money card",
        iconName: "CreditCard",
        description: "Any subway station, CU, or GS25.",
      },
      {
        number: 16,
        title: "Start ARC application",
        iconName: "Building2",
        description:
          "Visit local immigration office. Within 90 days, but earlier = better.",
        resource: {
          label: "Find your immigration office",
          url: "https://www.hikorea.go.kr/info/InfoLocationR_en.pt",
        },
      },
      {
        number: 17,
        title: "Set up KakaoTalk",
        iconName: "MessageCircle",
        description: "Join any university group chats.",
      },
    ],
  },
  {
    number: 3,
    name: "First Month",
    items: [
      {
        number: 18,
        title: "Sign your long-term lease",
        iconName: "FileSignature",
        description:
          "Verify deposit, monthly rent, and contract length in writing.",
      },
      {
        number: 19,
        title: "Pick up your ARC",
        iconName: "IdCard",
        description: "Usually 2-4 weeks after application.",
      },
      {
        number: 20,
        title: "Link ARC to your bank",
        iconName: "Link2",
        description: "For higher transfer limits and salary deposits.",
      },
      {
        number: 21,
        title: "Download essential apps",
        iconName: "Smartphone",
        description: "Naver Maps + KakaoMap, Coupang, Baemin, Papago.",
      },
      {
        number: 22,
        title: "Find a local clinic",
        iconName: "Stethoscope",
        description: "Note their hours before you actually get sick.",
      },
      {
        number: 23,
        title: "Apply for work permit",
        iconName: "BriefcaseBusiness",
        description:
          "After 6+ months in Korea + TOPIK 3 (or English-track program). Apply at HiKorea or immigration.",
        resource: {
          label: "HiKorea part-time work permit",
          url: "https://www.hikorea.go.kr/info/InfoDetailR_en.pt?CAT_SEQ=343&PARENT_ID=1",
        },
      },
      {
        number: 24,
        title: "Find part-time work",
        iconName: "Briefcase",
        description:
          "Use Albamon or Karrot. Avoid food delivery, factory, construction — banned for D-2.",
      },
      {
        number: 25,
        title: "Set up auto-payments",
        iconName: "Repeat",
        description: "Rent + utilities through your Korean bank.",
      },
    ],
  },
  {
    number: 4,
    name: "Settling In",
    items: [
      {
        number: 26,
        title: "Find your routine",
        iconName: "Coffee",
        description: "Go-to grocery store, coffee spot, gym, laundry.",
      },
      {
        number: 27,
        title: "Join a community",
        iconName: "Users",
        description:
          "Student club, hobby Meetup, or language exchange. Avoid the 3-month loneliness wall.",
      },
      {
        number: 28,
        title: "Plan a weekend trip",
        iconName: "Train",
        description:
          "Busan, Jeonju, or Gangneung are easy KTX trips in your first 2 months.",
        cta: { label: "Find trains on Trip.com", url: TRIP_AFFILIATE_URL },
      },
      {
        number: 29,
        title: "Renew your visa",
        iconName: "RotateCw",
        description:
          "Apply at least 2 months before your current visa expires.",
        resource: {
          label: "HiKorea visa extension",
          url: "https://www.hikorea.go.kr/info/InfoDetailR_en.pt?CAT_SEQ=346&PARENT_ID=1",
        },
      },
      {
        number: 30,
        title: "Build a savings habit",
        iconName: "PiggyBank",
        description: "Even ₩50,000/week into a separate account adds up.",
      },
    ],
  },
];
