import { Suspense, lazy } from "react";

const SectionFallback = () => (
  <div className="flex justify-center py-10" aria-hidden="true">
    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const MiniProjects = lazy(() => import("@/components/MiniProjects"));

const HomeMiniProjects = () => {
  return (
    <div id="mini-proyectos" className="container mx-auto px-6 py-12">
      <Suspense fallback={<SectionFallback />}>
        <MiniProjects />
      </Suspense>
    </div>
  );
};

export default HomeMiniProjects;
