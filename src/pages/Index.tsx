import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroBadge from "@/components/HeroBadge";
import StepIndicator from "@/components/StepIndicator";
import WhatIsSROI from "@/components/WhatIsSROI";
import SROIRatio from "@/components/SROIRatio";

const Index = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <HeroBadge />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-10 text-5xl font-medium leading-[1.1] tracking-tighter text-foreground md:text-7xl"
          >
            Measure Your
            <br />
            <span className="text-primary">Social Impact</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 max-w-[580px] text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Transform your social initiatives into measurable outcomes. Our guided 4-step process helps you calculate and communicate the true value of your work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-10"
          >
            <button className="inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 text-base font-medium text-cta-foreground shadow-lg transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
              Start Your SROI Journey
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-20"
          >
            <StepIndicator />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
