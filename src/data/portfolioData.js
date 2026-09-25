export const portfolioData = {
  personal: {
    name: "Eisenpol Manalo",
    firstName: "Eisenpol",
    lastName: "Manalo",
    title: "IT Specialist | UI / UX Designer",
    status: "Available for UI/UX & IT Opportunities",
    bio: "Bridging technical support and user-centered design. An IT graduate skilled in hardware setup, system troubleshooting, and crafting clean, visually engaging digital interfaces.",
    aboutHeadline: "A fresh graduate with a passion for crafting meaningful digital experiences",
    aboutStory: "Hi, I'm Eisenpol Manalo — Information Technology graduate from Rizal Technological University with hands-on skills in PC hardware, system configuration, software installation, troubleshooting, and basic networking. Experienced in assisting others with technical concerns, with additional knowledge in UI/UX design, digital tools, and gaming technology. Seeking an entry-level role to apply my technical and problem-solving skills.",
    stats: [
      { number: "5", label: "Projects Completed" },
      { number: "Fresh", label: "Graduate" },
      { number: "∞", label: "Passion & Drive" }
    ],
    contact: {
      email: "Eisenpol27@gmail.com",
      location: "Marikina City, Philippines",
      phone: "+63 976 309 3148",
      linkedin: "https://www.linkedin.com/in/eisenpol-manalo-857802248"
    }
  },
  skills: [
    {
      category: "Hardware",
      icon: "ph-desktop-tower",
      items: ["Computer Assembly & Disassembly", "Troubleshooting", "Maintenance"]
    },
    {
      category: "Software",
      icon: "ph-app-window",
      items: ["Windows", "Software Installation & Configuration", "System Troubleshooting"]
    },
    {
      category: "Networking",
      icon: "ph-wifi-high",
      items: ["Basic LAN/Wi-Fi Troubleshooting", "Network Configuration"]
    },
    {
      category: "Database",
      icon: "ph-database",
      items: ["Basic CRUD", "Data Validation", "Database Maintenance"]
    },
    {
      category: "UI/UX Design",
      icon: "ph-pen-nib",
      isFeatured: true,
      items: ["Wireframing", "Prototyping", "Figma"]
    },
    {
      category: "Soft Skills",
      icon: "ph-handshake",
      isPaired: true,
      items: ["Problem Solving", "Communication", "Attention to Detail", "Adaptability", "Patience", "Teamwork"]
    }
  ],
  experience: [
    {
      company: "Cycore Technology Solutions Co. Inc",
      role: "Internship",
      date: "2025",
      points: [
        "Assisted with database maintenance, data validation, and record correction.",
        "Performed basic CRUD (Create, Read, Update, Delete) operations on database records.",
        "Gained hands-on experience with Blazor and Bootstrap in developing responsive web applications.",
        "Collaborated with fellow interns on an HRIS (Human Resource Information System) project."
      ],
      tags: ["Blazor", "Bootstrap", "Database", "HRIS", "CRUD"]
    }
  ],
  certifications: [
    {
      id: "google-ux",
      title: "Foundations of User Experience (UX) Design",
      issuer: "Google",
      issuerIcon: "ph-google-logo",
      date: "Aug 2026",
      credentialId: "41YMB1TAMDI8",
      image: "/Certification/Foundations of User Experience (UX) Design.jpg"
    },
    {
      id: "figma",
      title: "Introduction to Figma",
      issuer: "Simplilearn",
      issuerIcon: "ph-graduation-cap",
      date: "Jul 2026",
      credentialId: "10518620",
      image: "/Certification/Introduction to Figma.jpg"
    }
  ],
  projects: [
    {
      id: "nesta",
      category: "mobile",
      badgeText: "Mobile App • In Progress",
      title: "NESTA",
      desc: "A smart home control app designed to make managing connected devices simple, convenient, and accessible from anywhere — monitor and adjust smart lights, speakers, and more remotely.",
      tags: ["Smart Home", "Mobile", "IoT", "UI Design"],
      isInProgress: true,
      images: [
        "/NESTA - Smart Home App/Frame 1.png",
        "/NESTA - Smart Home App/Frame 2.png"
      ]
    },
    {
      id: "uv-express",
      category: "mobile",
      badgeText: "Mobile App",
      title: "UV Express Booker",
      desc: "A ride-booking mobile app for UV Express commuters, providing convenient route selection, seat reservation, and real-time trip updates.",
      tags: ["Transport", "Mobile", "Booking"],
      images: [
        "/UV Express Booker/01.jpg",
        "/UV Express Booker/2.jpg"
      ]
    },
    {
      id: "tracky",
      category: "mobile",
      badgeText: "Mobile App",
      title: "Tracky",
      desc: "A food and beverages inventory management system with expiration tracking, ensuring freshness and reducing waste through smart alerts.",
      tags: ["Inventory", "Mobile", "Tracking"],
      images: [
        "/Tracky - Inventory Management System for Food and Beverages with Expiration Tracking/Mockup Page.jpg",
        "/Tracky - Inventory Management System for Food and Beverages with Expiration Tracking/Other Pages.jpg"
      ]
    },
    {
      id: "sari-sari",
      category: "mobile",
      badgeText: "Mobile App",
      title: "Sari-Sari",
      desc: "An e-commerce mobile application with a minimalist design approach, making everyday shopping simple and delightful.",
      tags: ["E-Commerce", "Mobile", "Minimalist"],
      images: [
        "/Sari - Sari - E-Commerce app with a minimalist design/1st Page.jpg",
        "/Sari - Sari - E-Commerce app with a minimalist design/2nd Page.jpg"
      ]
    },
    {
      id: "tracktory",
      category: "web",
      isFeatured: true,
      isReverse: true,
      badgeText: "Web Design • System Dashboard",
      title: "TrackTory",
      desc: "An inventory management system designed for Almendarez Trading, featuring streamlined stock tracking, reporting, and business-ready dashboards for enterprise efficiency.",
      tags: ["Dashboard", "Web", "Inventory System", "Data Analytics"],
      images: [
        "/TrackTory - Inventory Management System for Almendarez Trading/Mock Up page.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 1.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 2.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 3.jpg",
        "/TrackTory - Inventory Management System for Almendarez Trading/Other Pages - 4.jpg"
      ]
    },
    {
      id: "build-it",
      category: "web",
      isFeatured: true,
      badgeText: "Web Design • Featured Showcase",
      title: "Build IT",
      desc: "A PC shopping website designed for effortless hardware selection, helping users build their dream rig with an intuitive browsing experience and streamlined component filtering.",
      tags: ["E-Commerce", "Web Design", "UI Design", "Hardware Configurator"],
      images: [
        "/BUILD IT - PC Shopping and Effortless Hardware Selection/Frame 1.jpg"
      ]
    }
  ]
};
