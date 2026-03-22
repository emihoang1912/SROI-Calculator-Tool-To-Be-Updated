import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CalculatorLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

const steps = [
  { number: 1, label: "Describe" },
  { number: 2, label: "Scope" },
  { number: 3, label: "Evidence" },
  { number: 4, label: "Plan" },
];

const CalculatorLayout = ({ currentStep, children }: CalculatorLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit
          </button>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Theme</p>
            <p className="text-sm font-semibold text-foreground">Community Volunteering</p>
          </div>
          <div className="w-16" />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                    step.number < currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : step.number === currentStep
                        ? "border-primary bg-background text-primary"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {step.number < currentStep ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step.number <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-16 sm:w-24 md:w-32 ${
                    step.number < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
    </div>
  );
};

export default CalculatorLayout;
