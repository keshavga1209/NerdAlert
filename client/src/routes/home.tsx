import { Hero } from '@/components/hero'
import { HeroIllustration } from '@/components/hero-illustration'
import { Layout } from '@/components/layout'

export default function HomePage() {
  return (
    <Layout>
      <Hero
        title="Landing template for project"
        content="Finally working"
        illustration={<HeroIllustration />}
      />
    </Layout>
  )
}
