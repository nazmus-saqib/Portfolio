// Historical artifacts and retrospective explanations remain distinguished in the presentation.
export const ereturnExpansion = {
  "needs": {
    "intro": "Register with an NID-linked mobile, complete only applicable forms, and prepare a full return file with online submission optional.",
    "stories": [
      {
        "role": "NID-based self-registration",
        "need": "Use a phone number registered under my own NID",
        "soThat": "I can pass the ownership check before OTP.",
        "basis": "Project requirement confirmed by the designer; original registration flows"
      },
      {
        "role": "Required forms only",
        "need": "Complete the forms required for my circumstances and skip additional forms",
        "soThat": "I do not work through irrelevant paperwork.",
        "basis": "Designer-confirmed requirement; context questions and category-specific forms"
      },
      {
        "role": "Preparing without online submission",
        "need": "Prepare a complete return file without having to submit it online",
        "soThat": "Return preparation remains useful when I choose another submission route.",
        "basis": "Project requirement confirmed by the designer"
      },
      {
        "role": "One digital return",
        "need": "Work across Income, Rebate, Expenditure, and Assets & Liabilities",
        "soThat": "Different paper forms come together in one connected experience.",
        "basis": "Designer-confirmed scope and reviewed filing sections"
      }
    ]
  },
  "requirements": [
    {
      "need": "Verify phone ownership under the same NID",
      "evidence": "The designer confirmed that NID-based self-registration required a phone registered under the taxpayer’s NID; original flows map the matching check.",
      "response": "Allow this self-registration route to reach OTP only after ownership matches; explain correction when it does not."
    },
    {
      "need": "Show required forms only",
      "evidence": "The designer confirmed that users should fill required forms and skip additional or non-applicable forms.",
      "response": "Use filing context and income circumstances to identify applicable forms and let users skip the rest."
    },
    {
      "need": "Prepare without online submission",
      "evidence": "The designer confirmed that users must be able to prepare a full return file even when they do not submit online.",
      "response": "Separate complete return-file preparation and review from the decision to submit online."
    },
    {
      "need": "Unify four groups of paper forms",
      "evidence": "Income, Rebate, Expenditure, and Assets & Liabilities each contain different paper forms.",
      "response": "Bring the four sections into one digital structure with consistent navigation, applicable fields, and a shared review."
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
      "need": "Separate progress actions",
      "evidence": "Sketches distinguish adding, Back, Save Draft, and Save and Continue.",
      "response": "Make adding, saving, and navigation distinct."
    }
  ],
  "research": {
    "intro": "Client visits, team requirements analysis, and the designer’s clarified project requirements shaped these decisions.",
    "methods": [
      {
        "title": "Client requirements",
        "body": "Gathered requirements and clarified scope, challenges, and possible solutions.",
        "status": "Documented team activity"
      },
      {
        "title": "Clarified project requirements",
        "body": "Confirmed NID-linked phone ownership, required-only form paths, preparation without online submission, and the four groups of paper forms.",
        "status": "Confirmed by the project designer"
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
        "title": "Phone ownership gates self-registration",
        "body": "The phone must be registered under the same taxpayer’s NID before this route can continue to OTP.",
        "evidence": "Designer confirmation and original registration flows"
      },
      {
        "title": "Only applicable forms should be completed",
        "body": "Filing circumstances determine required forms; additional or non-applicable forms can be skipped.",
        "evidence": "Designer-confirmed requirement; context questions and category forms"
      },
      {
        "title": "Preparation must stand apart from submission",
        "body": "A taxpayer can prepare a full return file without being required to submit it online.",
        "evidence": "Project requirement confirmed by the designer"
      },
      {
        "title": "Four paper-form groups need one structure",
        "body": "Income, Rebate, Expenditure, and Assets & Liabilities contain different paper forms that must connect digitally.",
        "evidence": "Designer-confirmed scope and reviewed prototype"
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
      "title": "Verify phone ownership under the same NID",
      "detail": "NID-based self-registration was restricted to a phone number registered under that taxpayer’s NID.",
      "response": "Check NID–phone ownership before OTP and explain how to correct a mismatch."
    },
    {
      "title": "Show required forms only",
      "detail": "Different circumstances require different paper forms. Users should not have to fill additional forms that do not apply.",
      "response": "Use context questions to guide users to required forms and let them skip non-applicable forms."
    },
    {
      "title": "Prepare without online submission",
      "detail": "Some users need a complete return file but do not want to submit it online.",
      "response": "Keep full return preparation and review independent of online submission."
    },
    {
      "title": "Unify four groups of paper forms",
      "detail": "Income, Rebate, Expenditure, and Assets & Liabilities each contain different paper forms.",
      "response": "Connect the four sections through consistent navigation, relevant forms, and one return review."
    }
  ],
  "personasIntro": "Reconstructed scenario personas describe overlapping tasks. One taxpayer may encounter more than one scenario.",
  "personas": [
    {
      "role": "The taxpayer preparing a full return file",
      "goal": "Prepare a complete return file without mandatory online submission.",
      "context": "Relevant forms across the four filing sections; online submission is optional.",
      "story": "A taxpayer wants a complete return file but does not plan to submit it online. They need only the forms required for their circumstances and one review across the four filing sections.",
      "userStory": "As a taxpayer, I need applicable forms and a complete return file without being forced to submit online.",
      "needs": [
        "Required forms only; skip non-applicable forms",
        "One review across the four filing sections",
        "Full return preparation without mandatory online submission"
      ],
      "frictions": [
        "Completing irrelevant forms or being forced into online submission."
      ],
      "designResponse": "Context-guided forms and a connected review separate return preparation from the submission decision.",
      "basis": "Scenario reconstructed from requirements confirmed by the designer and the filing prototype."
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
      "activity": "Confirm access rules, applicable forms, preparation needs, and the four paper-form groups with the client.",
      "output": "Clear project requirements and scope.",
      "basis": "Recorded activity and requirements"
    },
    {
      "stage": "Define",
      "activity": "Separate phone-ownership checks, required-form selection, return preparation, and online submission.",
      "output": "Access constraints and a required-form preparation journey.",
      "basis": "Retrospective structure from artifacts"
    },
    {
      "stage": "Explore",
      "activity": "Explore how the four paper-form groups share navigation and review.",
      "output": "Connected sections, sketches, and flow planning.",
      "basis": "Original supplied material"
    },
    {
      "stage": "Prototype",
      "activity": "Represent eligible access, applicable forms, and complete return preparation.",
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
    "intro": "Explore NID-based access, required-form selection, the four filing sections, and complete return preparation.",
    "note": "Reconstructed functional map informed by project requirements and artifacts; Tax Circle review remains an external handoff.",
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
                  },
                  {
                    "label": "Required-form selection",
                    "description": "Identify applicable forms and skip additional forms that do not apply."
                  }
                ],
                "description": "Use filing circumstances to select only required forms."
              },
              {
                "label": "Financial information",
                "children": [
                  {
                    "label": "Income",
                    "description": "Applicable income forms and repeated entries."
                  },
                  {
                    "label": "Rebate",
                    "description": "Applicable rebate forms."
                  },
                  {
                    "label": "Expenditure",
                    "description": "Applicable expenditure forms."
                  },
                  {
                    "label": "Assets & Liabilities",
                    "description": "Applicable asset and liability forms."
                  }
                ],
                "description": "Four filing sections bring different paper forms into one digital structure."
              },
              {
                "label": "Review",
                "children": [
                  {
                    "label": "Summaries and computation"
                  },
                  {
                    "label": "Tax and payment information"
                  },
                  {
                    "label": "Payment information and follow-up"
                  },
                  {
                    "label": "Return view"
                  },
                  {
                    "label": "Complete return file",
                    "description": "Return preparation does not require online submission."
                  }
                ],
                "description": "Review and prepare a complete return file; online submission remains optional."
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
        "body": "Use a filing scenario to identify required forms and skip additional forms that do not apply."
      },
      {
        "title": "Prepare a full file without submitting online",
        "body": "Explain how to complete and review the full return file without choosing online submission."
      },
      {
        "title": "Navigate the four filing sections",
        "body": "Place example paper forms within Income, Rebate, Expenditure, and Assets & Liabilities, then locate their shared review."
      },
      {
        "title": "Explain the Tax Circle handoff",
        "body": "Explain the separate online steps, token, officer review, and account continuation."
      }
    ]
  },
  "challengesNote": "Four project requirements and the design responses they called for."
};
