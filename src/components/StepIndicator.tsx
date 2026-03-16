import { motion } from "framer-motion";

const steps = [
  { number: 1, label: "Describe" },
  { number: 2, label: "Scope" },
  { number: 3, label: "Measure" },
  { number: 4, label: "Claim" },
];

const StepIndicator = () => {
  return (
    <div className="flex items-center justify-center gap-12 md:gap-16">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-step-border text-base font-medium text-step-foreground">
            {step.number}
          </div>
          <span className="text-sm font-medium text-step-foreground">{step.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default StepIndicator;
