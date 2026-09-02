import React, { useState, useEffect, useMemo } from 'react'
import {Users, UserPlus, Phone, Mail, MapPin, ShoppingBag, ExternalLink,
  MessageCircle, Clock, Sparkles, Award, ChevronRight, TrendingUp, } from 'lucide-react'
import {PageHeader, StatCard, StatusBadge, DataTable, Drawer, Modal, FormField, SearchInput,
  FilterTabs, EmptyState, useToast, } from '../../components/ui'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, calculateCustomerStats,
} from '../../services/customerService'

const SEGMENT_TABS = [
  { id: 'all', label: 'All Customers' },
  { id: 'vip', label: 'VIP Spenders (> ₨15k)' },
  { id: 'repeat', label: 'Repeat Buyers (2+ Orders)' },
  { id: 'first_time', label: 'First-Time' },
]

export const Customers = () => {
  const toast = useToast()
  const [customers, setCustomers] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Drawer / Modal states
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Load customers
  useEffect(() => {
    setCustomers(getCustomers())
  }, [])

  // Stats
  const stats = useMemo(() => {
    return calculateCustomerStats(customers)
  }, [customers])

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      let matchesTab = true
      if (activeTab === 'vip') matchesTab = c.totalSpent >= 15000
      else if (activeTab === 'repeat') matchesTab = c.ordersCount > 1
      else if (activeTab === 'first_time') matchesTab = c.ordersCount <= 1

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.phone.includes(q)

      return matchesTab && matchesSearch
    })
  }, [customers, activeTab, searchQuery])

  // Tabs config
  const tabConfig = useMemo(() => {
    return SEGMENT_TABS.map((tab) => ({
      id: tab.id,
      label: tab.label,
      count:
        tab.id === 'all'
          ? customers.length
          : tab.id === 'vip'
          ? customers.filter((c) => c.totalSpent >= 15000).length
          : tab.id === 'repeat'
          ? customers.filter((c) => c.ordersCount > 1).length
          : customers.filter((c) => c.ordersCount <= 1).length,
    }))
  }, [customers])

  // Handlers
  const handleOpenCustomer = (customer) => {
    setSelectedCustomer(customer)
    setIsDrawerOpen(true)
  }

  const handleCreateCustomer = (formData) => {
    const created = createCustomer(formData)
    setCustomers(getCustomers())
    setIsCreateModalOpen(false)
    toast.success(`Customer ${created.name} added`)
    handleOpenCustomer(created)
  }

  const handleUpdateNotes = (notes) => {
    if (!selectedCustomer) return
    const updated = updateCustomer(selectedCustomer.id, { notes })
    if (updated) {
      setCustomers(getCustomers())
      setSelectedCustomer(updated)
      toast.success('Customer notes saved')
    }
  }

  const tableColumns = useMemo(
    () => [
      {
        key: 'name',
        label: 'Customer',
        render: (_, customer) => (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs font-heading">
              {customer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-foreground text-xs sm:text-sm font-heading line-clamp-1">
                {customer.name}
              </div>
              <div className="text-[11px] text-muted-foreground line-clamp-1">
                {customer.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'city',
        label: 'Location & Phone',
        render: (_, customer) => (
          <div className="text-right sm:text-left">
            <div className="flex items-center justify-end gap-1 text-foreground font-medium sm:justify-start">
              <MapPin size={11} className="text-muted-foreground" />
              <span>{customer.city}</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {customer.phone}
            </div>
          </div>
        ),
      },
      {
        key: 'ordersCount',
        label: 'Orders',
        render: (_, customer) => (
          <div>
            <span className="font-bold text-foreground">
              {customer.ordersCount} orders
            </span>
            {customer.totalSpent >= 15000 && (
              <span className="ml-2 inline-flex items-center rounded-md bg-amber-500/15 px-1.5 py-0.2 text-[10px] font-bold text-amber-500">
                VIP
              </span>
            )}
          </div>
        ),
      },
      {
        key: 'totalSpent',
        label: 'Lifetime Value (LTV)',
        render: (_, customer) => (
          <div className="font-bold text-foreground font-heading">
            ₨ {customer.totalSpent.toLocaleString()}
          </div>
        ),
      },
      {
        key: 'actions',
        label: 'Action',
        className: 'text-right',
        render: (_, customer) => (
          <div className="flex items-center justify-end gap-2">
            <a
              href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam ${customer.name}! Thank you for shopping with us on Stallio.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 px-2.5 py-1 text-[11px] font-semibold text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
            >
              <MessageCircle size={12} />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleOpenCustomer(customer)
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <PageHeader
        title="Customers"
        subtitle="Manage customer relationships, track repeat order volume, and client via WhatsApp."
        actions={
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md transition-all"
          >
            <UserPlus size={15} />
            <span>Add Customer</span>
          </button>
        }
      />

      {/* ── 1. Top KPI Summary Strip ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total Customers"
          value={stats.total}
          period="Registered buyers"
          icon={Users}
        />
        <StatCard
          label="Repeat Buyer Rate"
          value={`${stats.repeatRate}%`}
          change={`${stats.repeatBuyers} loyal accounts`}
          isPositive={true}
          period="Placed 2+ orders"
        />
        <StatCard
          label="Average Lifetime Spend"
          value={`₨ ${stats.averageLTV.toLocaleString()}`}
          period="Per active customer"
        />
        <StatCard
          label="VIP Spenders"
          value={stats.vipCount}
          badge="High Value"
          period="Spent > ₨ 15,000"
          icon={Award}
        />
      </div>

      {/* ── 2. Segment Filter Tabs & Search ──────────────────────────── */}
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
            placeholder="Search by name, email, city…"
            className="w-full sm:w-72"
          />
        </div>
      </div>

      {/* ── 3. Customers Table ───────────────────────────────────────── */}
      {filteredCustomers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No customers found"
          description={
            searchQuery
              ? `No customer matching "${searchQuery}".`
              : 'You do not have any customers in this segment yet.'
          }
          actionLabel={searchQuery ? 'Clear Search' : undefined}
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <DataTable
          columns={tableColumns}
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          onRowClick={handleOpenCustomer}
        />
      )}

      {/* ── 4. Slide-Over Customer Profile Dossier (`Drawer`) ─────────── */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedCustomer ? selectedCustomer.name : 'Customer Dossier'}
        subtitle={selectedCustomer ? `${selectedCustomer.city} • Customer since ${new Date(selectedCustomer.createdAt).toLocaleDateString()}` : ''}
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6 text-xs">
            {/* Customer Summary Card */}
            <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground text-sm font-heading">
                    {selectedCustomer.name}
                  </span>
                  {selectedCustomer.totalSpent >= 15000 && (
                    <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-500 uppercase">
                      VIP Client
                    </span>
                  )}
                </div>

                <a
                  href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam ${selectedCustomer.name}!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 px-3 py-1 font-semibold text-[#25D366] hover:bg-[#25D366]/25"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Phone:</span>
                  <span className="font-semibold text-foreground">{selectedCustomer.phone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Email:</span>
                  <span className="font-semibold text-foreground truncate block">{selectedCustomer.email}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground block text-[11px]">Primary Address:</span>
                  <span className="font-semibold text-foreground">{selectedCustomer.address}</span>
                </div>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-card p-4">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                  Total Orders Placed
                </span>
                <div className="mt-1 text-xl font-bold text-foreground font-heading">
                  {selectedCustomer.ordersCount}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                  Lifetime Value (LTV)
                </span>
                <div className="mt-1 text-xl font-bold text-foreground font-heading">
                  ₨ {selectedCustomer.totalSpent.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Order History Timeline */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Order History ({selectedCustomer.orders?.length || 0})
              </span>

              <div className="divide-y divide-border">
                {selectedCustomer.orders?.map((ord) => (
                  <div key={ord.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <span className="font-bold text-foreground font-heading">
                        #{ord.id}
                      </span>
                      <div className="text-[11px] text-muted-foreground">{ord.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">
                        ₨ {ord.total.toLocaleString()}
                      </span>
                      <StatusBadge status={ord.status} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Merchant Private Notes */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Merchant Notes (Private)
              </span>
              <textarea
                rows={3}
                defaultValue={selectedCustomer.notes}
                onBlur={(e) => handleUpdateNotes(e.target.value)}
                placeholder="Add private sizing preferences, delivery hints, or VIP tags…"
                className="w-full rounded-xl border border-border bg-muted/20 p-3 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring resize-none"
              />
              <p className="text-[10px] text-muted-foreground">
                Notes auto-save when you click away.
              </p>
            </div>
          </div>
        )}
      </Drawer>

      {/* ── 5. Add Customer Modal ────────────────────────────────────── */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add Customer"
        subtitle="Manually create a new customer record."
        size="md"
      >
        <AddCustomerForm
          onCancel={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCustomer}
        />
      </Modal>
    </div>
  )
}

const AddCustomerForm = ({ onCancel, onSubmit }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('Lahore')
  const [address, setAddress] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      city: city.trim(),
      address: address.trim() || `${city}, Pakistan`,
      notes: 'Manually added customer',
      channel: 'store',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <FormField label="Full Name" required>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sara Malik"
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Phone / WhatsApp" required>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0300-1234567"
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>

        <FormField label="City" required>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Lahore, Karachi"
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>
      </div>

      <FormField label="Email" optional>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="sara@gmail.com"
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </FormField>

      <FormField label="Shipping Address" optional>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="House #, Street, Phase / Block"
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </FormField>

      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border bg-muted px-4 py-2 font-semibold text-muted-foreground hover:bg-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-xs"
        >
          Save Customer
        </button>
      </div>
    </form>
  )
}

export default Customers
