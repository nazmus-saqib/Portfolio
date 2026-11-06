// Historical artifacts and retrospective explanations remain distinguished in the presentation.
export const ereturnExpansion = {
  "needs": {
    "intro": "Verify phone ownership, filter relevant forms, save progress manually, and prepare a complete return without mandatory online submission.",
    "stories": [
      {
        "role": "NID-based self-registration",
        "need": "Use a phone number registered under my own NID",
        "soThat": "I can pass the ownership check before OTP.",
        "basis": "Project requirement confirmed by the designer; original registration flows"
      },
      {
        "role": "Required forms only",
        "need": "Use income-source checkboxes to include required forms and exclude extras",
        "soThat": "I do not work through irrelevant paperwork.",
        "basis": "Designer-confirmed requirement; context questions and category-specific forms"
      },
      {
        "role": "Preparing without online submission",
        "need": "Save my inputs manually and obtain a completed copy through Print",
        "soThat": "Return preparation remains useful when I choose another submission route.",
        "basis": "Project requirement confirmed by the designer"
      },
      {
        "role": "One digital return",
        "need": "Find forms within five filing sections",
        "soThat": "Different paper forms share a clear structure.",
        "basis": "Designer-confirmed rationale and navigation screenshot"
      }
    ]
  },
  "requirements": [
    {
      "need": "Verify phone ownership under the same NID",
      "evidence": "The designer confirmed that NID-based self-registration required a phone registered under the taxpayer’s NID; original flows map the matching check.",
      "response": "Use NID-linked mobile verification and a clear mismatch message before this self-registration route can continue."
    },
    {
      "need": "Show required forms only",
      "evidence": "The designer confirmed that users should fill required forms and skip additional or non-applicable forms.",
      "response": "Use income-source checkboxes to include applicable forms and exclude unnecessary forms."
    },
    {
      "need": "Prepare without online submission",
      "evidence": "The designer confirmed that users must be able to prepare a full return file even when they do not submit online.",
      "response": "Provide manual Save Draft because there is no autosave, plus Print for obtaining the completed return without mandatory online submission."
    },
    {
      "need": "Organize paper forms into five navigation sections",
      "evidence": "The designer’s explanation and prototype show Income, Rebate, Expenditure, Assets & Liabilities, and Tax & Payment.",
      "response": "Place relevant forms under the five filing sections, with Home and Return View as separate destinations."
    },
    {
      "need": "Connect the office handoff",
      "evidence": "Journeys 3 and 3.1 connect a token with Tax Circle review.",
      "response": "Identify preparation, the next actor, and account continuation."
    },
    {
      "need": "Clarify amount types",
      "evidence": "Schedules distinguish entered, exempted, and taxable information.",
      "response": "Keep labels and summary relationships recognizable."
    },
    {
      "need": "Make manual saving explicit",
      "evidence": "The designer confirmed there was no autosave; Save Draft appears on entry screens.",
      "response": "Give users an explicit way to save inputs whenever needed and distinguish it from continuing."
    }
  ],
  "research": {
    "intro": "Client requirements and team analysis informed the work. The designer’s explanations and prototype screenshots connect each challenge to a specific response.",
    "methods": [
      {
        "title": "Client requirements",
        "body": "Gathered requirements and clarified scope, challenges, and possible solutions.",
        "status": "Documented team activity"
      },
      {
        "title": "Design decisions and prototype evidence",
        "body": "The designer explained NID-linked verification, income-source filtering, manual Save Draft without autosave, Print, and five navigation sections.",
        "status": "Designer-confirmed rationale and supplied screenshots"
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
        "title": "Explain the phone-ownership rule",
        "body": "The registration screen tells users when their phone is not registered under their NID.",
        "evidence": "Designer explanation and prototype image 1"
      },
      {
        "title": "Select income sources before showing forms",
        "body": "Checkboxes filter the filing journey so users can exclude unnecessary forms.",
        "evidence": "Designer explanation and prototype image 2"
      },
      {
        "title": "Saving and submission are separate decisions",
        "body": "With no autosave, Save Draft preserves inputs manually. Print supports obtaining a completed return without submitting online.",
        "evidence": "Designer explanation; Print in image 3 and Save Draft in images 2, 4, and 6"
      },
      {
        "title": "Five sections organize the digital forms",
        "body": "Income, Rebate, Expenditure, Assets & Liabilities, and Tax & Payment hold the forms; Home and Return View are separate destinations.",
        "evidence": "Designer explanation and prototype image 4"
      },
      {
        "title": "Handoffs need continuity",
        "body": "The token connects online information with officer review and subsequent access.",
        "evidence": "Journeys 3 and 3.1"
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
      "title": "Verify phone ownership",
      "detail": "NID-based self-registration needed a phone number registered under the taxpayer’s own NID.",
      "response": "I limited NID-based self-registration to a phone registered under the taxpayer’s own NID, with a clear mismatch message to guide correction.",
      "pictures": [
        {
          "image": "/projects/ereturn/prototype-solution-1.webp",
          "fullSize": "/projects/ereturn/prototype-solution-1.png",
          "title": "Verify phone ownership",
          "alt": "Original registration screen showing the NID-linked phone mismatch message",
          "caption": "The registration screen explains when a phone is not registered under the taxpayer’s NID.",
          "basis": "Original prototype"
        }
      ]
    },
    {
      "title": "Filter forms by income source",
      "detail": "Taxpayers should complete only the forms relevant to their income.",
      "response": "I used income-source checkboxes to identify applicable forms and exclude unnecessary ones from the filing journey.",
      "pictures": [
        {
          "image": "/projects/ereturn/prototype-solution-2.webp",
          "fullSize": "/projects/ereturn/prototype-solution-2.png",
          "title": "Filter forms by income source",
          "alt": "Assessment screen with income-source checkboxes that determine relevant forms",
          "caption": "Income-source checkboxes identify the forms relevant to the taxpayer.",
          "basis": "Privacy-edited prototype screenshot"
        }
      ]
    },
    {
      "title": "Save progress and prepare without online submission",
      "detail": "Users needed a full return file without mandatory online submission, and the system had no autosave.",
      "response": "Because there was no autosave, I included Save Draft so users could save their inputs whenever needed. Print supported obtaining a completed copy for download or printing without submitting online.",
      "pictures": [
        {
          "image": "/projects/ereturn/prototype-solution-3.webp",
          "fullSize": "/projects/ereturn/prototype-solution-3.png",
          "title": "Prepare a return without submitting online",
          "alt": "Return View with a Print button and personal taxpayer details hidden",
          "caption": "Return View shows Print. Save Draft is visible in the form-entry screenshots.",
          "basis": "Privacy-edited prototype screenshot"
        }
      ]
    },
    {
      "title": "Organize forms into five sections",
      "detail": "Different paper forms needed a consistent digital structure.",
      "response": "I grouped forms into Income, Rebate, Expenditure, Assets & Liabilities, and Tax & Payment, giving users a consistent way to find forms and review their information.",
      "pictures": [
        {
          "image": "/projects/ereturn/prototype-solution-4.webp",
          "fullSize": "/projects/ereturn/prototype-solution-4.png",
          "title": "Find forms within five sections",
          "alt": "Income Details screen with five filing-section links and grouped income forms",
          "caption": "Income, Rebate, Expenditure, Assets & Liabilities, and Tax & Payment organize the forms.",
          "basis": "Privacy-edited prototype screenshot"
        }
      ]
    }
  ],
  "personasIntro": "Reconstructed scenario personas describe overlapping tasks. One taxpayer may encounter more than one scenario.",
  "personas": [
    {
      "role": "The taxpayer preparing a full return file",
      "goal": "Save inputs and prepare a complete return without mandatory online submission.",
      "context": "Relevant forms, manual saving, and a completed return copy.",
      "story": "A taxpayer wants a completed return without submitting it online. They need relevant forms, Save Draft to preserve inputs manually, and Print to obtain the completed copy.",
      "userStory": "As a taxpayer, I need to save my work and obtain my completed return without being forced to submit online.",
      "needs": [
        "Income-source filtering to exclude extra forms",
        "Explicit Save Draft; no autosave",
        "Print or download a completed copy"
      ],
      "frictions": [
        "Completing irrelevant forms or being forced into online submission."
      ],
      "designResponse": "Income-source checkboxes, manual Save Draft, and Print support return preparation independently of online submission.",
      "basis": "Scenario reconstructed from the designer’s rationale and original prototype screens."
    },
    {
      "role": "The taxpayer facing a mobile-record mismatch",
      "goal": "Register with a phone number registered under the same NID.",
      "context": "The phone’s registered NID does not match the taxpayer’s NID.",
      "story": "A taxpayer’s phone ownership does not match their NID during self-registration. They need to understand the rule and provide a phone number registered under that same NID.",
      "userStory": "As a taxpayer facing an NID–phone mismatch, I need clear correction guidance before I can continue to OTP.",
      "needs": [
        "Understand the NID–phone ownership rule",
        "Provide a number registered under the same NID",
        "Pass the ownership check before OTP"
      ],
      "frictions": [
        "A message that does not explain the issue or next action."
      ],
      "designResponse": "Journey 2 explains correction; the self-registration route continues only when the ownership check passes.",
      "basis": "Scenario reconstructed from designer-confirmed registration requirements and Journey 2."
    },
    {
      "role": "The taxpayer needing Tax Circle verification",
      "goal": "Complete verification and reach account access.",
      "context": "Online information continues through Tax Circle review.",
      "story": "A taxpayer follows the separately mapped non-NID Tax Circle route. They need clear preparation for officer review and an explanation of how account access continues.",
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
        "summary": "NID-based self-registration continues only with a phone registered under the same taxpayer’s NID.",
        "steps": [
          {
            "title": "Enter registration details",
            "actor": "Taxpayer",
            "body": "Mobile number, eTIN, and CAPTCHA."
          },
          {
            "title": "Match NID and phone ownership",
            "actor": "Planned service check",
            "body": "Compare the phone’s registered NID with the taxpayer’s NID; proceed only when they match."
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
        "outcome": "After the ownership check and OTP, password setup leads to the dashboard.",
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
        "summary": "A phone registered under a different NID cannot continue on this self-registration route.",
        "steps": [
          {
            "title": "Identify the mismatch",
            "actor": "Planned service check",
            "body": "The phone’s registered NID does not match the taxpayer’s NID."
          },
          {
            "title": "Correct the information",
            "actor": "Taxpayer",
            "body": "Provide a phone number registered under the same taxpayer’s NID."
          },
          {
            "title": "Check the matching outcome",
            "actor": "Planned service check",
            "body": "Continue to OTP only after the ownership check passes; otherwise, keep correction guidance visible."
          }
        ],
        "outcome": "A different active number is insufficient unless it is registered under the same NID.",
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
        "summary": "The original plans map non-NID cases through a separate Tax Circle verification route.",
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
      "activity": "Confirm access rules, income-source filtering, manual saving, and return-preparation needs with the client.",
      "output": "Clear project requirements and scope.",
      "basis": "Recorded activity and requirements"
    },
    {
      "stage": "Define",
      "activity": "Map verification, income-source filtering, manual saving, and preparation independently of submission.",
      "output": "A relevant-form journey across five sections.",
      "basis": "Retrospective structure from artifacts"
    },
    {
      "stage": "Explore",
      "activity": "Develop checkbox filtering and explicit Save Draft and Print actions.",
      "output": "Sketches, access flows, and a five-section structure.",
      "basis": "Original supplied material"
    },
    {
      "stage": "Prototype",
      "activity": "Represent the decisions in registration, assessment, entry, and Return View screens.",
      "output": "Prototype screens linking the four challenges to their responses.",
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
    "intro": "Explore access, income-source filtering, five filing sections, and Return View.",
    "note": "Five filing sections plus separate entry/review destinations. Tax Circle verification remains an external handoff.",
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
                "label": "Home",
                "description": "A separate starting destination outside the five filing sections."
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
                  },
                  {
                    "label": "Income-source checkboxes",
                    "description": "Select applicable income sources to filter forms and exclude unnecessary ones."
                  }
                ],
                "description": "Income-source selection identifies relevant forms."
              },
              {
                "label": "Financial information",
                "children": [
                  {
                    "label": "Income",
                    "description": "Relevant income forms, repeated entries, and manual Save Draft."
                  },
                  {
                    "label": "Rebate",
                    "description": "Relevant rebate forms."
                  },
                  {
                    "label": "Expenditure",
                    "description": "Relevant expenditure forms."
                  },
                  {
                    "label": "Assets & Liabilities",
                    "description": "Relevant asset and liability forms."
                  },
                  {
                    "label": "Tax & Payment",
                    "description": "Tax computation, payment information, and the separate submission action."
                  }
                ],
                "description": "Five navigation sections hold the digital forms; saving inputs is manual rather than automatic."
              },
              {
                "label": "Review",
                "children": [
                  {
                    "label": "Return View",
                    "description": "Review the completed return."
                  },
                  {
                    "label": "Print completed return",
                    "description": "Obtain a completed copy for download or printing without mandatory online submission."
                  }
                ],
                "description": "Return View and Print support obtaining the completed file independently of submission."
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
        "title": "Check NID–phone ownership",
        "body": "Explain why a phone registered under a different NID cannot continue to OTP, then identify the correction action."
      },
      {
        "title": "Complete only required forms",
        "body": "Select income-source checkboxes and explain which forms are included or excluded."
      },
      {
        "title": "Save and obtain a return without submitting online",
        "body": "Identify Save Draft as the manual saving action, explain the lack of autosave, and locate Print without choosing Submit Return."
      },
      {
        "title": "Navigate the five sections",
        "body": "Find forms within Income, Rebate, Expenditure, Assets & Liabilities, and Tax & Payment, then locate Return View."
      },
      {
        "title": "Explain the Tax Circle handoff",
        "body": "Explain the separate online steps, token, officer review, and account continuation."
      }
    ]
  },
  "challengesNote": "Four challenges, the design decisions I made, and the prototype screens that illustrate them."
};
