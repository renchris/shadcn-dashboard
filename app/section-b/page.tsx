import { BentoGrid, BentoCard } from "@/components/bento/BentoGrid";

export default function SectionBPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Bento</h1>

      <BentoGrid className="border border-border" columnsClassName="grid-cols-1 md:grid-cols-3">
        <BentoCard spanClassName="md:col-span-2">
          <div className="h-56 rounded-xl bg-muted/70" />
        </BentoCard>
        <BentoCard>
          <div className="h-56 rounded-xl bg-muted/70" />
        </BentoCard>
        <BentoCard>
          <div className="h-56 rounded-xl bg-muted/70" />
        </BentoCard>
        <BentoCard spanClassName="md:col-span-2">
          <div className="h-56 rounded-xl bg-muted/70" />
        </BentoCard>
      </BentoGrid>
    </div>
  );
}


