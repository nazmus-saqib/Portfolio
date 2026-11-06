// Supplemental portfolio explanations. Reconstructed artifacts are identified in copy.
// Historical activity claims come from the supplied CV; interface observations
// come from Convay_Applicaiton.xdc. This is not a record of a production launch.
export const convayExpansion = {
  productDetails: {
    intro: 'Convay was Synesis IT’s in-house conferencing product. The shared design archive extends from meetings into people, access, shared resources, and account administration. These are explanatory task groups rather than a verified organizational permission model.',
    areas: [
      { title: 'Meetings', body: 'Upcoming meetings, invitations, quick actions, host information, and room booking.' },
      { title: 'People and access', body: 'Users, pending invitations, roles, permissions, teams, and organization information.' },
      { title: 'Shared resources', body: 'Room information and history, plus assigned and available host and room licenses.' },
      { title: 'Account administration', body: 'Subscriptions, add-ons, billing information, payment setup, and invoices.' },
    ],
  },
  needs: {
    intro: 'These user stories are reconstructed from tasks in the prototype. They explain the product’s needs without presenting invented interview quotes or claiming verified permissions.',
    stories: [
      { role: 'Meeting host', need: 'see upcoming meetings and the next available meeting action', soThat: 'I can move from planning into the meeting task', basis: 'Dashboard prototype interpretation' },
      { role: 'Organization administrator', need: 'understand a person’s status and role', soThat: 'I can review membership and the access represented for that person', basis: 'Users and Role Management artboards' },
      { role: 'Resource administrator', need: 'distinguish available resources from assigned resources', soThat: 'I can review room and license allocation', basis: 'Room and License Management artboards' },
    ],
  },
  requirements: [
    { need: 'Make immediate meeting work discoverable.', evidence: 'Dashboard: upcoming meetings, quick actions, and host controls.', response: 'Keep meeting information and primary actions together in the starting view.' },
    { need: 'Represent differences in responsibility.', evidence: 'Owner, administrator, user, and custom-role views.', response: 'Separate membership information from role and permission details.' },
    { need: 'Show resource allocation states.', evidence: 'Assigned, available, and all-license variants; room history.', response: 'Give state distinctions named views and reviewable lists.' },
    { need: 'Support administration beyond the meeting.', evidence: 'Organization, subscription, and billing artboards.', response: 'Group account work into dedicated areas rather than mixing it into meeting actions.' },
  ],
  research: {
    intro: 'I worked from the SRS, developed personas and user stories, contributed competitive and SWOT analysis, and worked on early prototypes and user testing. The findings below explain what the archived prototype reveals; they are not presented as participant feedback.',
    methods: [
      { title: 'Requirements and user/business needs', body: 'Used the SRS to understand the product concept and functionality, then worked on personas and user stories.', status: 'Documented activity' },
      { title: 'Competitive and SWOT analysis', body: 'Explored the product’s competitive context. The retrospective comparison below explains the product patterns and trade-offs relevant to this design.', status: 'Documented activity; new comparison below' },
      { title: 'Early design and user testing', body: 'Worked on sitemaps, wireframes, sketches, paper prototypes, user testing, and selected interface designs.', status: 'Documented activity; results not reconstructed' },
    ],
    findings: [
      { title: 'One product contains different kinds of work.', body: 'Meeting actions and administration require different information density and priorities.', evidence: 'Dashboard alongside Users, Roles, Rooms, and Billing views.' },
      { title: 'A state is part of the requirement.', body: 'A resource list becomes more useful to review when assignment and availability are explicit.', evidence: 'Assigned, available, and all-license artboards.' },
      { title: 'People, permissions, and resources are connected scopes.', body: 'The archive exposes these relationships through separate membership, role, team, and license views.', evidence: 'Role Members, Team Details, and license-assignment views.' },
    ],
  },
  challenges: [
    { title: 'A meeting tool with a broad administration scope', detail: 'Fast meeting actions coexist with detailed organization and account tasks.', response: 'The prototype separates the meeting overview from dedicated management areas.' },
    { title: 'Different responsibilities within one organization', detail: 'Membership and administration cannot be explained by a single generic user screen.', response: 'Role, member, and permission representations make responsibilities inspectable.' },
    { title: 'Resources change state', detail: 'Rooms and licenses need more context than a name and quantity.', response: 'Availability, assignment, booking information, and history are represented separately.' },
  ],
  personas: [
    { role: 'Meeting host', goal: 'Move efficiently between meeting planning and meeting actions.', context: 'A reconstructed role profile from the dashboard, not an interview participant.', needs: ['Upcoming meeting context', 'Clear meeting actions', 'Room information'], frictions: ['Administration competing with immediate meeting tasks'], basis: 'Prototype-derived role profile' },
    { role: 'People administrator', goal: 'Understand membership, status, and responsibilities.', context: 'A reconstructed profile of the user and role-management work.', needs: ['User status', 'Role details', 'Member and team context'], frictions: ['Ambiguous access or unclear membership status'], basis: 'Prototype-derived role profile' },
    { role: 'Resource and account administrator', goal: 'Review allocation and the account supporting the service.', context: 'An explanatory grouping of resource and billing tasks, not a verified permission model.', needs: ['Assigned and available resources', 'Room history', 'Subscription and billing context'], frictions: ['Allocation information spread across unrelated views'], basis: 'Prototype-derived role profile' },
  ],
  competitive: {
    intro: 'Competitive and SWOT analysis were part of my contribution. This new qualitative comparison uses familiar Zoom, Microsoft Teams, and Google Meet interaction patterns to explain the design space. It is a retrospective analysis, rather than the original competitor scorecard, a current feature audit, or user-test findings.',
    columns: ['Reference pattern', 'Strength', 'Design pressure', 'Implication for Convay'],
    rows: [
      { pattern: 'Meeting-first · Zoom reference', strength: 'A recognizable pattern centered on joining, starting, and scheduling meetings.', tradeoff: 'Organization work still needs an understandable home alongside immediate meeting actions.', implication: 'Give immediate actions priority without hiding management navigation.' },
      { pattern: 'Workspace-first · Microsoft Teams reference', strength: 'A recognizable pattern connecting meetings with people, teams, and ongoing collaboration.', tradeoff: 'A broad workspace can compete with the next meeting action.', implication: 'Use a concise dashboard and recognizable task groups.' },
      { pattern: 'Entry-first · Google Meet reference', strength: 'A recognizable pattern centered on entering or starting a meeting from a simple entry point.', tradeoff: 'Broader organization and resource tasks still need a separate structure.', implication: 'Keep frequent meeting tasks easy to identify while giving administration its own space.' },
      { pattern: 'Administration-first console', strength: 'Makes roles, allocation, and account status inspectable.', tradeoff: 'Dense management views can overwhelm meeting-focused tasks.', implication: 'Separate management areas and expose relevant state within each one.' },
    ],
    takeaways: [
      'Compare how clearly a task can be found, rather than counting features alone.',
      'Treat role and resource state as product requirements.',
      'Use a focused starting view with dedicated space for detailed administration.',
    ],
  },
  process: [
    { stage: 'Understand', activity: 'Interpret the SRS and user/business needs.', output: 'Requirements, personas, and user stories.', basis: 'Documented project activities' },
    { stage: 'Frame', activity: 'Examine the product landscape and organize the scope.', output: 'Competitive/SWOT work and sitemap.', basis: 'Documented activities; retrospective process map' },
    { stage: 'Explore', activity: 'Make early design ideas tangible.', output: 'Sketches, wireframes, and paper prototypes.', basis: 'Documented activities; new explanatory studies shown here' },
    { stage: 'Prototype', activity: 'Contribute selected interface designs within the team.', output: 'Selected website, Windows, and macOS application pages.', basis: 'Documented personal scope; shared prototype context' },
    { stage: 'Test and review', activity: 'Contribute to user-testing work.', output: 'A reviewable design contribution.', basis: 'Testing documented; no invented findings or iteration history' },
  ],
  sketches: {
    intro: 'Reconstructed sketch study created for this case study. It explains a possible early arrangement of the archived dashboard’s tasks; it is not presented as an original dated sketch.',
    variant: 'meetings',
    annotations: [
      { title: 'Give administration a stable home', body: 'Use recognizable groups for people, resources, and the account.' },
      { title: 'Start with the immediate task', body: 'Reserve a clear area for meeting actions.' },
      { title: 'Keep upcoming context nearby', body: 'Let the meeting overview support the next action.' },
    ],
  },
  wireframe: {
    intro: 'A new explanatory wireframe based on the shared prototype’s information groups. It shows hierarchy and task grouping without claiming to reproduce an original wireframe or a tested revision.',
    variant: 'meetings',
    annotations: [
      { title: 'Navigation', body: 'A persistent management area separates product scopes.' },
      { title: 'Overview', body: 'Meeting information and quick actions establish the page priority.' },
      { title: 'Detail', body: 'Structured panels leave room for supporting meeting and resource information.' },
    ],
  },
  sitemap: [
    { label: 'Meeting work', children: [{ label: 'Dashboard' }, { label: 'Upcoming meetings' }, { label: 'Meeting actions' }] },
    { label: 'People and access', children: [{ label: 'Users and invitations' }, { label: 'Roles and members' }, { label: 'Organization and teams' }] },
    { label: 'Resources', children: [{ label: 'Rooms and history' }, { label: 'Host licenses' }, { label: 'Room licenses and add-ons' }] },
    { label: 'Account', children: [{ label: 'Profile' }, { label: 'Subscription' }, { label: 'Billing and invoices' }] },
  ],
  inspiration: {
    intro: 'A retrospective principle board assembled for the portfolio, rather than a recovered original inspiration board.',
    cards: [
      { title: 'A clear starting point', principle: 'Prioritize the next task.', application: 'Bring meeting context and actions into the dashboard.' },
      { title: 'Visible responsibility', principle: 'Distinguish people from permissions.', application: 'Give membership and role details their own reviewable views.' },
      { title: 'State before quantity', principle: 'Explain what can be used and what is already assigned.', application: 'Show resource availability, allocation, and history.' },
    ],
  },
};
