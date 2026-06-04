import { Calculator, Users, Target } from "lucide-react";

const HomeStats = () => {
  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
          {[
            {
              icon: <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />,
              value: "+10K",
              valueFull: "+10,000",
              label: "Cálculos realizados",
            },
            {
              icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />,
              value: "+500",
              valueFull: "+500",
              label: "Estudiantes",
            },
            {
              icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />,
              value: "99.9%",
              valueFull: "99.9%",
              label: "Precisión",
            },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {s.icon}
                <span className="text-xl sm:text-3xl md:text-4xl font-bold text-primary">
                  <span className="sm:hidden">{s.value}</span>
                  <span className="hidden sm:inline">{s.valueFull}</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
