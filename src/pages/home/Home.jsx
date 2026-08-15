import Hero from './sections/Hero'
import DmStoreTransform from './sections/DmStoreTransform'
import BeforeAfter from './sections/BeforeAfter'
import WhoItFits from './sections/WhoItFits'
import InsideTheBox from './sections/InsidetheBox'
import HowItWorks from './sections/HowItWorks'
import WhatsIncluded from './sections/WhatsIncluded'
import WhyStallio from './sections/WhyStallio'
import FinalCTA from './sections/FinalCta'

const Home = () => (
  <>
    <Hero />
    {/* <TrustStrip /> */}
    <DmStoreTransform />
    <BeforeAfter />
    <WhoItFits />
    <InsideTheBox />
    <HowItWorks />
    <WhatsIncluded />
    <WhyStallio />
    <FinalCTA />
  </>
)

export default Home
