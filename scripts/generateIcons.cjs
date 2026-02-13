#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const masterSkillsPath = path.join(__dirname, '../src/data/masterSkills.json');
const masterSkills = JSON.parse(fs.readFileSync(masterSkillsPath, 'utf8'));
const iconDir = path.join(__dirname, '../public/assets/icons');

if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

const iconTemplates = {
  'default': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
  'finance': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  'accounting': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  'programming': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'data': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  'cloud': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  'tools': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  'chart': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  'security': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  'certificate': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  'skill': () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
};

const categoryIconMap = {
  'Finance & Investment': 'finance',
  'Accounting': 'accounting',
  'Programming Languages': 'programming',
  'Data Analysis': 'data',
  'Databases': 'data',
  'Big Data': 'data',
  'Cloud & DevOps': 'cloud',
  'AI & ML': 'chart',
  'Financial Software': 'tools',
  'Productivity & Office': 'tools',
  'Development Tools': 'tools',
  'Security': 'security',
  'Certifications': 'certificate',
  'Statistics': 'chart',
  'Web Development': 'programming',
  'Testing': 'tools',
  'Architecture': 'tools',
  'Version Control': 'tools',
  'Project Management': 'tools',
  'Business Skills': 'skill',
  'Soft Skills': 'skill',
  'Regulatory': 'security',
  'Operating Systems': 'tools',
};

let generated = 0, skipped = 0;

masterSkills.skills.forEach(skill => {
  const iconPath = path.join(iconDir, skill.icon);
  if (fs.existsSync(iconPath)) {
    skipped++;
    return;
  }
  const templateType = categoryIconMap[skill.category] || 'default';
  const template = iconTemplates[templateType] || iconTemplates['default'];
  fs.writeFileSync(iconPath, template(), 'utf8');
  generated++;
});

console.log(`✓ Icon generation complete! Generated: ${generated}, Skipped: ${skipped}, Total: ${masterSkills.skills.length}`);
