import { motion } from "framer-motion";
import { Heart, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const themes = [
  {
    title: "Community Volunteering",
    description: "Measure the social impact of volunteer programs on communities, volunteers, and organizations",
    active: true,
  },
  {
    title: "Youth Development",
    description: "Measure outcomes for youth mentoring, education, and skills programs",
    active: false,
  },
  {
    title: "Environmental Impact",
    description: "Calculate the social value of environmental and sustainability initiatives",
    active: false,
  },
];

const ChooseTheme = () => {
  const navigate = useNavigate();
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
          Choose Your <span className="font-bold">Theme</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-5 max-w-[640px] text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Select the type of social initiative you want to measure. We'll guide you through the SROI calculation process.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`relative flex flex-col items-start rounded-2xl border p-8 text-left transition-shadow ${
                theme.active
                  ? "border-primary/30 bg-card shadow-lg"
                  : "border-border bg-card opacity-70"
              }`}
            >
              {!theme.active && (
                <div className="absolute right-6 top-6 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  Coming Soon
                </div>
              )}

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  theme.active ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <Heart
                  className={`h-6 w-6 ${theme.active ? "text-primary" : "text-muted-foreground/50"}`}
                  strokeWidth={1.5}
                />
              </div>

              <h3
                className={`mt-6 text-xl font-semibold ${
                  theme.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {theme.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  theme.active ? "text-muted-foreground" : "text-muted-foreground/70"
                }`}
              >
                {theme.description}
              </p>

              {theme.active && (
                <button
                  onClick={() => navigate("/calculator/describe")}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseTheme;
