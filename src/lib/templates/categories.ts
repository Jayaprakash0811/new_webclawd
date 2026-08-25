import { templates } from './data'

export interface CategoryMeta {
  label:  string
  swatch: string
}

const CATEGORY_SWATCHES: Record<string, string> = {
  'All':               '#1c1c1c',
  'Event Management':  '#ede4f8',
  'Healthcare':        '#e0f0f4',
  'Fitness':           '#e0f0d8',
  'Yoga':              '#f0ece0',
  'Interior Design':   '#ece4d8',
  'Jewellery':         '#f0e0d0',
  'Salon & Beauty':    '#f8e0e8',
  'Cloud Kitchen':     '#f8e4d0',
  'Fashion':           '#ece2d4',
}

export const ALL_CATEGORIES: CategoryMeta[] = [
  { label: 'All', swatch: CATEGORY_SWATCHES['All'] },
  ...Array.from(new Set(templates.map((t) => t.category))).map((cat) => ({
    label:  cat,
    swatch: CATEGORY_SWATCHES[cat] ?? '#1c1c1c',
  })),
]
