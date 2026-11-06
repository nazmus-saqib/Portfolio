// Historical team design work; reconstructed scenario personas and supplementary studies are labeled.
// Source tax/verification material is historical, not current filing or security guidance.
export const ereturnExpansion = {
  "needs": {
    "intro": "A taxpayer needs to establish access, identify the information relevant to their circumstances, enter it in manageable sections, and review the information together. The design challenge was continuity: what is needed now, who acts next, and how each step connects to the overall return. These task stories are reconstructed from the preserved requirements, flows, sketches, and prototype.",
    "stories": [
      {
        "role": "Preparing and reviewing a return",
        "need": "find the relevant sections, add the information I need, and inspect it together",
        "soThat": "I can understand how individual financial entries contribute to the overall return",
        "basis": "Reconstructed from requirements schedules, financial forms, repeated-entry states, summaries, and Return View."
      },
      {
        "role": "Continuing after a mobile-record mismatch",
        "need": "understand the matching issue and identify the appropriate correction action",
        "soThat": "I know what to change and how registration can continue",
        "basis": "Reconstructed from original Journey 2 and the combined registration flow."
      },
      {
        "role": "Continuing through Tax Circle verification",
        "need": "understand the connection between my online information, token, and office visit",
        "soThat": "I can follow the planned verification handoff and continue to account access",
        "basis": "Reconstructed from original Journeys 3 and 3.1."
      }
    ]
  },
  "requirements": [
    {
      "need": "Make account access understandable.",
      "evidence": "Original registration flows show mobile number, eTIN, CAPTCHA, record checks, OTP, and password setup.",
      "response": "Explain the required information and next action within each registration scenario."
    },
    {
      "need": "Support a mobile-record mismatch.",
      "evidence": "Journey 2 maps another-mobile-number entry, a correction loop, and a prompt.",
      "response": "Represent the matching result and correction path without treating record mismatch as only a format error."
    },
    {
      "need": "Connect digital and in-person verification.",
      "evidence": "Journeys 3 and 3.1 connect a form and token with Tax Circle/DCT review and account-access continuation.",
      "response": "Make the token handoff, next actor, and continuation explicit; keep office review separate from website navigation."
    },
    {
      "need": "Establish the filing circumstances.",
      "evidence": "The workflow workbook includes assessment, residency, citizenship, location, and income-source factors.",
      "response": "Use context questions and recognizable information groups to distinguish relevant filing circumstances."
    },
    {
      "need": "Accommodate different income situations.",
      "evidence": "Historical NBR notes classify main income sources and salary variations; workbook schedules contain conditional category information.",
      "response": "Use category-specific forms and reusable entry patterns for differing situations."
    },
    {
      "need": "Keep different amount types understandable.",
      "evidence": "Schedule 24A distinguishes allowance, exempted, and taxable information; the workbook links inputs and calculation tags.",
      "response": "Preserve clear labels and relationships between entered information, relevant calculation categories, and summary views."
    },
    {
      "need": "Allow repeated items and distinct progress actions.",
      "evidence": "The prototype has repeated-entry states; supplied notebook studies separate add, Back, Save Draft, and Save and Continue.",
      "response": "Distinguish adding another item from preserving work or navigating to the next section."
    },
    {
      "need": "Reconnect detailed information with the overall return.",
      "evidence": "The Return worksheet maps category totals and tax, rebate, and payment adjustments to a summary; the prototype includes consolidated views.",
      "response": "Connect detailed financial sections to summaries, computation, payment follow-up, and Return View."
    }
  ],
  "research": {
    "intro": "I visited the client to gather requirements and contributed UX research, wireframes, prototypes, and usability testing within the team. We also performed requirements analysis. The observations below connect the supplied historical requirements with original process artifacts and the reviewed prototype; they are not unpreserved participant feedback.",
    "methods": [
      {
        "title": "Client requirements and team analysis",
        "body": "Gathered requirements, clarified the scope, and considered challenges and possible solutions. Requirements analysis was a team activity.",
        "status": "Recorded activity and contributor confirmation"
      },
      {
        "title": "Historical requirements documents",
        "body": "The supplied Workflow.xlsx workbook and four-page NBR notes describe income categories, conditional schedules, calculation dependencies, and summary relationships. They contain scope notes and unresolved items, so they are treated as historical working material.",
        "status": "Reviewed original requirements material"
      },
      {
        "title": "Research and usability testing",
        "body": "Contributed UX research, wireframing, prototyping, and usability testing. Detailed participant records and historical test findings are not preserved in the supplied material.",
        "status": "Recorded project activity"
      },
      {
        "title": "Original process and design artifacts",
        "body": "Reviewed registration diagrams, the supplied Excel/Google reference board and notebook studies, and the shared prototype to connect access scenarios, information grouping, and review.",
        "status": "Original artifacts with retrospective interpretation"
      }
    ],
    "findings": [
      {
        "title": "Access contains several scenarios.",
        "body": "The flows map matching information, a mobile-record mismatch, and a non-NID route. A single successful registration path would leave part of the planned experience unexplained.",
        "evidence": "Original Journeys 1, 2, 3, 3.1, and combined overview."
      },
      {
        "title": "A handoff needs continuity.",
        "body": "The non-NID route crosses from an online form and token to Tax Circle verification. Preparation, the next actor, and the return to account access therefore need to be understandable.",
        "evidence": "Original non-NID and Tax Circle continuation diagrams."
      },
      {
        "title": "Financial detail depends on context.",
        "body": "The requirements distinguish income sources, salary variations, and contextual factors. The workbook and prototype show why a category can require its own fields and repeated items.",
        "evidence": "Historical NBR notes, workbook Flowchart and schedules, and prototype income variants."
      },
      {
        "title": "Inputs and summaries must remain connected.",
        "body": "The workbook connects data inputs and calculation categories with totals, tax, rebates, and payment adjustments. This supports consistent naming and a traceable relationship between form details and overall review.",
        "evidence": "Workbook Flowchart, Schedule 24A, other schedules, and Return worksheet; prototype summary and return views."
      },
      {
        "title": "The requirements include decisions still to resolve.",
        "body": "Required, Preferred, and No Need notes, blank areas, and TODO or unknown entries make scope and open questions visible. They support requirement clarification rather than a claim that the workbook is a finalized tax specification.",
        "evidence": "Working scope notes in the supplied workbook."
      },
      {
        "title": "Adding, saving, and continuing serve different tasks.",
        "body": "The supplied notebook studies distinguish these controls. Their separation matters when a category contains several items and the taxpayer works through a wider filing process.",
        "evidence": "Original notebook studies and repeated-entry prototype states."
      }
    ]
  },
  "challenges": [
    {
      "title": "Different access circumstances need different next steps.",
      "detail": "The registration plans distinguish matching information, mobile mismatch, and a non-NID route.",
      "response": "Map each route explicitly so the required information, actor, and next action can be explained."
    },
    {
      "title": "A mismatch interrupts registration.",
      "detail": "Entered mobile information may not match the records used in the planned check.",
      "response": "Journey 2 provides another-number entry and a correction prompt, with continuation toward OTP when matching succeeds."
    },
    {
      "title": "An office handoff can break the digital journey.",
      "detail": "The non-NID scenario involves an online form, token, Tax Circle attendance, and reviewing officer.",
      "response": "Journeys 3 and 3.1 expose the transfer between taxpayer, digital service, and DCT, including account-access continuation."
    },
    {
      "title": "Conditional requirements can become an enormous form.",
      "detail": "Context factors and income categories require different fields and supporting details.",
      "response": "The prototype separates named financial sections and category-specific forms, with repeated-entry patterns where relevant."
    },
    {
      "title": "Detailed amounts can lose their calculation context.",
      "detail": "The requirements distinguish entered, exempted, and taxable amounts and connect them with summary adjustments.",
      "response": "Use recognizable category and amount labels, and connect detailed sections with computation, tax/payment, and return views."
    },
    {
      "title": "Progress actions and overall review need distinct roles.",
      "detail": "Adding another item, returning, saving a draft, continuing, and inspecting a summary each serve a different purpose.",
      "response": "The original sketches separate progress controls; the prototype brings financial details into consolidated review views."
    }
  ],
  "personasIntro": "These scenario personas are reconstructed from the supplied requirements, original flows, notebook studies, and reviewed prototype. Their stories explain system needs rather than report participant behavior. A taxpayer may encounter an access scenario and later continue into financial entry and review; these are overlapping scenarios rather than separate research-validated populations.",
  "personas": [
    {
      "role": "The taxpayer assembling a complete return",
      "goal": "Complete the relevant financial sections and understand the return as a whole.",
      "context": "Preparing a return with information in several financial categories and more than one item in some categories.",
      "story": "A taxpayer begins preparing a return with information belonging to several financial sections. Some categories require more than one entry. They need to concentrate on individual details while keeping track of how those details contribute to the return. After entering the information, they want to inspect it together and identify anything that needs another look.",
      "userStory": "As a taxpayer entering information across several sections, I need organized forms, clear ways to add another item, and a consolidated review, so that I can understand what I have entered and check it together.",
      "needs": [
        "Recognizable financial categories and information groups",
        "Clear repeated-entry patterns",
        "Distinct navigation, saving, and continuation actions",
        "A connection between detailed entries and review views"
      ],
      "frictions": [
        "Confusing an additional item with an existing entry",
        "Losing the relationship between a detailed form and the overall return"
      ],
      "designResponse": "The prototype contains financial categories, income variations, repeated-entry patterns, summaries, computation views, and Return View. The supplied notebook studies explore grouped fields and separate Back, Save Draft, and Save and Continue controls.",
      "basis": "Task-based reconstruction from requirements schedules, original notebook studies, and the reviewed shared prototype. Potential friction is a design hypothesis, not a preserved test finding."
    },
    {
      "role": "The taxpayer facing a mobile-record mismatch",
      "goal": "Understand the access interruption and continue the planned verification route.",
      "context": "Registration reaches the mobile-information check and encounters a mismatch.",
      "story": "A taxpayer enters a mobile number, eTIN, and CAPTCHA to register. The planned record check does not match the mobile information. They still need an account, but first need to understand what prevented progress and which correction action could help. Clear guidance lets them provide appropriate corrected information and return to verification.",
      "userStory": "As a taxpayer whose mobile information does not match, I need an understandable explanation and a correction path, so that I know what to change and how registration continues.",
      "needs": [
        "A comprehensible matching result",
        "A visible correction action",
        "A way to provide corrected mobile information",
        "An explanation of what follows verification"
      ],
      "frictions": [
        "A generic invalid-number message that does not distinguish matching from formatting",
        "An interruption with no understandable next action"
      ],
      "designResponse": "Journey 2 maps another-mobile-number entry and a correction loop. Matching information continues toward OTP and password setup; continued mismatch receives a correction prompt.",
      "basis": "Task-based reconstruction from original Journey 2 and the combined diagram. The source maps planned checks rather than establishing deployed integrations."
    },
    {
      "role": "The taxpayer needing Tax Circle verification",
      "goal": "Complete the verification handoff and continue to account access.",
      "context": "Registration follows the planned non-NID route, involving an online form, token, and office verification.",
      "story": "A taxpayer follows the planned non-NID route, completes the online information, and receives a token. Their journey continues at a Tax Circle, where an officer reviews the submitted information. They need to understand the relationship between the form, token, office visit, and subsequent account access, so receiving a token leaves them clear about the remaining steps.",
      "userStory": "As a taxpayer requiring Tax Circle verification, I need clear instructions connecting my online information, token, and office visit, so that I can complete verification and continue accessing the service.",
      "needs": [
        "Understandable preparation for the office stage",
        "A clear connection between the token and submitted information",
        "Identification of the next responsible actor",
        "An explanation of account-access continuation after review"
      ],
      "frictions": [
        "Mistaking token receipt for completed activation",
        "Reaching the office stage without understanding the next action or responsible actor"
      ],
      "designResponse": "Journeys 3 and 3.1 connect the additional form, active mobile number, token, Tax Circle visit, officer verification, and subsequent account-access steps. The DCT is a supporting service actor within that handoff.",
      "basis": "Task-based reconstruction from original Journeys 3 and 3.1. The story explains historical planning rather than current eligibility or security policy."
    }
  ],
  "registrationJourneys": {
    "intro": "The original diagrams make three registration scenarios visible. Explore how each route explains the required information, next action, and responsible actor. Tax Circle/DCT verification is an external service handoff rather than a website page.",
    "note": "Historical planned flows. These diagrams do not establish live integrations, current eligibility rules, or a security recommendation. The scenarios describe alternatives rather than steps every taxpayer takes.",
    "routes": [
      {
        "label": "Information matches",
        "title": "Continue through the OTP route",
        "summary": "Journey 1 maps the registration continuation when the required information matches.",
        "steps": [
          {
            "title": "Enter registration information",
            "actor": "Taxpayer",
            "body": "Provide the mobile number, eTIN, and CAPTCHA shown in the original flow."
          },
          {
            "title": "Compare the information",
            "actor": "Planned service check",
            "body": "The diagram references eTIN and CBVMP records when mapping the NID/mobile-information check."
          },
          {
            "title": "Send and enter OTP",
            "actor": "Service and taxpayer",
            "body": "The matched route continues to sending an OTP and entering it for verification."
          },
          {
            "title": "Set and confirm a password",
            "actor": "Taxpayer",
            "body": "Password setup precedes the dashboard in the planned journey."
          }
        ],
        "outcome": "The original matched-information route reaches the dashboard.",
        "basis": "Original Journey 1 and combined registration flow.",
        "pictures": [
          {
            "image": "/projects/ereturn/registration-matched-original.webp",
            "title": "Original registration flow: information matches",
            "alt": "Original Miro registration flow mapping mobile and eTIN input, verification, OTP, password setup, and dashboard",
            "caption": "Journey 1 maps the intended continuation when information matches. The references to external records describe planning, not proof of deployed integrations.",
            "basis": "Original historical project artifact"
          }
        ]
      },
      {
        "label": "Mobile mismatch",
        "title": "Make the correction path understandable",
        "summary": "Journey 2 treats mobile-record mismatch as part of registration, with a correction path and explanatory prompt.",
        "steps": [
          {
            "title": "Reach the matching check",
            "actor": "Taxpayer and planned service check",
            "body": "Registration information reaches record comparison; the mobile information does not match."
          },
          {
            "title": "Provide corrected mobile information",
            "actor": "Taxpayer",
            "body": "The diagram provides an another-valid-mobile-number entry route."
          },
          {
            "title": "Continue verification",
            "actor": "Planned service check",
            "body": "When the information matches, the mapped route can continue toward OTP and password setup."
          },
          {
            "title": "Explain continued mismatch",
            "actor": "Service prompt",
            "body": "If information still does not match, the original flow shows a prompt to provide a valid phone number."
          }
        ],
        "outcome": "A successful match continues toward the OTP route. Persistent mismatch remains an access interruption requiring correction.",
        "basis": "Original Journey 2 and combined registration flow; no numeric retry limit is inferred.",
        "pictures": [
          {
            "image": "/projects/ereturn/registration-mismatch-original.webp",
            "title": "Original registration flow: mobile mismatch",
            "alt": "Original Miro registration flow with another-mobile-number correction and matching continuation",
            "caption": "Journey 2 makes the correction route part of registration. A matching issue is distinct from only checking phone-number formatting.",
            "basis": "Original historical project artifact"
          }
        ]
      },
      {
        "label": "Tax Circle handoff",
        "title": "Connect online registration with officer verification",
        "summary": "The non-NID route crosses from a digital form and token to a Tax Circle visit, then returns to account access.",
        "steps": [
          {
            "title": "Complete the additional form",
            "actor": "Taxpayer",
            "body": "The planned non-NID route includes a form with an active mobile number."
          },
          {
            "title": "Receive the token and preparation instructions",
            "actor": "Digital service",
            "body": "The original flow connects the token with instructions for the Tax Circle stage."
          },
          {
            "title": "Visit the Tax Circle and show the token",
            "actor": "Taxpayer",
            "body": "The token supports the handoff from online information to office review."
          },
          {
            "title": "Review submitted information",
            "actor": "DCT / reviewing officer",
            "body": "Journey 3.1 maps verification of the information submitted by the taxpayer."
          },
          {
            "title": "Continue account access",
            "actor": "Service and taxpayer",
            "body": "The historical continuation maps temporary credentials by SMS, followed by login and setting a new password."
          }
        ],
        "outcome": "The planned continuation reaches account access after officer verification. Token receipt alone is not shown as completed activation.",
        "basis": "Original Journeys 3 and 3.1 and the combined overview.",
        "pictures": [
          {
            "image": "/projects/ereturn/registration-non-nid-original.webp",
            "title": "Original registration flow: non-NID route",
            "alt": "Original Miro non-NID registration flow with additional form, token, and office-verification handoff",
            "caption": "Journey 3 connects the additional online information and token with a Tax Circle visit. Historical instructions are not current eligibility or tax-filing guidance.",
            "basis": "Original historical project artifact"
          },
          {
            "image": "/projects/ereturn/registration-circle-original.webp",
            "title": "Original continuation: Tax Circle verification",
            "alt": "Original Miro continuation showing token presentation, officer review, and account-access steps",
            "caption": "Journey 3.1 makes the reviewing officer and return to account access visible. Its temporary-credential steps are historical planning, not a new security recommendation.",
            "basis": "Original historical project artifact"
          }
        ]
      }
    ]
  },
  "process": [
    {
      "stage": "Understand",
      "activity": "Visit the client, gather requirements, and work with the team to understand scope, challenges, and possible solutions.",
      "output": "A shared understanding of access, filing context, financial information, calculation dependencies, and review.",
      "basis": "Recorded activity, confirmed team analysis, and historical requirements material"
    },
    {
      "stage": "Define",
      "activity": "Clarify the tasks represented in the service and the information and actors needed to continue.",
      "output": "Access scenarios, information groups, and task-based personas.",
      "basis": "Retrospective organization of requirements, original flows, and prototype scope"
    },
    {
      "stage": "Explore",
      "activity": "Consider interface references and early layouts for grouped information, repeated entries, and progress actions.",
      "output": "The original Excel/Google reference board, notebook studies, and registration planning flows.",
      "basis": "Original supplied material; accompanying interpretation is retrospective"
    },
    {
      "stage": "Prototype",
      "activity": "Represent registration, assessment context, financial forms, verification states, and review views.",
      "output": "The shared Adobe XD prototype and category-specific variants.",
      "basis": "Preserved team design artifact"
    },
    {
      "stage": "Review",
      "activity": "Contribute usability-testing work and examine whether the design supports its tasks.",
      "output": "Testing is recorded as an activity. Proposed evaluation tasks below explain useful further checks.",
      "basis": "Recorded activity; detailed historical test findings are not preserved"
    },
    {
      "stage": "Deliver",
      "activity": "Prepare the design deliverable and demonstrate the work to the client.",
      "output": "Design delivery and client demonstration before the deadline.",
      "basis": "Recorded outcome, without a production-launch or impact-metric claim"
    }
  ],
  "sketches": {
    "intro": "The original notebook studies supplied for this case study explore section navigation, grouped fields, repeated information, and progress controls. Back, Save Draft, and Save and Continue distinguish different actions. The blue-pen study and interactive structure diagram here are newly reconstructed explanations of those layout questions.",
    "reconstructionNote": "The displayed notebook study and interactive layout diagram were created for this portfolio. They supplement the original sketches rather than replace their historical provenance.",
    "variant": "filing",
    "pictures": [
      {
        "image": "/projects/ereturn/sketch-study.webp",
        "title": "Filing structure and review: reconstructed notebook study",
        "alt": "Blue-ballpoint layout study on lined notebook paper, showing financial sections, entry fields, add controls, and review",
        "caption": "A retrospective study connecting information grouping, repeated entries, progress controls, and consolidated review.",
        "basis": "Reconstructed study created for this portfolio"
      }
    ],
    "annotations": [
      {
        "title": "Group the work",
        "body": "A recognizable section list explains where a form belongs within the wider return."
      },
      {
        "title": "Focus the entry area",
        "body": "Keep related fields together and distinguish adding another relevant item from continuing."
      },
      {
        "title": "Connect entry with review",
        "body": "Detailed input and consolidated summary provide different views of the same information."
      }
    ]
  },
  "wireframe": {
    "intro": "This supplementary wireframe explains the relationship between navigation, detailed entry, and review. It is reconstructed for the portfolio from the reviewed design scope.",
    "reconstructionNote": "Created for this portfolio to explain structure; not an archived historical wireframe.",
    "variant": "filing",
    "annotations": [
      {
        "title": "Section context",
        "body": "Use the section list to explain the location of the current financial task."
      },
      {
        "title": "A consistent working area",
        "body": "Place the relevant category, labels, fields, and actions in a recognizable entry area."
      },
      {
        "title": "A connected review",
        "body": "Keep summaries and return information within the overall filing scope."
      }
    ]
  },
  "sitemap": {
    "intro": "A reconstructed functional map from the reviewed prototype, requirements, and original access flows. Four areas connect account access with context, financial information, and review.",
    "note": "Branches include related information, actions, and states as well as screens. Tax Circle/DCT review is an external service handoff connected to access, not a claimed website page.",
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
                "description": "Registration and continuation scenarios establish account access before financial entry."
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
                "description": "Assessment and income context distinguish the information relevant to the filing situation."
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
                "description": "Category-specific and repeated-entry patterns organize the financial scope."
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
                "description": "Summary, computation, payment-information, and return views reconnect detailed entries."
              }
            ]
          }
        ]
      },
      {
        "label": "Tax Circle / DCT verification",
        "external": true,
        "description": "External service handoff connected to the non-NID verification route. This is an officer-led stage rather than a website page."
      }
    ]
  },
  "inspiration": {
    "showIllustrations": false,
    "intro": "The original inspiration board supplied in the project materials combines Excel and Google’s new-tab page. Read retrospectively, these references suggest two complementary concerns: give substantial information a predictable structure, and give the starting point clear visual priority.",
    "note": "The references are original project material; the organizing principles below are a retrospective interpretation rather than preserved notes of the team’s original rationale.",
    "cards": [
      {
        "title": "Excel: structured information",
        "principle": "Use predictable labels and groups to make substantial information navigable.",
        "application": "Rows, columns, worksheets, and grouped information provide a reference for financial sections and recognizable entry patterns."
      },
      {
        "title": "Google: a recognizable starting point",
        "principle": "Give the immediate action clear visual priority.",
        "application": "A focused entry view and recognizable access points provide a reference for hierarchy and the first action within a broader service."
      }
    ]
  },
  "planningArtifacts": {
    "intro": "Original historical requirements notes and the combined registration overview provide source evidence for the scope and planned access journeys. The raw workbook is not published because it contains working values and private contact information.",
    "pictures": [
      {
        "image": "/projects/ereturn/requirements-income-notes-original.webp",
        "title": "Original requirements notes: income categories and variations",
        "alt": "First page of historical NBR requirements notes listing income categories and variations",
        "caption": "A source reference for the team’s requirements analysis. This is historical working material, not current tax guidance or a claim of legal verification.",
        "basis": "Original historical project artifact"
      },
      {
        "image": "/projects/ereturn/registration-overview-original.webp",
        "title": "Original combined registration overview",
        "alt": "Original Miro overview combining matched information, mobile correction, and non-NID office verification",
        "caption": "The overview connects the alternative registration routes. The scenario explorer above provides readable explanations alongside the individual original diagrams.",
        "basis": "Original historical project artifact"
      }
    ]
  },
  "evaluation": {
    "intro": "Proposed evaluation tasks derived from the persona stories; these are not reported historical test results.",
    "tasks": [
      {
        "title": "Prepare and review several entries",
        "body": "Using fictional information, locate two relevant income categories, add another item, distinguish saving from continuing, and find the consolidated review."
      },
      {
        "title": "Continue after a mobile-record mismatch",
        "body": "Explain the matching issue, locate the correction action, and describe the next step if corrected information matches."
      },
      {
        "title": "Explain the Tax Circle handoff",
        "body": "Identify what happens online, what requires an office visit, what the token supports, who verifies the information, and how access continues afterward."
      }
    ]
  }
};
