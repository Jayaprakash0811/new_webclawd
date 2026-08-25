export type TemplateCategory =
  | 'Event Management'
  | 'Healthcare'
  | 'Fitness'
  | 'Yoga'
  | 'Interior Design'
  | 'Jewellery'
  | 'Salon & Beauty'
  | 'Cloud Kitchen'
  | 'Fashion'
  | 'Portfolio'

export type WebsiteType = 'Standard' | 'Ecommerce' | 'Portfolio'

export interface Template {
  id:          number
  slug:        string
  name:        string
  category:    TemplateCategory
  type:        WebsiteType
  bg:          string
  accent:      string
  dark:        boolean
  tagBg:       string
  tagColor:    string
  image:       string
  image2?:     string        // second preview screenshot
  description: string        // short tagline shown under title
  about:       string        // longer paragraph
  features:    string[]      // bullet list of what's included
  pages:       string[]      // page names included
  tags:        string[]      // category tags
  views:       number        // social proof
  previewUrl?: string        // live preview link
}
