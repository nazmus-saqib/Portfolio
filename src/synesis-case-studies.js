// Case-study narratives grounded in the supplied project record and artifacts.
// Reconstructed explanations are labeled separately from original evidence.
// Keep source documents, personal records, and editorial questions outside the site.
import { biwtaExpansion } from './case-studies/biwta.js';
import { ereturnExpansion } from './case-studies/ereturn.js';
import { convayExpansion } from './case-studies/convay.js';

const sectionTitles = {
  needs: 'User story, need, and problem',
  requirements: 'Requirements analysis',
  research: 'Research, learnings, and findings',
  challenges: 'From challenges to design solutions',
  personas: 'User personas',
  process: 'Design thinking process',
  sketches: 'Initial sketch study',
  wireframe: 'From sketch to wireframe',
  sitemap: 'Site map and information architecture',
  inspiration: 'Inspiration board',
  competitive: 'Competitive analysis and findings',
  productDetails: 'Product details',
  registrationJourneys: 'Registration journeys and service handoffs',
  planningArtifacts: 'Original planning artifacts',
  evaluation: 'Evaluation tasks and review criteria',
  showcase: 'Prototype and mockup showcase',
};

export const synesisCaseStudies = {
  biwta: {
    ...biwtaExpansion,
    sectionTitles: { ...sectionTitles, needs: 'Client needs and user stories' },
    lead: 'One ticketing service, several perspectives. My individual design assignment connected passenger booking with the agent, vessel-owner, and authority work around it.',
    facts: [
      { label: 'My role', value: 'Individual UX / UI design contribution' },
      { label: 'Organization', value: 'Synesis IT · BIWTA, Bangladesh' },
      { label: 'Starting point', value: 'Software requirements specification' },
      { label: 'Delivered', value: 'Role-specific Adobe XD prototypes and client demonstration' },
    ],
    context: {
      heading: 'Understand the whole service before drawing the screens.',
      body: [
        'A ship-ticketing service involves more than finding a departure and choosing a seat. Passengers need booking and follow-up actions. Agents support ticket purchases. Vessel owners need operational information, while the authority needs to review timetable requests.',
        'At Synesis IT, I reviewed the software requirements specification, identified the design scope, and developed personas and user stories around user and client needs. My design work covered two user portals and two administration panels. The supplied prototypes show how those responsibilities appear across the service.',
      ],
    },
    storyboardIntro: 'A representative passenger journey through the historical prototype, with a separate follow-up branch for changes and recovery.',
    storyboard: [
      { actor: 'Passenger', title: 'Find a journey', description: 'Search by route and date, then compare vessels, departure times, and fares.' },
      { actor: 'Passenger', title: 'Choose a place', description: 'Review a vessel layout and select an available seat, bed, or deck option.' },
      { actor: 'Passenger', title: 'Review and pay', description: 'Enter passenger information, check the fare breakdown, and choose a payment method.' },
      { actor: 'Passenger', title: 'Receive the ticket', description: 'The design set includes successful-payment, transaction-detail, and ticket views.' },
      { actor: 'Follow-up', title: 'Handle a change', description: 'Separate screens represent payment failure, ticket changes, cancellation, and verification.' },
    ],
    decisions: [
      {
        title: 'A shared booking task can require different payment steps.',
        situation: 'A passenger buying directly and an agent selling on someone’s behalf both need a ticket, but their checkout responsibilities differ.',
        decision: 'The passenger prototype includes payment-method and gateway choices. The agent checkout includes passenger details and a “Received Payment” action.',
        reason: 'The comparison makes the role boundary visible. A similar end result does not mean every participant needs the same sequence of actions.',
      },
      {
        title: 'Make a timetable request traceable across the handoff.',
        situation: 'A timetable request needs to move from the person supplying expected journey details to the authority reviewing them.',
        decision: 'The request views include identifiers, dates, and status. Review screens distinguish requested information from provided departure, arrival, and berthing information, with a fare-chart upload.',
        reason: 'This gives the handoff concrete information: what was requested, where the request stands, and what information comes back after review.',
      },
      {
        title: 'Include the work after the main booking path.',
        situation: 'The initial purchase is only one part of a ticket’s lifecycle.',
        decision: 'The design set represents failed payment, change and cancellation confirmations, and verification-code states alongside the successful booking sequence.',
        reason: 'Showing follow-up states makes the next action reviewable when a transaction or request needs another step.',
      },
    ],
    contribution: {
      heading: 'From a written scope to something the client could review.',
      paragraphs: [
        'I translated the SRS into a design scope, developed personas and user stories, and designed the user and administration interfaces. I then demonstrated the Adobe XD prototype to the client and delivered the design work.',
        'The examples above explain what is visible in those deliverables. They show how requirements, responsibilities, and exceptions were represented across a connected service.',
      ],
      items: ['Requirements interpretation and scope definition', 'Role-specific flows, personas, and user stories', 'Interface and prototype design', 'Client demonstration and design delivery'],
    },
    outcome: {
      heading: 'A design deliverable spanning booking and operations.',
      body: 'The completed work was a set of Adobe XD prototypes for ticketing and administrative workflows, demonstrated to the client. It brought the passenger-facing journey and the operational views into a concrete design deliverable.',
    },
    reflection: 'This earlier work connects to how I coordinate projects today: clarify who needs to act, make the information at each handoff explicit, and follow the task beyond its first successful step.',
    showcaseNote: 'Original design previews from the supplied Adobe XD files. Each image represents a different part of the service; the walkthrough above summarizes the wider prototype.',
    showcase: [
      { image: '/projects/biwta.webp', title: 'The passenger entry point', alt: 'Original BIWTA passenger ticketing landing-page prototype', caption: 'The public-facing starting point for finding a journey. Source: BIWTA.xd.' },
      { image: '/projects/biwta-agent.webp', title: 'Assisted ticket purchases', alt: 'Original BIWTA agent interface with vessel search results', caption: 'The agent perspective on searching for a vessel and supporting a booking. Source: BIWTA AGENT_Ticket Purchase.xd.' },
      { image: '/projects/biwta-owner.webp', title: 'The vessel-owner perspective', alt: 'Original BIWTA vessel-owner launch-services prototype', caption: 'An operational view of launch services. The wider file also represents seat totals, sales, balances, and transactions. Source: BIWTA_ Ship Owner.xd.' },
      { image: '/projects/biwta-authority.webp', title: 'Submit timetable information', alt: 'Original BIWTA timetable request form', caption: 'The request side of a timetable handoff, with vessel, route, and expected-time fields. Source: BIWTA. Time Table - Vessel Authority.xd.' },
      { image: '/projects/biwta-admin.webp', title: 'Review the request', alt: 'Original BIWTA administration timetable request list', caption: 'The authority-side request list makes the review task and request status visible. Source: BIWTA admin portal.xd.' },
    ],
  },
  ereturn: {
    ...ereturnExpansion,
    sectionTitles,
    lead: 'Turn a detailed tax-filing process into a sequence people can work through. My contribution combined client requirements, UX research, prototyping, and usability-testing work within the Synesis IT team.',
    facts: [
      { label: 'My role', value: 'UX designer within the project team' },
      { label: 'Client', value: 'National Board of Revenue, Bangladesh' },
      { label: 'Scope', value: 'Registration, taxpayer information, filing sections, and tax/payment views' },
      { label: 'Delivered', value: 'Team design work and client demonstration before the deadline' },
    ],
    context: {
      heading: 'Give a complex process a workable structure.',
      body: [
        'An income-tax return brings together different kinds of information: personal and assessment details, income sources, assets and liabilities, investments, expenditure, and payments. The design challenge was to make that breadth understandable within one digital service.',
        'I visited the client to gather requirements, identified the work scope, challenges, and possible solutions, and contributed UX research, wireframes, prototypes, and usability testing. Our team performed requirements analysis using the project documentation. The shared Adobe XD file represents the broader design set.',
      ],
    },
    storyboardIntro: 'A high-level walkthrough of the filing tasks represented in the historical prototype. Detailed forms and conditional branches sit within these stages.',
    storyboard: [
      { actor: 'Taxpayer', title: 'Enter the service', description: 'Reach eReturn from the eTax Services entry page, then register or sign in.' },
      { actor: 'Account setup', title: 'Establish the context', description: 'Registration uses identification and mobile information. Assessment views and additional questions establish the filing period, income sources, and supporting-information context.' },
      { actor: 'Income reporting', title: 'Work through the details', description: 'The prototype separates different income types and their associated entry forms.' },
      { actor: 'Supporting information', title: 'Complete the wider return', description: 'Assets and liabilities, rebates, and expenditure appear as distinct parts of the filing experience.' },
      { actor: 'Review', title: 'Bring the information together', description: 'Tax/payment summaries and a return view bring the entered information into an overview for review.' },
    ],
    decisions: [
      {
        title: 'Organize by the information someone needs to provide.',
        situation: 'The filing scope contains many related categories and a large number of detailed forms.',
        decision: 'The prototype groups the work into recognizable areas, including income, assets and liabilities, rebate, expenditure, and tax/payment.',
        reason: 'The structure gives a reviewer a way to understand the overall scope before inspecting individual fields. It also makes the relationship between detailed entry and summary information visible.',
      },
      {
        title: 'Represent the differences within an income category.',
        situation: 'An income category can contain several situations that require different information.',
        decision: 'The design set includes distinct salary variants, multiple business and agricultural income forms, and “add more” states rather than a single generic income screen.',
        reason: 'Those variants show the detail behind a high-level requirement. They make the scope more concrete for discussion with business and technical stakeholders.',
      },
      {
        title: 'Treat access, verification, and review as part of the service.',
        situation: 'Completing a form depends on getting into the right account and understanding the information and payment status shown at the end.',
        decision: 'The prototype includes registration, password and verification states, a mobile-number mismatch state, payment-verification actions, and return-summary views.',
        reason: 'The workflow can be assessed beyond data entry alone: how someone starts, where a mismatch needs attention, and how the information comes together for review.',
      },
    ],
    contribution: {
      heading: 'Connect client requirements with a reviewable prototype.',
      paragraphs: [
        'My contribution began with client visits and requirements gathering. I worked on defining the scope and identifying challenges and possible solutions, then contributed research, wireframes, prototypes, and usability testing.',
        'I also supported the client demonstration and delivery before the deadline. The shared prototype illustrates the breadth of the team’s work; my contribution was the UX work described here, rather than sole authorship of every screen.',
      ],
      items: ['Client requirements, team analysis, and scope clarification', 'UX research and wireframing', 'Prototype and usability-testing contribution', 'Client demonstration and design delivery'],
    },
    outcome: {
      heading: 'A comprehensive team prototype, delivered for review.',
      body: 'The design work was delivered before the deadline and demonstrated to the client. The supplied prototype covers registration and assessment information through detailed filing sections, return review, and tax/payment views.',
    },
    reflection: 'The coordination skill this work brings forward is making a large requirement manageable: clarify the scope with stakeholders, break it into understandable parts, and connect detailed work back to the overall deliverable.',
    showcaseNote: 'The available exported preview shows the service entry point. The filing walkthrough is based on the other artboards in the supplied prototype, rather than a recreated interface.',
    showcase: [
      { image: '/projects/ereturn.webp', title: 'A clear entry into the service', alt: 'Original eTax Services landing-page prototype with an eReturn entry', caption: 'The eTax Services entry page from the shared team prototype. This image shows the starting point, rather than the detailed tax-filing forms. Source: e-Return_Full Version Prototype.xdc.' },
    ],
  },
  convay: {
    ...convayExpansion,
    sectionTitles,
    lead: 'A conferencing product needs more than a meeting screen. The shared Convay prototype brings meeting actions together with people, permissions, rooms, and account administration. My contribution covered research, early design work, testing, and selected interface screens.',
    facts: [
      { label: 'My role', value: 'UX designer within the product team' },
      { label: 'Product', value: 'Convay · Synesis IT in-house product' },
      { label: 'Methods', value: 'Requirements, personas, analysis, wireframes, and testing' },
      { label: 'Contribution', value: 'Selected website, Windows, and macOS application screens' },
    ],
    context: {
      heading: 'Understand the product around the meeting.',
      body: [
        'Convay was an in-house video-conferencing product at Synesis IT. The supplied prototype extends from a dashboard and meeting-related information into user management, roles, organization structure, rooms, licensing, subscriptions, and billing.',
        'I worked from the software requirements specification to understand the concept and functionality. My contribution included personas and user stories, identifying user and business needs, competitive and SWOT analysis, sitemaps, wireframes, paper prototypes, and user-testing work. I also designed selected website and desktop-application pages.',
      ],
    },
    storyboardIntro: 'Two related perspectives in the prototype: a participant handles meetings, while an administrator manages the organization and its resources. These are parallel responsibilities.',
    storyboard: [
      { actor: 'Meeting / host perspective', title: 'Get an overview', description: 'The dashboard brings upcoming meetings and quick meeting actions into one starting view.' },
      { actor: 'Meeting / host perspective', title: 'Choose the next action', description: 'The prototype presents options for starting, joining, or scheduling a meeting alongside upcoming meeting information.' },
      { actor: 'Organization administrator', title: 'Manage people and access', description: 'Separate views represent users, invitations, roles, and role details.' },
      { actor: 'Organization administrator', title: 'Coordinate shared resources', description: 'Rooms, teams, and available or assigned licenses have dedicated management views.' },
      { actor: 'Account administration', title: 'Keep the account in view', description: 'Subscription and billing views represent the account work supporting the conferencing service.' },
    ],
    decisions: [
      {
        title: 'Distinguish a participant’s work from administration.',
        situation: 'Joining a meeting and managing an organization are different tasks within the same product.',
        decision: 'The dashboard emphasizes meetings and quick actions. Dedicated management areas hold users, roles, rooms, subscriptions, and billing.',
        reason: 'This makes the product’s different responsibilities visible. A task can be understood in the context of the person who needs to carry it out.',
      },
      {
        title: 'Make permissions an explicit part of the structure.',
        situation: 'An organization needs to distinguish access to meeting functions from privileges to manage the account.',
        decision: 'The role-management views distinguish owner, administrator, user, and custom-role information, with separate role details and membership views.',
        reason: 'The prototype gives the team something specific to review when discussing responsibilities and access, beyond a general request for “user management.”',
      },
      {
        title: 'Represent the state of a shared resource.',
        situation: 'A room or license needs to be understood in terms of its use and availability.',
        decision: 'The design set includes room-management and history views, plus assigned, available, and all-license views for host and room licenses.',
        reason: 'These states make resource-management requirements more concrete. They connect the inventory of a resource with the work of assigning and reviewing it.',
      },
    ],
    contribution: {
      heading: 'Explore, structure, and contribute within the team.',
      paragraphs: [
        'I helped translate product requirements into user and business needs, supported competitive and SWOT analysis, and worked on the sitemap, wireframes, paper prototypes, and user testing.',
        'My visual-design responsibility covered selected website, Windows, and macOS application screens. The shared prototype is shown as team material; it illustrates the product context around my contribution rather than claiming sole authorship of the full platform.',
      ],
      items: ['SRS interpretation, personas, and user stories', 'Competitive and SWOT analysis', 'Sitemaps, wireframes, and paper prototypes', 'User testing and selected interface designs'],
    },
    outcome: {
      heading: 'A contribution to a broader product design.',
      body: 'My contribution formed part of the team’s conferencing-product work. The supplied Adobe XD prototype makes the breadth of that work visible, from meeting entry points to organization and account administration.',
    },
    reflection: 'The lasting skill is seeing how individual tasks fit into a wider system: identify different responsibilities, make access and resource states explicit, and contribute a clear piece of work within a team.',
    showcaseNote: 'Original dashboard preview from the shared team prototype. Other management areas are described from their source artboards; no replacement screens have been invented for this showcase.',
    showcase: [
      { image: '/projects/convay.webp', title: 'Meetings in the context of the organization', alt: 'Original Convay dashboard prototype with upcoming meetings and quick actions', caption: 'A dashboard preview from the shared product-design file, showing the meeting overview and surrounding navigation. Names and meeting values are prototype content. Source: Convay_Applicaiton.xdc.' },
    ],
  },
};
