export const hackZeroEvent = {
  slug: "hackzero",
  title: "HackZero'26 CTF",
  date: "2026-03-28",
  description:
    "A flagship two-day cybersecurity experience by OWASP VIT Bhopal, featuring expert speaker sessions and a 24-hour national online CTF.",
  link: "https://unstop.com/hackathons/hackzero26-ctf-vit-bhopal-university-vit-bhopal-1659473",
  imgUrl: "/events/HackZero/Header-Large.png",
  headerSmallImg: "/events/HackZero/Header-Small.png",
  headerLargeImg: "/events/HackZero/Header-Large.png",
  time: "28 Mar 2026, 02:00 PM IST - 29 Mar 2026, 11:59 PM IST",
  venue: "Online",
  mode: "Online",
  status: "Upcoming",
  organizer: "OWASP VIT Bhopal Chapter",
  host: "VIT Bhopal University",
  teamSize: "1 - 4 Members",
  registrationDeadline: "28 Mar 2026, 11:45 PM IST",
  prizePool: "Vouchers and goodies worth INR 1.5 Lakhs",
  tracks: [
    "Quizzes & Treasure Hunt",
    "Security Engineering",
    "Cloud Security",
    "Network Security",
  ],
  eligibility: [
    "Engineering Students",
    "Postgraduate",
    "Undergraduate",
    "School Students",
    "Management",
    "Medical",
    "Law",
    "Arts, Commerce, Sciences & Others",
  ],
  timeline: [
    {
      title: "Day 1 - Speaker Sessions",
      start: "28 Mar 2026, 02:00 PM IST",
      end: "28 Mar 2026, 05:00 PM IST",
      description:
        "Online expert sessions on Cybersecurity, Threat Intelligence, and Investigation.",
    },
    {
      title: "Day 2 - Capture The Flag (CTF)",
      start: "29 Mar 2026, 12:00 AM IST",
      end: "29 Mar 2026, 11:59 PM IST",
      description:
        "24-hour online national CTF where teams solve real-world technical security challenges.",
    },
  ],
  challengeDomains: [
    "Web Exploitation",
    "Cryptography",
    "Reverse Engineering",
    "Digital Forensics",
    "Binary Exploitation (Pwn)",
    "OSINT",
    "Steganography",
    "Boot2Root",
    "Cloud Security",
    "IoT & Hardware Security",
    "AI/ML Security",
  ],
  rewards: [
    {
      title: "1st",
      prize:
        "CRTP Voucher (Altered Security), APISEC vouchers (CASA + ACP + ACP+), 12-month HackerDNA Pro, EVP voucher (Vibe Security), Defhawk PRO (3 months) + Applied Ethical Hacking certification exam.",
    },
    {
      title: "2nd",
      prize:
        "APISEC vouchers (CASA + ACP + ACP+), EVP voucher, Defhawk PRO (2 months) + 1 month academy access, 1 month VIP membership (Hackviser).",
    },
    {
      title: "3rd",
      prize:
        "APISEC vouchers (CASA + ACP + ACP+), EVP voucher, Defhawk PRO (1 month).",
    },
    {
      title: "4th",
      prize:
        "1 month VIP membership (Hackviser), APISEC vouchers (CASA + ACP).",
    },
    {
      title: "5th",
      prize: "Defhawk goodies pack, APISEC vouchers (CASA + ACP).",
    },
    {
      title: "Best overall writeup",
      prize: "APISEC certification voucher (ACP+).",
    },
    {
      title: "Best Female Hacker",
      prize: "1 month VIP membership (Hackviser).",
    },
    {
      title: "Participation Certificate",
      prize: "Certificates for participants.",
    },
  ],
  about: [
    "HackZero'26 is a flagship two-day cybersecurity experience by OWASP VIT Bhopal Chapter.",
    "From learning directly from industry experts to battling in an intense 24-hour CTF challenge, HackZero is designed to test skills, creativity, and hacker mindset.",
    "Whether you are a beginner exploring ethical hacking or an experienced security enthusiast, HackZero'26 is open for all.",
  ],
  sponsors: {
    core: [
      {
        name: "Altered Security",
        href: "https://www.alteredsecurity.com/",
        logo: "/events/HackZero/sponsors/as.png",
      },
      {
        name: "APISEC University",
        href: "https://www.apisecuniversity.com/",
        logo: "/events/HackZero/sponsors/apisec.png",
      },
      {
        name: "Defhawk",
        href: "https://defhawk.com/",
        logo: "/events/HackZero/sponsors/defhawk.png",
      },
      {
        name: "HackerDNA",
        href: "http://hackerdna.com/",
        logo: "/events/HackZero/sponsors/hackerdna.png",
      },
      {
        name: "Hackviser",
        href: "https://hackviser.com/",
        logo: "/events/HackZero/sponsors/hackviser.png",
      },
      {
        name: "Vibe Security",
        href: "https://vibsecurity.com/",
        logo: "/events/HackZero/sponsors/vs.png",
      },
    ],
    community: [
      {
        name: "Bsides Indore",
        href: "https://bsidesindore.in",
        logo: "/events/HackZero/sponsors/bsides.png",
      },
      {
        name: "HackwithIndia",
        href: "https://hackwithindia.com/",
        logo: "/events/HackZero/sponsors/hackwithindiaa.png",
      },
      {
        name: "Unstop",
        href: "https://unstop.com/",
        logo: "/events/HackZero/sponsors/unstop.png",
      },
    ],
    platform: [
      {
        name: "CTFd",
        href: "http://ctfd.io/",
        logo: "/events/HackZero/sponsors/ctfd.png",
      },
    ],
  },
  contacts: {
    email: "owaspclub@vitbhopal.ac.in",
    studentCoordinators: [
      { name: "Ishaani Prashant", phone: "9967351936" },
      { name: "Somnath Das", phone: "9630431792" },
      { name: "Ankit Singh", phone: "7003465469" },
      { name: "Siya Desai", phone: "9552218218" },
    ],
    facultyCoordinator: "Dr. D. Saravanan",
  },
};

type EventSponsor = {
  name: string;
  href: string;
  logo: string;
};

type EventTimelineItem = {
  title: string;
  start: string;
  end: string;
  description: string;
};

type EventReward = {
  title: string;
  prize: string;
};

type EventContacts = {
  email: string;
  studentCoordinators: Array<{
    name: string;
    phone: string;
  }>;
  facultyCoordinator: string;
};

export type PastSpeaker = {
  name: string;
  role: string;
  topic: string;
  eventName: string;
  image: string;
  href?: string;
  socialLink?: string;
};

type EventEntry = {
  slug?: string;
  title: string;
  date: string;
  description: string;
  link?: string;
  imgUrl: string;
  headerSmallImg?: string;
  headerLargeImg?: string;
  time?: string;
  venue?: string;
  mode?: string;
  status?: string;
  organizer?: string;
  host?: string;
  teamSize?: string;
  registrationDeadline?: string;
  prizePool?: string;
  tracks?: string[];
  eligibility?: string[];
  timeline?: EventTimelineItem[];
  challengeDomains?: string[];
  rewards?: EventReward[];
  about?: string[];
  sponsors?: {
    core: EventSponsor[];
    community: EventSponsor[];
    platform: EventSponsor[];
  };
  contacts?: EventContacts;
  gallery?: string[];
};

const upCommingEvents: EventEntry[] = [];

export const pastSpeakers: PastSpeaker[] = [
  {
    name: "Sourajeet Majumder",
    role: "Security Engineer at CloudSEK",
    topic: "Unmasking Cybercriminals: An Intelligence-Led Approach",
    eventName: "HackZero'26 CTF",
    image: "/events/HackZero/speakers/sourajeet.png",
    socialLink: "https://in.linkedin.com/in/sourajeet-majumder-aa097b191",
  },
  {
    name: "Prathmesh Dharkar",
    role: "Security expert and Chapter Leader at BSides Indore",
    topic: "Social Engineering: Hacking the Human Mind",
    eventName: "HackZero'26 CTF",
    image: "/events/HackZero/speakers/prathmesh.png",
    socialLink: "https://in.linkedin.com/in/prathmeshdharkar",
  },
  {
    name: "Nitin Pandey",
    role: "Cybercell, Ex-CyberPeace Foundation\nTEDx Speaker",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/nitin.png",
    socialLink: "https://in.linkedin.com/in/cybernitin",
  },
  {
    name: "Sh. Parvez Aslam Ansari",
    role: "Director\n@Central Academy Of Police Training",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/parvez.png",
    socialLink: "https://in.linkedin.com/in/parvez-ansari-369563293",
  },
  {
    name: "Vandana Verma",
    role: "OWASP Global Board\nSecurity @Snyk",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/vanadana.png",
    socialLink: "https://in.linkedin.com/in/vandana-verma",
  },
  {
    name: "Dr. Shishir K Shandilya",
    role: "Chevening Fellow, Senior Professor\n@Devi Ahilya Vishwavidyalaya",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/shishir.png",
    socialLink: "https://in.linkedin.com/in/sks1809",
  },
  {
    name: "Nikhil Mahadeshwar",
    role: "Founder\n@Cyber Secured India",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/nikhil.png",
    socialLink: "https://in.linkedin.com/in/nikhilmahadeshwar",
  },
  {
    name: "Rashmirathi Tiwari",
    role: "Founder and CEO\n@Gyrix TechnoLabs",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/rashmirathi.png",
    socialLink: "https://in.linkedin.com/in/rashmirathitiwari",
  },
  {
    name: "Raja Nagori",
    role: "Product Security Engineer\n@Splunk",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/raja.png",
    socialLink: "https://in.linkedin.com/in/raja-nagori",
  },
  {
    name: "Rishabh Gupta",
    role: "Senior Consultant - Cybersecurity\n@Optiv",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/rishabh.png",
    socialLink: "https://in.linkedin.com/in/simplyrishabh",
  },
  {
    name: "Aditya Rai",
    role: "Content Engineer\n@Security Blue Team",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/aditya.png",
    socialLink: "https://in.linkedin.com/in/aditya-rai-infosec",
  },
  {
    name: "Fardeen A",
    role: "Senior Software Engineer\n@Bank of America",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/fardeen.png",
    socialLink: "https://www.linkedin.com/in/insecrez/",
  },
  {
    name: "Urvesh Thakkar",
    role: "Security\n@Arctic Wolf",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/utrvesh.png",
    socialLink: "https://in.linkedin.com/in/urvesh-thakkar",
  },
  {
    name: "Ms. Aksha Chudasama",
    role: "Independent Security\nResearcher",
    topic: "",
    eventName: "Past Speaker",
    image: "/speakers/aksha.png",
    socialLink: "https://in.linkedin.com/in/akshachudasama23",
  },
];

const pastEvents: EventEntry[] = [
  hackZeroEvent,
  {
    title: "Cyber Carnival 2026",
    date: "2026-02-27",
    description:
      "Cyber Carnival 2026 was a landmark cybersecurity event jointly organized by 5 cybersecurity clubs, bringing together students and enthusiasts for an action-packed day. The highlight was an exciting offline CTF (Capture The Flag) competition that tested real-world hacking skills, alongside a series of interactive games and challenges designed to make security concepts fun and engaging.",
    link: "https://www.instagram.com/owaspvitbhopal/",
    imgUrl: "/events/cyberCarnival.jpeg",
    gallery: [
      "/events/cyberCarnival1.jpeg",
      "/events/cyberCarnival2.jpeg",
      "/events/cyberCarnival3.jpeg",
    ],
    time: "10:00 AM - 5:00 PM",
  },
  {
    title: "CyberConclave 2024",
    date: "2024-02-29 & 2024-03-01",
    description:
      "CyberConclave 2024 was VIT Bhopal's premier cybersecurity conference, featuring a full day of insightful talks and hands-on workshops from industry experts.",
    link: "https://www.instagram.com/cyberconclave.vitb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    imgUrl: "/events/cyberconclave.JPG",
    gallery: [
      "/events/cyberconclave.JPG",
      "/events/cyberconclave.JPG",
      "/events/cyberconclave.JPG",
      "/events/cyberconclave.JPG",
    ],
    time: "10:00 AM - 4:00 PM",
  },
  {
    title: "Shell n’ Zen 2025",
    date: "2025-02-20",
    description:
      "Our Shell n' Zen event engaged aspiring security enthusiasts with a packed workshop and a massive online CTF that challenged hundreds of participants to dominate the leaderboard.",
    link: "https://www.instagram.com/p/DGd3jopT3u_/",
    imgUrl: "/events/shellnzen1.jpeg",
    gallery: [
      "/events/shellnzen1.jpeg",
      "/events/shellnzen2.jpeg",
      "/events/shellnzen3.jpeg",
    ],
    time: "11:00 AM - 1:30 PM",
  },
  {
    title: "BugTrek",
    date: "2024-11-26",
    description:
      "BUGTREK featured an exclusive session with renowned Bug Bounty Hunter, Ms. Aksha Chudasama, who shared her insights on security research before a thrilling CTF competition.",
    link: "https://www.instagram.com/p/DCi8Iw4vdNQ/",
    imgUrl: "/events/bugtrek.JPG",
    gallery: [
      "/events/bugtrek.JPG",
      "/events/bugtrek.JPG",
      "/events/bugtrek.JPG",
    ],
    time: "11:00 AM - 4:00 PM",
  },
  {
    title: "101 with ML and revisiting Cyber Security",
    date: "2024-04-28",
    description:
      "101 with Machine Learning & Revisiting Cyber Security” session presented by OWASP Bhopal Chapter & VIT-OWASP in Collaboration with TensorFlow Users Group Bhopal",
    link: "https://www.instagram.com/p/C6JGYRKvtKw/?img_index=1",
    imgUrl: "/events/101.JPG",
    gallery: ["/events/101.JPG", "/events/101.JPG"],
    time: "11:00 AM - 4:30 PM",
  },
  {
    title: "Cyber Scavenger Hunt CTF",
    date: "2024-02-23",
    description:
      "OWASP Club onsite CTF event on the occassion of Advitya 2024.",
    link: "https://www.instagram.com/p/C3Ry3fMvg8S/",
    imgUrl: "/events/scavenger.JPG",
    time: "3:00 PM - 5:30 PM",
  },
  {
    title: "Decode-ए-Cyber",
    date: "2023-11-04 - 2023-11-05",
    description:
      "A special two-day event hosted by OWASP VITB Club in collaboration with Null VIT Bhopal Student Chapter on November 4th and 5th.",
    link: "https://www.instagram.com/p/C0_Mz4loJme/",
    imgUrl: "/events/decode.JPG",
    time: "11:00 AM - 1:30 PM",
  },
  {
    title: "Cy-VITya",
    date: "2023-02-10",
    description:
      "Cyber Security Event held as part of AdVITya, the annual fest of VIT Bhopal",
    link: "https://www.youtube.com/watch?v=VCn4hJBoNtU",
    imgUrl: "/events/cyvitya.JPG",
    time: "10:00 AM - 1:00 PM",
  },
  {
    title: "Inaugural Ceremony",
    date: "2022-10-01",
    description:
      "Official Inauguration Program of OWASP VIT Bhopal University - Student Chapter",
    link: "https://www.youtube.com/watch?v=u4OXOqkjIQg",
    imgUrl: "/events/inaugral.JPG",
    time: "3:00 PM - 4:00 PM",
  },
];

export { pastEvents, upCommingEvents };
