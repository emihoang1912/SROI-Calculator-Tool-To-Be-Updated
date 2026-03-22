import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Users, Target } from "lucide-react";
import { useState } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { useSROI, STAKEHOLDERS, OUTCOMES_BY_STAKEHOLDER } from "@/contexts/SROIContext";
import { Button } from "@/components/ui/button";

const ScopePage = () => {
  const navigate = useNavigate();
  const { state, toggleStakeholder, toggleOutcome } = useSROI();
  const [showDescriptions, setShowDescriptions] = useState(true);

  const allOutcomes = state.selectedStakeholders.flatMap(
    (sId) => OUTCOMES_BY_STAKEHOLDER[sId] || []
  );

  return (
    <CalculatorLayout currentStep={2}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Define Stakeholders & Outcomes</h1>
        <p className="text-muted-foreground">
          Select relevant stakeholders and the outcomes you want to measure.
        </p>
      </div>

      {/* Summary badges */}
      <div className="mt-6 flex gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
          <Users className="h-4 w-4" />
          {state.selectedStakeholders.length} Stakeholders
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
          <Target className="h-4 w-4" />
          {state.selectedOutcomes.length} Outcomes
        </div>
      </div>

      {/* Stakeholders */}
      <h2 className="mt-8 text-xl font-bold text-foreground">Stakeholders</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {STAKEHOLDERS.map((s) => {
          const selected = state.selectedStakeholders.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggleStakeholder(s.id)}
              className={`rounded-xl border-2 p-5 text-left transition-all ${
                selected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
            </button>
          );
        })}
      </div>

      {/* Outcomes */}
      {allOutcomes.length > 0 && (
        <>
          <div className="mt-10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Outcomes</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Select the outcomes you want to measure. Outcomes are automatically linked to their stakeholders.
              </p>
            </div>
            <button
              onClick={() => setShowDescriptions(!showDescriptions)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              {showDescriptions ? "Hide" : "Show"} Descriptions
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {allOutcomes.map((o) => {
              const selected = state.selectedOutcomes.includes(o.id);
              return (
                <button
                  key={o.id}
                  onClick={() => toggleOutcome(o.id)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 px-6 py-4 text-left transition-all ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{o.name}</h3>
                    {showDescriptions && (
                      <p className="mt-1 text-xs text-muted-foreground">{o.description}</p>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {o.stakeholderName}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/calculator/describe")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={() => navigate("/calculator/evidence")}
          disabled={state.selectedOutcomes.length === 0}
          className="rounded-full bg-cta px-8 py-6 text-base font-medium text-cta-foreground hover:bg-cta/90"
        >
          Continue to Measuring
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </CalculatorLayout>
  );
};

export default ScopePage;
