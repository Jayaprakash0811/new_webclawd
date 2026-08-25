'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from '@/lib/motion'
import { ArticleH2, P } from './ArticleUI'

const itemV = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
}

interface BlueprintEntry {
  n: string
  title: string
  objective: string
  metric: string
  starters: string[]
}

const BLUEPRINT: BlueprintEntry[] = [
  {
    n: '01',
    title: 'The Hook / Background',
    objective: 'Prove you understand the product at a strategic level, not just as a user.',
    metric: 'A macro metric (scale, position) paired with the cost of the problem (drop-off, churn, time-to-value).',
    starters: [
      '"[Product]\u2019s core strength \u2014 the thing it\u2019s famous for \u2014 is also the source of its biggest [activation/retention] problem, because..."',
      '"The paradox at the center of this project is that [X] works exceptionally well for [segment A], but actively works against [segment B]."',
    ],
  },
  {
    n: '02',
    title: 'Problem Statement',
    objective: 'Show you diagnosed the problem through observation before jumping to a solution.',
    metric: 'Time-to-first-action, drop-off rate, or review/support sentiment volume.',
    starters: [
      '"Before forming a hypothesis, I spent [timeframe] observing [reviews/recordings] to find where the friction actually starts."',
      '"How might we [specific, measurable outcome] within [specific time constraint]?"',
    ],
  },
  {
    n: '03',
    title: 'Heuristic / Expert Evaluation',
    objective: 'Prove you can diagnose usability problems with a recognized framework before spending research budget.',
    metric: 'Number of heuristic violations found, mapped to specific screens.',
    starters: [
      '"Using [Nielsen\u2019s heuristics], I walked the current flow myself and logged every point where [principle] broke down."',
      '"This screen violates [heuristic] because [behavior], which forces the user to [specific cost]."',
    ],
  },
  {
    n: '04',
    title: 'Research (Secondary + Competitive)',
    objective: 'Show you situated the problem in a broader context before designing in a vacuum.',
    metric: 'A comparative benchmark across competitors on defined dimensions.',
    starters: [
      '"I benchmarked [N] products across [N] dimensions to see where [product] stands relative to adjacent tools."',
      '"Competitors solve this with [pattern], suggesting the gap isn\u2019t a resourcing problem \u2014 it\u2019s a [prioritization] problem."',
    ],
  },
  {
    n: '05',
    title: 'User Research & Persona',
    objective: 'Prove your research was structured, and your persona is built from behavior, not demographics.',
    metric: 'Sample size, session structure, a recurring behavioral pattern.',
    starters: [
      '"I recruited [N] participants matching [product]\u2019s primary growth segments, running [contextual inquiry] to capture behavior and expectations."',
      '"[Persona] doesn\u2019t need more features \u2014 she needs [narrow outcome] within [X] minutes, or she abandons the product."',
    ],
  },
  {
    n: '06',
    title: 'Key Insights & Opportunity Framing',
    objective: 'Convert raw research into a small number of sharp, prioritized opportunities.',
    metric: 'The single insight that reframes the whole problem.',
    starters: [
      '"The biggest insight wasn\u2019t [expected finding] \u2014 it was that [reframed, more precise finding]."',
      '"I prioritized [opportunity] over [alternative] because it sat at the intersection of [highest pain] and [highest leverage]."',
    ],
  },
  {
    n: '07',
    title: 'Final Design & Rationale',
    objective: 'Justify each decision against a constraint \u2014 never present screens as self-evidently good.',
    metric: 'The specific friction point each screen eliminates, tied back to the root causes.',
    starters: [
      '"We chose to [decision] because the constraint \u2014 [engineering/cognitive/business limit] \u2014 ruled out [alternative]."',
      '"Rather than [comprehensive solution], we scoped to [narrower solution] because it addressed [80% of the pain] at a fraction of the cost."',
    ],
  },
  {
    n: '08',
    title: 'Usability Testing & Validation',
    objective: 'Prove the design was pressure-tested, and you can discuss iteration without defensiveness.',
    metric: 'Task success rate, time-on-task, or a specific confusion that triggered a revision.',
    starters: [
      '"[X] of [N] participants completed [task] unassisted, compared to [baseline] in the current experience."',
      '"One round of testing revealed [confusion], which led us to revise [element] before finalizing the flow."',
    ],
  },
  {
    n: '09',
    title: 'Before/After Impact & Business Translation',
    objective: 'The section a hiring manager screenshots \u2014 prove the redesign matters in the language of the business.',
    metric: 'Projected or measured lift in activation/retention, translated to revenue or a comparable KPI.',
    starters: [
      '"Reducing [metric] from [before] to [after] is projected to lift [downstream metric] by [X]%."',
      '"At [product]\u2019s scale, a [X]-point improvement in [retention] translates to [Y] additional paying users a month \u2014 this isn\u2019t a UX nicety, it\u2019s a growth lever."',
    ],
  },
  {
    n: '10',
    title: 'Key Learnings',
    objective: 'Show self-awareness about trade-offs made \u2014 proving maturity, not perfection.',
    metric: 'None \u2014 this section trades metrics for judgment.',
    starters: [
      '"This project sharpened my belief that [opinionated principle] \u2014 [example from a known product], not [generic platitude]."',
      '"If I had another [timeframe], I\u2019d prioritize [next step] because [specific unresolved risk]."',
    ],
  },
]

export function BlueprintSection() {
  return (
    <section id="blueprint" className="border-t border-white/10 bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
          <motion.div variants={itemV} className="max-w-[600px]">
            <ArticleH2>The actionable writing blueprint</ArticleH2>
            <P>
              For every section: know the objective, know the metric you&rsquo;re anchoring to,
              and use the sentence starters to get past the blank page.
            </P>
          </motion.div>

          <div className="mt-6 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {BLUEPRINT.map((entry) => (
              <motion.div key={entry.n} variants={itemV} className="py-8">
                <div className="mb-5 flex items-baseline gap-4">
                  <span className="font-sans text-[15px] tabular-nums text-white/30">{entry.n}</span>
                  <h4 className="font-sans text-[18px] font-semibold tracking-[-0.005em] text-white">
                    {entry.title}
                  </h4>
                </div>

                <div className="mb-5 grid grid-cols-1 gap-5 pl-0 sm:grid-cols-2 sm:pl-9">
                  <div>
                    <p className="mb-1.5 font-sans text-[11px] uppercase tracking-[0.08em] text-white/35">Core objective</p>
                    <p className="m-0 font-sans text-[14px] leading-[1.6] tracking-[-0.003em] text-white/65">{entry.objective}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 font-sans text-[11px] uppercase tracking-[0.08em] text-white/35">Metric anchor</p>
                    <p className="m-0 font-sans text-[14px] leading-[1.6] tracking-[-0.003em] text-white/65">{entry.metric}</p>
                  </div>
                </div>

                <div className="border border-white/10 p-4 sm:ml-9">
                  <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/35">Sentence starters</p>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {entry.starters.map((s, i) => (
                      <li key={i} className="font-sans text-[13.5px] italic leading-[1.6] tracking-[-0.003em] text-white/45">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
