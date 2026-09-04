import React, { useState, useEffect, useMemo } from 'react'
import {
  Tag,
  Plus,
  Copy,
  Check,
  Percent,
  Truck,
  DollarSign,
  Clock,
  Sparkles,
  Trash2,
  Calendar,
  AlertTriangle,
} from 'lucide-react'
import {
  PageHeader,
  StatCard,
  StatusBadge,
  DataTable,
  Drawer,
  ConfirmDialog,
  FormField,
  SearchInput,
  FilterTabs,
  EmptyState,
  useToast,
} from '../../components/ui'
import {
  getDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  toggleDiscountStatus,
  calculateDiscountStats,
} from '../../services/discountService'

const DISCOUNT_TABS = [
  { id: 'all', label: 'All Coupons' },
  { id: 'active', label: 'Active' },
  { id: 'expired', label: 'Expired' },
]

export const Discounts = () => {
  const toast = useToast()
  const [discounts, setDiscounts] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState(null)

  // Drawer / Dialog states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    setDiscounts(getDiscounts())
  }, [])

  const stats = useMemo(() => {
    return calculateDiscountStats(discounts)
  }, [discounts])

  const filteredDiscounts = useMemo(() => {
    return discounts.filter((d) => {
      const matchesTab = activeTab === 'all' || d.status === activeTab
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        d.code.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)

      return matchesTab && matchesSearch
    })
  }, [discounts, activeTab, searchQuery])

  const tabConfig = useMemo(() => {
    return DISCOUNT_TABS.map((tab) => ({
      id: tab.id,
      label: tab.label,
      count:
        tab.id === 'all'
          ? discounts.length
          : discounts.filter((d) => d.status === tab.id).length,
    }))
  }, [discounts])

  const handleCopyDiscountLink = (code) => {
    const url = `https://stallio.shop/denzen-thrift?discount=${code}`
    navigator.clipboard?.writeText(url)
    setCopiedCode(code)
    toast.success(`Copied promo link for ${code}`)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleOpenCreate = () => {
    setEditingDiscount(null)
    setIsDrawerOpen(true)
  }

  const handleToggleStatus = (id, e) => {
    e?.stopPropagation()
    const updated = toggleDiscountStatus(id)
    if (updated) {
      setDiscounts(getDiscounts())
      toast.success(
        `Coupon ${updated.code} is now ${updated.status === 'active' ? 'Active' : 'Expired'}`
      )
    }
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteDiscount(deleteTarget.id)
      setDiscounts(getDiscounts())
      setDeleteTarget(null)
      toast.success('Discount removed')
    }
  }

  const handleSaveDiscount = (data) => {
    if (editingDiscount) {
      updateDiscount(editingDiscount.id, data)
      toast.success('Discount updated')
    } else {
      createDiscount(data)
      toast.success('New promo code created')
    }
    setDiscounts(getDiscounts())
    setIsDrawerOpen(false)
  }

  const tableColumns = useMemo(
    () => [
      {
        key: 'code',
        label: 'Promo Code',
        render: (_, disc) => (
          <div className="flex items-center gap-2.5">
            <span className="rounded-xl border border-border bg-muted/60 px-3 py-1 font-mono font-bold text-xs text-foreground tracking-wider">
              {disc.code}
            </span>

            <button
              type="button"
              onClick={() => handleCopyDiscountLink(disc.code)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              title="Copy Promo Link"
            >
              {copiedCode === disc.code ? (
                <Check size={14} className="text-[var(--success)]" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        ),
      },
      {
        key: 'type',
        label: 'Discount Value',
        render: (_, disc) => (
          <div>
            <span className="font-bold text-foreground text-xs sm:text-sm font-heading">
              {disc.type === 'percentage'
                ? `${disc.value}% OFF`
                : disc.type === 'fixed'
                ? `₨ ${disc.value} FLAT OFF`
                : 'FREE DELIVERY'}
            </span>
            <div className="text-[11px] text-muted-foreground">
              {disc.minPurchase > 0
                ? `Min. order ₨ ${disc.minPurchase.toLocaleString()}`
                : 'No min. spend'}
            </div>
          </div>
        ),
      },
      {
        key: 'usage',
        label: 'Redemptions',
        render: (_, disc) => (
          <div className="space-y-1">
            <span className="font-bold text-foreground text-xs">
              {disc.usageCount}{' '}
              <span className="font-normal text-muted-foreground">
                / {disc.usageLimit ? `${disc.usageLimit} uses` : 'Unlimited'}
              </span>
            </span>
            {disc.usageLimit && (
              <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((disc.usageCount / disc.usageLimit) * 100))}%`,
                  }}
                />
              </div>
            )}
          </div>
        ),
      },
      {
        key: 'status',
        label: 'Status & Validity',
        render: (_, disc) => (
          <div>
            <StatusBadge
              status={disc.status === 'active' ? 'active' : 'draft'}
              label={disc.status === 'active' ? 'Active' : 'Expired'}
              size="sm"
            />
            <div className="text-[10px] text-muted-foreground mt-0.5">
              {disc.expiresAt
                ? `Expires ${new Date(disc.expiresAt).toLocaleDateString()}`
                : 'Never expires'}
            </div>
          </div>
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        className: 'text-right',
        render: (_, disc) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={(e) => handleToggleStatus(disc.id, e)}
              className="text-[11px] font-semibold text-muted-foreground hover:text-foreground px-2 py-1"
            >
              {disc.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
            <button
              type="button"
              onClick={() => setDeleteTarget(disc)}
              className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"
              title="Delete Coupon"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ),
      },
    ],
    [copiedCode]
  )

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <PageHeader
        title="Discounts & Promos"
        subtitle="Create high-converting coupon codes to share on Instagram stories, WhatsApp, and campaigns."
        actions={
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md transition-all"
          >
            <Plus size={15} />
            <span>Create Coupon</span>
          </button>
        }
      />

      {/* ── 1. Top KPI Summary Strip ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Active Coupons"
          value={stats.activeCount}
          period="Ready to redeem"
          icon={Tag}
        />
        <StatCard
          label="Total Redemptions"
          value={stats.totalRedemptions}
          period="Orders used with promo"
          icon={Percent}
        />
        <StatCard
          label="Discount-Assisted Sales"
          value={`₨ ${stats.discountRevenue.toLocaleString()}`}
          period="Generated campaign sales"
        />
      </div>

      {/* ── 2. Filter Tabs & Search ──────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs
            tabs={tabConfig}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            variant="pills"
          />

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search promo codes…"
            className="w-full sm:w-72"
          />
        </div>
      </div>

      {/* ── 3. Discounts Table ───────────────────────────────────────── */}
      {filteredDiscounts.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No promo codes found"
          description={
            searchQuery
              ? `No coupon matching "${searchQuery}".`
              : 'Create your first promotional discount code to boost sales.'
          }
          actionLabel={searchQuery ? 'Clear Search' : 'Create First Coupon'}
          onAction={() => {
            if (searchQuery) setSearchQuery('')
            else handleOpenCreate()
          }}
        />
      ) : (
        <DataTable
          columns={tableColumns}
          data={filteredDiscounts}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* ── 4. Slide-Over Create Discount Drawer ─────────────────────── */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create Promo Code"
        subtitle="Generate a shareable coupon with custom rules and limits."
        size="md"
      >
        <DiscountDrawerForm
          initialData={editingDiscount}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveDiscount}
        />
      </Drawer>

      {/* ── 5. Delete Confirm Dialog ─────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Promo Code?"
        description={`Are you sure you want to delete coupon "${deleteTarget?.code}"? Shoppers will no longer be able to use it at checkout.`}
        confirmLabel="Delete Coupon"
        variant="danger"
      />
    </div>
  )
}

const DiscountDrawerForm = ({ initialData, onClose, onSave }) => {
  const [code, setCode] = useState(initialData?.code || '')
  const [type, setType] = useState(initialData?.type || 'percentage')
  const [value, setValue] = useState(initialData?.value || 15)
  const [minPurchase, setMinPurchase] = useState(initialData?.minPurchase || '')
  const [usageLimit, setUsageLimit] = useState(initialData?.usageLimit || '')
  const [description, setDescription] = useState(initialData?.description || '')

  const generateRandomCode = () => {
    const prefixes = ['STALLIO', 'SAVE', 'FLASH', 'VIP', 'WELCOME']
    const rand = Math.floor(10 + Math.random() * 90)
    const pref = prefixes[Math.floor(Math.random() * prefixes.length)]
    setCode(`${pref}${rand}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim() || !value) return

    onSave({
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minPurchase: minPurchase ? Number(minPurchase) : 0,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      description: description.trim(),
      status: 'active',
      expiresAt: null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-xs">
      {/* Code Input with Generator */}
      <FormField label="Coupon Code" required>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. SUMMER25"
            className="flex-1 rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm font-mono font-bold text-foreground tracking-wider focus-visible:outline-2 focus-visible:outline-ring"
          />
          <button
            type="button"
            onClick={generateRandomCode}
            className="inline-flex items-center gap-1 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent"
          >
            <Sparkles size={13} />
            <span>Generate</span>
          </button>
        </div>
      </FormField>

      {/* Discount Type */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: 'percentage', label: '% Percentage', icon: Percent },
          { id: 'fixed', label: '₨ Fixed Off', icon: DollarSign },
          { id: 'shipping', label: 'Free Delivery', icon: Truck },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setType(t.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
              type === t.id
                ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                : 'border-border bg-card text-muted-foreground hover:bg-accent'
            }`}
          >
            <t.icon size={16} className="mb-1" />
            <span className="text-[11px]">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Value Input */}
      {type !== 'shipping' && (
        <FormField
          label={type === 'percentage' ? 'Percentage Discount (%)' : 'Fixed Discount (₨)'}
          required
        >
          <input
            type="number"
            required
            min="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={type === 'percentage' ? '20' : '500'}
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm font-bold text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>
      )}

      {/* Minimum Spend & Limits */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Min. Spend (₨)" optional>
          <input
            type="number"
            min="0"
            value={minPurchase}
            onChange={(e) => setMinPurchase(e.target.value)}
            placeholder="e.g. 3000"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>

        <FormField label="Usage Limit" optional>
          <input
            type="number"
            min="1"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
            placeholder="Unlimited"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>
      </div>

      <FormField label="Campaign Description" optional>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. 20% off all summer apparel drops."
          className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring resize-none"
        />
      </FormField>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border sticky bottom-0 bg-card py-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-border bg-muted px-4 py-2.5 font-semibold text-muted-foreground hover:bg-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-xs"
        >
          Publish Coupon
        </button>
      </div>
    </form>
  )
}

export default Discounts
