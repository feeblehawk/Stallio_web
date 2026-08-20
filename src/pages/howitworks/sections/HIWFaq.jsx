import { useTranslation } from 'react-i18next'
import Disclosure from '../../../components/motion/Disclosure'
import AnimatedGroup from '../../../components/motion/AnimatedGroup'
import SectionHeading from '../../../components/SectionHeading'

const HIWFaq = () => {
  const { t } = useTranslation('howitworks')

  const faqs = [
    {
      id: 'domain',
      question: t('faq.items.domain.question', 'Do I need a website or custom domain?'),
      answer: t('faq.items.domain.answer', 'No. Every Stallio store gets a live hosted link (stallio.shop/yourname) instantly. If you own a custom domain, you can connect it anytime.'),
    },
    {
      id: 'whatsapp',
      question: t('faq.items.whatsapp.question', 'Can customers order via WhatsApp?'),
      answer: t('faq.items.whatsapp.answer', 'Yes. Stallio supports direct WhatsApp checkout handoff so customer details and cart items arrive structured in chat without tedious back-and-forth.'),
    },
    {
      id: 'free',
      question: t('faq.items.free.question', 'Is there a free plan to get started?'),
      answer: t('faq.items.free.answer', 'Yes! You can create your store, upload products, and share your link for free with no credit card required.'),
    },
    {
      id: 'payments',
      question: t('faq.items.payments.question', 'How do payments reach my account?'),
      answer: t('faq.items.payments.answer', 'Stallio supports Cash on Delivery (COD) as well as online payments. Orders and payment status are tracked in your live dashboard.'),
    },
  ]

  return (
    <section
      aria-labelledby="hiw-faq-heading"
      className="border-b py-20 sm:py-24"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="hiw-faq-heading"
          eyebrow={t('faq.eyebrow', 'Questions')}
          title={t('faq.title', 'Frequently asked questions')}
        />

        <AnimatedGroup className="mt-12 space-y-3" stagger={0.07} distance={14}>
          {faqs.map((faq, i) => (
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
}

export default HIWFaq
