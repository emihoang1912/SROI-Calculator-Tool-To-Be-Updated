import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Target, ClipboardList, Calendar } from "lucide-react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import {
  useSROI,
  OUTCOMES_BY_STAKEHOLDER,
  EVIDENCE_LEVEL_DATA,
  DATA_COLLECTION_TEMPLATES,
  type EvidenceLevel,
} from "@/contexts/SROIContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PlanPage = () => {
  const navigate = useNavigate();
  const { state } = useSROI();

  const selectedOutcomeObjects = state.selectedStakeholders
    .flatMap((sId) => OUTCOMES_BY_STAKEHOLDER[sId] || [])
    .filter((o) => state.selectedOutcomes.includes(o.id));

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Data Collection Plan", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Comprehensive plan for collecting impact data and measuring outcomes", 14, 30);

    let y = 40;

    selectedOutcomeObjects.forEach((outcome) => {
      const level = (state.evidenceLevels[outcome.id] || "bronze") as EvidenceLevel;
      const template = DATA_COLLECTION_TEMPLATES[level];
      const levelData = EVIDENCE_LEVEL_DATA[level];

      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(outcome.name, 14, y);
      y += 6;
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(`${outcome.stakeholderName} | ${levelData.label.toUpperCase()} Level`, 14, y);
      y += 10;

      // What to Collect
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text("What to Collect", 14, y);
      y += 6;
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text(`Target Outputs: Number of ${outcome.name.toLowerCase()}`, 18, y);
      y += 8;

      // How to Collect
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text("How to Collect", 14, y);
      y += 6;
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text(`Data Collection Method: ${template.method}`, 18, y);
      y += 8;

      // Questions table
      autoTable(doc, {
        startY: y,
        head: [["Suggested Question", "Response Options"]],
        body: template.questions.map((q) => [q.question, q.options.join(" | ")]),
        margin: { left: 18 },
        styles: { fontSize: 8 },
        headStyles: { fillColor: [34, 139, 112] },
      });
      y = (doc as any).lastAutoTable.finalY + 8;

      // Additionality
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text(`Sampling Strategy: ${template.sampling}`, 18, y);
      y += 6;
      doc.text(`Deadweight: ${template.additionality.deadweight}`, 18, y);
      y += 5;
      doc.text(`Attribution: ${template.additionality.attribution}`, 18, y);
      y += 5;
      doc.text(`Displacement: ${template.additionality.displacement}`, 18, y);
      y += 5;
      doc.text(`Drop Off: ${template.additionality.dropOff}`, 18, y);
      y += 8;

      // Timing
      doc.text(`When to Collect: ${template.timing}`, 18, y);
      y += 14;
    });

    doc.save("data-collection-plan.pdf");
  };

  return (
    <CalculatorLayout currentStep={4}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Data Collection Plan</h1>
          <p className="text-muted-foreground">
            Comprehensive plan for collecting impact data and measuring outcomes
          </p>
        </div>
      </div>

      {/* Outcome Plans */}
      <div className="mt-8 space-y-8">
        {selectedOutcomeObjects.map((outcome) => {
          const level = (state.evidenceLevels[outcome.id] || "bronze") as EvidenceLevel;
          const template = DATA_COLLECTION_TEMPLATES[level];
          const levelData = EVIDENCE_LEVEL_DATA[level];

          return (
            <div key={outcome.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{outcome.name}</h2>
                  <Badge className="mt-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                    {levelData.label.toUpperCase()} Level
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{outcome.stakeholderName}</span>
              </div>

              {/* What to Collect */}
              <div className="mx-6 rounded-xl bg-muted/50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Target className="h-4 w-4 text-primary" /> What to Collect
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">Target Outputs:</p>
                <p className="mt-1 text-sm text-foreground">· Number of {outcome.name.toLowerCase()}</p>
              </div>

              {/* How to Collect */}
              <div className="mx-6 mt-4 rounded-xl bg-muted/50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <ClipboardList className="h-4 w-4 text-primary" /> How to Collect
                </h3>
                <p className="mt-3 text-xs text-muted-foreground">Data Collection Method:</p>
                <div className="mt-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground">
                  {template.method}
                </div>

                <p className="mt-4 text-xs text-muted-foreground">Suggested Questions:</p>
                <div className="mt-2 space-y-3">
                  {template.questions.map((q, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background px-4 py-3">
                      <p className="text-sm text-foreground">{q.question}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {q.options.map((opt) => (
                          <span
                            key={opt}
                            className="rounded-md border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-muted-foreground">Sampling Strategy:</p>
                <div className="mt-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground">
                  {template.sampling}
                </div>

                <p className="mt-4 text-xs text-muted-foreground">Additionality Assessment:</p>
                <div className="mt-2 space-y-0 divide-y divide-border rounded-lg border border-border bg-background">
                  {Object.entries(template.additionality).map(([key, val]) => (
                    <div key={key} className="px-4 py-2.5">
                      <span className="text-xs font-semibold capitalize text-foreground">{key}:</span>
                      <span className="ml-2 text-xs text-muted-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* When to Collect */}
              <div className="mx-6 my-4 rounded-xl bg-muted/50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Calendar className="h-4 w-4 text-primary" /> When to Collect
                </h3>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-background border border-border px-3 py-1.5 text-xs text-foreground">
                    📋 {template.timing}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/calculator/evidence")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={downloadPDF}
          className="rounded-full bg-primary px-8 py-6 text-base font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Templates
        </Button>
      </div>
    </CalculatorLayout>
  );
};

export default PlanPage;
