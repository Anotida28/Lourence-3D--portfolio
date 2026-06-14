const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Certifications",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 1, suffix: "+", label: "Year Industry Experience" },
  { value: 30, suffix: "+", label: "Integrations Supported" },
  { value: 5, suffix: "+", label: "Systems Built & Deployed" },
  { value: 2, suffix: "", label: "Internships Completed" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Lourence delivered high-quality systems under real production pressure in a regulated fintech environment. His ability to own features end-to-end — from build to deployment — was impressive for an intern.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/omari-logo.png",
    title: "IT & Software Development Intern — Old Mutual Zimbabwe (Omari)",
    date: "August 2025 - May 2026",
    responsibilities: [
      "Built the merchant and agent onboarding portal for the Omari fintech platform, used to register new businesses and agents.",
      "Developed integrations between Omari and external banks (ZB Bank, POSB, Stanbic) enabling seamless payments and fund transfers.",
      "Designed and built the company IT help desk ticketing system and OMCard — an IT stock and asset tracking system replacing manual spreadsheets.",
      "Administered the corporate Google Workspace domain (omari.co.zw): user provisioning, permissions, security monitoring, and email support.",
    ],
  },
  {
    review: "Lourence handled multiple client projects simultaneously with professionalism and met every deadline. His technical and design skills made him a valuable contributor from day one.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/cliopatra-logo.png",
    title: "Student Intern — Cliopatra Graphics",
    date: "December 2024 - February 2025",
    responsibilities: [
      "Developed and designed client websites using Django and React.",
      "Created branding and marketing materials including logos and promotional content.",
      "Assisted with bookkeeping and financial data management across multiple client accounts.",
    ],
  },
  {
    review: "Pursuing a BSc (Honours) in Computer Science with a 3.39 GPA — Upper Second Class equivalent. Strong results across software engineering, web development, networks, and data structures.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/nust-logo.png",
    title: "BSc (Honours) Computer Science — NUST",
    date: "2022 - Present (Expected 2027)",
    responsibilities: [
      "GPA 3.39 / 4.0 — 69% weighted average across 25 modules.",
      "Top results: Intro to CS & Programming (84%), Web Development (83%), Discrete Mathematics (78%).",
      "Completed Industrial Attachment at Old Mutual Zimbabwe (Omari fintech) in 2025–2026.",
    ],
  },
  {
    review: "Built the academic foundation in Mathematics and Computer Science that underpins all subsequent technical work.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/sacredheart-logo.png",
    title: "Advanced Level (A-Level) — Sacred Heart College",
    date: "2021",
    responsibilities: [
      "Subjects: Pure Mathematics, Geography, Computer Science, General English.",
      "Science-focused curriculum that laid the groundwork for university-level Computer Science.",
    ],
  },
];

const expLogos = [
  {
    name: "Old Mutual Zimbabwe",
    imgPath: "/images/logo1.png",
  },
  {
    name: "Cliopatra Graphics",
    imgPath: "/images/logo2.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Lourence. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Lourence was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Lourence was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Lourence's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Lourence is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Lourence was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Lourence’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Lourence was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const certifications = [
  {
    name: "Google IT Support Professional Certificate",
    issuer: "Coursera / Google",
    imgPath: "https://images.credly.com/images/fb97a12f-c0f1-4f37-9b7d-4a830199fe84/GCC_badge_IT_Support_1000x1000.png",
    date: "Sep 2024",
    description: "A professional-level certificate covering the full spectrum of IT support work — from troubleshooting hardware and software to managing networks, operating systems, and security in real enterprise environments.",
    skills: ["IT Support", "Computer Networking", "System Administration", "Troubleshooting", "Security", "Linux", "Cloud Computing"],
  },
  {
    name: "Google AI Essentials",
    issuer: "Coursera / Google",
    imgPath: "https://images.credly.com/images/ea3eec65-ddad-4242-9c59-1defac0fa2d9/image.png",
    date: "Sep 2024",
    description: "Covers practical AI skills for the workplace — using AI tools to boost productivity, writing effective prompts, and applying responsible AI principles to real tasks.",
    skills: ["Prompt Engineering", "Responsible AI", "Critical Thinking", "Problem Solving", "AI Tools"],
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    imgPath: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
    date: "Sep 2024",
    description: "Foundational Cisco cybersecurity course covering how cyber attacks work, how to detect threats, protect networks, and maintain privacy in a connected world.",
    skills: ["Cybersecurity", "Threat Detection", "Network Vulnerabilities", "Privacy", "Attack Prevention"],
  },
  {
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    imgPath: "https://images.credly.com/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/image.png",
    date: "Nov 2024",
    description: "IBM's comprehensive introduction to artificial intelligence — exploring machine learning, deep learning, neural networks, natural language processing, and computer vision using IBM Watson Studio.",
    skills: ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision", "Watson Studio"],
  },
  {
    name: "AI Fundamentals with IBM SkillsBuild",
    issuer: "Cisco",
    imgPath: "https://images.credly.com/images/26c21273-c0ab-485b-98a7-f1212dcb82b8/image.png",
    date: "Nov 2024",
    description: "Explores the core concepts behind modern AI systems including supervised and unsupervised learning, deep learning architectures, and real-world applications in computer vision and language processing.",
    skills: ["AI", "Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing"],
  },
  {
    name: "Ethical Hacker",
    issuer: "Cisco",
    imgPath: "https://images.credly.com/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png",
    date: "Feb 2025",
    description: "Advanced Cisco certification in offensive security techniques — covering penetration testing methodologies, vulnerability assessment, social engineering attacks, cryptography, and IoT security.",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Social Engineering", "IoT Security", "Cryptography", "Exploit Development"],
  },
  {
    name: "Network Technician Career Path",
    issuer: "Cisco",
    imgPath: "https://images.credly.com/images/978f88dc-c247-4093-9d39-6efac3651297/image.png",
    date: "Aug 2025",
    description: "Intermediate Cisco networking path covering network design, configuration, and troubleshooting using Cisco IOS — including IP addressing schemes, Ethernet, routing fundamentals, and hands-on network diagnostics.",
    skills: ["Networking", "Cisco IOS", "IPv4/IPv6 Addressing", "Ethernet", "Network Troubleshooting", "Routing"],
  },
  {
    name: "DevOps Essentials",
    issuer: "Coursera / IBM",
    imgPath: "https://images.credly.com/images/48847c2a-7b9a-4044-b13d-bb175649904b/image.png",
    date: "Mar 2026",
    description: "Introduces the DevOps mindset and core practices — continuous integration and delivery, test-driven development, behaviour-driven development, and managing infrastructure as code.",
    skills: ["DevOps", "Continuous Integration", "CI/CD", "Test-Driven Development", "Infrastructure as Code", "Automation"],
  },
  {
    name: "Introduction to Agile Development and Scrum",
    issuer: "Coursera / IBM",
    imgPath: "https://images.credly.com/images/61733424-430b-4496-bd3c-cb0c7b9dcd67/image.png",
    date: "Mar 2026",
    description: "Covers the Agile philosophy and the Scrum framework in depth — sprint planning, daily standups, retrospectives, Kanban boards, and managing backlogs using ZenHub.",
    skills: ["Agile", "Scrum", "Kanban", "Sprint Planning", "ZenHub", "Backlog Management"],
  },
  {
    name: "Containers & Kubernetes Essentials",
    issuer: "Coursera / IBM",
    imgPath: "https://images.credly.com/images/fadae326-142d-4855-a42f-f0b07e65eac1/image.png",
    date: "Mar 2026",
    description: "Hands-on introduction to container technology and Kubernetes orchestration — building, deploying, and scaling containerised applications on IBM Cloud.",
    skills: ["Kubernetes", "Containers", "Docker", "IBM Cloud", "Container Orchestration", "Deployment"],
  },
  {
    name: "Application Development using Microservices and Serverless",
    issuer: "Coursera / IBM",
    imgPath: "https://images.credly.com/images/eaaf4a45-b93e-41d1-91d3-d331c6210314/image.png",
    date: "Apr 2026",
    description: "Intermediate IBM course on modern application architecture — designing and building microservices with REST and GraphQL APIs, serverless functions, Flask, and tools like Swagger, Postman, and cURL.",
    skills: ["Microservices", "Serverless Computing", "REST APIs", "GraphQL", "Flask", "Docker", "Swagger", "Postman"],
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  certifications,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
