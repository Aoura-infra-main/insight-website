# Newsroom Section Architecture & Publishing Rules

This document outlines the content structure, category definition, and static publishing workflow for the Aoura Insights Newsroom.

---

## 1. Section Purpose & Mandate
The Newsroom acts as the primary feed for press releases, corporate milestones, and media announcements. All content must focus on tangible group updates (e.g., real estate acquisitions, facility openings, leadership moves, strategic client partnerships).

---

## 2. Categories & Taxonomy
Articles under the Newsroom page must use one of the following official categories defined in the central registry:
1. **Company Updates**: Announcements related to staff, offices, brand assets, or administrative expansions.
2. **Operations**: Logistics, fulfillment centers, supply chain technologies, or vehicle fleet deployments.
3. **Strategic Partnerships**: Agreements with key stakeholders, regional distributors, or technology vendors.
4. **Market Intelligence**: Summarized observations on regional commerce activity (often cross-linked with research).

---

## 3. Publishing Workflow & Content Rules
As Aoura Insights is a zero-dependency static site, new press releases must be published following these steps:

### Step 1: Update the Central Article Registry
Add a new object to the array in [articles.json](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/content/articles.json):
- `id`: Unique hyphenated string matching the filename (e.g., `dubai-industrial-city-launch`).
- `category`: Exactly `"Company Updates"`, `"Operations"`, `"Strategic Partnerships"`, or `"Market Intelligence"`.
- `title`: Short, active headline.
- `subtitle`: Summary of the impact.
- `author`: Entity representing the division or group (e.g., `"Corporate Communications"`).
- `date`: Month Day, Year (e.g., `"June 15, 2026"`).
- `readingTime`: Reading estimate (e.g., `"3 MIN READ"`).
- `coverImage`: Unsplash or local image URL.
- `tags`: Array of string tags (e.g., `["UAE", "Logistics", "Warehouse"]`).
- `featured`: `true` if this should appear in the home hero grid, otherwise `false`.

### Step 2: Create the Detailed Content File
Create `content/articles/[id].json` containing the HTML payload:
```json
{
    "content": "<h2>Headline</h2><p>Body copy here...</p>"
}
```

---

## 4. Cross-Linking System

### Related Sections
- [Home Page Architecture](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/home.md)
- [Leadership Bio & Tone Guide](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/leadership.md)
- [Content Style Guide](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/content-style-guide.md)

### Back to Home
- [Back to Home](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/home.md)

### Cross References
- File layout and asset paths are managed under [components.md](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/components.md).
- Search indexing rules are details under [navigation.md](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/docs/navigation.md).
