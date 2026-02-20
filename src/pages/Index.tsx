import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import ResourceShowcase from "@/components/landing/ResourceShowcase";
import UniqueValueProp from "@/components/landing/UniqueValueProp";
import CurriculumStandards from "@/components/landing/CurriculumStandards";
import ResourceImport from "@/components/landing/ResourceImport";
import LessonEditor from "@/components/landing/LessonEditor";
import Features from "@/components/landing/Features";
import Boards from "@/components/landing/Boards";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { ExportOptions } from "@/components/landing/ExportOptions";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <CTA />
      <UniqueValueProp />
      <Features />
      <ResourceShowcase />
      <ExportOptions />
      <CurriculumStandards />
      <ResourceImport />
      <LessonEditor />
      <Boards />
      <Footer />
    </div>
  );
};

export default Index;
