// Historical artifacts and retrospective explanations remain distinguished in the presentation.
export const biwtaExpansion = {
  "needs": {
    "intro": "Four portals support one transport service, with a distinct task for each role.",
    "stories": [
      {
        "role": "Passenger",
        "need": "Choose the right journey and accommodation",
        "soThat": "I can buy, retrieve, and manage my ticket.",
        "source": "Passenger Portal and terminal findings · Portfolio.pdf"
      },
      {
        "role": "Ticketing agent",
        "need": "Book for a passenger and retrieve their purchase",
        "soThat": "I can print tickets and handle changes or cancellation.",
        "source": "Agent Portal · Portfolio.pdf"
      },
      {
        "role": "Vessel authority",
        "need": "Request a timetable and track BIWTA’s response",
        "soThat": "I can coordinate assigned times and berthing.",
        "source": "Vessel Authority Portal · Portfolio.pdf"
      },
      {
        "role": "Vessel owner",
        "need": "Review vessel sales and disbursements",
        "soThat": "I can understand performance and track money movements.",
        "source": "Vessel Owner Portal · Portfolio.pdf"
      }
    ]
  },
  "requirements": [
    {
      "need": "Four distinct portals",
      "evidence": "The requirements analysis identifies Passenger, Agent, Vessel Authority, and Vessel Owner.",
      "response": "Give each role a focused workspace and relevant actions."
    },
    {
      "need": "Real vessel accommodation",
      "evidence": "The terminal study distinguishes deck admission, chairs, sofas, beds, and cabin options.",
      "response": "Use passenger quantity for deck admission and separate floor layouts for selectable places."
    },
    {
      "need": "Direct and assisted booking",
      "evidence": "Passengers purchase directly; agents gather passenger details, book, and print tickets.",
      "response": "Keep passenger checkout and agent received-payment responsibilities distinct."
    },
    {
      "need": "Ticket follow-up",
      "evidence": "The PDF describes account history, ticket download, lookup, changes, and cancellation.",
      "response": "Keep previous bookings accessible and provide the relevant follow-up actions."
    },
    {
      "need": "Track timetable requests",
      "evidence": "Vessel authorities submit expected times and receive assigned times and berthing information from BIWTA.",
      "response": "Keep requests, status, and returned information connected."
    },
    {
      "need": "Vessel sales and disbursements",
      "evidence": "Owners review vessel lists, sold places, sales amount, and disbursement history.",
      "response": "Connect service-level sales with balances, fund transfer, and transaction history."
    }
  ],
  "research": {
    "intro": "The SRS established four portals. When the vessel layout remained unclear, I visited a launch terminal to understand accommodation, physical ticket sales, and the existing service.",
    "methods": [
      {
        "title": "Requirements review",
        "body": "Mapped the SRS to four web portals and their users.",
        "status": "Documented in Portfolio.pdf"
      },
      {
        "title": "Desk research",
        "body": "Searched for local vessel layouts; online references did not resolve the design questions.",
        "status": "Documented in Portfolio.pdf"
      },
      {
        "title": "Terminal visit",
        "body": "Visited a launch terminal to understand accommodation arrangements and physical ticketing.",
        "status": "Documented field research"
      },
      {
        "title": "Design artifact review",
        "body": "Compared preserved portal screens to explain responsibilities and handoffs.",
        "status": "Retrospective review"
      }
    ],
    "findings": [
      {
        "title": "Deck admission is not an assigned seat",
        "body": "The documented terminal study identified the ground deck as entrance-only accommodation without assigned seats.",
        "evidence": "Portfolio.pdf · Research and Findings"
      },
      {
        "title": "Accommodation differs by floor",
        "body": "Floor 1 included chairs, sofas, and single or double beds with or without AC. Floor 2 included beds and VIP or Semi-VIP options. These describe the documented study, rather than every vessel.",
        "evidence": "Portfolio.pdf · Findings; original floor prototypes"
      },
      {
        "title": "Each role completes a different task",
        "body": "Passengers purchase, agents assist, vessel authorities request schedules, and owners review sales and disbursements.",
        "evidence": "Portfolio.pdf · Requirements Analysis and portal descriptions"
      },
      {
        "title": "A request is different from an assigned time",
        "body": "Vessel authorities supply expected times; BIWTA returns assigned timetable and berthing information.",
        "evidence": "Portfolio.pdf · Vessel Authority; timetable prototypes"
      },
      {
        "title": "Booking continues after checkout",
        "body": "Account history, ticket download, lookup, changes, and cancellation support the work after purchase.",
        "evidence": "Portfolio.pdf · Passenger and Agent portals"
      }
    ]
  },
  "challenges": [
    {
      "title": "Understand an unfamiliar vessel layout",
      "detail": "Familiar bus or train seat patterns could not explain local launch accommodation, and a usable vessel plan was unavailable.",
      "response": "I visited the terminal, then distinguished deck admission from selectable chairs, sofas, beds, and cabin options.",
      "pictures": [
        {
          "image": "/projects/biwta/prototype-passenger-deck.webp",
          "fullSize": "/projects/biwta/prototype-passenger-deck.jpg",
          "title": "Deck admission, without assigned seats",
          "alt": "Deck admission, without assigned seats",
          "caption": "Passenger quantity and trip review replace a seat grid for deck admission.",
          "basis": "Original prototype · Portfolio.pdf"
        }
      ]
    },
    {
      "title": "Keep direct and assisted sales distinct",
      "detail": "A passenger pays for their journey; an agent enters another passenger’s details and records received payment.",
      "response": "I designed role-specific booking actions, with fare review, ticket access, and lookup suited to each role.",
      "pictures": [
        {
          "image": "/projects/biwta/prototype-agent-montage.webp",
          "fullSize": "/projects/biwta/prototype-agent-montage.png",
          "title": "The assisted-booking workspace",
          "alt": "The assisted-booking workspace",
          "caption": "The supplied montage connects vessel search, passenger entry, fare review, profile management, and history lookup.",
          "basis": "Privacy-edited original prototype"
        }
      ]
    },
    {
      "title": "Make timetable handoffs traceable",
      "detail": "Expected journey times must remain distinct from the timetable and berthing information assigned by BIWTA.",
      "response": "I kept request identity, status, submitted details, and returned schedule information connected.",
      "pictures": [
        {
          "image": "/projects/biwta/prototype-authority-response.webp",
          "fullSize": "/projects/biwta/prototype-authority-response.jpg",
          "title": "Read the assigned timetable",
          "alt": "Read the assigned timetable",
          "caption": "Assigned arrival and departure times, berthing details, and approval status belong to the response.",
          "basis": "Original prototype · Portfolio.pdf"
        }
      ]
    },
    {
      "title": "Connect capacity, sales, and disbursements",
      "detail": "Owners need to understand vessel performance and track money movements without losing service context.",
      "response": "I connected vessel search and accommodation-level sales with balances, fund transfer, and transaction history.",
      "pictures": [
        {
          "image": "/projects/biwta/prototype-owner-sales.webp",
          "fullSize": "/projects/biwta/prototype-owner-sales.jpg",
          "title": "Capacity and sales by category",
          "alt": "Capacity and sales by category",
          "caption": "Compare total capacity, sold places, remaining availability, and sold amount for each accommodation category.",
          "basis": "Original prototype · Portfolio.pdf"
        }
      ]
    }
  ],
  "personasIntro": "Four illustrative personas connect documented portal tasks to realistic situations. Names and stories are reconstructed; they are not research participants.",
  "personas": [
    {
      "role": "Farhana · Passenger",
      "story": "Farhana is arranging a journey home. She wants to compare departures and understand whether she is buying deck admission, a chair, or a cabin before paying. After booking, she needs to find and download her ticket if plans change.",
      "userStory": "As a passenger, I need clear accommodation and fare choices so I can book the right journey and manage my ticket.",
      "goal": "Choose the right accommodation and keep the ticket accessible.",
      "context": "Direct booking through the Passenger Portal.",
      "needs": [
        "Route, date, accommodation, and fare comparison",
        "Passenger and payment review before purchase",
        "Ticket download, history, and cancellation"
      ],
      "frictions": [
        "Treating deck admission as an assigned seat.",
        "Losing access to a previous booking."
      ],
      "designResponse": "Connect search and floor layouts with fare review, then keep ticket access and follow-up in the passenger account.",
      "basis": "Illustrative persona based on Portfolio.pdf: terminal findings and Passenger Portal."
    },
    {
      "role": "Rafiq · Ticketing agent",
      "story": "Rafiq helps a customer arrange a booking. He checks the journey, enters the passenger’s details, records received payment, and prints the ticket. When the customer returns, he needs to find that purchase by ticket number or mobile number.",
      "userStory": "As an agent, I need to book on a passenger’s behalf and retrieve the purchase quickly so I can handle changes and cancellation.",
      "goal": "Complete assisted bookings and resolve follow-up requests.",
      "context": "Assisted purchase through the Agent Portal.",
      "needs": [
        "Vessel search and passenger entry",
        "Received-payment and ticket-printing controls",
        "Lookup by ticket number or passenger mobile"
      ],
      "frictions": [
        "Confusing received payment with passenger checkout.",
        "Searching manually through previous purchases."
      ],
      "designResponse": "Provide assisted booking and direct ticket lookup with separate change and cancellation actions.",
      "basis": "Illustrative persona based on Portfolio.pdf: Agent Portal, plus archived received-payment views."
    },
    {
      "role": "Nusrat · Vessel authority",
      "story": "Nusrat coordinates a vessel’s next service. She sends its route and expected arrival and departure times to BIWTA, then checks the request status. Before confirming operations, she needs to distinguish her requested times from the assigned timetable and berthing location.",
      "userStory": "As a vessel authority representative, I need to request a timetable and track BIWTA’s response so I can coordinate the vessel’s service.",
      "goal": "Obtain and track assigned timetable and berthing information.",
      "context": "Timetable requests through the Vessel Authority Portal.",
      "needs": [
        "Vessel, route, and expected-time entry",
        "Request list and visible status",
        "Assigned times, berthing time, and location"
      ],
      "frictions": [
        "Mistaking requested times for assigned times.",
        "Losing the connection between a request and its response."
      ],
      "designResponse": "Keep submitted details, request identity, status, and assigned timetable information connected.",
      "basis": "Illustrative persona based on Portfolio.pdf: Vessel Authority. BIWTA is the receiving authority."
    },
    {
      "role": "Mahmud · Vessel owner",
      "story": "Mahmud oversees several vessels. He finds a service, reviews sold places and sales amount, then checks the available balance before requesting a disbursement. He returns to transaction history to see what has already been paid out.",
      "userStory": "As a vessel owner, I need vessel-level sales and disbursement information so I can review performance and track money movements.",
      "goal": "Review each vessel’s sales and track disbursements.",
      "context": "Fleet and account review through the Vessel Owner Portal.",
      "needs": [
        "Searchable vessel list and service details",
        "Sold places and sales amount by vessel",
        "Balance, disbursement action, and history"
      ],
      "frictions": [
        "Losing vessel context when comparing sales.",
        "Uncertainty about previous disbursements."
      ],
      "designResponse": "Connect vessel-level capacity and sales with account balances and disbursement history.",
      "basis": "Illustrative persona based on Portfolio.pdf: Vessel Owner and the original owner screens."
    }
  ],
  "process": [
    {
      "stage": "Understand",
      "activity": "Review the SRS, research vessel layouts, and visit the terminal.",
      "output": "Four portal roles and observed accommodation/ticketing arrangements.",
      "basis": "Documented in Portfolio.pdf"
    },
    {
      "stage": "Define",
      "activity": "Separate each role’s task and clarify accommodation choices.",
      "output": "Portal responsibilities, user needs, and task stories.",
      "basis": "Original scope; persona stories reconstructed for this case study"
    },
    {
      "stage": "Explore",
      "activity": "Sketch route/date search, vessel results, deck admission, and floor selection.",
      "output": "Early booking layouts.",
      "basis": "Original notebook studies; restyled reconstructions labeled"
    },
    {
      "stage": "Prototype",
      "activity": "Design the four portal experiences in Adobe XD.",
      "output": "Booking, follow-up, timetable tracking, and owner account views.",
      "basis": "Original design artifacts"
    },
    {
      "stage": "Review and deliver",
      "activity": "Demonstrate the prototype to the client and deliver the design.",
      "output": "Role-specific prototypes for client review.",
      "basis": "Documented delivery; detailed test results and production metrics unavailable"
    }
  ],
  "sketches": {
    "intro": "The two early sketches are restyled to match the supplied study’s handwriting and notebook background. Together, they trace search, accommodation, and ticket follow-up.",
    "variant": "booking",
    "pictures": [
      {
        "image": "/projects/biwta/sketch-search-matched.webp",
        "fullSize": "/projects/biwta/sketch-search-matched.png",
        "title": "Search and vessel results",
        "alt": "Restyled BIWTA notebook sketch showing route/date search and vessel results in blue handwriting",
        "caption": "Route/date search leads to a vessel list with departure, arrival, and fare comparison.",
        "basis": "Style-matched reconstruction from original sketch"
      },
      {
        "image": "/projects/biwta/sketch-accommodation-matched.webp",
        "fullSize": "/projects/biwta/sketch-accommodation-matched.png",
        "title": "Deck and floor selection",
        "alt": "Restyled BIWTA notebook sketch showing deck admission and floor selection in blue handwriting",
        "caption": "The early sketch separates deck passenger quantity from the selectable floor layout. Route, time, and fare values are illustrative.",
        "basis": "Style-matched reconstruction from original sketch"
      },
      {
        "image": "/projects/biwta/sketch-booking-supplied.webp",
        "fullSize": "/projects/biwta/sketch-booking-supplied.png",
        "title": "Reconstructed: booking and follow-up",
        "alt": "User-supplied reconstructed BIWTA notebook study of booking and follow-up",
        "caption": "The supplied study connects search, place selection, fare review, payment states, and ticket follow-up. It is an explanatory reconstruction.",
        "basis": "Supplied generated reconstruction · BIWTA Sketches.zip"
      }
    ],
    "annotations": [
      {
        "title": "Start with the journey",
        "body": "Start with route and date."
      },
      {
        "title": "Show the choice in context",
        "body": "Separate deck admission from selectable floor accommodation."
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
    "intro": "Choose a portal to trace its responsibilities. BIWTA review is the receiving side of the timetable handoff.",
    "nodes": [
      {
        "label": "Passenger Portal",
        "children": [
          {
            "label": "Route/date search and vessel results"
          },
          {
            "label": "Deck admission or floor accommodation"
          },
          {
            "label": "Passenger, fare, and payment review"
          },
          {
            "label": "Profile and purchase history"
          },
          {
            "label": "Ticket download and cancellation"
          }
        ]
      },
      {
        "label": "Agent Portal",
        "children": [
          {
            "label": "Vessel search and assisted booking"
          },
          {
            "label": "Passenger details and received payment"
          },
          {
            "label": "Print ticket"
          },
          {
            "label": "Lookup by ticket number or passenger mobile"
          },
          {
            "label": "Change and cancel ticket"
          }
        ]
      },
      {
        "label": "Vessel Authority Portal",
        "children": [
          {
            "label": "Vessel, route, and expected times"
          },
          {
            "label": "Send request; track list and status"
          },
          {
            "label": "BIWTA timetable review",
            "external": true,
            "description": "BIWTA receives and reviews the request; this is a service handoff outside the requester’s actions."
          },
          {
            "label": "Assigned times and berthing information"
          }
        ]
      },
      {
        "label": "Vessel Owner Portal",
        "children": [
          {
            "label": "Vessel search and service list"
          },
          {
            "label": "Capacity, sold places, and sales amount"
          },
          {
            "label": "Balance and fund transfer"
          },
          {
            "label": "Disbursement transaction history"
          }
        ]
      }
    ],
    "note": "Reconstructed functional map based on the four portals documented in Portfolio.pdf; some branches represent actions or states."
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
      },
      {
        "image": "/projects/biwta-admin.webp",
        "title": "BIWTA review: the receiving side",
        "alt": "Original BIWTA administration timetable request list",
        "caption": "Supplementary administration view showing the requests received for review. The Vessel Authority Portal submits and tracks requests; BIWTA is the receiving party.",
        "basis": "Original Adobe XD preview"
      }
    ]
  }
};
