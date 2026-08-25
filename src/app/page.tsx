import { Navbar }            from '@/components/sections/navbar/Navbar'
import { HeroSection }       from '@/components/sections/hero/HeroSection'
import { ProblemSection }    from '@/components/sections/problem/ProblemSection'
import { HowItWorks }        from '@/components/sections/how-it-works/HowItWorks'
import { FeatureSection }    from '@/components/sections/feature/FeatureSection'
import { PricingSection }    from '@/components/sections/pricing/PricingSection'
import { FAQSection }        from '@/components/sections/faq/FAQSection'
import { FinalCTA }          from '@/components/sections/final-cta/FinalCTA'
import { Footer }            from '@/components/sections/footer/Footer'

export const metadata = {
  title:       'Webclawd — Professional websites for Tamil Nadu businesses',
  description: 'Done-for-you website service for Tamil Nadu businesses. Standard and Ecommerce websites. Live in 48 hours. One-time payment.',
}

export default function HomePage() {
  return (
    <div className="bg-base text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorks />
        <FeatureSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
