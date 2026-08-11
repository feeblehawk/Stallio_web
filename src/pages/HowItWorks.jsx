import HIWHero from "../components/howitworks/HIWhero"
import WorkflowTheatre from "../components/howitworks/WorkFlow"
import OrderLifecycle from "../components/howitworks/OrderLiecycle"
import ProofMetrics from "../components/howitworks/ProofMetrics"
import HIWFaq from "../components/howitworks/HIWFaq"
import FinalCta from "../components/home/FinalCta"

const HowItWorks = () => (
  <main className="min-h-screen">
    <HIWHero />
    <WorkflowTheatre />
    <OrderLifecycle />
    <ProofMetrics />
    <HIWFaq />
    <FinalCta />
  </main>
)

export default HowItWorks
