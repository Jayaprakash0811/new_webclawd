export interface FooterLink {
  label:     string
  href:      string
  external?: boolean
}

export interface FooterNavColumn {
  heading: string
  links:   FooterLink[]
}
