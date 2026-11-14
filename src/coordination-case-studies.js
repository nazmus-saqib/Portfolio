// Current-work cases grounded in the owner's approved résumé and described workflow.
// Reusable templates explain the method; they are not historical client records.
const base = {
  category: 'operations',
  company: 'Identify BDA · Canada',
  role: 'Project Coordinator',
  image: null,
  accent: '#EAF6FD',
};

export const coordinationProjects = [
  {
    ...base,
    id: 'conference',
    storyType: 'case-study',
    title: 'Coordinating a $55,000 conference project',
    year: 'During my current role',
    collaboration: 'Project coordination · team delivery',
    summary: 'Eight vendors, three weeks, and onsite setup at the Metro Toronto Convention Centre.',
    challenge: 'Keep vendor work, approvals, delivery and onsite setup aligned within a three-week coordination period.',
    approach: [
      'Coordinated the approximately $55,000 conference project with eight vendors over three weeks.',
      'Supported onsite setup and helped resolve an incorrect item without delaying the conference.',
      'Worked as part of the delivery team; client approval, commercial decisions and supplier execution remained with their respective owners.',
    ],
    outcome: 'Helped resolve an incorrect item without delaying the conference.',
    tools: ['Vendor coordination', 'Scheduling', 'Onsite support', 'Issue resolution'],
    featured: true,
    coordinationCaseStudy: {
      kind: 'Project example',
      lead: 'A fixed event date made every handoff matter. I coordinated vendor work and supported setup for an approximately $55,000 conference project.',
      facts: [
        { label: 'Project value', value: 'Approximately $55,000' },
        { label: 'Vendor network', value: '8 vendors' },
        { label: 'Coordination period', value: '3 weeks' },
        { label: 'Location', value: 'Metro Toronto Convention Centre' },
      ],
      brief: 'Coordinate multiple vendors through the lead-up to a conference and support onsite setup at the Metro Toronto Convention Centre.',
      responsibilities: [
        'Coordinate the project across eight vendors over three weeks.',
        'Support onsite setup and follow through on delivery issues.',
        'Help resolve an issue with an incorrect item alongside the delivery team.',
      ],
      constraints: [
        'A fixed event date and a three-week coordination window.',
        'Eight vendors whose work needed to come together for setup.',
        'An incorrect item that required attention before the conference.',
      ],
      actions: [
        { title: 'Connect the moving parts', body: 'I coordinated vendor work across the three-week period and supported the transition into onsite setup.' },
        { title: 'Stay involved at setup', body: 'I supported onsite setup, where an incorrect item needed a coordinated response.' },
        { title: 'Help resolve the issue', body: 'I helped resolve an incorrect item with the delivery team, without delaying the conference.' },
      ],
      ownership: [
        { role: 'My contribution', body: 'Project coordination, vendor follow-up, onsite support and help resolving an issue with an incorrect item.' },
        { role: 'Shared delivery', body: 'Vendors and the onsite team carried out production and setup. I supported their coordination rather than claiming their specialist work.' },
        { role: 'Approval boundaries', body: 'My wider role includes recommending vendor and commercial options to the CEO, and obtaining client artwork approval before production.' },
      ],
      result: 'I helped resolve an incorrect item without delaying the conference.',
      lessons: [
        'A fixed event date makes dependencies between suppliers especially important.',
        'Coordination continues through onsite setup, where practical issues can still emerge.',
      ],
      artifacts: [
        {
          id: 'timeline',
          title: 'Delivery timeline template',
          description: 'A reusable planning outline for a fixed-date event. It illustrates the coordination method, rather than reproducing the conference’s original schedule.',
          columns: ['Stage', 'What to confirm', 'Release gate'],
          rows: [
            ['Requirements', 'Deliverables, quantities, owners and event date', 'Brief agreed'],
            ['Approvals & sourcing', 'Artwork approval, vendor capability and lead times', 'Approvals recorded'],
            ['Production & delivery', 'Supplier milestones and arrival arrangements', 'Readiness checked'],
            ['Onsite setup', 'Items received, setup needs and outstanding issues', 'Issue owners assigned'],
          ],
        },
        {
          id: 'task-tracker',
          title: 'Task tracker template',
          description: 'The fields I use to make follow-up clear. This blank example contains no client or supplier records.',
          columns: ['Work item', 'Owner', 'Target date', 'Status', 'Next action'],
          rows: [['[Deliverable or task]', '[Responsible person]', '[Agreed date]', '[Current stage]', '[Action and follow-up date]']],
        },
      ],
    },
  },
  {
    ...base,
    id: 'supplier-coordination',
    storyType: 'workflow',
    title: 'Coordinating multiple suppliers',
    year: '2024–present',
    collaboration: 'Recurring coordination workflow',
    summary: 'Compare options, clarify handoffs, and keep vendor recommendations tied to cost, quality and delivery needs.',
    challenge: 'Find suitable suppliers while requirements, artwork approvals, capability and lead times all affect the decision.',
    approach: [
      'Compare quotations across cost, quality, capability, reliability and lead times; negotiate pricing and recommend suitable commercial options to the CEO.',
      'When artwork is needed, coordinate designer revisions and final client approval while supplier sourcing continues.',
      'Keep order instructions current, track production and delivery targets, and investigate invoice discrepancies with suppliers and the accountant.',
    ],
    outcome: 'A repeatable way to connect supplier decisions, approvals and delivery follow-up within my ongoing work with 20+ vendors.',
    tools: ['Excel', 'Trello', 'Quotations', 'Vendor communication', 'Wave'],
    featured: false,
    coordinationCaseStudy: {
      kind: 'Recurring workflow',
      lead: 'How I compare supplier options and coordinate handoffs in my ongoing work with 20+ vendors in Canada and internationally.',
      facts: [
        { label: 'Context', value: 'Ongoing client projects' },
        { label: 'Supplier network', value: '20+ vendors' },
        { label: 'My role', value: 'Compare, recommend and coordinate' },
      ],
      brief: 'Connect client requirements with suitable supplier capabilities, then keep approvals, order instructions and delivery follow-up aligned across ongoing projects.',
      responsibilities: [
        'Clarify specifications, quantities, deadlines and artwork needs.',
        'Compare quotations, negotiate pricing and recommend options to the CEO.',
        'Coordinate approvals, vendor orders, production tracking and financial follow-up.',
      ],
      constraints: [
        'The lowest price alone does not establish quality, capability or delivery fit.',
        'Artwork revisions and supplier sourcing can progress in parallel, but production requires final client approval.',
        'Different suppliers need clear instructions and reliable handoffs.',
      ],
      actions: [
        { title: 'Compare on the same basis', body: 'I check quotations against the brief, including cost, quality, capability and lead time, then negotiate and recommend suitable options to the CEO.' },
        { title: 'Keep approval visible', body: 'I brief designers when needed, share drafts with the client, coordinate revisions and obtain final artwork approval before production.' },
        { title: 'Coordinate the handoffs', body: 'I keep supplier instructions current, monitor orders and production in Trello and Excel, and follow up ahead of agreed delivery targets.' },
        { title: 'Close the financial loop', body: 'I check supplier invoices against agreed estimates, investigate discrepancies with the vendor and accountant, and track payment follow-up in Wave.' },
      ],
      ownership: [
        { role: 'My contribution', body: 'Requirements, quotation comparison, negotiation, recommendations, order coordination and follow-up.' },
        { role: 'Decision owners', body: 'I recommend commercial options to the CEO. Clients approve final artwork; designers prepare and revise it; vendors execute their production work.' },
      ],
      result: 'This working method connects supplier recommendations with approvals, current order instructions and delivery follow-up. Across my broader Identify BDA work, I have supported 25+ clients, including approximately 15 repeat clients.',
      lessons: [
        'A useful comparison makes capability and delivery trade-offs as visible as price.',
        'Current instructions and clear approval ownership reduce ambiguity at handoffs.',
      ],
      artifacts: [
        {
          id: 'supplier-comparison',
          title: 'Supplier comparison template',
          description: 'A blank comparison structure based on my quotation workflow. Confidential prices and supplier identities are excluded.',
          columns: ['Criterion', 'Vendor A', 'Vendor B', 'Decision note'],
          rows: [
            ['Specification & quantity fit', '[Check]', '[Check]', '[Requirement met or gap]'],
            ['Cost & quotation terms', '[Quote]', '[Quote]', '[Commercial trade-off]'],
            ['Quality & capability', '[Evidence]', '[Evidence]', '[Relevant limitation]'],
            ['Lead time & delivery', '[Commitment]', '[Commitment]', '[Schedule fit]'],
            ['Recommendation', '[Option]', '[Option]', '[CEO decision required]'],
          ],
        },
      ],
    },
  },
  {
    ...base,
    id: 'change-coordination',
    storyType: 'workflow',
    title: 'Managing changes and urgent orders',
    year: '2024–present',
    collaboration: 'Recurring issue-resolution workflow',
    summary: 'Assess the issue, check practical alternatives, and keep clients informed of timing and cost implications.',
    challenge: 'Keep work moving when requirements change or production and delivery problems affect the agreed plan.',
    approach: [
      'Gather evidence for incorrect quantities, artwork issues, shortages or delays, and clarify the effect on delivery.',
      'Check rush production, alternate vendors, corrections, reprints or revised schedules as appropriate.',
      'Coordinate the response, keep clients informed of cost and timing implications, and brief the CEO on outstanding decisions.',
    ],
    outcome: 'A clear response path for recurring changes and production issues, with accountable follow-up and visible client communication.',
    tools: ['Trello', 'Excel', 'Issue tracking', 'Client updates', 'CEO briefings'],
    featured: false,
    coordinationCaseStudy: {
      kind: 'Recurring workflow',
      lead: 'How I organize the response when an order changes, a supplier is delayed, or a production issue needs correction.',
      facts: [
        { label: 'Context', value: 'Ongoing delivery support' },
        { label: 'Focus', value: 'Timing, cost and next actions' },
        { label: 'My role', value: 'Assess, coordinate and follow up' },
      ],
      brief: 'Address changes and production problems while keeping the client, suppliers and management informed. The steps below describe my recurring work process.',
      responsibilities: [
        'Gather evidence and confirm the affected quantity, artwork, supply or delivery detail.',
        'Check corrective options and their timing and cost implications.',
        'Coordinate the agreed response, update stakeholders and track the next action.',
      ],
      constraints: [
        'The original deadline may still matter even when the scope or supplier situation changes.',
        'A faster option can affect cost, vendor availability or production arrangements.',
        'Clients and the CEO need clear information to make outstanding decisions.',
      ],
      actions: [
        { title: 'Establish what changed', body: 'I gather evidence, confirm the issue with the relevant people and identify what it means for the delivery plan.' },
        { title: 'Check workable alternatives', body: 'Depending on the issue, I check corrections or reprints, rush production, alternate vendors or a revised schedule.' },
        { title: 'Keep decisions informed', body: 'I explain cost and timing implications to the client and brief the CEO on supplier issues, priorities and decisions that need attention.' },
        { title: 'Follow through', body: 'I coordinate the response with the responsible people, update the tracking records and follow up on the next action.' },
      ],
      ownership: [
        { role: 'My contribution', body: 'Evidence gathering, option checking, stakeholder communication, action tracking and coordination of corrections.' },
        { role: 'Shared responsibility', body: 'Vendors and designers carry out the relevant corrections. Client approvals and CEO commercial decisions remain explicit.' },
      ],
      result: 'The process gives each issue an owner, a next action and a communication path. A documented example is the incorrect item I helped resolve without delaying the conference; its context appears in the conference case study.',
      lessons: [
        'An early, specific update is more useful than waiting until the deadline to report a problem.',
        'A corrective action needs an owner and follow-up, as well as an agreed solution.',
      ],
      artifacts: [
        {
          id: 'issue-log',
          title: 'Issue and action log template',
          description: 'A reusable blank log showing the decisions and follow-up fields I track. It is not an original client incident record.',
          columns: ['Issue & evidence', 'Timing / cost impact', 'Options / decision owner', 'Action owner', 'Next update'],
          rows: [['[Confirmed issue]', '[Impact to assess]', '[Alternatives and approval]', '[Responsible person]', '[Date and next action]']],
        },
      ],
    },
  },
];
