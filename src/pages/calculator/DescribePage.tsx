import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload } from "lucide-react";
import { useRef } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { useSROI } from "@/contexts/SROIContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const DescribePage = () => {
  const navigate = useNavigate();
  const { state, setProjectSummary, setUploadedFile } = useSROI();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
  };

  return (
    <CalculatorLayout currentStep={1}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Describe Your Project</h1>
        <p className="text-muted-foreground">
          Tell us about your project. We'll help identify relevant stakeholders and outcomes for impact measurement.
        </p>
      </div>

      {/* Project Summary */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-8">
        <label className="text-sm font-semibold text-foreground">
          Project Summary <span className="text-destructive">*</span>
        </label>
        <Textarea
          className="mt-3 min-h-[160px] resize-none rounded-xl border-border"
          placeholder="Describe your project..."
          value={state.projectSummary}
          onChange={(e) => setProjectSummary(e.target.value)}
        />
      </div>

      {/* File Upload */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-8">
        <label className="text-sm font-semibold text-foreground">Upload Project Report (Optional)</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-10 transition-colors hover:border-primary/40 hover:bg-muted/30"
        >
          <Upload className="h-8 w-8 text-muted-foreground/60" />
          <p className="mt-3 text-sm text-muted-foreground">
            {state.uploadedFile ? state.uploadedFile.name : "Upload existing project report"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">PDF, DOC, DOCX, or TXT</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <Button
          onClick={() => navigate("/calculator/scope")}
          disabled={!state.projectSummary.trim()}
          className="rounded-full bg-cta px-8 py-6 text-base font-medium text-cta-foreground hover:bg-cta/90"
        >
          Analyze Stakeholders
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </CalculatorLayout>
  );
};

export default DescribePage;
