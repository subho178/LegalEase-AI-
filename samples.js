// LegalEase AI - Sample Legal Documents & Pre-analyzed Fallback Dataset

const LEGAL_SAMPLES = {
    employment: {
        id: "employment",
        title: "Senior Software Engineer Employment Agreement",
        category: "Employment Contract",
        parties: "TechCorp Global Solutions Inc. & Alex Morgan (Employee)",
        date: "October 1, 2025",
        summary: "Full-time employment contract specifying compensation, IP assignment, 2-year non-compete within North America, and 30-day termination notice requirement.",
        text: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of October 1, 2025 ("Effective Date"), by and between TechCorp Global Solutions Inc., a Delaware corporation ("Employer" or "Company"), and Alex Morgan ("Employee").

1. POSITION AND DUTIES
Employee shall serve as Senior Software Engineer. Employee agrees to devote 100% of their full business time, attention, and effort exclusively to the performance of Company duties. Outside consulting or secondary employment is strictly prohibited without prior written consent from the Chief Executive Officer.

2. COMPENSATION AND BENEFITS
2.1 Base Salary: The Company shall pay Employee a base salary of $145,000 per annum, payable in semi-monthly installments in accordance with standard payroll practices.
2.2 Bonus: Employee is eligible for an annual discretionary performance bonus of up to 15% of base salary, subject to board approval and key key performance indicators (KPIs).
2.3 Benefits: Employee shall be eligible to participate in health, dental, 401(k), and paid time off (PTO) programs as established by the Company.

3. INTELLECTUAL PROPERTY ASSIGNMENT
3.1 Inventions Retained: Any pre-existing Intellectual Property created prior to the Effective Date is excluded, provided it is listed in Exhibit A.
3.2 Work for Hire: All software, inventions, source code, trade secrets, patents, copyrightable material, and documentation created, conceived, or reduced to practice by Employee during employment (whether during working hours or using Company equipment or not) shall be the sole and exclusive property of Company ("Work Product"). Employee hereby irrevocably assigns all rights, titles, and interests in such Work Product to the Company.

4. CONFIDENTIALITY AND NON-DISCLOSURE
Employee acknowledges that during employment, Employee will have access to confidential customer data, proprietary algorithms, financial metrics, and strategic business plans ("Confidential Information"). Employee agrees never to disclose, publish, or utilize such Confidential Information during or after employment, except in direct performance of duties for the Company.

5. RESTRICTIVE COVENANTS & NON-COMPETE
5.1 Non-Competition: For a period of twenty-four (24) consecutive months following the termination of employment for any reason (whether voluntary or involuntary), Employee shall not directly or indirectly engage in, perform services for, advise, or hold equity in any business operating in the cloud developer tools sector across North America.
5.2 Non-Solicitation of Clients & Employees: Employee agrees not to solicit, recruit, or hire any current employees, contractors, or clients of the Company for twenty-four (24) months post-employment.

6. TERMINATION
6.1 Termination at Will: Employment is at-will. Either party may terminate employment with thirty (30) days prior written notice.
6.2 Termination for Cause: The Company may terminate employment immediately without notice or severance in the event of gross negligence, willful misconduct, breach of confidentiality, or conviction of a felony.
6.3 Severance: Upon termination without cause by the Company, Employee shall receive two (2) weeks of severance pay per completed year of service, contingent upon signing a general liability release.

7. GOVERNING LAW AND DISPUTE RESOLUTION
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware. Any disputes arising under this Agreement shall be resolved exclusively via binding arbitration in Wilmington, Delaware under AAA Rules. Each party shall bear its own legal fees regardless of outcome.`,
        clauses: [
            {
                section: "Section 1 - Position & Duties",
                original: "Employee agrees to devote 100% of their full business time, attention, and effort exclusively to the performance of Company duties. Outside consulting or secondary employment is strictly prohibited...",
                plainEnglish: "You must work exclusively for TechCorp. Side hustles, freelance work, or consulting are completely banned unless the CEO approves in writing.",
                riskLevel: "caution",
                riskReason: "Restricts all secondary income or side projects even outside working hours.",
                category: "Restrictions",
                mitigationTip: "Request an exemption clause for non-competing personal projects or open-source contributions."
            },
            {
                section: "Section 3.2 - Work for Hire & IP Assignment",
                original: "All software, inventions, source code... created, conceived, or reduced to practice by Employee during employment (whether during working hours or using Company equipment or not) shall be sole property of Company...",
                plainEnglish: "Anything you invent or code while employed here belongs 100% to the company — even if you built it on your personal laptop at midnight on a weekend.",
                riskLevel: "high",
                riskReason: "Overly broad IP capture claims ownership of personal projects created off-hours.",
                category: "Intellectual Property",
                mitigationTip: "Clarify that off-hours inventions built with personal equipment without company confidential info remain your property."
            },
            {
                section: "Section 5.1 - Non-Compete Covenant",
                original: "For a period of twenty-four (24) consecutive months following termination... Employee shall not directly or indirectly engage in... any business operating in the cloud developer tools sector across North America.",
                plainEnglish: "You cannot work for any competitor in North America for 2 full years after leaving this job, regardless of why you left.",
                riskLevel: "high",
                riskReason: "24-month nationwide non-compete is unusually long and highly restrictive for software engineering roles.",
                category: "Career Restriction",
                mitigationTip: "Negotiate duration down to 6 months and limit geographic scope or specific direct competitor list."
            },
            {
                section: "Section 7 - Dispute Resolution & Fees",
                original: "Each party shall bear its own legal fees regardless of outcome.",
                plainEnglish: "Even if the company wrongfully sues you or breaks the contract and you win in arbitration, you must pay your own legal fees.",
                riskLevel: "caution",
                riskReason: "Discourages enforcing your rights due to high legal arbitration expenses.",
                category: "Dispute & Fees",
                mitigationTip: "Propose a 'prevailing party' clause where the loser pays the winner's attorney fees."
            }
        ],
        riskScore: 78,
        riskSummary: "High risk profile primarily driven by an aggressive 2-year North American non-compete and broad off-hours IP assignment terms."
    },

    nda: {
        id: "nda",
        title: "Mutual Non-Disclosure Agreement (NDA)",
        category: "Confidentiality Agreement",
        parties: "Vanguard Innovations Corp & Synergy Analytics LLC",
        date: "January 15, 2026",
        summary: "Standard mutual non-disclosure agreement governing financial and technical discussions, valid for 3 years with 5-year confidentiality obligations.",
        text: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is made on January 15, 2026, by and between Vanguard Innovations Corp ("Party A") and Synergy Analytics LLC ("Party B").

1. PURPOSE
The parties wish to explore a potential business partnership regarding Enterprise AI Integration ("Purpose"). In connection with the Purpose, each party may disclose to the other certain confidential and proprietary information.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" refers to any proprietary data, code, customer metrics, trade secrets, product roadmaps, or financial statements disclosed by one party ("Disclosing Party") to the other ("Receiving Party"), whether orally, visually, or in writing, designated as "Confidential" or which reasonably ought to be understood as confidential.

3. EXCLUSIONS FROM CONFIDENTIALITY
Confidential Information does not include information that:
(a) Is or becomes publicly known through no breach of Receiving Party;
(b) Was already in Receiving Party's lawful possession prior to disclosure;
(c) Is independently developed by Receiving Party without reference to Disclosing Party's Confidential Information;
(d) Is required to be disclosed by law or court order, provided prompt notice is given to Disclosing Party.

4. OBLIGATIONS OF RECEIVING PARTY
4.1 Standard of Care: Receiving Party shall use at least reasonable care (and no less than the care used for its own confidential data) to prevent unauthorized disclosure.
4.2 Permitted Use: Receiving Party shall use Confidential Information solely for the evaluation of the Purpose.
4.3 Permitted Disclosures: Receiving Party may disclose information only to its officers, employees, and legal advisors who have a strict need to know and are bound by confidentiality obligations at least as restrictive as this Agreement.

5. DURATION AND TERMINATION
This Agreement shall remain in effect for three (3) years from the Effective Date. The non-disclosure obligations shall survive for five (5) years following the termination of this Agreement, except for trade secrets which shall remain protected indefinitely.

6. NO WARRANTY & NO LICENSE
All Confidential Information is provided "AS IS" without warranty of accuracy. Nothing in this Agreement grants any patent, copyright, or trademark license to Receiving Party.

7. INJUNCTIVE RELIEF
Receiving Party agrees that any breach of confidentiality may cause irreparable damage for which monetary damages alone would be inadequate. Disclosing Party shall be entitled to seek equitable relief, including injunctions, without posting a bond.`,
        clauses: [
            {
                section: "Section 2 - Definition of Confidential Info",
                original: "...designated as 'Confidential' or which reasonably ought to be understood as confidential.",
                plainEnglish: "Covers both explicitly marked documents and anything that obviously looks private or sensitive.",
                riskLevel: "low",
                riskReason: "Standard market definition protecting reasonable disclosure without trap catches.",
                category: "Scope",
                mitigationTip: "Maintain clear internal markings on all sensitive technical slides and documents."
            },
            {
                section: "Section 5 - Duration & Survival",
                original: "The non-disclosure obligations shall survive for five (5) years following termination... trade secrets protected indefinitely.",
                plainEnglish: "You must keep secrets confidential for 5 years after discussions end, and core trade secrets forever.",
                riskLevel: "caution",
                riskReason: "5-year survival is standard for enterprise, but ensure data deletion routines are tracked.",
                category: "Timeline",
                mitigationTip: "Set calendar reminders to request written verification of data destruction upon conclusion."
            },
            {
                section: "Section 7 - Injunctive Relief Without Bond",
                original: "...entitled to seek equitable relief, including injunctions, without posting a bond.",
                plainEnglish: "If they suspect a leak, they can obtain a court order to halt your operations immediately without putting up security money.",
                riskLevel: "caution",
                riskReason: "Waiving bond requirements makes court injunctions easier for the other party to file.",
                category: "Legal Remedies",
                mitigationTip: "Request removal of 'without posting a bond' so frivolous injunctions carry financial accountability."
            }
        ],
        riskScore: 28,
        riskSummary: "Low overall risk profile. Fair balanced mutual terms standard for corporate exploratory partnerships."
    },

    lease: {
        id: "lease",
        title: "Residential Property Lease Agreement",
        category: "Real Estate Lease",
        parties: "Horizon Property Management (Landlord) & Jordan Taylor (Tenant)",
        date: "November 12, 2025",
        summary: "12-month residential rental contract with automatic annual auto-renewal, 60-day notice requirement, tenant maintenance obligations, and strict early termination penalty.",
        text: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement ("Lease") is made on November 12, 2025, by Horizon Property Management ("Landlord") and Jordan Taylor ("Tenant").

1. PREMISES AND TERM
Landlord leases to Tenant the residential property located at Apt 4B, 742 Evergreen Terrace ("Premises"). The lease term begins December 1, 2025, and ends November 30, 2026.

2. RENT AND DEPOSIT
2.1 Monthly Rent: Tenant shall pay $2,450 per month, due on the 1st day of each calendar month.
2.2 Late Fees: Rent paid after the 5th day of the month shall incur an immediate $150 late fee, plus $25 per additional late day.
2.3 Security Deposit: Tenant deposits $2,450 as security. Landlord may deduct funds for damages beyond reasonable wear and tear.

3. MAINTENANCE AND REPAIRS
3.1 Tenant Responsibilities: Tenant shall keep the Premises clean and sanitary. Tenant is responsible for all plumbing clogs, light bulb replacements, and repairs under $200 per occurrence.
3.2 Right of Entry: Landlord reserves the right to enter Premises for inspections, maintenance, or showings upon 12-hour verbal or written notice.

4. AUTOMATIC RENEWAL & NOTICE
This Lease automatically renews for successive 12-month terms unless either party gives written notice of intent to vacate at least sixty (60) days prior to the expiration of the current term.

5. EARLY TERMINATION PENALTY
If Tenant vacates Premises prior to lease expiration, Tenant shall remain liable for all remaining monthly rent payments through the end of the term, plus an Early Termination Fee equal to two (2) months' rent ($4,900), regardless of whether Landlord re-rents the unit.

6. SUBLETTING AND GUESTS
Subletting or Airbnb hosting is strictly prohibited. Guests staying more than seven (7) consecutive days require written Landlord authorization and background check fee of $75 per guest.`,
        clauses: [
            {
                section: "Section 3.1 - Repair Costs Under $200",
                original: "Tenant is responsible for all plumbing clogs, light bulb replacements, and repairs under $200 per occurrence.",
                plainEnglish: "You have to pay out-of-pocket for any minor household repair under $200, even if caused by aging building systems.",
                riskLevel: "high",
                riskReason: "Shifts traditional landlord repair responsibilities onto tenant.",
                category: "Financial Liability",
                mitigationTip: "Limit tenant repair responsibility strictly to tenant-caused damages rather than structural maintenance."
            },
            {
                section: "Section 4 - 60-Day Auto Renewal Trap",
                original: "Automatically renews for successive 12-month terms unless written notice is given at least sixty (60) days prior...",
                plainEnglish: "If you miss the notice deadline 2 months before your lease ends, you are automatically locked in for another full year.",
                riskLevel: "high",
                riskReason: "Auto-renewal into a full 1-year block without converting to month-to-month.",
                category: "Lock-in Risk",
                mitigationTip: "Request lease to automatically convert to month-to-month after 12 months with 30-day notice."
            },
            {
                section: "Section 5 - Double Penalty Early Termination",
                original: "Tenant remains liable for all remaining monthly rent... plus an Early Termination Fee equal to two (2) months' rent...",
                plainEnglish: "If you need to move early, you pay a $4,900 fee AND still keep paying monthly rent for all remaining months.",
                riskLevel: "high",
                riskReason: "Potentially illegal double-dipping penalty. Landlords have a legal duty to mitigate damages by attempting to re-rent.",
                category: "Financial Penalty",
                mitigationTip: "Strike out full term liability; negotiate a standard 2-month rent buyout clause as complete release."
            }
        ],
        riskScore: 84,
        riskSummary: "Unusually harsh residential tenant terms, featuring double early-termination fees, repair cost shifting, and strict auto-renewals."
    },

    saas: {
        id: "saas",
        title: "Enterprise SaaS Terms of Service & Privacy Policy",
        category: "Software Terms",
        parties: "CloudStack Analytics & Customer",
        date: "February 2026",
        summary: "Cloud software agreement featuring 99.5% uptime target, automatic price escalation on renewal, data processing rights, and total liability capped at 1 month of subscription fees.",
        text: `ENTERPRISE SAAS TERMS OF SERVICE

1. SERVICE & SLA
CloudStack provides subscription access to Cloud Analytics Platform. Service Level Agreement (SLA) targets 99.5% monthly uptime, excluding planned maintenance. SLA credit is capped at 5% of monthly fees.

2. DATA RIGHTS & AI MODEL TRAINING
Customer retains ownership of Customer Data. Customer grants CloudStack a non-exclusive, worldwide license to aggregate, anonymize, and process Customer Data to improve algorithms, train Machine Learning models, and create industry benchmarks.

3. FEES AND AUTOMATIC PRICE ESCALATION
Subscriptions auto-renew annually. Subscription pricing shall automatically increase by 10% upon each annual renewal unless Customer gives written non-renewal notice ninety (90) days in advance.

4. LIMITATION OF LIABILITY
IN NO EVENT SHALL CLOUDSTACK'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED THE TOTAL AMOUNT PAID BY CUSTOMER IN THE ONE (1) MONTH PRECEDING THE EVENT GIVING RISE TO LIABILITY. CLOUDSTACK DISCLAIMS ALL INDIRECT OR CONSEQUENTIAL DAMAGES.`,
        clauses: [
            {
                section: "Section 2 - Data Rights for AI Training",
                original: "...grants CloudStack a non-exclusive... license to aggregate, anonymize, and process Customer Data to improve algorithms, train Machine Learning models...",
                plainEnglish: "The software company can feed your enterprise data into their AI models, provided it is anonymized.",
                riskLevel: "caution",
                riskReason: "May expose confidential business telemetry or trade secrets to underlying LLM model weights.",
                category: "Data Privacy",
                mitigationTip: "Request an explicit opt-out of AI/ML model training on company data."
            },
            {
                section: "Section 4 - Unbalanced Liability Cap",
                original: "...TOTAL AGGREGATE LIABILITY... EXCEED THE TOTAL AMOUNT PAID BY CUSTOMER IN THE ONE (1) MONTH PRECEDING...",
                plainEnglish: "If the SaaS tool crashes, leaks your data, or causes millions in loss, the maximum they will pay you back is 1 month of subscription fees.",
                riskLevel: "high",
                riskReason: "1-month fee cap is extremely low compared to standard 12-month annual fee caps in enterprise software.",
                category: "Liability Risk",
                mitigationTip: "Negotiate liability cap up to 12 months of fees paid, with uncapped liability for data breaches."
            }
        ],
        riskScore: 62,
        riskSummary: "Moderate risk. Features broad AI training data rights and a low 1-month vendor liability cap."
    },

    freelance: {
        id: "freelance",
        title: "Freelance Design & Development Services Contract",
        category: "Services Agreement",
        parties: "Studio Craft Design & Client Apex Marketing",
        date: "January 2026",
        summary: "Project-based design agreement with milestone payments, 2 rounds of revisions, and IP transfer contingent upon full payment.",
        text: `FREELANCE SERVICES CONTRACT

1. SCOPE AND REVISIONS
Freelancer agrees to design a mobile app UI design system as specified in Statement of Work (SOW). Price includes two (2) rounds of revisions. Additional revisions will be billed at $95/hour.

2. PAYMENT TERMS
50% upfront deposit ($4,000) due prior to kickoff. Remaining 50% ($4,000) due upon final delivery. Payment terms net 15. Late payments accrue 1.5% interest per month.

3. IP TRANSFER ON FULL PAYMENT
All copyright and intellectual property rights in final deliverable will transfer to Client ONLY UPON RECEIPT OF FULL FINAL PAYMENT. Freelancer retains right to showcase work in personal portfolio.`,
        clauses: [
            {
                section: "Section 3 - IP Transfer Conditional on Payment",
                original: "...transfer to Client ONLY UPON RECEIPT OF FULL FINAL PAYMENT...",
                plainEnglish: "You don't own the code or design work until you pay the final invoice in full.",
                riskLevel: "low",
                riskReason: "Fair industry standard protection for freelancers against non-paying clients.",
                category: "Intellectual Property",
                mitigationTip: "Ensure internal accounting processes release final payments promptly upon deliverable approval."
            }
        ],
        riskScore: 15,
        riskSummary: "Very low risk profile. Balanced, transparent, and fair project-based engagement terms."
    }
};

const COMPARISON_PRESETS = {
    employment_vs_standard: {
        docA: LEGAL_SAMPLES.employment,
        docB: {
            title: "Standard Market Tech Employment Agreement",
            category: "Employment Contract (Baseline)",
            text: `STANDARD TECH EMPLOYMENT AGREEMENT

1. POSITION AND DUTIES
Employee shall serve as Software Engineer. Secondary non-competing side projects outside working hours using personal equipment are permitted provided they do not conflict with Company business.

2. COMPENSATION
Base salary $150,000 per annum with annual health benefits and 401(k) match.

3. INTELLECTUAL PROPERTY
Company owns Work Product created during working hours or using Company assets. Off-hours inventions created on personal equipment without proprietary company data remain property of Employee.

4. RESTRICTIVE COVENANTS
Non-compete duration is six (6) months, restricted strictly to direct active competitors within a 50-mile radius.

5. TERMINATION
At-will employment with two (2) weeks written notice. Severance is 4 weeks of base pay.`,
        },
        diffHighlights: [
            {
                topic: "Non-Compete Scope & Duration",
                docATerm: "24 months, North America wide (Aggressive)",
                docBTerm: "6 months, direct competitors within 50 miles (Standard)",
                verdict: "Doc B is far more favorable to Employee.",
                severity: "high"
            },
            {
                topic: "IP & Side Projects Ownership",
                docATerm: "Company owns all off-hours work even on personal laptops",
                docBTerm: "Employee retains off-hours projects built on personal gear",
                verdict: "Doc B protects personal software projects.",
                severity: "high"
            },
            {
                topic: "Termination Notice Period",
                docATerm: "30 days prior written notice required",
                docBTerm: "Standard 14 days (2 weeks) notice",
                verdict: "Doc B gives greater career mobility flexibility.",
                severity: "medium"
            },
            {
                topic: "Legal Dispute Fees",
                docATerm: "Each party pays own legal fees even if winning",
                docBTerm: "Standard court rules apply",
                verdict: "Doc B reduces litigation burden.",
                severity: "medium"
            }
        ]
    }
};

const FALLBACK_QA = [
    {
        keywords: ["non-compete", "compete", "competitor", "work elsewhere"],
        answer: "Based on Section 5.1 of the loaded document, there is a **24-month non-compete clause** spanning all of North America. This restricts you from working for any company in the cloud developer tools sector. \n\n**Actionable Advice:** This duration is unusually strict. It is advisable to request lowering this restriction to 6 months and limiting the scope to direct named competitors.",
        clauseRef: "Section 5.1 (Non-Competition)"
    },
    {
        keywords: ["ip", "intellectual property", "inventions", "side project", "code", "weekend"],
        answer: "Section 3.2 specifies a broad **Work for Hire & IP Assignment**. It claims company ownership over *all* software and inventions created during employment, even if made on weekends using your personal computer.\n\n**Actionable Advice:** Request an exception clause (or Exhibit list) explicitly carving out personal side projects that do not use company assets or confidential data.",
        clauseRef: "Section 3.2 (Work for Hire)"
    },
    {
        keywords: ["terminate", "termination", "quit", "fire", "leave", "notice"],
        answer: "Section 6 details termination terms:\n- **Voluntary Resignation:** Requires **30 days written notice**.\n- **Severance:** 2 weeks pay per year of completed service if terminated without cause.\n- **Immediate Discharge:** Permitted for gross negligence or breach of confidentiality.",
        clauseRef: "Section 6 (Termination & Severance)"
    },
    {
        keywords: ["salary", "pay", "bonus", "compensation", "money"],
        answer: "Under Section 2, the agreement specifies:\n- **Base Salary:** $145,000 per year, paid semi-monthly.\n- **Bonus:** Up to 15% annual discretionary performance bonus subject to KPI achievement.\n- **Benefits:** Eligible for health, dental, and 401(k).",
        clauseRef: "Section 2 (Compensation & Benefits)"
    },
    {
        keywords: ["rent", "lease", "deposit", "landlord", "maintenance"],
        answer: "Under Section 2 and 3 of the Lease Agreement:\n- **Monthly Rent:** $2,450 due on the 1st.\n- **Late Fee:** $150 penalty after the 5th.\n- **Repair Clause:** Tenant must pay for all repairs under $200 per incident.",
        clauseRef: "Section 2 & Section 3 (Lease Terms)"
    }
];
