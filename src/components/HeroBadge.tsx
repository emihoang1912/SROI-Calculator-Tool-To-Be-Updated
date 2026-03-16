import { Sparkles } from "lucide-react";

const HeroBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary">
      <Sparkles className="h-4 w-4" strokeWidth={1.5} />
      Social Return on Investment Calculator
    </div>
  );
};

export default HeroBadge;
