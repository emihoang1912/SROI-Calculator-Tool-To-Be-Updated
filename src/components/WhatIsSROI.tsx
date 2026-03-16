import { TrendingUp, Users, Target, FileText } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: TrendingUp,
    title: "Quantify Impact",
    description: "Convert social outcomes into monetary values to demonstrate return on investment",
  },
  {
    icon: Users,
    title: "Stakeholder Focus",
    description: "Identify and measure outcomes for everyone affected by your project",
  },
  {
    icon: Target,
    title: "Evidence-Based",
    description: "Use validated indicators and financial proxies from established research",
  },
  {
    icon: FileText,
    title: "Report Ready",
    description: "Generate professional SROI reports with data collection templates",
  },
];

const WhatIsSROI = () => {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-normal tracking-tight text-foreground md:text-5xl"
        >
          What is <span className="font-bold">SROI</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-5 max-w-[640px] text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Social Return on Investment (SROI) is a framework for measuring the social, environmental, and economic value created by your activities.
        </motion.p>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
                <feature.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsSROI;
