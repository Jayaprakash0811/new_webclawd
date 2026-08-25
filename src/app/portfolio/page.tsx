import type { Metadata } from 'next'
import { Navbar } from '@/components/sections/navbar/Navbar'
import { Footer } from '@/components/sections/footer/Footer'
import { ReadingProgress } from '@/components/sections/portfolio/ReadingProgress'
import { ArticleHero } from '@/components/sections/portfolio/ArticleHero'
import { FrameworkConstellation } from '@/components/sections/portfolio/FrameworkConstellation'
import {
  WhyThisWorksSection,
  NarrativeArchitectureSection,
  AnalyticalDepthSection,
  SkimabilitySection,
} from '@/components/sections/portfolio/ArticleBody'
import { BlueprintSection } from '@/components/sections/portfolio/BlueprintSection'
import { OfferSection } from '@/components/sections/portfolio/OfferSection'
import { ClosingSection } from '@/components/sections/portfolio/ClosingSection'

export const metadata: Metadata = {
  title:       'The Product Storytelling Framework — Webclawd',
  description:
    'A reverse-engineered framework for writing product design case studies that get hired — narrative architecture, analytical depth, skim-ability, and a section-by-section writing blueprint.',
}

export default function PortfolioPage() {
  return (
    <div className="bg-black text-white">
      <ReadingProgress />
      <Navbar />
      <main>
        <ArticleHero />
        <WhyThisWorksSection />
        <FrameworkConstellation />
        <NarrativeArchitectureSection />
        <AnalyticalDepthSection />
        <SkimabilitySection />
        <BlueprintSection />
        <OfferSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  )
}
