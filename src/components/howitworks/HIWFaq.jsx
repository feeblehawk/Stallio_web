import Disclosure from '../motion/Disclosure'
import AnimatedGroup from '../motion/AnimatedGropu'
import SectionHeading from '../SectionHeading'

export const FAQS = [
  {
    id: 'domain',
    question: 'Do I need a website or custom domain?',
    answer:
      'No. Every Stallio store gets a live hosted link (stallio.shop/yourname) instantly. If you own a custom domain, you can connect it anytime.',
  },
  {
    id: 'whatsapp',
    question: 'Can customers order via WhatsApp?',
    answer:
      'Yes. Stallio supports direct WhatsApp checkout handoff so customer details and cart items arrive structured in chat without tedious back-and-forth.',
  },
  {
    id: 'free',
    question: 'Is there a free plan to get started?',
    answer:
      'Yes! You can create your store, upload products, and share your link for free with no credit card required.',
  },
  {
    id: 'payments',
    question: 'How do payments reach my account?',
    answer:
      'Stallio supports Cash on Delivery (COD) as well as online payments. Orders and payment status are tracked in your live dashboard.',
  },
]

const HIWFaq = () => (
  <section
    aria-labelledby="hiw-faq-heading"
    className="border-b py-20 sm:py-24"
    style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
  >
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <SectionHeading id="hiw-faq-heading" eyebrow="Questions" title="Frequently asked questions" />

      <AnimatedGroup className="mt-12 space-y-3" stagger={0.07} distance={14}>
        {FAQS.map((faq, i) => (
          <Disclosure
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            defaultOpen={i === 0}
          />
        ))}
      </AnimatedGroup>
    </div>
  </section>
)

export default HIWFaq
