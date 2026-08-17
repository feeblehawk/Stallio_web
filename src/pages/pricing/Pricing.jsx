// src/pages/pricing/Pricing.jsx
import PricingHero   from './sections/PricingHero'
import Billing       from './sections/Billing'        
// // import SocialProof   from './sections/SocialProof'    
import PricingFAQ    from './sections/PricingFAQ'
import PricingCTA    from './sections/PricingCTA'

const Pricing = () => (
  <>
    <PricingHero />
    <Billing />
     {/* <SocialProof />  */}
    <PricingFAQ />
    <PricingCTA /> 
  </>
)

export default Pricing