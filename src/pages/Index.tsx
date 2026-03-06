import { Zap, Calculator, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResistorCalculator from "@/components/ResistorCalculator";
import ComponentDictionary from "@/components/ComponentDictionary";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <h1 className="text-lg md:text-xl font-mono font-bold text-foreground">
              Electro<span className="text-primary">Lab</span>
            </h1>
          </div>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Aprende electrónica desde cero
          </p>
        </div>
        {/* Header ad banner */}
        <div className="container mx-auto px-4 pb-2 min-h-[90px] flex items-center justify-center bg-muted/20 rounded-lg">
          <AdBanner orientation="horizontal" />
        </div>
      </header>

      {/* Main layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content with Tabs */}
          <main className="flex-1">
            <Tabs defaultValue="calculadoras" className="w-full">
              <TabsList className="w-full mb-6 bg-card border border-border">
                <TabsTrigger value="calculadoras" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Calculator className="w-4 h-4" />
                  Calculadoras
                </TabsTrigger>
                <TabsTrigger value="diccionario" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BookOpen className="w-4 h-4" />
                  Diccionario
                </TabsTrigger>
              </TabsList>
              <TabsContent value="calculadoras">
                <ResistorCalculator />
              </TabsContent>
              <TabsContent value="diccionario">
                <ComponentDictionary />
              </TabsContent>
            </Tabs>
          </main>

          {/* Sidebar ad */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-40">
              <AdBanner orientation="vertical" />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-mono">
          ElectroLab © 2026 — Aprende electrónica fácilmente
        </div>
      </footer>
    </div>
  );
};

export default Index;
