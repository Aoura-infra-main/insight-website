# Market Intelligence Layout & Data Structure

This document outlines the visual layouts, telemetry data blocks, and updates frequency for the Markets section.

---

## 1. Section Purpose & Mandate
The [markets.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/markets.html) page hosts macroeconomic analyses and trade intelligence focusing on the UAE and broader GCC regions. Content must cover e-commerce growth projections, supply chain bottlenecks, warehousing density indexes, and regional trade regulations.

---

## 2. Layout Blueprint & Modules
Market intelligence briefs must consist of three primary components:

### 2.1 Macro Summary Bar
- **Description**: Key economic indicators reflecting GCC retail and commerce health.
- **Format**: Row of 3 to 4 metrics (e.g., UAE GDP Growth %, GCC E-commerce Market Value, Logistics Performance Index rank).
- **Typography**: Large bold metrics using Geist Mono font.

### 2.2 Intelligence Feed Grid
- **Description**: Cards linking to detailed market analysis articles.
- **Layout**: Dynamic Masonry-style grid filtering for category `"Markets"`.

### 2.3 Sector Heatmaps & Tables
- **Description**: Simplified tables showing shipping routes efficiency, warehousing rental rates, or cross-border customs latency times.
- **Rules**: Tables must use primary monochrome borders and avoid high-contrast colors, keeping design elegant and clean.

---

## 3. Data Structure for Briefings
Each market intelligence post must integrate the following data block structure in `articles.json`:
- **Tags**: Must specify territory (e.g., `#UAE`, `#KSA`, `#GCC`) and sector (e.g., `#Logistics`, `#Retail`).
- **Data Callout Object**: If applicable, a key indicator to render directly on the article reader page.

---

## 4. Cross-Linking System

### Related Sections
- [Research Section Format](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/research.md)
- [Investments Reporting System](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/investments.md)
- [Corporate Reports Formatting](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/reports.md)

### Back to Home
- [Back to Home](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/home.md)

### Cross References
- Typography styles and layout elements are documented in the [Content Style Guide](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/content-style-guide.md).
- Global header definitions are located in [components.md](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/components.md).
