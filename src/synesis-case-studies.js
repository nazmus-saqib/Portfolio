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
    lead: "A ship-ticketing service connecting passengers, agents, vessel owners, and authority reviewers.",
    facts: [
      {
        "label": "My role",
        "value": "Individual UX / UI design assignment"
      },
      {
        "label": "Client",
        "value": "BIWTA · Synesis IT, Bangladesh"
      }
    ],
    context: {
      "heading": "One booking connects several roles.",
      "body": "Passengers book tickets, agents assist purchases, owners monitor services, and the authority reviews timetable requests. The design needed clear responsibilities and handoffs."
    },
    storyboardIntro: "Follow the passenger task, then explore the role-specific screens.",
    storyboard: [
      {
        "title": "Find a journey",
        "description": "Compare vessels, times, and fares by route and date."
      },
      {
        "title": "Choose a place",
        "description": "Select an available seat, bed, or deck option."
      },
      {
        "title": "Review and pay",
        "description": "Check passenger details and fare, then choose payment."
      },
      {
        "title": "Receive the ticket",
        "description": "Inspect the payment result, transaction details, and ticket."
      },
      {
        "title": "Manage a change",
        "description": "Separate flows cover failed payment, changes, cancellation, and verification."
      }
    ],
    decisions: [
      {
        "title": "A shared booking task can require different payment steps.",
        "situation": "A passenger buying directly and an agent selling on someone’s behalf both need a ticket, but their checkout responsibilities differ.",
        "decision": "The passenger prototype includes payment-method and gateway choices",
        "reason": "The comparison makes the role boundary visible"
      },
      {
        "title": "Make a timetable request traceable across the handoff.",
        "situation": "A timetable request needs to move from the person supplying expected journey details to the authority reviewing them.",
        "decision": "The request views include identifiers, dates, and status",
        "reason": "This gives the handoff concrete information: what was requested, where the request stands, and what information comes back after review."
      },
      {
        "title": "Include the work after the main booking path.",
        "situation": "The initial purchase is only one part of a ticket’s lifecycle.",
        "decision": "The design set represents failed payment, change and cancellation confirmations, and verification-code states alongside the successful booking sequence.",
        "reason": "Showing follow-up states makes the next action reviewable when a transaction or request needs another step."
      }
    ],
    contribution: {
      "items": [
        "Interpreted the SRS and defined scope",
        "Developed personas and role-specific flows",
        "Designed user and administration interfaces",
        "Demonstrated the prototype to the client"
      ]
    },
    outcome: {
      "heading": "Delivered for client review",
      "body": "I delivered role-specific Adobe XD prototypes and demonstrated the service to the client."
    },
    reflection: "Clear responsibilities and explicit handoffs remain central to my coordination work today.",
    showcaseNote: "Original previews from the five supplied Adobe XD files.",
    showcase: [
      {
        "image": "/projects/biwta.webp",
        "title": "The passenger entry point",
        "alt": "Original BIWTA passenger ticketing landing-page prototype",
        "caption": "The public-facing starting point for finding a journey."
      },
      {
        "image": "/projects/biwta-agent.webp",
        "title": "Assisted ticket purchases",
        "alt": "Original BIWTA agent interface with vessel search results",
        "caption": "The agent perspective on searching for a vessel and supporting a booking."
      },
      {
        "image": "/projects/biwta-owner.webp",
        "title": "The vessel-owner perspective",
        "alt": "Original BIWTA vessel-owner launch-services prototype",
        "caption": "An operational view of launch services."
      },
      {
        "image": "/projects/biwta-authority.webp",
        "title": "Submit timetable information",
        "alt": "Original BIWTA timetable request form",
        "caption": "The request side of a timetable handoff, with vessel, route, and expected-time fields."
      },
      {
        "image": "/projects/biwta-admin.webp",
        "title": "Review the request",
        "alt": "Original BIWTA administration timetable request list",
        "caption": "The authority-side request list makes the review task and request status visible."
      }
    ],
  },
  ereturn: {
    ...ereturnExpansion,
    sectionTitles: sectionTitles,
    lead: "Making registration and tax-filing tasks easier to follow, from account access to return review.",
    facts: [
      {
        "label": "My role",
        "value": "UX designer within the project team"
      },
      {
        "label": "Client",
        "value": "National Board of Revenue · Synesis IT"
      }
    ],
    context: {
      "heading": "Make a complex return manageable.",
      "body": "Taxpayers need to establish access, find relevant financial sections, and review their information together. The design connects verification routes, organized forms, and summaries."
    },
    storyboardIntro: "From service entry to a consolidated return review.",
    storyboard: [
      {
        "title": "Enter the service",
        "description": "Reach eReturn from eTax Services and establish account access."
      },
      {
        "title": "Set the context",
        "description": "Identify assessment and income circumstances through relevant questions."
      },
      {
        "title": "Enter financial details",
        "description": "Use category forms and add another item when needed."
      },
      {
        "title": "Complete supporting sections",
        "description": "Work through assets, liabilities, rebates, and expenditure."
      },
      {
        "title": "Review the return",
        "description": "Inspect summaries, tax/payment information, and the consolidated return."
      }
    ],
    decisions: [
      {
        "title": "Organize by the information someone needs to provide.",
        "situation": "The filing scope contains many related categories and a large number of detailed forms.",
        "decision": "The prototype groups the work into recognizable areas, including income, assets and liabilities, rebate, expenditure, and tax/payment.",
        "reason": "The structure gives a reviewer a way to understand the overall scope before inspecting individual fields"
      },
      {
        "title": "Represent the differences within an income category.",
        "situation": "An income category can contain several situations that require different information.",
        "decision": "The design set includes distinct salary variants, multiple business and agricultural income forms, and “add more” states rather than a single generic income screen.",
        "reason": "Those variants show the detail behind a high-level requirement"
      },
      {
        "title": "Treat access, verification, and review as part of the service.",
        "situation": "Completing a form depends on getting into the right account and understanding the information and payment status shown at the end.",
        "decision": "The prototype includes registration, password and verification states, a mobile-number mismatch state, payment-verification actions, and return-summary views.",
        "reason": "The workflow can be assessed beyond data entry alone: how someone starts, where a mismatch needs attention, and how the information comes together for review."
      }
    ],
    contribution: {
      "items": [
        "Gathered client requirements and contributed to team analysis",
        "Contributed research, wireframes, and prototypes",
        "Supported usability testing",
        "Demonstrated and delivered the design with the team"
      ]
    },
    outcome: {
      "heading": "Delivered before the deadline",
      "body": "The team delivered the design work before the deadline and demonstrated it to the client."
    },
    reflection: "The lasting lesson: make the required information, next actor, and next action clear.",
    showcaseNote: "Original service-entry preview; the walkthrough explains the wider filing prototype.",
    showcase: [
      {
        "image": "/projects/ereturn.webp",
        "title": "A clear entry into the service",
        "alt": "Original eTax Services landing-page prototype with an eReturn entry",
        "caption": "The eTax Services entry page from the shared team prototype. This image shows the starting point, rather than the detailed tax-filing forms."
      }
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
