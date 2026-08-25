'use client'

import { motion } from 'framer-motion'
import { VIEWPORT_ONCE } from '@/lib/motion'
import {
  ArticleH2,
  ArticleH3,
  InlineTable,
  LeadIn,
  P,
  PullQuote,
} from './ArticleUI'

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={fadeUp}
      className="bg-black py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[720px] px-4 sm:px-6 lg:px-8">{children}</div>
    </motion.section>
  )
}

export function WhyThisWorksSection() {
  return (
    <Section id="why">
      <ArticleH2>Why most case studies fail to land</ArticleH2>
      <P className="text-[18px] leading-[1.8] text-white/85">
        Most portfolio case studies read the same way: a personal narrative, a moodboard, a
        list of tools. They explain what the designer did, in the order they did it. That&rsquo;s
        the tell of a student, not an operator — and it&rsquo;s exactly what a design manager
        skims past in six seconds.
      </P>
      <P>
        The strongest case studies work differently. They open with a business paradox, not a
        personal anecdote. Every visual section earns its place by resolving a question the
        reader was just given. What follows is that structure, broken into three parts — the
        narrative architecture, the analytical depth, and the skim-ability engineering — plus a
        section-by-section blueprint you can fill in for your own work.
      </P>
    </Section>
  )
}

export function NarrativeArchitectureSection() {
  return (
    <Section id="hook">
      <ArticleH2>Paradox, not backstory</ArticleH2>
      <P>
        A strong case study never opens with &ldquo;I was tasked with...&rdquo; It opens with a
        contradiction embedded in the product&rsquo;s own success story — the exact thing that
        makes it beloved by its best users is quietly the thing that pushes new users away.
      </P>

      <PullQuote>
        The very flexibility that makes it brilliant for advanced users makes it deeply
        intimidating for beginners.
      </PullQuote>

      <P>
        That&rsquo;s the shape of it — an illustrative example, not a lifted line. A junior
        designer&rsquo;s hook explains what <em>they</em> did. A senior designer&rsquo;s hook
        explains what&rsquo;s broken about the world — and positions the redesign as the
        inevitable answer. The formula holds across products:
      </P>

      <LeadIn lead="The formula">
        [Product&rsquo;s celebrated strength] + but + [that same strength quietly causes a
        specific business problem].
      </LeadIn>

      <P>
        This does three things at once: it proves the designer understands the product at a
        strategic level, not just a screen level. It creates tension the reader wants resolved.
        And it frames the whole case study as a business argument before a single wireframe
        appears.
      </P>

      <ArticleH3>Friction is never reported alone — it&rsquo;s always priced</ArticleH3>
      <P>
        Every instance of user friction gets immediately translated into a business consequence.
        Strong case studies never say &ldquo;users were confused&rdquo; and stop there — they
        follow it with what that confusion costs.
      </P>
      <InlineTable
        columns={['Friction observed', 'Business cost']}
        rows={[
          ['Users hesitate at a key decision point', '~40% drop-off before the first meaningful action'],
          ['No clear next step after signup', '~6 minutes to first task (Time-to-Value)'],
          ['No early win to build momentum', 'Weak Day-7 retention → lower free-to-paid conversion'],
        ]}
      />
      <P>
        The closing move worth stealing: translate a retention lift into a revenue number a VP
        would recognize — &ldquo;a 10-point improvement in Day-7 retention among 500,000 monthly
        users is roughly 2,000 additional paying customers a month.&rdquo; That single sentence
        separates a designer who understands UX from a designer who understands the business of
        UX.
      </P>
      <LeadIn lead="The rule to extract">
        Every friction point you document should carry a metric. Every metric should be
        traceable to a business outcome — activation, retention, conversion, support cost, or
        expansion revenue — even when the final translation is a labeled projection, not a
        measured fact.
      </LeadIn>

      <ArticleH3>A chronology with no detours</ArticleH3>
      <P>
        The reader should be walked through a strict, numbered sequence: Background, Problem,
        Heuristic Evaluation, Research, Competitive Benchmarking, User Research, Persona, Key
        Insights, Ideation, Final Design, Usability Testing, Impact, Learnings. Two choices make
        this feel authoritative rather than exhaustive: a table of contents up front, and a
        heuristic evaluation that happens <em>before</em> user testing — proving the diagnosis
        came from an expert framework first, with research used to validate and deepen it, not
        discover it from scratch.
      </P>
    </Section>
  )
}

export function AnalyticalDepthSection() {
  return (
    <Section id="depth">
      <ArticleH2>Trade-offs stated, not dramatized</ArticleH2>
      <P>
        The strongest trade-off statements don&rsquo;t apologize for what got cut. They name the
        constraint, name the casualty, and reframe the cut itself as the skill being
        demonstrated:
      </P>
      <PullQuote>
        I had to cut a lot of ideas — a whole secondary flow, for instance. Learning to
        prioritize what actually moves the needle was the hardest, most valuable part.
      </PullQuote>

      <ArticleH3>The vocabulary of an operator</ArticleH3>
      <P>
        Good terminology is dense but never decorative — every term is load-bearing and tied to
        a decision, never sprinkled in for credibility.
      </P>
      <InlineTable
        columns={['Category', 'Terms used', 'How they\u2019re deployed']}
        rows={[
          ['Diagnostic frameworks', "Nielsen's 10 Heuristics", 'A lens to structure an expert review before user testing'],
          ['Behavioral concepts', 'Cognitive load, activation, progressive disclosure, mental models', 'Each tied to a specific screen or decision — never left abstract'],
          ['Business metrics', 'Time-to-Value, Day-7 retention, conversion, drop-off', 'Always paired with a number, and the number is always sourced'],
          ['Research methods', 'Contextual inquiry, competitive benchmarking, synthesis', 'Named explicitly so a hiring manager can map it to their own rigor bar'],
        ]}
      />
      <LeadIn lead="The tell">
        Jargon reads as senior when it&rsquo;s the shortest path to naming a specific, defensible
        decision. It reads as junior when it&rsquo;s the goal of the sentence. &ldquo;I reduced
        cognitive load&rdquo; is bootcamp language. &ldquo;Cutting the sidebar to essential
        items only reduced the visible decision surface from 12 to 4&rdquo; is operator
        language — even though both sentences describe the same idea.
      </LeadIn>

      <ArticleH3>Three choices that avoid the toolkit flex</ArticleH3>
      <P>
        First, every metric is labeled with its confidence level — &ldquo;projected&rdquo; versus
        &ldquo;observed in usability testing&rdquo; are never blurred together. Second, the
        competitive analysis has a point of view, not just a grid — a table alone is a flex, but
        a takeaway underneath it turns research into an argument. Third, the learnings section
        admits what genuinely surprised the designer, instead of listing generic takeaways like
        &ldquo;I learned the importance of user research.&rdquo;
      </P>
    </Section>
  )
}

export function SkimabilitySection() {
  return (
    <Section id="skim">
      <ArticleH2>Engineered for a six-second read</ArticleH2>
      <P>
        A design manager giving this six seconds should walk away with the problem, the number
        that proves it matters, and the shape of the fix. The layout is built for exactly that
        extraction path.
      </P>
      <InlineTable
        columns={['Device', 'Function']}
        rows={[
          ['Stat rows (3-column number blocks)', 'Deliver the "why should I care" number immediately after a premise'],
          ['Bold lead-in phrases', 'Let a skimmer read only the bold text and still get the argument'],
          ['Problem cards with oversized numerals', 'Turn a wall of prose into a scannable, weighted list'],
          ['Before/after lists with ✕ / ✓ markers', 'Compress a redesign\u2019s value into a symbol, not a sentence'],
          ['Journey map as a literal table', 'Make emotional and functional pain points comparable at a glance'],
        ]}
      />
      <LeadIn lead="The six-second test">
        Trace only the bolded phrases, stat numbers, and pull-quotes from top to bottom, skipping
        all plain body text. If you can reconstruct the entire argument — problem, evidence,
        resolution, payoff — the layout has done its job. Delete everything else and see if the
        story still holds.
      </LeadIn>
    </Section>
  )
}
