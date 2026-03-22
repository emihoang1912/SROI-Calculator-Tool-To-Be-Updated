import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Stakeholder {
  id: string;
  name: string;
  description: string;
}

export interface Outcome {
  id: string;
  name: string;
  description: string;
  stakeholderId: string;
  stakeholderName: string;
}

export type EvidenceLevel = "bronze" | "silver" | "gold" | "diamond";

export interface OutcomeEvidence {
  outcomeId: string;
  level: EvidenceLevel;
}

export interface SROIState {
  projectSummary: string;
  uploadedFile: File | null;
  selectedStakeholders: string[];
  selectedOutcomes: string[];
  evidenceLevels: Record<string, EvidenceLevel>;
  calculateSROI: boolean;
}

interface SROIContextType {
  state: SROIState;
  setProjectSummary: (s: string) => void;
  setUploadedFile: (f: File | null) => void;
  toggleStakeholder: (id: string) => void;
  toggleOutcome: (id: string) => void;
  setEvidenceLevel: (outcomeId: string, level: EvidenceLevel) => void;
  setCalculateSROI: (v: boolean) => void;
}

const defaultState: SROIState = {
  projectSummary: "",
  uploadedFile: null,
  selectedStakeholders: [],
  selectedOutcomes: [],
  evidenceLevels: {},
  calculateSROI: false,
};

const SROIContext = createContext<SROIContextType | undefined>(undefined);

export const STAKEHOLDERS: Stakeholder[] = [
  { id: "staff", name: "Staff/Employees", description: "Paid staff and employees working in the organization" },
  { id: "partners", name: "Partners/Collaborators", description: "Partner organizations and collaborative stakeholders" },
  { id: "volunteers", name: "Volunteers", description: "Individuals who contribute their time and skills to the museum" },
  { id: "community", name: "Community/Public", description: "Local community members and the general public" },
  { id: "donors", name: "Donors/Funders", description: "Financial supporters and funding organizations" },
  { id: "beneficiaries", name: "Beneficiaries/Clients", description: "Direct recipients of services or programs" },
  { id: "visitors", name: "Visitors", description: "People visiting the Museum of Making" },
];

export const OUTCOMES_BY_STAKEHOLDER: Record<string, Outcome[]> = {
  staff: [
    { id: "staff-skills", name: "Improved professional skills", description: "Staff develop new competencies and professional capabilities", stakeholderId: "staff", stakeholderName: "Staff/Employees" },
    { id: "staff-wellbeing", name: "Enhanced employee wellbeing", description: "Staff experience improved mental health and job satisfaction", stakeholderId: "staff", stakeholderName: "Staff/Employees" },
  ],
  partners: [
    { id: "partner-networks", name: "Strengthened partnership networks", description: "Partners develop stronger collaborative relationships and networks", stakeholderId: "partners", stakeholderName: "Partners/Collaborators" },
    { id: "partner-capacity", name: "Increased organizational capacity", description: "Partner organizations build stronger internal capabilities", stakeholderId: "partners", stakeholderName: "Partners/Collaborators" },
  ],
  volunteers: [
    { id: "vol-skills", name: "New skills and experience", description: "Volunteers gain valuable skills and work experience", stakeholderId: "volunteers", stakeholderName: "Volunteers" },
    { id: "vol-wellbeing", name: "Improved wellbeing and purpose", description: "Volunteers experience enhanced sense of purpose and mental health", stakeholderId: "volunteers", stakeholderName: "Volunteers" },
  ],
  community: [
    { id: "comm-cohesion", name: "Enhanced social cohesion", description: "Community experiences strengthened social bonds and connections", stakeholderId: "community", stakeholderName: "Community/Public" },
    { id: "comm-access", name: "Improved access to services", description: "Community members gain better access to local services and resources", stakeholderId: "community", stakeholderName: "Community/Public" },
  ],
  donors: [
    { id: "donor-confidence", name: "Increased funding confidence", description: "Donors gain evidence of impact to support funding decisions", stakeholderId: "donors", stakeholderName: "Donors/Funders" },
  ],
  beneficiaries: [
    { id: "ben-quality", name: "Improved quality of life", description: "Beneficiaries experience measurable improvements in daily life", stakeholderId: "beneficiaries", stakeholderName: "Beneficiaries/Clients" },
    { id: "ben-empowerment", name: "Greater empowerment", description: "Beneficiaries gain autonomy and self-determination", stakeholderId: "beneficiaries", stakeholderName: "Beneficiaries/Clients" },
  ],
  visitors: [
    { id: "vis-learning", name: "Enhanced learning experience", description: "Visitors gain educational value and new knowledge", stakeholderId: "visitors", stakeholderName: "Visitors" },
    { id: "vis-engagement", name: "Increased cultural engagement", description: "Visitors develop deeper connection with cultural heritage", stakeholderId: "visitors", stakeholderName: "Visitors" },
  ],
};

export const EVIDENCE_LEVEL_DATA = {
  bronze: {
    label: "Bronze",
    icon: "🏅",
    description: "Relevant output statistics or anecdotal evidence",
    details: ["L1: Relevant output statistics", "L2: Anecdotal evidence"],
  },
  silver: {
    label: "Silver",
    icon: "🛡️",
    description: "Data measured by recommended measures with acceptable sample coverage but no proof of additionality",
    details: ["L3.a: Non-representative data", "L3.b: Representative data"],
  },
  gold: {
    label: "Gold",
    icon: "👑",
    description: "Data with acceptable sample coverage and reasonable indication of additionality",
    details: ["L4.a: Non-representative data with additionality indication", "L4.b: Representative data with additionality indication"],
  },
  diamond: {
    label: "Diamond",
    icon: "💎",
    description: "Data with acceptable sample coverage and reasonable indication of the estimate of additionality",
    details: ["L5.a: Non-representative data with additionality estimate", "L5.b: Representative data with additionality estimate"],
  },
};

export const DATA_COLLECTION_TEMPLATES: Record<EvidenceLevel, {
  method: string;
  questions: { question: string; options: string[] }[];
  sampling: string;
  additionality: { deadweight: string; attribution: string; displacement: string; dropOff: string };
  timing: string;
}> = {
  bronze: {
    method: "Partner survey and network analysis",
    questions: [
      { question: "Has our partnership strengthened your network?", options: ["Significantly strengthened", "Somewhat strengthened", "No change", "Weakened"] },
      { question: "Have you formed new collaborative relationships?", options: ["Significantly strengthened", "Somewhat strengthened", "No change", "Weakened"] },
    ],
    sampling: "Bronze: Anecdotal evidence or basic output statistics",
    additionality: { deadweight: "Some network growth would occur organically", attribution: "Other networking opportunities exist", displacement: "May reduce engagement with other networks", dropOff: "Networks require maintenance" },
    timing: "Post: 24-72h after activity",
  },
  silver: {
    method: "Structured survey with sample selection",
    questions: [
      { question: "Rate the quality of collaboration achieved", options: ["Excellent", "Good", "Fair", "Poor"] },
      { question: "How has the partnership affected your work?", options: ["Major positive impact", "Minor positive impact", "No impact", "Negative impact"] },
    ],
    sampling: "Silver: Non-representative or representative sample with recommended measures",
    additionality: { deadweight: "Moderate organic change expected", attribution: "Limited alternative sources", displacement: "Minimal displacement effects", dropOff: "Gradual decline expected" },
    timing: "Pre and post: Baseline + 3 months",
  },
  gold: {
    method: "Longitudinal study with control comparison",
    questions: [
      { question: "Describe specific changes in your network capacity", options: ["Significant growth", "Moderate growth", "No change", "Decline"] },
      { question: "Rate the sustainability of partnerships formed", options: ["Highly sustainable", "Moderately sustainable", "Uncertain", "Unsustainable"] },
    ],
    sampling: "Gold: Acceptable sample with additionality indication",
    additionality: { deadweight: "Controlled comparison shows limited organic change", attribution: "Attribution analysis completed", displacement: "Displacement assessment conducted", dropOff: "Long-term tracking planned" },
    timing: "Pre, post, and follow-up: Baseline + 6 months + 12 months",
  },
  diamond: {
    method: "Randomized controlled trial with comprehensive analysis",
    questions: [
      { question: "Comprehensive network mapping assessment", options: ["Complete expansion", "Partial expansion", "Stable", "Contraction"] },
      { question: "Multi-stakeholder impact validation", options: ["Fully validated", "Partially validated", "Inconclusive", "Not validated"] },
    ],
    sampling: "Diamond: Representative sample with additionality estimate",
    additionality: { deadweight: "RCT-based deadweight calculation", attribution: "Full attribution modeling completed", displacement: "Comprehensive displacement analysis", dropOff: "Multi-year tracking with adjustment" },
    timing: "Continuous: Baseline + quarterly for 24 months",
  },
};

export function SROIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SROIState>(defaultState);

  const setProjectSummary = (s: string) => setState((prev) => ({ ...prev, projectSummary: s }));
  const setUploadedFile = (f: File | null) => setState((prev) => ({ ...prev, uploadedFile: f }));
  const toggleStakeholder = (id: string) =>
    setState((prev) => ({
      ...prev,
      selectedStakeholders: prev.selectedStakeholders.includes(id)
        ? prev.selectedStakeholders.filter((s) => s !== id)
        : [...prev.selectedStakeholders, id],
    }));
  const toggleOutcome = (id: string) =>
    setState((prev) => ({
      ...prev,
      selectedOutcomes: prev.selectedOutcomes.includes(id)
        ? prev.selectedOutcomes.filter((o) => o !== id)
        : [...prev.selectedOutcomes, id],
    }));
  const setEvidenceLevel = (outcomeId: string, level: EvidenceLevel) =>
    setState((prev) => ({ ...prev, evidenceLevels: { ...prev.evidenceLevels, [outcomeId]: level } }));
  const setCalculateSROI = (v: boolean) => setState((prev) => ({ ...prev, calculateSROI: v }));

  return (
    <SROIContext.Provider value={{ state, setProjectSummary, setUploadedFile, toggleStakeholder, toggleOutcome, setEvidenceLevel, setCalculateSROI }}>
      {children}
    </SROIContext.Provider>
  );
}

export function useSROI() {
  const ctx = useContext(SROIContext);
  if (!ctx) throw new Error("useSROI must be used within SROIProvider");
  return ctx;
}
