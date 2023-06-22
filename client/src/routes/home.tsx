import { Hero } from '@/components/hero'
import { HeroIllustration } from '@/components/hero-illustration'
import { Layout } from '@/components/layout'

export default function HomePage() {
  return (
    <Layout>
      <Hero
        title= "Get ready to be a research geek"
        content="Enter your interest topics here"
        illustration={<HeroIllustration />}
      />
    </Layout>
  )
}
