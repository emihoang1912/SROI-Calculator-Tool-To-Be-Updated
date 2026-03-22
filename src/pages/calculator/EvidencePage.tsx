import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { useSROI, OUTCOMES_BY_STAKEHOLDER, EVIDENCE_LEVEL_DATA, type EvidenceLevel } from "@/contexts/SROIContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const levels: EvidenceLevel[] = ["bronze", "silver", "gold", "diamond"];

const EvidencePage = () => {
  const navigate = useNavigate();
  const { state, setEvidenceLevel, setCalculateSROI } = useSROI();

  const selectedOutcomeObjects = state.selectedStakeholders
    .flatMap((sId) => OUTCOMES_BY_STAKEHOLDER[sId] || [])
    .filter((o) => state.selectedOutcomes.includes(o.id));

  return (
    <CalculatorLayout currentStep={3}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Level of Evidence</h1>
        <p className="text-muted-foreground">
          Select the evidence level for each outcome based on available data quality.
        </p>
      </div>

      {/* Evidence Level Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {levels.map((level) => {
          const data = EVIDENCE_LEVEL_DATA[level];
          return (
            <div
              key={level}
              className="rounded-xl border-2 border-border bg-card p-5 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{data.icon}</span>
                <h3 className="text-sm font-bold text-foreground">{data.label}</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{data.description}</p>
              <ul className="mt-3 space-y-1">
                {data.details.map((d) => (
                  <li key={d} className="text-xs text-muted-foreground">· {d}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Outcome Evidence Table */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Outcome</th>
              {levels.map((level) => (
                <th key={level} className="px-4 py-4 text-center text-sm font-semibold text-foreground">
                  <span className="mr-1">{EVIDENCE_LEVEL_DATA[level].icon}</span>
                  {EVIDENCE_LEVEL_DATA[level].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedOutcomeObjects.map((outcome) => (
              <tr key={outcome.id} className="border-b border-border last:border-0">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-foreground">{outcome.name}</p>
                  <span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    {outcome.stakeholderName}
                  </span>
                </td>
                {levels.map((level) => (
                  <td key={level} className="px-4 py-4 text-center">
                    <Checkbox
                      checked={state.evidenceLevels[outcome.id] === level}
                      onCheckedChange={() => setEvidenceLevel(outcome.id, level)}
                      className="mx-auto"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calculate SROI option */}
      <div className="mt-6 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={state.calculateSROI}
            onCheckedChange={(v) => setCalculateSROI(!!v)}
            className="mt-1"
          />
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              📊 Calculate Social Return on Investment (SROI)
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Generate a comprehensive SROI analysis including financial proxies, input costs, and return calculations. This will add an additional step to your measurement plan.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/calculator/scope")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={() => navigate("/calculator/plan")}
          disabled={selectedOutcomeObjects.some((o) => !state.evidenceLevels[o.id])}
          className="rounded-full bg-cta px-8 py-6 text-base font-medium text-cta-foreground hover:bg-cta/90"
        >
          Continue to Data Collection
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </CalculatorLayout>
  );
};

export default EvidencePage;
