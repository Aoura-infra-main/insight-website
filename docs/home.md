# Home Page Content Architecture & Rules

This document defines the structural rules, content priorities, and mapping schema for the Aoura Insights homepage.

---

## 1. Page Purpose & Content Mandate
The homepage of [Aoura Insights](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/index.html) serves as the primary publication portal for Aoura Group. It must synthesize macroeconomic intelligence, corporate developments, and investment briefs into a clean, minimal, professional dashboard. 

The primary goals are:
- Establish the authority of Aoura Group as a leading commerce infrastructure operator in the UAE and GCC.
- Curate and feature high-impact corporate briefings, reports, and division highlights.
- Facilitate immediate user navigation to specific communication pillars.

---

## 2. Hero Section Specification
The Hero Section in [index.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/index.html#L17-L27) must maintain strict visual compliance:

- **Meta-Tag**: `"OFFICIAL CORPORATE COMMUNICATIONS"` (rendered using `Geist Mono` typography, uppercase, serving as the official seal).
- **Primary Heading**: `"The Official Publication of Aoura Group"` (styled with bold weight, negative letter-spacing, and forced line-break after "Publication").
- **Description Paragraph**: `"News, investments, market intelligence, research, and strategic updates from across the Aoura Group ecosystem."` (Must remain factual and clear of marketese or hyper-promotional text).
- **Call-to-Action (CTA) Array**:
  1. **Primary Button**: Links to `#featured-briefings` (Action: `"Read Latest Updates"`).
  2. **Secondary Button**: Links to [companies.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/companies.html) (Action: `"Our Businesses"`).

---

## 3. Section Mapping & Data Rules
The homepage content structure is segmented into three logical zones:

### Zone 1: Featured Briefings
- **Container ID**: `#featured-briefings`
- **Rendering Mechanism**: Dynamically loaded from [articles.json](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/content/articles.json) where `featured: true`.
- **Layout Rule**: 
  - One primary large story card containing a prominent cover image, category tag, title link, subtitle/excerpt, date, and reading time.
  - Up to two secondary text-only story cards in a right-hand column for secondary featured updates.
- **Tone**: Long-term strategic corporate milestones.

### Zone 2: Latest Publications & Intelligence
- **Container Class**: `.section-latest`
- **Rendering Mechanism**: Dynamically loaded from [articles.json](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/content/articles.json) containing both featured and non-featured articles sorted chronologically (latest first).
- **Layout Rule**: Grid configuration styled with a subtle secondary background (`#fafafa`) to frame the items. Includes a direct shortcut link pointing to the Newsroom archive.

### Zone 3: Divisions & Performance
- **Container ID**: `#company-performance`
- **Rendering Mechanism**: Hardcoded static HTML blocks highlighting key business units of the parent holding group.
- **Current Layout columns**:
  1. **Aoura Products** (B2B Supply & Distribution)
  2. **Aoura E-commerce Services** (Digital Commerce Infrastructure)
- **Rules**: Descriptions must strictly reflect infrastructure/logistical services and avoid retail-centric terminology.

---

## 4. Cross-Linking System

### Related Sections
- [Newsroom Management Guide](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/newsroom.md)
- [Companies Profiles Structure](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/companies.md)
- [Global Components Integrity Rules](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/components.md)

### Back to Home
- You are on the Home Page Documentation page.

### Cross References
- Navigation links and header mapping are managed in [navigation.md](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/navigation.md).
- Typography and color rules are defined in the [Content Style Guide](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/content-style-guide.md).
