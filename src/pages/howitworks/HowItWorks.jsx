import HIWHero from "./sections/HIWhero"
import WorkflowTheatre from "./sections/WorkFlow"
import OrderLifecycle from "./sections/OrderLiecycle"
import ProofMetrics from "./sections/ProofMetrics"
import HIWFaq from  "./sections/HIWFaq"
import FinalCTA from "../home/sections/FinalCta"

const HowItWorks = () => (
  <main className="min-h-screen">
    <HIWHero />
    <WorkflowTheatre />
    <OrderLifecycle />
    <ProofMetrics />
    <HIWFaq />
    <FinalCTA />
  </main>
)

export default HowItWorks
