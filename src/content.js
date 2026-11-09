// Public portfolio copy grounded in the owner's career record and uploaded work.
// Private source material and unresolved source questions stay outside this site.
import { synesisCaseStudies } from './synesis-case-studies.js';
import { signfyCaseStudy } from './case-studies/signfy.js';

const storyMilestones = [
  {
    id: 'roots',
    label: 'Foundation',
    period: 'Bangladesh',
    title: 'Learn to listen.',
    body: 'My Computer Science & Engineering degree at North South University in Bangladesh built my technical foundation. UX work taught me to listen, clarify requirements, and connect business needs with teams.',
    skill: 'Requirements & listening',
    icon: 'code',
  },
  {
    id: 'canada',
    label: 'A new start',
    period: 'Canada · 2022',
    title: 'Build a wider perspective.',
    body: 'In 2022, I moved to Canada as a student. Centennial College’s Interactive Media Management and Sir Sandford Fleming College’s Project Management programs, alongside customer-facing work, strengthened my communication and planning.',
    skill: 'Communication & planning',
    icon: 'plane',
  },
  {
    id: 'coordination',
    label: 'Coordination',
    period: 'October 2024–Today',
    title: 'Turn plans into progress.',
    body: 'In October 2024, I joined Identify BDA. As a Project & Operations Coordinator, I now bring clients, vendors, approvals, and timelines together to keep projects moving.',
    skill: 'Projects & operations',
    icon: 'checklist',
  },
];

export const aboutMe = {
  name: 'Nazmus Saqib',
  position: 'Project & Operations Coordinator',
  company: 'Identify BDA',
  professionalStatement: 'I’m a project and operations coordinator who brings clients, vendors, and teams together to move work from a clear request to a completed delivery. I combine technical education, project management training, and hands-on experience to coordinate requirements, approvals, timelines, costs, and communication when plans change.',
  tagline: 'Bringing it all together.',
  motivation: 'I’m motivated by making the next step clear, keeping people informed, and following through until the work is delivered.',
  goal: 'I’m looking for Project Coordinator or Assistant Project Manager opportunities where I can help teams plan clearly, communicate well, and deliver dependable results.',
  storyTitle: 'A journey built on connection.',
  storyMilestones,
  story: storyMilestones.map(milestone => milestone.body),
};

export const chapters = [
  {
    eyebrow: '01 / LEARNING TO LISTEN',
    title: 'Understand the need first.',
    body: 'My earlier career in UX at Synesis IT and iQuantile taught me to listen closely, clarify requirements, and work across business and technical teams. Those habits now shape how I coordinate projects and communicate with stakeholders.',
    detail: 'A foundation in requirements, client conversations, feedback, and shared understanding.',
    tags: ['Requirements gathering', 'Client understanding', 'Cross-functional work'],
    place: 'Bangladesh',
    period: '2020–2022',
  },
  {
    eyebrow: '02 / A SYSTEMS PERSPECTIVE',
    title: 'See how it all connects.',
    body: 'At iStoreiSend in Malaysia, my UX work on the ODIN warehouse and fulfillment system gave me a closer view of operational workflows. I learned to look beyond a single task and understand how people, information, and handoffs connect.',
    detail: 'An operational perspective built through collaboration with business and technical stakeholders.',
    tags: ['Workflow understanding', 'Stakeholder collaboration', 'Systems thinking'],
    place: 'Malaysia',
    period: '2022',
  },
  {
    eyebrow: '03 / A NEW CHAPTER',
    title: 'Build a wider perspective.',
    body: 'Moving to Canada in 2022 opened a new chapter. I studied Interactive Media Management at Centennial College and Project Management at Fleming College, alongside technical-site work and part-time customer-facing roles.',
    detail: 'Formal project-management education met practical execution, communication, and problem solving.',
    tags: ['Project management', 'Technical execution', 'Customer communication'],
    place: 'Canada',
    period: '2022 onward',
  },
  {
    eyebrow: '04 / BRINGING IT TOGETHER',
    title: 'Turn the plan into progress.',
    body: 'Today, I coordinate projects and operations at Identify BDA. I connect client requirements with vendor capabilities, keep approvals and timelines moving, resolve issues, and follow the work through production, delivery, and billing. My focus is bringing people and moving parts together.',
    detail: 'Role: Project & Operations Coordinator · Identify BDA · October 2024–present.',
    tags: ['Project & operations coordination', 'Client & vendor liaison', 'Delivery & follow-through'],
    place: 'Canada / Today',
    period: '2024–present',
  },
];

export const projects = [
  {
    id: 'identify',
    title: 'From request to delivery',
    category: 'operations',
    year: '2024–present',
    company: 'Identify BDA · Canada',
    collaboration: 'Project coordination',
    summary: 'Keeping client requirements, vendors, approvals, production, and delivery connected across a typical 6–10 projects each month.',
    role: 'Project & Operations Coordinator',
    challenge: 'Keep changing requirements, supplier options, approvals, deadlines, and delivery details aligned as projects move between clients, internal colleagues, and production partners.',
    approach: [
      'Clarify the client brief, specifications, deadlines, and dependencies.',
      'When artwork is needed, brief designers on the client’s requirements. Share drafts for feedback, coordinate revisions with the designers, and obtain client approval of the final artwork before production while vendor sourcing continues.',
      'Source and compare quotations across a network of 20+ external vendors, evaluating cost, quality, capability, reliability, and turnaround. Negotiate pricing and recommend suitable options.',
      'Track order stages, approvals, deadlines, and changes. Follow up before expected completion and use a one- to two-day scheduling buffer where appropriate to manage delivery risk.',
      'Resolve production and fulfillment issues by gathering evidence, coordinating corrections, finding alternative suppliers, and keeping the client informed.',
      'Arrange pickup or delivery, share shipment updates, coordinate invoicing, and review vendor charges against quotations and client pricing to investigate discrepancies.',
    ],
    outcome: 'Ongoing end-to-end coordination of client projects—from a clear requirement and supplier decision through production, delivery, and financial follow-up—with clients and internal colleagues kept informed throughout.',
    tools: ['Trello', 'Microsoft Excel', 'Wave', 'Email & phone'],
    image: null,
    accent: '#EAF6FD',
    featured: true,
  },
  {
    id: 'biwta',
    richCaseStudy: synesisCaseStudies.biwta,
    title: 'BIWTA',
    category: 'Public service · UX / UI',
    year: '2020–2021',
    company: 'Synesis IT · Bangladesh',
    collaboration: 'Individual project',
    summary: 'Four connected portals for passengers, ticketing agents, vessel authorities, and vessel owners.',
    role: 'UX / UI design',
    challenge: 'Translate a multi-role ticketing service into clear journeys, with different needs for passengers, agents, vessel owners, and the authority.',
    approach: [
      'Reviewed the software requirements and translated user and client needs into personas and user stories.',
      'Visited a launch terminal to understand accommodation and physical ticketing, then designed booking and role-specific portal flows.',
      'Prepared the prototype for client demonstration, including vessel timetable requests and review screens.',
    ],
    outcome: 'A connected set of Adobe XD prototypes across the ticketing and administration experience, presented to the client.',
    tools: ['Adobe XD', 'User flows', 'Wireframing', 'Prototyping'],
    image: '/projects/biwta.webp',
    accent: '#EAF6FD',
    featured: false,
    gallery: [
      { src: '/projects/biwta.webp', alt: 'BIWTA passenger ticketing landing-page prototype' },
      { src: '/projects/biwta-agent.webp', alt: 'Agent ticket-purchase interface with vessel search results' },
      { src: '/projects/biwta-owner.webp', alt: 'Vessel-owner view of available launch services' },
      { src: '/projects/biwta-authority.webp', alt: 'Vessel timetable submission form' },
      { src: '/projects/biwta-admin.webp', alt: 'BIWTA administration timetable request list' },
    ],
  },
  {
    id: 'convay',
    title: 'Convay',
    category: 'Collaboration software · UX / UI',
    year: '2020–2021',
    company: 'Synesis IT · Bangladesh',
    collaboration: 'Team project',
    summary: 'A video-conferencing platform with a broader world of meetings, rooms, teams, and administration.',
    role: 'UX designer within the product team',
    challenge: 'Help make a feature-rich conferencing product understandable across user and organization workflows.',
    approach: [
      'Worked from the software requirements to understand product functionality, user needs, and business goals.',
      'Contributed personas, user stories, competitive and SWOT analysis, sitemaps, wireframes, and prototype exploration.',
      'Designed selected website and desktop-application screens and contributed to user-testing work.',
    ],
    outcome: 'Design contributions to a team product, with prototype material covering the dashboard, rooms, roles, users, subscriptions, and billing.',
    tools: ['Adobe XD', 'Competitive analysis', 'Wireframing', 'Prototyping'],
    image: '/projects/convay.webp',
    accent: '#EAF6FD',
    featured: false,
  },
  {
    id: 'signfy',
    richCaseStudy: signfyCaseStudy,
    title: 'Signfy',
    category: 'Accessibility · Academic concept',
    year: '2023',
    company: 'Centennial College · Canada',
    collaboration: 'Final academic project',
    summary: 'Exploring how a mobile experience could bridge communication between sign-language users and non-signers.',
    role: 'Product concept, UX research & planning',
    challenge: 'Explore a two-way communication concept that brings sign language, speech, and text into a shared conversation.',
    approach: [
      'Framed the communication problem and potential audience, supported by reported survey findings.',
      'Developed a Figma prototype and presentation around translation, communication, and learning concepts.',
      'Extended the concept into a project plan with delivery phases, risks, a proposed budget, and a measurement framework.',
    ],
    outcome: 'An academic concept and prototype with a supporting product and delivery proposal. The work explores translation features; it does not represent a deployed or technically validated translation engine.',
    tools: ['Figma', 'User research', 'Project planning', 'Product strategy'],
    image: '/projects/signfy.webp',
    accent: '#EAF6FD',
    featured: false,
  },
  {
    id: 'ereturn',
    richCaseStudy: synesisCaseStudies.ereturn,
    title: 'eReturn',
    category: 'Government service · UX / UI',
    year: '2020–2021',
    company: 'Synesis IT · National Board of Revenue, Bangladesh',
    collaboration: 'Team project',
    summary: 'Making the complexity of online income-tax filing easier to navigate through a structured digital experience.',
    role: 'UX designer within the project team',
    challenge: 'Translate a detailed tax-filing process into usable forms, steps, and account journeys for taxpayers.',
    approach: [
      'Met with the client to gather requirements and understand the scope, challenges, and possible solutions.',
      'Contributed UX research, wireframes, prototypes, and usability-testing work.',
      'Supported the client demonstration and delivery of the design work.',
    ],
    outcome: 'A comprehensive team prototype covering registration, taxpayer profiles, income reporting, assets and liabilities, rebates, expenditure, and tax/payment flows.',
    tools: ['Adobe XD', 'Requirements gathering', 'Wireframing', 'Usability testing'],
    image: '/projects/ereturn.webp',
    accent: '#EAF6FD',
    featured: false,
  },
  {
    id: 'qare',
    title: 'Qare',
    category: 'Healthcare · Landing-page design',
    year: '2021–2022',
    company: 'iQuantile · Bangladesh',
    collaboration: 'Design work at iQuantile',
    summary: 'A clear introduction to a digital healthcare initiative, its products, and its pilot program.',
    role: 'Landing-page design',
    challenge: 'Introduce a healthcare platform to multiple audiences while giving visitors a clear route to learn more and register interest.',
    approach: [
      'Organized the page around the platform, its products, its team, and pilot-program sign-up.',
      'Used distinct sections for doctors and patients, and for pharmacies.',
      'Created supporting typography, colour, and UI-component material within the Adobe XD file.',
    ],
    outcome: 'A landing-page design and supporting UI material for Qare, an iQuantile healthcare initiative.',
    tools: ['Adobe XD', 'Visual hierarchy', 'UI components'],
    image: '/projects/qare.webp',
    accent: '#EAF6FD',
    featured: false,
  },
  {
    id: 'odin',
    title: 'ODIN',
    category: 'Warehouse & fulfillment · Enterprise UX',
    year: '2022',
    company: 'iStoreiSend · Malaysia',
    collaboration: 'Individual project',
    summary: 'UX design for a warehouse and fulfillment system, connecting digital interfaces with operational work.',
    role: 'UX designer',
    challenge: 'Understand the needs of a warehouse and fulfillment operation and translate them into a digital product experience.',
    approach: [
      'Worked with stakeholders to understand requirements and business objectives.',
      'Collaborated with business and technical teams to develop and review design work.',
      'Coordinated feedback and revisions as part of the product-delivery process.',
    ],
    outcome: 'Individual design work on the ODIN warehouse and fulfillment system at iStoreiSend.',
    tools: ['Figma', 'Requirements', 'Enterprise UX'],
    image: null,
    accent: '#EAF6FD',
    featured: false,
  },
  {
    id: 'quantibly',
    title: 'Quantibly',
    category: 'Organization management · Enterprise UX',
    year: '2021–2022',
    company: 'iQuantile · Bangladesh',
    collaboration: 'Individual project',
    summary: 'Designing a clearer structure for an organization-management product and its public-facing website.',
    role: 'UX / UI designer',
    challenge: 'Bring user goals and business requirements into a coherent website and web-application experience.',
    approach: [
      'Researched requirements, identified user and business goals, and developed personas and user stories.',
      'Created sitemaps, wireframes, sketches, and paper prototypes, with user-testing work.',
      'Designed a website prototype with a mobile version and contributed to the web-application design.',
    ],
    outcome: 'Website and organization-management design work at iQuantile. Internal system materials remain confidential.',
    tools: ['Adobe XD', 'User research', 'Information architecture', 'Prototyping'],
    image: null,
    accent: '#EAF6FD',
    featured: false,
    confidential: true,
  },
  {
    id: 'cozey',
    title: 'Cozey',
    category: 'E-commerce · Academic redesign',
    year: '2023',
    company: 'Centennial College · Canada',
    collaboration: 'Group pitch project',
    summary: 'A UX audit and redesign proposal for the furniture-shopping experience.',
    role: 'UX audit & redesign within a student team',
    challenge: 'Review the original furniture website and explore how its shopping experience could be improved.',
    approach: [
      'Worked with a group in the Interactive Media Management program.',
      'Contributed to a UX audit of the existing website.',
      'Developed a redesigned website prototype as part of an academic pitch.',
    ],
    outcome: 'A group academic audit and redesign proposal, presented as a pitch project rather than a commissioned or launched website.',
    tools: ['Figma', 'UX audit', 'Prototyping'],
    image: null,
    accent: '#EAF6FD',
    featured: false,
  },
];

export const experience = [
  {
    period: 'Oct 2024–present',
    title: 'Project & Operations Coordinator',
    company: 'Identify BDA · Canada',
    description: 'Coordinate client requirements, artwork approvals, vendor sourcing, quotations, production, delivery, and financial follow-up. Work directly with clients, internal colleagues, and a network of 20+ external vendors.',
  },
  {
    period: 'Jan 2023–Sep 2024',
    title: 'Field Technician, Level 1',
    company: 'Dynamic Infotech · Canada',
    description: 'On-call technical-site work involving device installations, requirement confirmation, customer coordination, issue resolution, and hands-on execution.',
  },
  {
    period: 'Jan 2023–Sep 2024',
    title: 'Sales Representative · part-time',
    company: 'UPS & Staples · Canada',
    description: 'Helped customers identify suitable solutions, managed transactions and competing requests, and resolved customer issues.',
  },
  {
    period: 'Apr–Nov 2022',
    title: 'UX Designer',
    company: 'iStoreiSend · Malaysia',
    description: 'Designed for warehouse and fulfillment operations, working across stakeholder requirements, business objectives, technical collaboration, and design revisions.',
  },
  {
    period: 'Dec 2021–Mar 2022',
    title: 'UX Designer',
    company: 'iQuantile · Bangladesh',
    description: 'Turned business and user requirements into design work, including Quantibly and Qare, while coordinating feedback across stakeholders.',
  },
  {
    period: 'Aug 2020–Nov 2021',
    title: 'UX Intern → UX Designer',
    company: 'Synesis IT · Bangladesh',
    description: 'Progressed from an internship into a UX design role, contributing to public-service and enterprise products through requirements, research, wireframing, prototyping, and client reviews.',
  },
];

export const skills = [
  {
    title: 'Coordinate the project.',
    description: 'Turn a request into clear requirements, next steps, and a shared view of progress.',
    items: ['Requirements gathering', 'Timeline & deadline coordination', 'Project tracking & status reporting', 'Issue & change coordination'],
  },
  {
    title: 'Connect the right partners.',
    description: 'Find supplier options that fit the requirements, cost, quality, and delivery window.',
    items: ['Vendor sourcing & selection', 'Quotation & cost comparison', 'Pricing negotiation', 'Procurement & order coordination'],
  },
  {
    title: 'Keep people aligned.',
    description: 'Communicate clearly across clients, management, production partners, and internal teams.',
    items: ['Client & vendor liaison', 'Approval & feedback coordination', 'Cross-functional communication', 'Customer issue resolution'],
  },
  {
    title: 'Follow through on the details.',
    description: 'Keep operational records useful and follow the work through delivery and financial checks.',
    items: ['Delivery & fulfillment coordination', 'Workflow tracking in Trello', 'Excel logs, sorting & cost calculations', 'Wave cost & payment reconciliation'],
  },
];

export const certificates = [
  {
    title: 'UI / UX Design Specialization',
    issuer: 'CalArts · Coursera',
    date: 'July 2022',
  },
  {
    title: 'Complete Web & Mobile Designer: UI/UX, Figma, +more',
    issuer: 'Udemy · Zero To Mastery',
    date: 'July 2022',
  },
  {
    title: 'User Experience Design Essentials · Adobe XD',
    issuer: 'Udemy · Daniel Walter Scott',
    date: 'August 2021',
  },
];

export const education = [
  { title: 'Project Management', school: 'Sir Sandford Fleming College', qualification: 'Ontario Graduate Certificate' },
  { title: 'Interactive Media Management', school: 'Centennial College', qualification: 'Ontario Graduate Certificate' },
  { title: 'Computer Science & Engineering', school: 'North South University', qualification: 'Bachelor of Science' },
];

export const teaching = {
  title: 'Sharing the craft.',
  description: 'Led “Wireframe & Prototype in XD” at Synesis IT on August 17, 2021, covering requirements, interface components, wireframes, and connected prototypes.',
};

// Employer stops are chronological by the supplied start month. The two Canadian
// roles with identical dates overlap; their order does not imply a promotion.
// Dates have month precision. Ended-role tenure counts listed calendar months;
// ongoing-role tenure counts elapsed months as of the current Toronto month.
export const careerStops = [
  {
    id: 'webnsoftech',
    company: 'WebNSofTech',
    label: 'WebNSofTech',
    role: 'Graphics Designer',
    start: '2018-01',
    end: '2020-07',
    period: 'Jan 2018–Jul 2020',
    location: 'Dhaka, Bangladesh',
    employment: 'Part-time',
    headline: 'Make the message clear.',
    story: 'My earlier design work began with visual communication: turning ideas into banners, posters, logos, illustrations, and web designs. It gave me a practical foundation in organizing information and preparing clear deliverables.',
    highlights: [
      'Created visual material for digital and print communication.',
      'Worked across illustration, photo editing, motion graphics, and web design.',
      'Built a foundation in presenting information clearly.',
    ],
    projectIds: [],
    projectLabel: 'Selected work types',
  },
  {
    id: 'synesis',
    company: 'Synesis IT',
    label: 'Synesis IT',
    role: 'UX Intern → UX Designer',
    start: '2020-08',
    end: '2021-11',
    period: 'Aug 2020–Nov 2021',
    location: 'Dhaka, Bangladesh',
    employment: 'Internship → Full-time',
    headline: 'Understand the requirement first.',
    story: 'At Synesis IT, I worked with business and technical stakeholders on public-service and collaboration products. I learned to clarify requirements, document the work, coordinate feedback, and present prototypes to clients.',
    highlights: [
      'Internship: Aug–Oct 2020; UX Designer: Nov 2020–Nov 2021.',
      'Translated software and client requirements into user flows, wireframes, and prototypes.',
      'Contributed to client demonstrations, reviews, and design iterations.',
    ],
    projectIds: ['biwta', 'ereturn', 'convay'],
    projectLabel: 'Projects at Synesis IT',
  },
  {
    id: 'iquantile',
    company: 'iQuantile',
    label: 'iQuantile',
    role: 'UX Designer',
    start: '2021-12',
    end: '2022-03',
    period: 'Dec 2021–Mar 2022',
    location: 'Dhaka, Bangladesh',
    employment: 'Full-time',
    headline: 'Connect needs with the next step.',
    story: 'My work at iQuantile connected business and user requirements with organization-management and healthcare experiences. I worked through research, design, and feedback while keeping different stakeholder needs in view.',
    highlights: [
      'Gathered and analyzed business and user requirements.',
      'Communicated requirements and coordinated feedback with internal teams.',
      'Developed wireframes, prototypes, and supporting interface material.',
    ],
    projectIds: ['quantibly', 'qare'],
    projectLabel: 'Projects at iQuantile',
  },
  {
    id: 'istoreisend',
    company: 'iStoreiSend',
    label: 'iStoreiSend',
    role: 'UX Designer',
    start: '2022-04',
    end: '2022-11',
    period: 'Apr 2022–Nov 2022',
    location: 'Malaysia',
    employment: 'Full-time',
    headline: 'See the whole operation.',
    story: 'At iStoreiSend, I worked individually on ODIN, a warehouse and fulfillment system. Working across business and technical teams gave me a closer view of how requirements, information, and operational handoffs fit together.',
    highlights: [
      'Worked with stakeholders to understand requirements and business objectives.',
      'Collaborated with business and technical colleagues on product design.',
      'Coordinated feedback and revisions to support delivery.',
    ],
    projectIds: ['odin'],
    projectLabel: 'Project at iStoreiSend',
  },
  {
    id: 'dynamic',
    company: 'Dynamic Infotech',
    label: 'Dynamic Infotech',
    role: 'Field Technician, Level 1',
    start: '2023-01',
    end: '2024-09',
    period: 'Jan 2023–Sep 2024',
    location: 'Canada',
    employment: 'On-call · Overlapping roles',
    headline: 'Follow the work onto the site.',
    story: 'My on-call field work connected technical requirements with hands-on execution at customer and commercial sites. I installed devices, confirmed needs, resolved issues, and sometimes worked independently. This overlapped with my part-time customer-facing roles.',
    highlights: [
      'Supported installations of computers, peripherals, network devices, POS, and IoT equipment.',
      'Confirmed customer requirements and resolved practical site issues.',
      'Balanced scheduling, prioritization, and hands-on technical execution.',
    ],
    projectIds: [],
    projectLabel: 'Work in practice',
  },
  {
    id: 'ups-staples',
    company: 'UPS & Staples',
    label: 'UPS & Staples',
    role: 'Sales Representative',
    start: '2023-01',
    end: '2024-09',
    period: 'Jan 2023–Sep 2024',
    location: 'Canada',
    employment: 'Part-time · Overlapping roles',
    headline: 'Keep the customer in the conversation.',
    story: 'Alongside my on-call technical work, I built Canadian customer-facing experience through part-time sales roles at UPS and Staples. I listened to customer requirements, recommended suitable solutions, processed transactions, and helped resolve issues.',
    highlights: [
      'Understood customer requirements and recommended appropriate solutions.',
      'Handled transactions and multiple competing customer requests.',
      'Followed up and worked through customer issues.',
    ],
    projectIds: [],
    projectLabel: 'Work in practice',
  },
  {
    id: 'identify',
    company: 'Identify BDA',
    label: 'Identify BDA',
    role: 'Project & Operations Coordinator',
    start: '2024-10',
    end: null,
    period: 'Oct 2024–Present',
    location: 'Canada',
    employment: 'Full-time · Permanent',
    headline: 'Turn the plan into progress.',
    story: 'I coordinate client projects from brief to delivery, keeping clients, vendors, and production partners aligned.',
    highlights: [
      'Clarify client briefs and align stakeholders on scope, priorities, and next steps.',
      'Compare quotations, negotiate pricing, track approvals and timelines, and resolve production issues.',
      'Arrange fulfillment, communicate shipment updates, and coordinate invoicing and cost reconciliation.',
    ],
    projectIds: ['identify'],
    projectLabel: 'My coordination workflow',
  },
];

export const professionalSummary = {
  headline: 'Project & Operations Coordinator',
  body: 'Project coordinator with end-to-end experience aligning client requirements, vendors, approvals, timelines, and delivery. I coordinate 6–10 projects a month, work with 20+ external vendors, and keep stakeholders informed through changes and issues. My technical degree and Canadian graduate certificates support a practical, organized approach to project delivery.',
  qualifications: [
    'Bachelor of Science in Computer Science & Engineering · North South University',
    'Ontario Graduate Certificate in Project Management · Sir Sandford Fleming College',
    'Ontario Graduate Certificate in Interactive Media Management · Centennial College',
  ],
  targets: ['Project Coordinator', 'Assistant Project Manager'],
};

export function formatTenure(start, end, asOfDate = new Date()) {
  const monthIndex = value => {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) throw new TypeError('Expected a YYYY-MM date');
    const [year, month] = value.split('-').map(Number);
    return year * 12 + month - 1;
  };
  let lastMonth;
  if (end) {
    lastMonth = monthIndex(end);
  } else {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Toronto', year: 'numeric', month: '2-digit',
    }).formatToParts(asOfDate);
    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    lastMonth = monthIndex(`${year}-${month}`);
  }
  const months = Math.max(0, lastMonth - monthIndex(start) + (end ? 1 : 0));
  if (!months) return 'Less than 1 mo';
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return [years ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '', remainder ? `${remainder} ${remainder === 1 ? 'mo' : 'mos'}` : ''].filter(Boolean).join(' ');
}
