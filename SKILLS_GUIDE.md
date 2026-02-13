# 500+ Skills System - User Guide

## Overview

The portfolio now supports automatic skill detection and management with a master database of 504 finance, accounting, and tech-related skills. Skills are automatically detected and displayed when mentioned in any section (projects, experiences, education, or certifications).

## Features

### 1. Master Skills Database (504 Skills)

Located at: `src/data/masterSkills.json` and `public/data/masterSkills.json`

**Categories (24 total):**
- Finance & Investment (100+ skills)
- Accounting (80+ skills)
- Programming Languages (20 skills)
- Data Analysis (15+ skills)
- Databases (15 skills)
- Big Data (12 skills)
- Cloud & DevOps (18 skills)
- AI & ML (23 skills)
- Financial Software (22 skills)
- Productivity & Office (20 skills)
- Web Development (20 skills)
- Security (12 skills)
- Testing (14 skills)
- Architecture (10 skills)
- Version Control (5 skills)
- Project Management (6 skills)
- Certifications (9 skills)
- Statistics (6 skills)
- Regulatory (7 skills)
- Business Skills (32 skills)
- Soft Skills (8 skills)
- Operating Systems (7 skills)
- Development Tools (10 skills)
- And more...

### 2. Automatic Skill Detection

**How It Works:**

When you add a skill to any section (projects, experiences, education, certifications), the system:

1. **Checks the master database** - Looks up the skill by name (case-insensitive)
2. **Auto-adds to display** - Automatically includes it in the skills section
3. **Assigns category & icon** - Uses the master database info for categorization
4. **Tracks citations** - Counts how many times the skill is mentioned
5. **Ranks by usage** - Higher-mentioned skills get better rankings

**Example:**

```json
{
  "projects": [{
    "skillsUsed": ["Python", "Machine Learning", "XGBoost"]
  }]
}
```

Result:
- Python: Auto-detected, categorized as "Programming Languages", assigned python.svg icon
- Machine Learning: Auto-detected, categorized as "AI & ML", assigned ml.svg icon
- XGBoost: Auto-detected, categorized as "AI & ML", assigned xgboost.svg icon

All three skills will automatically appear in the skills section with:
- Correct category
- Custom icon
- Citation count (1 for each)
- Rank based on total usage

### 3. Icon System (527 Icons)

**Location:** `public/assets/icons/`

**Icon Templates:**
- Finance icons ($ symbol style)
- Accounting icons (ledger/grid style)
- Programming icons (code brackets style)
- Data icons (database cylinder style)
- Cloud icons (cloud shape style)
- Tools icons (wrench style)
- Chart icons (bar chart style)
- Security icons (shield style)
- Certificate icons (medal style)
- Default icon (checkmark in circle)

**Generation:**
- Icons auto-generated using `scripts/generateIcons.cjs`
- Run: `node scripts/generateIcons.cjs` to regenerate
- Adds new icons for skills in masterSkills.json

### 4. Usage in Content

#### Projects
```json
{
  "projects": [
    {
      "id": "proj1",
      "title": "Trading Bot",
      "skillsUsed": [
        "Python",
        "Algorithmic Trading",
        "Backtesting",
        "Pandas",
        "NumPy"
      ]
    }
  ]
}
```

#### Experiences
```json
{
  "experiences": [
    {
      "id": "exp1",
      "title": "Quantitative Analyst",
      "company": "Bank",
      "skillsUsed": [
        "Python",
        "Financial Modeling",
        "VaR (Value at Risk)",
        "Monte Carlo Simulation",
        "Bloomberg Terminal"
      ]
    }
  ]
}
```

#### Education
```json
{
  "education": [
    {
      "id": "edu1",
      "degree": "M.Sc. Financial Engineering",
      "skillsUsed": [
        "Financial Modeling",
        "Derivatives",
        "Options Trading",
        "MATLAB",
        "R"
      ]
    }
  ]
}
```

#### Certifications
```json
{
  "certifications": [
    {
      "id": "cert1",
      "name": "CFA Level I",
      "skillsUsed": [
        "Equity Research",
        "Fixed Income",
        "Valuation",
        "Portfolio Management"
      ]
    }
  ]
}
```

### 5. Unknown Skills

If you mention a skill not in the master database:
- System creates it with category "Other"
- Uses default_icon.svg
- Still tracks citations and ranks it
- You can later add it to masterSkills.json properly

**Example:**
```json
"skillsUsed": ["CustomTool2024"]
```
Result: Shows as "CustomTool2024" in "Other" category

### 6. Skill Ranking

Skills are ranked 1 to N based on total citations:
- #1 = Most mentioned skill
- Displayed with rank badge
- Citation count shown ("5 uses")
- Visual indicators (bars) for frequency

**Ranking Logic:**
```
Total Citations = Count from Projects + Experiences + Education + Certifications
Rank = Position when sorted by Total Citations (descending)
```

### 7. Dynamic Visibility

Only skills that are **actually used** appear in the skills section:
- Must have at least 1 citation
- If skill defined but never used = hidden
- Add skill anywhere = automatically visible

## Adding New Skills

### Option 1: Use Existing Skills (Recommended)

Browse `src/data/masterSkills.json` to find from 504 existing skills.

Common ones:
- **Finance:** Algorithmic Trading, Risk Management, Portfolio Management, Valuation, DCF Analysis, Credit Analysis, etc.
- **Programming:** Python, JavaScript, TypeScript, Java, C++, R, MATLAB, etc.
- **Data:** Pandas, NumPy, SQL, MongoDB, PostgreSQL, Spark, Kafka, etc.
- **ML/AI:** Machine Learning, TensorFlow, PyTorch, Scikit-learn, XGBoost, etc.
- **Cloud:** AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform, etc.
- **Tools:** Excel, Bloomberg Terminal, FactSet, Tableau, Power BI, etc.

### Option 2: Add Custom Skills

1. Open `src/data/masterSkills.json`
2. Add to the skills array:
```json
{
  "name": "Your Skill Name",
  "category": "Appropriate Category",
  "icon": "your_skill_icon.svg"
}
```
3. Run icon generator: `node scripts/generateIcons.cjs`
4. (Optional) Create custom SVG in `public/assets/icons/`

### Option 3: Quick Add (Auto-Detection)

Just use the skill name in any section:
```json
"skillsUsed": ["New Skill Name"]
```
- Shows immediately with default settings
- You can formalize it later in masterSkills.json

## Maintenance

### Regenerate Icons
```bash
cd /home/runner/work/finance-portfolio-hub/finance-portfolio-hub
node scripts/generateIcons.cjs
```

### Update Master Database
Edit `src/data/masterSkills.json`, then copy to public:
```bash
cp src/data/masterSkills.json public/data/masterSkills.json
```

### Check Skill Usage
Look at the skills page - it shows:
- All actively used skills
- Citation counts
- Rankings
- Categories

## Performance

The system is optimized for 500+ skills:
- Master skills cached after first load
- Icons lazy-loaded
- Efficient lookup by name
- Only used skills rendered
- Build size: ~1.4 MB (acceptable)

## Categories Reference

All 24 categories in the system:
1. Finance & Investment
2. Accounting
3. Programming Languages
4. Data Analysis
5. Databases
6. Big Data
7. Cloud & DevOps
8. AI & ML
9. Financial Software
10. Productivity & Office
11. Web Development
12. Security
13. Testing
14. Architecture
15. Version Control
16. Project Management
17. Certifications
18. Statistics
19. Regulatory
20. Business Skills
21. Soft Skills
22. Operating Systems
23. Development Tools
24. Other (auto-assigned to unknown skills)

## Troubleshooting

**Skill not showing?**
- Check it's mentioned in at least one section
- Verify spelling matches masterSkills.json (case-insensitive)
- Reload page (cache may need clearing)

**Icon missing?**
- Run `node scripts/generateIcons.cjs`
- Check icon file exists in `public/assets/icons/`
- Default icon (default_icon.svg) used as fallback

**Wrong category?**
- Update in `src/data/masterSkills.json`
- Ensure skill name matches exactly
- Copy to `public/data/masterSkills.json`

**Performance slow?**
- Normal with 500+ skills
- Only used skills rendered (much fewer)
- Icons lazy-loaded
- Master database cached

## Summary

✅ **504 pre-defined skills** across 24 categories
✅ **527 SVG icons** (504 new + 23 existing)
✅ **Automatic detection** from all sections
✅ **Smart categorization** via master database
✅ **Dynamic ranking** by citation frequency
✅ **Seamless integration** - add skills anywhere
✅ **Performance optimized** for large scale
✅ **Easy maintenance** with scripts

Just add skills to projects/experiences/education/certifications and they automatically appear with correct icons and categories!
