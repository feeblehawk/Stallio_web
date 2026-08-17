import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../../../components/SectionHeading'
import { a } from 'framer-motion/client'

export const FAQS = [
  {
    q: 'Do I need my own domain or hosting?',
    a:    'No. Your shop lives at stallio.shop/your-username. Share that link everywhere; we host the storefront and dashboard'
   },
   {  
    q: 'Do I need a credit card to start?',
    a: 'No. The Free plan is genuinely free forever and takes about five minutes to set up. You only add a payment method when you upgrade.',
  },
  {
    q: 'Does Stallio process payments from my customers? ',
    a:  'No. You tell buyers how to pay (bank transfer, payment link, cash on delivery, etc.). Stallio handles the order, invoice PDF, and paid or awaiting status; you confirm when money arrives.'
  },
  {
    q: 'Are prices in US dollars?',
    a: 'Subscriptions are billed in USD. The country picker on this page shows approximate local amounts for planning; your bank may apply its own exchange rate or fees.'

  },
 
  {
    q: 'Which currency will I be charged in?',
    a: 'Prices are shown in your local currency for reference using indicative rates. Billing is processed in USD, and your bank applies its own conversion at the time of payment.',
  },
  
 {
    q: 'Can I cancel anytime?' ,
    a: 'Yes for monthly plans. Cancel from your account and you will not be billed for future months. Yearly plans are prepaid for the term; see Terms for details on refunds if we offer them.'
  },
  {
    q: 'Do you take a commission on my sales?',
    a: 'Never. Stallio charges a flat subscription only, every dollar, riyal or rupee your customers pay goes straight to you.',
  },
  {
    q: 'Who do I contact about billing? ',
    a: 'Use the Contact page and choose a billing-related subject. Include your shop email so we can find your account quickly.'

   },
  
]

const FaqItem = ({ item, index, isOpen, onToggle }) => {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <li className="border-b border-border last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {item.q}
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-primary' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-5 text-[14px] leading-7 text-muted-foreground"
      >
        {item.a}
      </div>
    </li>
  )
}

/** PricingFAQ — accordion answering the common pre-purchase objections. */
const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

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

        <ul className="mt-10 rounded-2xl border border-border bg-surface px-5 sm:px-7">
          {FAQS.map((item, index) => (
            <FaqItem
              key={item.q}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PricingFAQ
