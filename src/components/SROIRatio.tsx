import { motion } from "framer-motion";

const SROIRatio = () => {
  return (
    <section className="px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl rounded-3xl bg-secondary p-12 md:p-16 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          The SROI Ratio
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="font-mono text-3xl font-medium text-foreground md:text-4xl">SROI</span>
          <span className="text-3xl text-muted-foreground md:text-4xl">=</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-medium text-primary md:text-3xl">Net Social Value</span>
            <div className="my-1 h-px w-full bg-muted-foreground/30" />
            <span className="text-2xl text-muted-foreground md:text-3xl">Total Investment</span>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[580px] text-sm leading-relaxed text-muted-foreground">
          For example, an SROI ratio of 3:1 means that for every £1 invested, £3 of social value is created.
        </p>
      </motion.div>
    </section>
  );
};

export default SROIRatio;
