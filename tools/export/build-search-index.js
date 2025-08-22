#!/usr/bin/env node
/**
 * Build a lightweight site search index so users can search across:
 * - Educational Resources A–Z (including key terminology/glossary)
 * - Newly Diagnosed – What Next? (OT, Speech, ABA, etc.)
 * - Disability Entitlements A–Z (and how to apply)
 * - School/principals sections (autism units, inclusive practices, exam accommodations)
 * - Links catalogue items (programs, games, studies, strategies, YouTube)
 *
 * Output: public/search-index.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, 'search-index.json');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function entry(e) {
  return {
    type: e.type, // 'page' | 'section' | 'entitlement' | 'glossary' | 'link'
    title: e.title,
    description: e.description || '',
    url: e.url,
    tags: e.tags || [],
    keywords: e.keywords || [],
  };
}

function tryReadJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

function buildIndex() {
  const list = [];

  // Pages
  list.push(entry({
    type: 'page',
    title: 'Educational Resources A–Z',
    description: 'Irish educational resources, applications, and supports for autism and SEN.',
    url: '/educational-resources',
    tags: ['education', 'schools', 'principals', 'SEN', 'A-Z'],
    keywords: ['curriculum', 'JCT', 'PLU', 'inclusive', 'NCSE', 'applications']
  }));
  list.push(entry({
    type: 'page',
    title: 'Newly Diagnosed – What Next?',
    description: 'Therapies, services, and first steps after an autism diagnosis in Ireland.',
    url: '/newly-diagnosed',
    tags: ['diagnosis', 'parents', 'children', 'OT', 'SLT', 'ABA'],
    keywords: ['funding', 'DCA', 'carer', 'sleep', 'sensory', 'IEP']
  }));
  list.push(entry({
    type: 'page',
    title: 'Disability Entitlements A–Z',
    description: 'Irish disability entitlements, allowances, and how to apply.',
    url: '/disability-entitlements',
    tags: ['entitlements', 'allowances', 'A-Z', 'how to apply'],
    keywords: ['DCA', 'Disability Allowance', 'Carer', 'Medical Card', 'Free Travel']
  }));

  // Educational Resources sections (schools/principals focus)
  const edu = '/educational-resources';
  list.push(entry({ type: 'section', title: 'Applications & Forms', url: `${edu}#applications`, tags: ['applications', 'forms'], keywords: ['NCSE', 'enrolment', 'transport', 'assistive technology'] }));
  list.push(entry({ type: 'section', title: 'Curriculum & Learning Support', url: `${edu}#curriculum`, tags: ['curriculum', 'teachers'], keywords: ['L1LP', 'L2LP', 'assessment', 'inclusion'] }));
  list.push(entry({ type: 'section', title: 'Professional Development (JCT/SESS)', url: `${edu}#jct`, tags: ['JCT', 'SESS', 'CPD'], keywords: ['training', 'inclusive education'] }));
  list.push(entry({ type: 'section', title: 'Autism Units & Special Education', url: `${edu}#autism-units`, tags: ['schools', 'principals'], keywords: ['SNA', 'IEP', 'placement', 'TEACCH'] }));
  list.push(entry({ type: 'section', title: 'Funding, Grants & Financial Support', url: `${edu}#funding`, tags: ['funding', 'grants'], keywords: ['SUSI', 'transport', 'equipment'] }));
  list.push(entry({ type: 'section', title: 'Exemptions & Exam Accommodations', url: `${edu}#exemptions`, tags: ['exams', 'accommodations'], keywords: ['RACE', 'reader', 'scribe', 'separate venue', 'extra time'] }));
  list.push(entry({ type: 'section', title: 'Third Level & University Support', url: `${edu}#universities`, tags: ['university', 'DARE'], keywords: ['disability office', 'supports'] }));
  list.push(entry({ type: 'section', title: 'Transition Planning', url: `${edu}#transitions`, tags: ['transition'], keywords: ['primary', 'secondary', 'orientation'] }));
  list.push(entry({ type: 'section', title: 'Inclusive Practices & Mainstream Support', url: `${edu}#inclusive`, tags: ['inclusive', 'UDL'], keywords: ['accommodations', 'sensory', 'peer support'] }));
  list.push(entry({ type: 'section', title: 'Key Terminology (A–Z Quick Reference)', url: `${edu}#glossary`, tags: ['terminology', 'glossary', 'A-Z'], keywords: ['ASD','DARE','DCA','EPSEN','GAM','HEAR','IEP','JCT','L1LP','L2LP','NCSE','NEPS','PLU','SEC','SEN','SESS','SNA','SUSI'] }));

  // Newly Diagnosed sections (with OT/SLT)
  const nd = '/newly-diagnosed';
  list.push(entry({ type: 'section', title: 'Educational Support', url: `${nd}#education`, tags: ['education', 'AIMS'], keywords: ['school placement', 'autism class'] }));
  list.push(entry({ type: 'section', title: 'Individual Education Plan (IEP)', url: `${nd}#iep`, tags: ['IEP'], keywords: ['goals', 'accommodations'] }));
  list.push(entry({ type: 'section', title: 'Occupational Therapy (OT)', url: `${nd}#ot`, tags: ['OT'], keywords: ['sensory diet', 'fine motor', 'ADL'] }));
  list.push(entry({ type: 'section', title: 'Speech & Language Therapy (SLT)', url: `${nd}#speech`, tags: ['SLT'], keywords: ['PECS', 'communication'] }));
  list.push(entry({ type: 'section', title: 'Applied Behavior Analysis (ABA)', url: `${nd}#aba`, tags: ['ABA'], keywords: ['behavioral', 'skills'] }));
  list.push(entry({ type: 'section', title: 'Social Skills & Movement', url: `${nd}#social-movement`, tags: ['social', 'movement'], keywords: ['sensory', 'breaks'] }));
  list.push(entry({ type: 'section', title: 'Health & Wellness', url: `${nd}#health`, tags: ['health'], keywords: ['sleep', 'melatonin', 'nutrition'] }));
  list.push(entry({ type: 'section', title: 'Funding & Financial Support', url: `${nd}#funding`, tags: ['funding'], keywords: ['DCA', 'Carer'] }));
  list.push(entry({ type: 'section', title: 'Special Programs & Resources', url: `${nd}#programs`, tags: ['resources'], keywords: ['Gemiini', 'travel supports'] }));
  list.push(entry({ type: 'section', title: 'Next Steps', url: `${nd}#next-steps`, tags: ['checklist'], keywords: ['apply', 'referrals'] }));

  // Entitlements A–Z (Disability Entitlements page): include common items + how to apply tag
  const de = '/disability-entitlements';
  const ent = [
    { letter: 'a', title: 'Assistive Technology', keywords: ['devices', 'grants'] },
    { letter: 'b', title: 'Blind Welfare Allowance', keywords: ['weekly payment'] },
    { letter: 'c', title: "Carer's Allowance", keywords: ['means test', 'care'] },
    { letter: 'd', title: 'Disability Allowance', keywords: ['16+', 'means test'] },
    { letter: 'd', title: 'Domiciliary Care Allowance (DCA)', keywords: ['under 16', '€309.50'] },
    { letter: 'e', title: 'Early Childhood Care and Education (ECCE)', keywords: ['AIM', 'pre-school'] },
    { letter: 'f', title: 'Free Travel Pass', keywords: ['public transport', 'companion'] },
    { letter: 'h', title: 'HSE Services', keywords: ['OT', 'SLT', 'respite'] },
    { letter: 'm', title: 'Medical Card', keywords: ['GP', 'hospital', 'medicines'] },
    { letter: 's', title: 'Special Needs Assistant (SNA)', keywords: ['care needs', 'school'] },
  ];
  for (const e of ent) {
    list.push(entry({
      type: 'entitlement',
      title: e.title,
      description: 'Includes how to apply and eligibility',
      url: `${de}#letter-${e.letter}`,
      tags: ['how to apply', 'entitlement'],
      keywords: e.keywords,
    }));
  }

  // Links catalogue items (if available)
  const linksJson = tryReadJson(path.join(PUBLIC, 'links-catalogue.json'));
  if (linksJson && Array.isArray(linksJson.items)) {
    for (const it of linksJson.items) {
      const title = it.title || it.label || it.url;
      const url = it.url;
      if (!title || !url) continue;
      list.push(entry({
        type: 'link',
        title,
        description: `${it.category || ''}${it.subCategory ? ' • ' + it.subCategory : ''}`.trim(),
        url,
        tags: [it.source, it.category, it.subCategory].filter(Boolean),
        keywords: (title + ' ' + (it.category || '') + ' ' + (it.subCategory || '')).toLowerCase().split(/[\s/,-]+/).filter(Boolean).slice(0, 12),
      }));
    }
  }

  return list;
}

function main() {
  ensureDir(PUBLIC);
  const items = buildIndex();
  const json = { updatedAt: new Date().toISOString(), total: items.length, items };
  fs.writeFileSync(OUT, JSON.stringify(json, null, 2), 'utf8');
  console.log('Search index written:', OUT, 'items:', items.length);
}

if (require.main === module) {
  main();
}
