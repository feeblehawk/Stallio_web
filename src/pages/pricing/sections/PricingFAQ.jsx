import Disclosure from '../../../components/motion/Disclosure'
import AnimatedGroup from '../../../components/motion/AnimatedGroup'
import SectionHeading from '../../../components/SectionHeading'

export const FAQS = [
  {
    q: 'Do I need my own domain or hosting?',
    a: 'No. Your shop lives at stallio.shop/your-username. Share that link everywhere; we host the storefront and dashboard.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The Free plan is genuinely free forever and takes about five minutes to set up. You only add a payment method when you upgrade.',
  },
  {
    q: 'Does Stallio process payments from my customers?',
    a: 'No. You tell buyers how to pay (bank transfer, payment link, cash on delivery, etc.). Stallio handles the order, invoice PDF, and paid or awaiting status; you confirm when money arrives.',
  },
  {
    q: 'Are prices in US dollars?',
    a: 'Subscriptions are billed in USD. The country picker on this page shows approximate local amounts for planning; your bank may apply its own exchange rate or fees.',
  },
  {
    q: 'Which currency will I be charged in?',
    a: 'Prices are shown in your local currency for reference using indicative rates. Billing is processed in USD, and your bank applies its own conversion at the time of payment.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes for monthly plans. Cancel from your account and you will not be billed for future months. Yearly plans are prepaid for the term; see Terms for details on refunds if we offer them.',
  },
  {
    q: 'Do you take a commission on my sales?',
    a: 'Never. Stallio charges a flat subscription only, every dollar, riyal or rupee your customers pay goes straight to you.',
  },
  {
    q: 'Who do I contact about billing?',
    a: 'Use the Contact page and choose a billing-related subject. Include your shop email so we can find your account quickly.',
  },
]

/** PricingFAQ — accordion answering the common pre-purchase objections. */
const PricingFAQ = () => {
  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="border-b border-border bg-surface-muted py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pricing-faq-heading"
          eyebrow="FAQ"
          title="Questions before you start."
          subtitle="Everything sellers usually ask us before opening their store."
        />

        <AnimatedGroup
          className="mt-12 space-y-3"
          stagger={0.07}
          distance={14}
        >
          {FAQS.map((item, index) => (
            <Disclosure
              key={item.q}
              question={item.q}
              answer={item.a}
              defaultOpen={index === 0}
            />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}

export default PricingFAQ