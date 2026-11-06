// Historical artifacts and retrospective explanations remain distinguished in the presentation.
export const biwtaExpansion = {
  "needs": {
    "intro": "Connect passenger booking, assisted sales, vessel operations, and timetable review within one ticketing service.",
    "stories": [
      {
        "role": "Passenger",
        "need": "Compare journeys, places, and fares",
        "soThat": "I can choose and manage a booking.",
        "source": "Passenger designs · reconstructed task"
      },
      {
        "role": "Ticketing agent",
        "need": "Enter passenger details and record received payment",
        "soThat": "I can support the purchase and follow-up.",
        "source": "Agent designs · reconstructed task"
      },
      {
        "role": "Vessel owner",
        "need": "Review capacity, sales, and transactions",
        "soThat": "I can understand the service’s operational picture.",
        "source": "Owner designs · reconstructed task"
      },
      {
        "role": "Authority reviewer",
        "need": "Connect timetable requests with returned information",
        "soThat": "I can provide a traceable response.",
        "source": "Timetable designs · reconstructed task"
      }
    ]
  },
  "requirements": [
    {
      "need": "Separate responsibilities",
      "evidence": "Two user portals and two administration panels cover different tasks.",
      "response": "Give each role relevant actions and shared booking context."
    },
    {
      "need": "Explain the booking",
      "evidence": "Search, vessel layouts, passenger details, and fare views.",
      "response": "Connect journey choice with place, passenger, and cost review."
    },
    {
      "need": "Distinguish payment tasks",
      "evidence": "Passengers choose payment methods; agents record received payment.",
      "response": "Keep direct and assisted checkout responsibilities clear."
    },
    {
      "need": "Show the operational picture",
      "evidence": "Owner views include capacity, sales, balances, and transactions.",
      "response": "Group service and financial information for review."
    },
    {
      "need": "Make handoffs traceable",
      "evidence": "Timetable views include request identity, status, and provided information.",
      "response": "Separate submission, review, and returned information."
    },
    {
      "need": "Cover follow-up",
      "evidence": "Failure, change, cancellation, and passenger verification states.",
      "response": "Show the next action beyond the successful booking."
    }
  ],
  "research": {
    "intro": "SRS review established the scope. The artifact observations below explain the preserved designs.",
    "methods": [
      {
        "title": "Requirements",
        "body": "Reviewed the SRS and defined the interface scope.",
        "status": "Documented activity"
      },
      {
        "title": "User needs",
        "body": "Developed personas and task stories for user and client needs.",
        "status": "Documented activity"
      },
      {
        "title": "Early structure",
        "body": "Notebook studies explore search, vessel results, decks, and seats.",
        "status": "Original sketch evidence"
      },
      {
        "title": "Service review",
        "body": "Compared tasks and handoffs across the archived design files.",
        "status": "Retrospective review"
      }
    ],
    "findings": [
      {
        "title": "Shared outcome, different actions",
        "body": "Passenger payment choices differ from the agent’s received-payment action.",
        "evidence": "Passenger and agent payment views"
      },
      {
        "title": "Context before commitment",
        "body": "Journey, selected place, passenger details, and fare need to stay connected.",
        "evidence": "Passenger booking views"
      },
      {
        "title": "Trace the handoff",
        "body": "Request lists and returned information keep timetable review identifiable.",
        "evidence": "Timetable and administration views"
      },
      {
        "title": "Operations need their own view",
        "body": "Capacity, sales, balances, and transactions serve the owner’s review task.",
        "evidence": "Owner views"
      },
      {
        "title": "Include follow-up",
        "body": "Failure, change, cancellation, and verification appear as explicit states.",
        "evidence": "Booking follow-up views"
      }
    ]
  },
  "challenges": [
    {
      "title": "Different responsibilities",
      "detail": "Each participant needs different information and actions.",
      "response": "Use role-specific views with recognizable shared booking information."
    },
    {
      "title": "Choice and cost",
      "detail": "Journey and selected place must retain their fare context.",
      "response": "Connect search, selection, passenger entry, and fare review."
    },
    {
      "title": "Direct and assisted sales",
      "detail": "Passengers and agents perform different payment tasks.",
      "response": "Give each role its own checkout actions."
    },
    {
      "title": "Requested and provided times",
      "detail": "A timetable request and its response contain different information.",
      "response": "Use request identity, status, and distinct requested/provided fields."
    },
    {
      "title": "Capacity and sales",
      "detail": "Owners need to relate remaining places to sales information.",
      "response": "Group capacity, sales, balances, and transactions."
    },
    {
      "title": "After the purchase",
      "detail": "Payment recovery, changes, and cancellation need separate next steps.",
      "response": "Represent each follow-up state and its relevant action."
    }
  ],
  "personasIntro": "Reconstructed role stories connect the archived tasks to system needs; they are not interview-derived personas.",
  "personas": [
    {
      "role": "The passenger",
      "story": "A passenger compares journeys for a route and date. Before paying, they need to check the selected place and fare, then understand ticket follow-up.",
      "userStory": "As a passenger, I need clear journey, place, and fare information to book and manage a ticket.",
      "goal": "Choose and manage a booking.",
      "context": "Direct passenger booking.",
      "needs": [
        "Journey and fare comparison",
        "Seat/deck and passenger review",
        "Ticket follow-up"
      ],
      "frictions": [
        "An unclear next step after payment failure or a change."
      ],
      "designResponse": "The designs connect search and fare review with ticket, failure, change, and cancellation states.",
      "basis": "Reconstructed from passenger screens; friction is a hypothesis."
    },
    {
      "role": "The ticketing agent",
      "story": "An agent finds a journey and enters a passenger’s details. They record received payment and later use purchase history for follow-up.",
      "userStory": "As an agent, I need passenger details, received-payment controls, and history to support a booking.",
      "goal": "Support and retrieve a purchase.",
      "context": "Assisted ticket purchase.",
      "needs": [
        "Passenger details",
        "Received-payment action",
        "History and follow-up"
      ],
      "frictions": [
        "Confusing assisted payment with passenger checkout."
      ],
      "designResponse": "The agent prototype groups assisted purchase, received payment, history, and follow-up.",
      "basis": "Reconstructed from agent screens."
    },
    {
      "role": "The vessel owner",
      "story": "A vessel owner reviews services, sold places, and remaining capacity. They need sales, balance, and transaction information alongside that operational picture.",
      "userStory": "As an owner, I need connected capacity, sales, and account information to review services.",
      "goal": "Review service operations.",
      "context": "Owner service and account views.",
      "needs": [
        "Capacity and seat details",
        "Sales information",
        "Balances and transactions"
      ],
      "frictions": [
        "Capacity and financial figures losing their context."
      ],
      "designResponse": "Owner views connect launch services with capacity, sales, balances, and transactions.",
      "basis": "Reconstructed from owner screens."
    },
    {
      "role": "The authority reviewer",
      "story": "A reviewer receives vessel, route, and expected-time details. They need to return schedule and berthing information while keeping the request identifiable.",
      "userStory": "As a reviewer, I need identifiable requests and clear returned information to complete the timetable handoff.",
      "goal": "Review and respond to timetable requests.",
      "context": "Timetable administration.",
      "needs": [
        "Request details",
        "Identity and status",
        "Provided timetable information"
      ],
      "frictions": [
        "Confusing expected times with provided times."
      ],
      "designResponse": "The designs distinguish requested and provided information using request identity and status.",
      "basis": "Reconstructed review task; organizational role labels vary across source files."
    }
  ],
  "process": [
    {
      "stage": "Understand",
      "activity": "Review the SRS and user/client needs.",
      "output": "Scope for two user portals and two administration panels.",
      "basis": "Documented activity"
    },
    {
      "stage": "Define",
      "activity": "Describe the people, tasks, and responsibilities.",
      "output": "Personas and role-specific task stories.",
      "basis": "Documented activity"
    },
    {
      "stage": "Explore",
      "activity": "Explore search, vessel results, decks, and seats.",
      "output": "Early layout studies.",
      "basis": "Original sketch evidence; supplementary reconstructions labeled"
    },
    {
      "stage": "Prototype",
      "activity": "Design the interfaces in Adobe XD.",
      "output": "Booking, operations, timetable, and follow-up views.",
      "basis": "Original design artifacts"
    },
    {
      "stage": "Review and deliver",
      "activity": "Demonstrate the prototype and deliver the work.",
      "output": "Client demonstration and design delivery.",
      "basis": "Documented outcome; detailed feedback unavailable"
    }
  ],
  "sketches": {
    "intro": "Original studies explored booking structure. This generated notebook study explains search, selection, review, and follow-up.",
    "variant": "booking",
    "pictures": [
      {
        "image": "/projects/biwta/sketch-study.webp",
        "alt": "Reconstructed blue-ballpoint BIWTA booking sketches on a cream lined spiral notebook",
        "title": "Booking study",
        "caption": "Search, place selection, fare review, and ticket follow-up in one reconstructed study.",
        "basis": "Generated reconstruction"
      }
    ],
    "annotations": [
      {
        "title": "Start with the journey",
        "body": "Start with route and date."
      },
      {
        "title": "Show the choice in context",
        "body": "Keep vessel and place choices connected."
      },
      {
        "title": "Pause before commitment",
        "body": "Review passenger details and fare before payment."
      },
      {
        "title": "Leave room for follow-up",
        "body": "Give changes and cancellation separate paths."
      }
    ]
  },
  "wireframe": {
    "intro": "A reconstructed bridge from early layout questions to the original prototype.",
    "variant": "booking",
    "annotations": [
      {
        "title": "Journey context",
        "body": "Keep route and date visible."
      },
      {
        "title": "Vessel and place choices",
        "body": "Connect vessel comparison with layout selection."
      },
      {
        "title": "Passenger and fare review",
        "body": "Group passenger and fare information."
      },
      {
        "title": "Ticket follow-up",
        "body": "Separate recovery, changes, and cancellation."
      }
    ]
  },
  "sitemap": {
    "intro": "Explore the service’s booking, sales, operations, and review areas.",
    "nodes": [
      {
        "label": "Passenger booking",
        "children": [
          {
            "label": "Route/date search and vessel results"
          },
          {
            "label": "Seat / deck selection"
          },
          {
            "label": "Passenger and fare review"
          },
          {
            "label": "Payment and ticket information"
          },
          {
            "label": "Payment failure, change, and cancellation"
          }
        ]
      },
      {
        "label": "Agent booking",
        "children": [
          {
            "label": "Assisted purchase"
          },
          {
            "label": "Passenger and payment details"
          },
          {
            "label": "Received payment"
          },
          {
            "label": "History and follow-up"
          }
        ]
      },
      {
        "label": "Owner operations",
        "children": [
          {
            "label": "Services and seat details"
          },
          {
            "label": "Capacity and sales information"
          },
          {
            "label": "Balance and transactions"
          }
        ]
      },
      {
        "label": "Timetable handoff",
        "children": [
          {
            "label": "Vessel, route, and expected times"
          },
          {
            "label": "Submit and track request"
          },
          {
            "label": "Authority review"
          },
          {
            "label": "Returned timetable and berthing information"
          }
        ]
      }
    ],
    "note": "Reconstructed functional grouping; some branches represent actions or states. Source role labels vary."
  },
  "inspiration": {
    "intro": "Three retrospective principles explain the service structure.",
    "cards": [
      {
        "title": "Compare",
        "principle": "Bring decision information together.",
        "application": "Connect journey, selected place, and fare."
      },
      {
        "title": "Track",
        "principle": "Make identity and state visible.",
        "application": "Trace timetable requests through review."
      },
      {
        "title": "Recover",
        "principle": "Explain the next action.",
        "application": "Include failure, changes, and cancellation."
      }
    ]
  },
  "planningArtifacts": {
    "intro": "Original generic-commerce planning reference; it does not establish BIWTA payment policy.",
    "pictures": [
      {
        "image": "/projects/biwta-payment-flow.svg",
        "alt": "Original generic purchase and payment planning diagram supplied with the BIWTA materials",
        "title": "Original payment-planning reference",
        "caption": "Original purchase-flow reference. Cart and cash-on-delivery labels are not verified BIWTA features.",
        "basis": "Original supporting artifact"
      }
    ]
  }
};
