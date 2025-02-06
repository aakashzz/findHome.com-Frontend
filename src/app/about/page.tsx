import AboutHero from "@/components/AboutHero"
import Features from "@/components/Features"
import Testimonials from "@/components/Testimonials"
import CallToAction from "@/components/CallToAction"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHero />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  )
}

