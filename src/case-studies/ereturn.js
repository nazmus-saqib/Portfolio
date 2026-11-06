// Historical artifacts and retrospective explanations remain distinguished in the presentation.
export const ereturnExpansion = {
  "needs": {
    "intro": "Help taxpayers establish access, complete relevant financial sections, and review the return together.",
    "stories": [
      {
        "role": "Preparing and reviewing a return",
        "need": "Find relevant sections and review my entries",
        "soThat": "I can understand the return as a whole.",
        "basis": "Reconstructed from requirements and filing designs"
      },
      {
        "role": "Continuing after a mobile-record mismatch",
        "need": "Understand the mismatch and correction action",
        "soThat": "I know how registration can continue.",
        "basis": "Reconstructed from Journey 2"
      },
      {
        "role": "Continuing through Tax Circle verification",
        "need": "Connect my form, token, and office visit",
        "soThat": "I can complete the verification handoff.",
        "basis": "Reconstructed from Journeys 3 and 3.1"
      }
    ]
  },
  "requirements": [
    {
      "need": "Explain access",
      "evidence": "Registration flows include mobile, eTIN, CAPTCHA, checks, and OTP.",
      "response": "Show the required information and next action."
    },
    {
      "need": "Support correction",
      "evidence": "Journey 2 includes another-number entry and a mismatch prompt.",
      "response": "Explain record mismatch and its correction path."
    },
    {
      "need": "Connect the office handoff",
      "evidence": "Journeys 3 and 3.1 connect a token with Tax Circle review.",
      "response": "Identify preparation, the next actor, and account continuation."
    },
    {
      "need": "Establish filing context",
      "evidence": "Workbook factors include assessment, residency, location, and income sources.",
      "response": "Ask relevant context questions before detailed entry."
    },
    {
      "need": "Accommodate income variations",
      "evidence": "NBR notes and workbook schedules distinguish financial circumstances.",
      "response": "Use category-specific and repeatable entry patterns."
    },
    {
      "need": "Clarify amount types",
      "evidence": "Schedules distinguish entered, exempted, and taxable information.",
      "response": "Keep labels and summary relationships recognizable."
    },
    {
      "need": "Separate progress actions",
      "evidence": "Sketches distinguish adding, Back, Save Draft, and Save and Continue.",
      "response": "Make adding, saving, and navigation distinct."
    },
    {
      "need": "Connect detail and review",
      "evidence": "Workbook totals and prototype summaries bring information together.",
      "response": "Link financial entry with computation and return review."
    }
  ],
  "research": {
    "intro": "Client visits and team requirements analysis informed the work. These findings summarize the preserved artifacts.",
    "methods": [
      {
        "title": "Client requirements",
        "body": "Gathered requirements and clarified scope, challenges, and possible solutions.",
        "status": "Documented team activity"
      },
      {
        "title": "Working documents",
        "body": "Reviewed Workflow.xlsx and NBR notes covering categories, schedules, dependencies, and summaries.",
        "status": "Historical requirements"
      },
      {
        "title": "Research and testing",
        "body": "Contributed research, wireframes, prototypes, and usability testing; detailed test findings are unavailable.",
        "status": "Recorded activity"
      },
      {
        "title": "Process artifacts",
        "body": "Connected registration flows, sketches, reference material, and the shared prototype.",
        "status": "Artifact review"
      }
    ],
    "findings": [
      {
        "title": "Access has alternatives",
        "body": "Matched information, mobile mismatch, and non-NID verification need different continuations.",
        "evidence": "Original registration diagrams"
      },
      {
        "title": "Handoffs need continuity",
        "body": "The token connects online information with officer review and subsequent access.",
        "evidence": "Journeys 3 and 3.1"
      },
      {
        "title": "Context changes the detail",
        "body": "Income circumstances determine relevant fields and repeated items.",
        "evidence": "NBR notes, workbook, and prototype"
      },
      {
        "title": "Inputs need an overview",
        "body": "Detailed amounts must remain connected to totals, adjustments, and review.",
        "evidence": "Workbook schedules and Return worksheet"
      },
      {
        "title": "Some requirements remain open",
        "body": "Scope priorities, blanks, and TODOs identify decisions requiring clarification.",
        "evidence": "Working requirements notes"
      },
      {
        "title": "Progress actions differ",
        "body": "Adding an item, saving work, and continuing serve distinct tasks.",
        "evidence": "Notebook studies and prototype"
      }
    ]
  },
  "challenges": [
    {
      "title": "Different access scenarios",
      "detail": "Verification circumstances require different next steps.",
      "response": "Map matched, correction, and non-NID routes."
    },
    {
      "title": "Interrupted registration",
      "detail": "Mobile information may not match verification records.",
      "response": "Provide correction guidance and continuation when matching succeeds."
    },
    {
      "title": "Digital-to-office handoff",
      "detail": "Non-NID verification moves from a form to officer review.",
      "response": "Connect form, token, Tax Circle, and account continuation."
    },
    {
      "title": "Conditional financial detail",
      "detail": "Different circumstances require different fields.",
      "response": "Use named sections, category forms, and repeated entries."
    },
    {
      "title": "Amounts need context",
      "detail": "Entered, exempted, and taxable amounts contribute to summaries.",
      "response": "Use clear labels and connected review views."
    },
    {
      "title": "Progress and review",
      "detail": "Adding, saving, continuing, and reviewing have different purposes.",
      "response": "Separate actions and reconnect entries in the return view."
    }
  ],
  "personasIntro": "Reconstructed scenario personas describe overlapping tasks. One taxpayer may encounter more than one scenario.",
  "personas": [
    {
      "role": "The taxpayer assembling a complete return",
      "goal": "Complete and review relevant sections.",
      "context": "Several financial categories and entries.",
      "story": "A taxpayer has information in several financial categories, including repeated items. They need to enter the details and check how everything contributes to the return.",
      "userStory": "As a taxpayer, I need organized entry and a connected review to understand my return.",
      "needs": [
        "Recognizable financial groups",
        "Clear add, save, and continue actions",
        "Connected summaries and review"
      ],
      "frictions": [
        "Losing context between detailed entries and the overall return."
      ],
      "designResponse": "Category forms and repeated-entry patterns connect detailed information with summaries and Return View.",
      "basis": "Reconstructed from requirements, notebook studies, and prototype; friction is a hypothesis."
    },
    {
      "role": "The taxpayer facing a mobile-record mismatch",
      "goal": "Resolve the access interruption.",
      "context": "Mobile information does not match records.",
      "story": "A taxpayer reaches a mobile-record mismatch during registration. They need to understand the interruption, correct the information, and know how to continue.",
      "userStory": "As a taxpayer facing a mismatch, I need clear correction guidance to continue registering.",
      "needs": [
        "Understand the matching issue",
        "Correct appropriate information",
        "Know the next verification step"
      ],
      "frictions": [
        "A message that does not explain the issue or next action."
      ],
      "designResponse": "Journey 2 provides correction and continuation toward OTP when matching succeeds.",
      "basis": "Reconstructed from Journey 2 and the combined flow."
    },
    {
      "role": "The taxpayer needing Tax Circle verification",
      "goal": "Complete verification and reach account access.",
      "context": "Online information continues through Tax Circle review.",
      "story": "A taxpayer completes the non-NID form and receives a token. They need clear preparation for officer review and an explanation of how account access continues.",
      "userStory": "As a taxpayer needing office verification, I need a clear token handoff to complete the next stage.",
      "needs": [
        "Preparation for the office stage",
        "Token and responsible-actor guidance",
        "Account-access continuation"
      ],
      "frictions": [
        "Mistaking token receipt for completed activation."
      ],
      "designResponse": "Journeys 3 and 3.1 connect the form, token, officer review, and subsequent access.",
      "basis": "Reconstructed from Journeys 3 and 3.1."
    }
  ],
  "registrationJourneys": {
    "intro": "Choose a scenario to follow the next action and responsible actor.",
    "note": "Historical planned alternatives; current integrations, eligibility, and security are not assessed.",
    "routes": [
      {
        "label": "Information matches",
        "title": "Continue with OTP",
        "summary": "Matching information follows the OTP route.",
        "steps": [
          {
            "title": "Enter registration details",
            "actor": "Taxpayer",
            "body": "Mobile number, eTIN, and CAPTCHA."
          },
          {
            "title": "Compare records",
            "actor": "Planned service check",
            "body": "Check the identity and mobile information shown in planning."
          },
          {
            "title": "Verify OTP",
            "actor": "Service and taxpayer",
            "body": "Send and enter the verification code."
          },
          {
            "title": "Set a password",
            "actor": "Taxpayer",
            "body": "Create and confirm a password before the dashboard."
          }
        ],
        "outcome": "Password setup leads to the dashboard.",
        "basis": "Original Journey 1",
        "pictures": [
          {
            "image": "/projects/ereturn/registration-matched-original.webp",
            "title": "Original registration flow: information matches",
            "alt": "Original Miro registration flow mapping mobile and eTIN input, verification, OTP, password setup, and dashboard",
            "caption": "Journey 1: matched information, OTP, password setup, and dashboard.",
            "basis": "Original historical artifact"
          }
        ]
      },
      {
        "label": "Mobile mismatch",
        "title": "Correct a mobile mismatch",
        "summary": "A matching issue needs an understandable correction path.",
        "steps": [
          {
            "title": "Identify the mismatch",
            "actor": "Planned service check",
            "body": "Entered mobile information does not match the records."
          },
          {
            "title": "Correct the information",
            "actor": "Taxpayer",
            "body": "Use the another-number entry route shown in the flow."
          },
          {
            "title": "Check the matching outcome",
            "actor": "Planned service check",
            "body": "If matched, continue to OTP; otherwise, show correction guidance."
          }
        ],
        "outcome": "Matching information continues to OTP; unmatched information needs correction.",
        "basis": "Original Journey 2",
        "pictures": [
          {
            "image": "/projects/ereturn/registration-mismatch-original.webp",
            "title": "Original registration flow: mobile mismatch",
            "alt": "Original Miro registration flow with another-mobile-number correction and matching continuation",
            "caption": "Journey 2: correction and matching continuation.",
            "basis": "Original historical artifact"
          }
        ]
      },
      {
        "label": "Tax Circle handoff",
        "title": "Continue through officer review",
        "summary": "The non-NID route connects online registration with a Tax Circle visit.",
        "steps": [
          {
            "title": "Complete the form",
            "actor": "Taxpayer",
            "body": "Provide the additional information and active mobile number."
          },
          {
            "title": "Receive the token",
            "actor": "Digital service",
            "body": "Explain preparation for the office stage."
          },
          {
            "title": "Show the token",
            "actor": "Taxpayer",
            "body": "Continue the handoff at the Tax Circle."
          },
          {
            "title": "Review the information",
            "actor": "DCT / reviewing officer",
            "body": "Verify the submitted information."
          },
          {
            "title": "Resume account access",
            "actor": "Service and taxpayer",
            "body": "The historical flow maps temporary login and password setup."
          }
        ],
        "outcome": "Account access continues after officer verification; a token alone does not complete activation.",
        "basis": "Original Journeys 3 and 3.1",
        "pictures": [
          {
            "image": "/projects/ereturn/registration-non-nid-original.webp",
            "title": "Original registration flow: non-NID route",
            "alt": "Original Miro non-NID registration flow with additional form, token, and office-verification handoff",
            "caption": "Journey 3: additional form, token, and Tax Circle handoff.",
            "basis": "Original historical artifact"
          },
          {
            "image": "/projects/ereturn/registration-circle-original.webp",
            "title": "Original continuation: Tax Circle verification",
            "alt": "Original Miro continuation showing token presentation, officer review, and account-access steps",
            "caption": "Journey 3.1: officer verification and account-access continuation.",
            "basis": "Original historical artifact"
          }
        ]
      }
    ]
  },
  "process": [
    {
      "stage": "Understand",
      "activity": "Visit the client and analyze requirements with the team.",
      "output": "Shared scope and open questions.",
      "basis": "Recorded activity and requirements"
    },
    {
      "stage": "Define",
      "activity": "Clarify tasks, information, and responsible actors.",
      "output": "Access scenarios and information groups.",
      "basis": "Retrospective structure from artifacts"
    },
    {
      "stage": "Explore",
      "activity": "Explore references, layout groups, and progress actions.",
      "output": "Reference board, sketches, and flow planning.",
      "basis": "Original supplied material"
    },
    {
      "stage": "Prototype",
      "activity": "Represent access, financial entry, and review.",
      "output": "Shared Adobe XD prototype.",
      "basis": "Original team design artifact"
    },
    {
      "stage": "Review",
      "activity": "Contribute usability-testing work.",
      "output": "Proposed checks connect tasks with design decisions.",
      "basis": "Activity recorded; detailed results unavailable"
    },
    {
      "stage": "Deliver",
      "activity": "Demonstrate and deliver the design.",
      "output": "Client demonstration before the deadline.",
      "basis": "Recorded outcome"
    }
  ],
  "sketches": {
    "intro": "Notebook studies explore navigation, grouped fields, repeated entries, and progress controls.",
    "reconstructionNote": "Displayed studies are portfolio reconstructions based on the preserved design scope.",
    "variant": "filing",
    "pictures": [
      {
        "image": "/projects/ereturn/sketch-return-review.webp",
        "fullSize": "/projects/ereturn/sketch-return-review.png",
        "title": "Supporting sections and review",
        "alt": "Blue-ballpoint notebook study of supporting financial sections, return summaries, tax and payment information",
        "caption": "Connect supporting sections to the return and payment overview.",
        "basis": "Generated reconstruction"
      },
      {
        "image": "/projects/ereturn/sketch-access-income.webp",
        "fullSize": "/projects/ereturn/sketch-access-income.png",
        "title": "Access and income",
        "alt": "Blue-ballpoint notebook study of registration, recovery, assessment context and repeatable income entry",
        "caption": "Registration, recovery, assessment context, and repeatable income entries.",
        "basis": "Generated reconstruction"
      },
      {
        "image": "/projects/ereturn/sketch-access-context.webp",
        "fullSize": "/projects/ereturn/sketch-access-context.png",
        "title": "Access, context, and review",
        "alt": "Blue-ballpoint notebook layout study of access, financial entry, progress controls and return review",
        "caption": "Layout exploration; see the original registration diagrams for verification routes.",
        "basis": "Generated reconstruction"
      }
    ],
    "annotations": [
      {
        "title": "Group the work",
        "body": "Show where each form belongs."
      },
      {
        "title": "Focus the entry area",
        "body": "Group fields and separate adding from continuing."
      },
      {
        "title": "Connect entry with review",
        "body": "Connect detailed input with the overall return."
      }
    ]
  },
  "wireframe": {
    "intro": "A reconstructed layout connecting section navigation, entry, and review.",
    "reconstructionNote": "Portfolio reconstruction, not an archived wireframe.",
    "variant": "filing",
    "annotations": [
      {
        "title": "Section context",
        "body": "Identify the current task."
      },
      {
        "title": "A consistent working area",
        "body": "Keep relevant fields and actions together."
      },
      {
        "title": "A connected review",
        "body": "Reconnect details in a summary."
      }
    ]
  },
  "sitemap": {
    "intro": "Explore access, filing context, financial information, and review.",
    "note": "Reconstructed functional map. Branches include actions and states; Tax Circle review is an external handoff.",
    "nodes": [
      {
        "label": "eTax Services",
        "children": [
          {
            "label": "eReturn",
            "children": [
              {
                "label": "Access",
                "children": [
                  {
                    "label": "Registration inputs"
                  },
                  {
                    "label": "Verification routes"
                  },
                  {
                    "label": "OTP and password setup"
                  },
                  {
                    "label": "Login and recovery"
                  }
                ],
                "description": "Registration and continuation before financial entry."
              },
              {
                "label": "Filing context",
                "children": [
                  {
                    "label": "Assessment context"
                  },
                  {
                    "label": "Income context"
                  },
                  {
                    "label": "Additional questions"
                  }
                ],
                "description": "Questions establish relevant filing circumstances."
              },
              {
                "label": "Financial information",
                "children": [
                  {
                    "label": "Income categories and repeated entries"
                  },
                  {
                    "label": "Assets and liabilities"
                  },
                  {
                    "label": "Expenditure"
                  },
                  {
                    "label": "Rebate"
                  },
                  {
                    "label": "Tax and payment information"
                  }
                ],
                "description": "Category forms and repeated-entry patterns."
              },
              {
                "label": "Review",
                "children": [
                  {
                    "label": "Summaries and computation"
                  },
                  {
                    "label": "Payment information and follow-up"
                  },
                  {
                    "label": "Return view"
                  }
                ],
                "description": "Summaries connect the entered details."
              }
            ]
          }
        ]
      },
      {
        "label": "Tax Circle / DCT verification",
        "external": true,
        "description": "Officer-led verification connected to the non-NID route."
      }
    ]
  },
  "inspiration": {
    "showIllustrations": false,
    "intro": "Original references: Excel’s structured workspace and Google’s focused starting point.",
    "note": "These principles are retrospective interpretations of the supplied board.",
    "cards": [
      {
        "title": "Excel: organize information",
        "principle": "Use predictable labels and groups.",
        "application": "Apply recognizable sections and consistent entry patterns."
      },
      {
        "title": "Google: focus the next action",
        "principle": "Make the starting point clear.",
        "application": "Give the immediate action a clear visual hierarchy."
      }
    ]
  },
  "planningArtifacts": {
    "intro": "Original requirements notes and registration overview. Private workbook values remain unpublished.",
    "pictures": [
      {
        "image": "/projects/ereturn/requirements-income-notes-original.webp",
        "title": "Income requirements notes",
        "alt": "First page of historical NBR requirements notes listing income categories and variations",
        "caption": "Historical working requirements; not current tax guidance.",
        "basis": "Original historical artifact"
      },
      {
        "image": "/projects/ereturn/registration-overview-original.webp",
        "title": "Combined registration overview",
        "alt": "Original Miro overview combining matched information, mobile correction, and non-NID office verification",
        "caption": "The original overview connects alternative access routes.",
        "basis": "Original historical artifact"
      }
    ]
  },
  "evaluation": {
    "intro": "Proposed checks derived from the persona stories, not historical test results.",
    "tasks": [
      {
        "title": "Prepare and review several entries",
        "body": "Find two income categories, add an item, distinguish saving from continuing, and locate review."
      },
      {
        "title": "Continue after a mobile-record mismatch",
        "body": "Explain the mismatch, find correction, and describe what follows a successful match."
      },
      {
        "title": "Explain the Tax Circle handoff",
        "body": "Explain online steps, the token, office review, and account continuation."
      }
    ]
  }
};
