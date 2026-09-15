# Conciergo: Your Global Concierge

CONCIERGO — PHASE 0 + PHASE 1

Design System + Public Website

Build the frontend for Conciergo, a premium global marketplace that connects travellers and organizations with trusted local concierges at their destination.

This is the first frontend implementation phase.

IMPORTANT: Do not build the backend yet.
Use realistic mock data and local/mock state where necessary.

Do NOT implement:

Real authentication

Real database

Real payment processing

Real payment webhooks

Real AI

Real messaging backend

Real external APIs

Real concierge verification

Real notifications infrastructure

However, structure the frontend cleanly so these can be connected later without rebuilding the UI.

The result must look like a serious production product, not an AI-generated template or school project.

1. PRODUCT CONCEPT

Conciergo allows a traveller or organization to find a trusted local concierge who can handle things at their destination.

Example:

A Chinese company has 7 employees travelling to Lagos for 10 days.

They need:

Hotel assistance

Airport pickup

Transportation

Local assistance

Possibly Mandarin-speaking support

They search Conciergo, discover suitable concierges, compare their profiles, open a profile, and start a conversation.

Eventually the concierge and client can agree on a proposal, payment happens through Conciergo, the service is completed, and the concierge receives payment.

The public website should communicate this model clearly.

Conciergo is NOT a hotel booking site.

Conciergo is NOT a tour listing site.

Conciergo is NOT simply Fiverr for travel.

It is a trusted marketplace for destination-based personal and corporate assistance.

2. DESIGN DIRECTION

The visual direction should combine:

Premium travel

Modern marketplace

Trustworthy fintech

Human connection

International/global feel

Think:

premium travel company + professional service marketplace + modern technology platform

Avoid making it look like:

Fiverr clone

Airbnb clone

Generic SaaS template

Generic AI startup

Cheap travel website

Overly colorful marketplace

Excessive glassmorphism

The website should feel calm, premium, spacious and trustworthy.

3. BRAND COLOR

Conciergo's primary brand color is a warm premium orange.

Primary:

#F97316


Primary dark:

#EA580C


Supporting orange palette:

#FFF7ED
#FFEDD5
#FED7AA
#F97316
#EA580C
#C2410C


Do NOT make the whole website orange.

Use orange strategically for:

Primary CTA buttons

Active states

Important highlights

Brand details

Selected controls

Important links

Main interface palette:

Background: #FAFAF9
Surface: #FFFFFF
Primary text: #171717
Secondary text: #525252
Muted text: #737373
Border: #E7E5E4


Use restrained green/red colors only for success/error states.

4. TYPOGRAPHY

Use a modern, highly readable sans-serif typeface.

Prefer:

Inter

or another similarly clean modern font if Inter is unavailable.

Typography should have strong hierarchy.

Use:

Large confident hero heading

Medium section headings

Clear card headings

Comfortable body text

Small muted metadata

Do not use excessive font weights.

Do not make every heading bold.

5. VISUAL LANGUAGE

Use:

Large whitespace

Clean grids

Strong photography

Subtle borders

Very restrained shadows

Medium corner radius

Clear typography

High-quality iconography

Avoid:

Huge excessive rounded rectangles

Neon gradients

Random floating blobs

Excessive drop shadows

Excessive animations

Excessive orange

Clutter

Cards should feel refined rather than overly rounded.

Use approximately 12–16px radius for most cards.

Buttons can use approximately 10–12px radius.

6. RESPONSIVE DESIGN

Build mobile-first.

The website must work properly on:

Mobile

Tablet

Desktop

Large desktop

Do not simply shrink the desktop design.

Navigation, search, cards and sections must be deliberately designed for mobile.

The experience must remain premium at every breakpoint.

7. DESIGN SYSTEM

Before building the pages, establish reusable frontend primitives.

Create a consistent component system including:

Buttons

Primary

Secondary

Ghost

Destructive

Icon button

States:

Default

Hover

Active

Disabled

Loading

Inputs

Text

Search

Select

Date

Number

Textarea

States:

Default

Focus

Filled

Error

Disabled

Other primitives

Badge

Avatar

Rating

Tooltip

Dropdown

Modal

Drawer

Tabs

Divider

Skeleton

Empty state

Toast

Do not create inconsistent versions of the same component.

8. NAVIGATION

Desktop header:

Left:

Conciergo logo

Center/right:

Explore

How it works

Become a concierge

Right:

Log in

Sign up

Primary signup CTA should use the orange brand color.

Header should remain clean and relatively minimal.

Mobile:

Logo

Menu button

Use a polished mobile navigation drawer.

Header should become sticky where appropriate.

9. LOGO

For now create a simple text-based Conciergo wordmark with a subtle custom brand mark/icon if useful.

Do NOT generate a complicated logo.

The logo should be:

Conciergo

Clean, premium and recognizable.

The brand mark can eventually be replaced with a professionally designed logo.

10. PUBLIC ROUTES

Build these pages:

/
 /explore
 /how-it-works
 /become-a-concierge
 /about
 /help
 /login
 /signup


For this phase, /explore and concierge profiles should use realistic mock data.

11. HOMEPAGE

The homepage is the most important page.

It should immediately communicate:

Find a trusted local concierge wherever you go.

Hero supporting copy:

From airport pickup to business travel, transportation and local assistance, connect with someone who can handle the details at your destination.

Primary CTA:

Find a Concierge

Secondary CTA:

Become a Concierge

12. HERO SEARCH

The hero should contain a beautiful destination/service search experience.

Create a prominent search panel with:

Destination

Placeholder:

Where are you going?

Example:

Lagos, Nigeria

What do you need?

Placeholder:

What can we help with?

Examples:

Airport pickup

Transportation

Business travel

Local assistance

Translation

Hotel assistance

Dates

When are you travelling?

Travellers

2 travellers

CTA:

Find a Concierge

The search component should look premium and intuitive.

On mobile, convert it into a clean stacked search interface.

13. HERO VISUAL

Use high-quality travel imagery.

The imagery should communicate:

International travel

Human assistance

Cities

Movement

Professionalism

Avoid generic cheesy stock photography.

Use a large editorial-style travel image or sophisticated image composition.

The image should complement the orange brand rather than compete with it.

14. POPULAR DESTINATIONS

Create a section:

Popular destinations

Example destinations:

Lagos

Dubai

London

Paris

Guangzhou

Nairobi

Use attractive destination cards.

Each card should contain:

Image

Destination

Country

Number of concierges

Use realistic mock values.

Make this component reusable.

15. FEATURED CONCIERGES

Section heading:

Meet your local expert

Supporting text:

Find trusted people who know the destination and can help make your trip easier.

Create a responsive concierge card grid.

Each concierge card should include:

Profile image

Name

Location

Rating

Number of reviews

Languages

Main services

Completed trips

Verification badge

Starting price

Example:

David Chen
Lagos, Nigeria

★ 4.9 (47)

English · Mandarin

Corporate travel
Airport pickup
Transportation

84 trips completed

From $80

View profile


Use several realistic concierge profiles.

16. HOW IT WORKS

Create a clean four-step section.

01 — Tell us what you need

Describe your destination, dates and assistance required.

02 — Find your concierge

Browse trusted local professionals who match your needs.

03 — Chat and agree

Discuss your requirements and receive a personalized proposal.

04 — Travel with confidence

Your concierge handles the agreed services while Conciergo helps protect the transaction.

Use simple icons/illustrations.

Do not over-animate this section.

17. WHY CONCIERGO

Create a strong trust section.

Possible points:

Local expertise

Get help from people who actually know the destination.

Direct communication

Talk directly with your concierge before committing.

Transparent proposals

Know exactly what services you're paying for.

Protected transactions

Conciergo is designed to provide protection throughout the transaction.

Real reviews

Learn from people who have actually used the service.

Use clean cards or a split layout.

18. SERVICE CATEGORIES

Create a marketplace category section.

Categories:

Airport & transfers

Transportation

Business travel

Local assistance

Translation

Shopping assistance

Events & experiences

Personal assistance

Each category should have a tasteful icon.

Cards should feel clickable.

19. CORPORATE TRAVEL SECTION

This is important because the business model includes organizations.

Create a premium section targeting companies.

Headline:

Travel shouldn't become another project to manage.

Supporting text:

Give your team a trusted local contact who can handle the details on the ground.

CTA:

Explore corporate assistance

Visual direction:

Professional business travellers in an international destination.

Do not make this feel like generic corporate SaaS.

20. BECOME A CONCIERGE SECTION

Create a section for service providers.

Headline:

Turn your local knowledge into a business.

Supporting copy:

Help travellers experience your city while building a professional concierge business of your own.

CTA:

Become a concierge

Include benefits:

Get discovered by travellers

Manage requests

Build your reputation

Earn from your expertise

21. TESTIMONIALS

Create realistic testimonial cards.

Use fictional mock data for the frontend only.

Make the testimonials believable and specific.

Example:

"We had seven people arriving in Lagos for a business trip, and having one local person coordinate everything saved us a huge amount of time."

Include:

Name

Role

Company/trip context

Rating

Clearly keep these as frontend mock data for now.

22. FINAL CTA

Strong closing section:

Wherever you're going, have someone local in your corner.

CTA:

Find a Concierge

Secondary:

Become a Concierge

Use the orange brand color subtly.

23. FOOTER

Footer sections:

Conciergo

About

How it works

Become a concierge

Careers

Explore

Destinations

Services

Concierges

Support

Help center

Safety

Contact

Legal

Terms

Privacy

Cancellation policy

Include:

Social icons

Copyright

Language/currency placeholder

Keep it clean.

24. EXPLORE PAGE

Build /explore.

This is the beginning of the actual marketplace.

Layout:

Desktop:

Search/filter bar
──────────────────────────────

Filters       Results

              Concierge cards
              Concierge cards
              Concierge cards


Filters:

Destination

Services

Languages

Rating

Price

Availability

Verified only

Include:

Search field

Sort

Results count

Grid/list option if appropriate

Use realistic mock concierge data.

25. CONCIERGE PROFILE PREVIEW

Create /concierges/:id.

This can be a frontend-only dynamic mock route.

Profile structure:

Header

Large profile photo

Name

Location

Verification

Rating

Reviews

Trips completed

About

Professional introduction.

Services

Detailed services.

Languages

Language badges.

Experience

Professional history.

Availability

Mock availability preview.

Reviews

Several realistic review cards.

Right-side booking/contact panel

Desktop:

Start a conversation

Tell David what you need.

[ Start conversation ]


Mobile:

Use a sticky bottom CTA where appropriate.

Important:

The primary action should be Start a conversation, not "Buy now".

This is a negotiated service marketplace.

26. HOW IT WORKS PAGE

Build a polished standalone page explaining:

Search

Compare

Chat

Agree

Pay

Travel

Confirm

Review

Include both traveller and concierge journeys.

27. BECOME A CONCIERGE PAGE

Create a compelling landing page.

Sections:

Hero

Why become a concierge

How it works

What services you can offer

Trust/reputation

Earnings concept

FAQ

CTA

Do NOT promise specific earnings.

Use placeholders where exact business policies are not finalized.

CTA:

Create your concierge profile

28. ABOUT PAGE

Keep this concise and premium.

Explain:

Conciergo exists to make travelling easier by connecting people with trusted local help.

Focus on:

Human connection

Local expertise

Trust

Convenience

Global access

Do not invent fake company history.

29. HELP PAGE

Create a clean help center landing page.

Categories:

Getting started

Finding a concierge

Payments

Trips

Becoming a concierge

Safety

Account

Include a search UI.

The content can be mock/static for now.

30. AUTH PAGES

Create polished:

/login

/signup

Login:

Email

Password

Continue

Forgot password

Social login placeholders if visually useful

Signup should ask whether the user is:

I'm travelling / hiring a concierge

or

I'm a concierge

Do not implement real authentication yet.

Use mock interaction only.

31. MOCK DATA

Create structured mock data files rather than hard-coding data throughout components.

For example:

src/data/
├── concierges.ts
├── destinations.ts
├── services.ts
├── testimonials.ts
└── categories.ts


Use realistic but clearly fictional data.

Make the data structure similar to what a future backend API would return.

32. ARCHITECTURE

Use a clean React + TypeScript architecture.

Recommended:

src/
├── app/
├── components/
│   ├── ui/
│   ├── navigation/
│   ├── cards/
│   ├── search/
│   └── layout/
├── features/
│   ├── discovery/
│   ├── concierge/
│   └── auth/
├── pages/
├── data/
├── hooks/
├── lib/
├── types/
└── styles/


Do not create one giant App.tsx.

Do not put everything into one folder.

Keep reusable UI separate from feature-specific components.

33. ROUTING

Use proper client-side routing.

Routes:

/
 /explore
 /concierges/:id
 /how-it-works
 /become-a-concierge
 /about
 /help
 /login
 /signup


Create proper 404 handling.

34. INTERACTION QUALITY

Every interactive element must behave appropriately.

Examples:

Search button updates results

Filters affect mock results

Destination selection works

Concierge cards open profiles

Navigation works

Mobile menu works

Login/signup forms have basic validation

Buttons show appropriate states

Favorite buttons can toggle locally

Tabs work

Accordions work

Modals/drawers work

Do not create dead buttons everywhere.

If something is intentionally not connected to a backend yet, make the frontend behavior clear and prepare the component for future integration.

35. LOADING / EMPTY / ERROR STATES

Create reusable states.

Examples:

Loading skeleton for concierge cards

No search results

No favorites

Generic error

Empty destination state

Do not leave blank white screens.

36. ACCESSIBILITY

Implement:

Semantic HTML

Proper button elements

Labels

Keyboard navigation

Focus states

Accessible contrast

Alt text

ARIA only where necessary

37. ANIMATION

Use subtle animation.

Good:

Button hover

Card hover

Page transitions

Search interaction

Mobile menu

Modal

Dropdown

Image transitions

Avoid:

Constant floating elements

Excessive parallax

Large animations everywhere

Anything that makes the product feel like a design experiment

The product should feel fast.

38. PERFORMANCE

Prioritize:

Optimized images

Lazy loading where appropriate

Reasonable bundle size

Reusable components

No unnecessary rerenders

Responsive images

Avoid excessive dependencies

39. IMPORTANT PRODUCT LANGUAGE

Use terminology consistently.

Use:

Concierge

for the service provider.

Use:

Traveller or Client

for the person requesting service.

Use:

Trip

for the travel engagement.

Use:

Request

before a proposal exists.

Use:

Proposal

for the concierge's offered service/pricing.

Use:

Booking

after the proposal is accepted.

Do not randomly switch between:

seller/provider/agent/host/freelancer.

40. FINAL DESIGN STANDARD

Before considering this phase complete, review the entire website as a senior product designer and senior frontend engineer.

Ask:

Does it feel like a real startup?

Does the marketplace concept become obvious within seconds?

Does the orange feel premium rather than loud?

Are the pages visually consistent?

Are spacing and typography consistent?

Are mobile layouts genuinely designed?

Are cards too repetitive?

Are there unnecessary sections?

Are there dead buttons?

Does the navigation make sense?

Does the concierge profile build trust?

Does the homepage make someone want to search?

Does anything look obviously AI-generated?

Is the UI too similar to Fiverr/Airbnb?

Is the product visually differentiated?

Fix problems found during this review.

41. DO NOT DO THESE THINGS

Do not:

Build the backend

Add Supabase yet

Add real authentication

Add real payment providers

Add real AI

Invent API keys

Invent company statistics

Invent real customer testimonials

Claim real concierge verification

Claim real payment protection is operational

Build fake backend logic disguised as real functionality

Overcomplicate the frontend

Generate huge files

Duplicate components

Rewrite working code unnecessarily

This phase is about building the actual production-quality frontend foundation and public experience.

42. SUCCESS CRITERIA

When Phase 0 + Phase 1 is complete, I should be able to:

Open Conciergo.

Immediately understand what it does.

Search for a destination.

Browse concierge results.

Filter results.

Open a concierge profile.

Understand their services and credibility.

Start a mock conversation.

Navigate the public website.

View the concierge onboarding marketing page.

Experience the product on mobile and desktop.

The website should feel like a serious product ready for the next development phase.

Build this carefully and incrementally.

Do not rush.

Do not sacrifice architecture for visual speed.

Do not sacrifice UX for visual effects.

The priority order is:

Clarity → Trust → UX → Design quality → Performance → Animation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1576563c-17ca-461f-9ff9-fafa2384ffab).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
