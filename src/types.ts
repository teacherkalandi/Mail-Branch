export interface CardLink {
  title: string;
  url?: string;
  type?: 'sheet' | 'dashboard' | 'pdf' | 'video' | 'folder' | 'generic';
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  cards: CardLink[];
}

export const SECTIONS: Section[] = [
  {
    id: 'mail-booking',
    title: 'Mail Booking',
    icon: 'Mail',
    cards: [
      { title: 'Mail Booking Report 2025-26', url: 'https://docs.google.com/spreadsheets/d/1D_d3iwih0aqEBLD1JQVZr1GUtqtsCQryPT-WoxtCfrc/edit?gid=0#gid=0', type: 'sheet' },
      { title: 'Mail Booking Dashboard 2025-26', url: 'https://mailoperation2025-26.edgeone.app/', type: 'dashboard' },
      { title: 'Mail Booking Report 2026-27', url: 'https://docs.google.com/spreadsheets/d/15mP3CzQ6M9irA8XTj1I3k2FeIwzpzU6HNxsrUsHwiTA/edit?gid=0#gid=0', type: 'sheet' },
      { title: 'Mail Booking Dashboard 2026-2027', url: 'https://maildashboard.vercel.app/', type: 'dashboard' },
    ],
  },
  {
    id: 'pm-vishwakarma',
    title: 'PM Vishwakarma Toolkit',
    icon: 'Wrench',
    cards: [
      { title: 'PMV Toolkit CO site', url: 'https://docs.google.com/spreadsheets/d/1xGMkOpy1taSgXQBjeuL0Pr0aCKHdmYp_8o063MZQB_w/edit?gid=1779483970#gid=1779483970', type: 'sheet' },
      { title: 'PMV Toolkit Helpdesk', url: 'https://pmv-toolkit.vercel.app/', type: 'dashboard' },
      { title: 'PMV Toolkit DO Site', url: 'https://docs.google.com/spreadsheets/d/1S882Nr0V3ddfl2ReBhg5j2RzXrz9_RnMWLUibh4yIfw/edit?gid=100273630#gid=100273630', type: 'sheet' },
      { title: 'PMV Toolkit Delivery Procedure (PDF)', url: 'https://drive.google.com/file/d/1DFanac0E19Mc5xRh1brGnPR9CrZTm52n/view', type: 'pdf' },
      { title: 'PMV Toolkit Delivery Procedure (Youtube)', url: 'https://www.youtube.com/watch?v=54JOYYHjExw', type: 'video' },
    ],
  },
  {
    id: 'enumeration',
    title: 'Half Yearly Enumeration',
    icon: 'Calendar',
    cards: [
      { title: 'Half Yearly Enumeration August 2025', url: 'https://docs.google.com/spreadsheets/d/152h76jY7GVyjYO28D4BEmhX60hYJ9U-z3ssAVywNRGY/edit?gid=785820791#gid=785820791', type: 'sheet' },
      { title: 'Half Yearly Enumeration Feb-2026', url: 'https://docs.google.com/spreadsheets/d/1-Wh7zZTQcHtCRMQaB640fxYR61iT89Cg/edit?gid=1756287935#gid=1756287935', type: 'sheet' },
    ],
  },
  {
    id: 'mmu',
    title: 'Mail Monitoring Unit',
    icon: 'Activity',
    cards: [
      { title: 'D+0 Delivery Percentage', type: 'generic' },
      { title: 'DSS App Usage', type: 'generic' },
      { title: 'MMU Monitoring CO Site', type: 'generic' },
      { title: 'MMU Monitoring DO Site', type: 'generic' },
    ],
  },
  {
    id: 'fuel',
    title: 'Fuel Reimbursement Section',
    icon: 'Fuel',
    cards: [
      { title: 'Guideline on Fuel Reimbursement', url: 'https://drive.google.com/file/d/1BU14o-LjUeEizsxcR-HNOxcwtMl1AYgT/view', type: 'pdf' },
      { title: 'Beat Wise Delivery Staff Details', url: 'https://docs.google.com/spreadsheets/d/1j9wzz9t4wDKaE_b7a2NAJAMKzX38MQ4QQ40oWJ-v8Bk/edit?gid=0#gid=0', type: 'sheet' },
      { title: 'Reimbursement Form', type: 'generic' },
    ],
  },
  {
    id: 'rules',
    title: 'Orders/Rule',
    icon: 'FileText',
    cards: [
      { title: 'List of Prohibited articles', url: 'https://drive.google.com/drive/folders/1MV6Hwx_feeECsJMvEPV5zj_SG7Hv5NfH', type: 'folder' },
      { title: 'Revised Guidelines on BYOD', url: 'https://drive.google.com/file/d/18NPjzL8MJxupbETTlzof_rGl3m-PoHf4/view', type: 'pdf' },
    ],
  },
  {
    id: 'forms',
    title: 'Forms',
    icon: 'ClipboardList',
    cards: [
      { title: 'General Forms', type: 'generic' },
      { title: 'Leave Application', type: 'generic' },
    ],
  },
];
