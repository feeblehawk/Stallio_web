import Hero from '../components/home/Hero'
// import TrustStrip from '../components/home/TrustStrip'
import DmStoreTransform from '../components/home/DmStoreTransform'
import BeforeAfter from '../components/home/BeforeAfter'
// import OneLinkSection from '../components/home/OneLinkSection'
import WhoItFits from '../components/home/WhoItFits'
import InsideTheBox from '../components/home/InsidetheBox'
import HowItWorks from '../components/home/HowItWorks'
import WhatsIncluded from '../components/home/WhatsIncluded'
import WhyStallio from '../components/home/WhyStallio'
import FinalCta from '../components/home/FinalCta'

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
    <FinalCta />
  </>
)

export default Home
