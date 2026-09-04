import  { useState, useEffect, useMemo } from 'react'
import { ShoppingCart, Download,Plus, Phone, MapPin, ExternalLink, MessageCircle, Truck,
  CheckCircle2, Clock, AlertTriangle, XCircle, Printer, ChevronRight, Package, Calendar,
  CreditCard, Hash, RotateCcw, User, Trash2, Search, Check, X} from 'lucide-react'
import { PageHeader, StatCard, StatusBadge, DataTable, Drawer, Modal, ConfirmDialog, FormField, SearchInput, FilterTabs,
  OrderCard, EmptyState, useToast,} from '../../components/ui'
import { getOrders, createOrder, updateOrder, progressOrderStatus, revertOrderStatus,deleteOrder,
  calculateOrderStats, exportOrdersToCSV, getWhatsAppOrderLink, } from '../../services/orderService'
import { getProducts } from '../../services/productService'
import { getCustomers } from '../../services/customerService'

const STATUS_TABS = [
  { id: 'all', label: 'All Orders' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
]

export const Orders = () => {
  const toast = useToast()
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Drawer & Modal States
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false)
  const [isManualModalOpen, setIsManualModalOpen] = useState(false)
  const [deleteTargetOrder, setDeleteTargetOrder] = useState(null)
  const [undoTargetOrder, setUndoTargetOrder] = useState(null)

  // Tracking number input state for shipping step
  const [trackingInput, setTrackingInput] = useState('')
  const [courierInput, setCourierInput] = useState('TCS Express')

  // Load orders on mount
  useEffect(() => {
    setOrders(getOrders())
  }, [])

  // Order stats calculation
  const stats = useMemo(() => {
    return calculateOrderStats(orders)
  }, [orders])

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = activeTab === 'all' || order.status === activeTab

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer?.name?.toLowerCase().includes(query) ||
        order.customer?.city?.toLowerCase().includes(query) ||
        order.customer?.phone?.includes(query) ||
        order.items?.some((item) => item.name.toLowerCase().includes(query))

      return matchesTab && matchesSearch
    })
  }, [orders, activeTab, searchQuery])

  // Status Tabs with dynamic badge counts
  const tabConfig = useMemo(() => {
    return STATUS_TABS.map((tab) => ({
      id: tab.id,
      label: tab.label,
      count:
        tab.id === 'all'
          ? orders.length
          : orders.filter((o) => o.status === tab.id).length,
    }))
  }, [orders])

  // Handlers
  const handleOpenDetail = (order) => {
    setSelectedOrder(order)
    setTrackingInput(order.trackingNumber || '')
    setCourierInput(order.courier || 'TCS Express')
    setIsDetailDrawerOpen(true)
  }

  const handleStatusProgression = (orderId, trackingNumber = null) => {
    const updated = progressOrderStatus(orderId, trackingNumber)
    if (updated) {
      setOrders(getOrders())
      setSelectedOrder(updated)
      toast.success(`Order #${updated.id} updated to ${updated.status.toUpperCase()}`)
    }
  }

  const handleConfirmUndoStatus = () => {
    if (!undoTargetOrder) return
    const updated = revertOrderStatus(undoTargetOrder.id, 'pending')
    if (updated) {
      setOrders(getOrders())
      setSelectedOrder(updated)
      setUndoTargetOrder(null)
      toast.warning(`Order #${updated.id} status reverted back to PENDING`)
    }
  }

  const handleCancelOrder = (orderId) => {
    const updated = updateOrder(orderId, { status: 'cancelled' })
    if (updated) {
      setOrders(getOrders())
      setSelectedOrder(updated)
      toast.warning(`Order #${updated.id} marked as Cancelled`)
    }
  }

  const handleConfirmDelete = () => {
    if (deleteTargetOrder) {
      deleteOrder(deleteTargetOrder.id)
      setOrders(getOrders())
      setDeleteTargetOrder(null)
      setIsDetailDrawerOpen(false)
      toast.success('Order removed from records')
    }
  }

  const handleExport = () => {
    exportOrdersToCSV(filteredOrders)
    toast.success(`Exported ${filteredOrders.length} orders to CSV`)
  }

  const handleCreateManualOrder = (manualData) => {
    const created = createOrder(manualData)
    setOrders(getOrders())
    setIsManualModalOpen(false)
    toast.success(`Manual order #${created.id} created`)
    handleOpenDetail(created)
  }

  // Table Columns Definition
  const tableColumns = useMemo(
    () => [
      {
        key: 'id',
        label: 'Order ID',
        render: (_, order) => (
          <div>
            <span className="font-bold text-foreground text-sm font-heading">
              {order.id}
            </span>
            <div className="text-[11px] text-muted-foreground">
              {new Date(order.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ),
      },
      {
        key: 'customer',
        label: 'Customer & City',
        render: (_, order) => (
          <div>
            <div className="font-semibold text-foreground">
              {order.customer?.name}
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
              <MapPin size={11} />
              <span>{order.customer?.city}</span>
            </div>
          </div>
        ),
      },
      {
        key: 'items',
        label: 'Purchased Items',
        render: (_, order) => (
          <div className="flex items-center gap-1.5">
            {order.items?.map((it, idx) => (
              <img
                key={idx}
                src={it.img}
                alt={it.name}
                className="h-8 w-8 rounded-lg border border-border object-cover"
                title={`${it.name} (x${it.qty})`}
              />
            ))}
            <span className="text-[11px] text-muted-foreground ml-1">
              {order.items?.reduce((sum, it) => sum + (it.qty || 1), 0)} pcs
            </span>
          </div>
        ),
      },
      {
        key: 'total',
        label: 'Amount & Method',
        render: (_, order) => (
          <div>
            <div className="font-bold text-foreground font-heading">
              ₨ {order.total?.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground truncate max-w-[130px]">
              {order.paymentMethod}
            </div>
          </div>
        ),
      },
      {
        key: 'status',
        label: 'Status',
        render: (_, order) => <StatusBadge status={order.status} size="sm" />,
      },
      {
        key: 'actions',
        label: 'Quick Action',
        className: 'text-right',
        render: (_, order) => (
          <div className="flex items-center justify-end gap-1.5">
            {order.status === 'pending' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatusProgression(order.id)
                }}
                className="rounded-lg bg-[var(--info-bg)] border border-[var(--info-border)] px-2.5 py-1 text-[11px] font-semibold text-[var(--info)] hover:opacity-85 transition-opacity"
              >
                Confirm
              </button>
            )}

            {order.status === 'confirmed' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenDetail(order)
                }}
                className="rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1 text-[11px] font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                Ship
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleOpenDetail(order)
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              title="View full order"
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
        title="Orders"
        subtitle="Track incoming customer orders, manage fulfillments, and coordinate delivery."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Download size={14} className="text-muted-foreground" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-150 hover:shadow-md hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Manual Order</span>
            </button>
          </div>
        }
      />

      {/* ── 1. Top KPI Summary Strip ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={stats.total}
          period="All time orders"
          icon={ShoppingCart}
        />
        <StatCard
          label="Pending Action"
          value={stats.pending}
          badge={stats.pending > 0 ? 'Needs Review' : undefined}
          period="Unconfirmed orders"
          icon={Clock}
        />
        <StatCard
          label="In Transit / Shipped"
          value={stats.shipped}
          period="En route with courier"
          icon={Truck}
        />
        <StatCard
          label="Gross Revenue"
          value={`₨ ${stats.grossVolume.toLocaleString()}`}
          period="Fulfilled volume"
        />
      </div>

      {/* ── 2. Filter Tabs & Search Bar ──────────────────────────────── */}
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
            placeholder="Search by order ID, customer, city…"
            className="w-full sm:w-72"
          />
        </div>
      </div>

      {/* ── 3. Orders Presentation (Desktop DataTable + Mobile Cards) ── */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="No orders found"
          description={
            searchQuery
              ? `No orders matching "${searchQuery}".`
              : `You do not have any ${activeTab !== 'all' ? activeTab : ''} orders right now.`
          }
          actionLabel={searchQuery ? 'Clear Search' : undefined}
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <DataTable
          columns={tableColumns}
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          onRowClick={handleOpenDetail}
          renderMobileCard={(order) => (
            <OrderCard
              order={order}
              onClick={() => handleOpenDetail(order)}
              onConfirm={() => handleStatusProgression(order.id)}
              onMarkShipped={() => handleOpenDetail(order)}
            />
          )}
        />
      )}

      {/* ── 4. Slide-Over Order Detail Drawer ────────────────────────── */}
      <Drawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        title={selectedOrder ? `Order #${selectedOrder.id}` : 'Order Detail'}
        subtitle={
          selectedOrder
            ? `Placed on ${new Date(selectedOrder.createdAt).toLocaleDateString()} at ${new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : ''
        }
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* 1. Linear Lifecycle Progress Bar + Undo Action */}
            <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Order Lifecycle Status
                </span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedOrder.status} />
                  {/* Undo Button when order is not pending */}
                  {selectedOrder.status !== 'pending' && selectedOrder.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => setUndoTargetOrder(selectedOrder)}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-0.5 text-[10px] font-semibold text-muted-foreground hover:bg-[var(--warning-bg)] hover:text-[var(--warning)] hover:border-[var(--warning-border)] transition-colors"
                      title="Undo status back to Pending"
                    >
                      <RotateCcw size={11} />
                      <span>Undo to Pending</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lifecycle Step Line */}
              <div className="relative flex items-center justify-between pt-2">
                {['pending', 'confirmed', 'shipped', 'delivered'].map((st, i) => {
                  const stages = ['pending', 'confirmed', 'shipped', 'delivered']
                  const currentIndex = stages.indexOf(selectedOrder.status)
                  const isCompleted = currentIndex >= i
                  const isCurrent = selectedOrder.status === st

                  return (
                    <div key={st} className="flex flex-col items-center gap-1 z-10">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'border border-border bg-card text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={15} /> : i + 1}
                      </div>
                      <span
                        className={`text-[10px] font-semibold capitalize ${
                          isCurrent
                            ? 'text-primary'
                            : isCompleted
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {st}
                      </span>
                    </div>
                  )
                })}

                {/* Connecting Line */}
                <div className="absolute top-5 left-4 right-4 h-0.5 bg-border -z-0" />
              </div>

              {/* 1-Tap Lifecycle Progression Trigger */}
              <div className="pt-2 border-t border-border/80">
                {selectedOrder.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => handleStatusProgression(selectedOrder.id)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/35 transition-all"
                  >
                    <CheckCircle2 size={15} />
                    <span>Confirm Order Now</span>
                  </button>
                )}

                {selectedOrder.status === 'confirmed' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        placeholder="Tracking # (e.g. TCS-892341)"
                        className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                      />
                      <select
                        value={courierInput}
                        onChange={(e) => setCourierInput(e.target.value)}
                        className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        <option value="TCS Express">TCS Express</option>
                        <option value="Trax Logistics">Trax Logistics</option>
                        <option value="Leopard Courier">Leopard Courier</option>
                        <option value="Rider Delivery">Rider Delivery</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleStatusProgression(selectedOrder.id, trackingInput)
                      }
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md transition-all"
                    >
                      <Truck size={15} />
                      <span>Dispatch & Mark as Shipped</span>
                    </button>
                  </div>
                )}

                {selectedOrder.status === 'shipped' && (
                  <button
                    type="button"
                    onClick={() => handleStatusProgression(selectedOrder.id)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--success-bg)] border border-[var(--success-border)] py-2.5 text-xs font-semibold text-[var(--success)] hover:opacity-90 transition-all"
                  >
                    <CheckCircle2 size={15} />
                    <span>Mark as Delivered & Paid</span>
                  </button>
                )}
              </div>
            </div>

            {/* 2. Customer & WhatsApp Direct Link */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Customer Information
                </span>

                {/* Direct WhatsApp Deep Link */}
                <a
                  href={getWhatsAppOrderLink(selectedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 px-3 py-1 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Buyer</span>
                </a>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-foreground text-sm font-heading">
                  {selectedOrder.customer?.name}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Phone size={13} className="text-primary shrink-0" />
                  <span>{selectedOrder.customer?.phone}</span>
                </div>
                <div className="text-muted-foreground flex items-start gap-2 pt-0.5">
                  <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
                  <span>{selectedOrder.customer?.address}</span>
                </div>
                {selectedOrder.customer?.notes && (
                  <div className="rounded-xl bg-muted/40 p-2.5 text-[11px] text-muted-foreground mt-2">
                    <strong>Delivery Note:</strong> {selectedOrder.customer.notes}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Purchased Items List */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Items in Order ({selectedOrder.items?.length})
              </span>

              <div className="divide-y divide-border">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2.5">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-12 w-12 rounded-xl border border-border object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-xs line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Size / Variant: <strong>{item.size}</strong> • Qty: {item.qty}
                      </div>
                    </div>
                    <div className="text-right font-bold text-xs text-foreground font-heading">
                      ₨ {(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Financial Breakdown */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-2 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Payment & Breakdown
              </span>

              <div className="flex justify-between text-muted-foreground pt-1">
                <span>Subtotal</span>
                <span>₨ {selectedOrder.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>₨ {selectedOrder.deliveryFee?.toLocaleString() || 0}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-[var(--success)] font-semibold">
                  <span>Discount Applied</span>
                  <span>- ₨ {selectedOrder.discount?.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-border pt-2 flex justify-between font-bold text-sm text-foreground font-heading">
                <span>Grand Total</span>
                <span>₨ {selectedOrder.total?.toLocaleString()}</span>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Payment Method:</span>
                <span className="font-semibold text-foreground">
                  {selectedOrder.paymentMethod} (
                  {selectedOrder.isPaid ? 'Paid' : 'Unpaid COD'})
                </span>
              </div>
            </div>

            {/* 5. Danger Zone / Cancel & Delete */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              {selectedOrder.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  className="rounded-xl border border-border bg-muted px-3.5 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                >
                  Cancel Order
                </button>
              )}

              <button
                type="button"
                onClick={() => setDeleteTargetOrder(selectedOrder)}
                className="rounded-xl px-3.5 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
              >
                Delete Record
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* ── 5. Manual Order Creator Modal (Customer & Product Pickers) ── */}
      <Modal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        title="Create Manual Order"
        subtitle="Select from registered customers and products or enter custom details."
        size="lg"
      >
        <ManualOrderForm
          onCancel={() => setIsManualModalOpen(false)}
          onSubmit={handleCreateManualOrder}
        />
      </Modal>

      {/* ── 6. Undo Status Warning Modal (ConfirmDialog) ──────────────── */}
      <ConfirmDialog
        isOpen={!!undoTargetOrder}
        onClose={() => setUndoTargetOrder(null)}
        onConfirm={handleConfirmUndoStatus}
        title="Revert Status to Pending?"
        description={`Are you sure you want to revert order #${undoTargetOrder?.id} back to Pending? This will clear courier tracking information and mark the order as unfulfilled.`}
        confirmLabel="Yes, Revert to Pending"
        variant="warning"
      />

      {/* ── 7. Delete Confirmation Dialog ────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!deleteTargetOrder}
        onClose={() => setDeleteTargetOrder(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Order Record?"
        description={`Are you sure you want to delete order #${deleteTargetOrder?.id}? This will remove it permanently from your sales ledger.`}
        confirmLabel="Delete Order"
        variant="danger"
      />
    </div>
  )
}

/**
 * Enhanced Manual Order Form with Customer & Product Dropdowns
 */
const ManualOrderForm = ({ onCancel, onSubmit }) => {
  // Available database
  const [availableCustomers, setAvailableCustomers] = useState([])
  const [availableProducts, setAvailableProducts] = useState([])

  // Customer selection mode: 'existing' | 'new'
  const [customerMode, setCustomerMode] = useState('existing')
  const [selectedCustomerOption, setSelectedCustomerOption] = useState('')

  // Customer fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Lahore')
  const [address, setAddress] = useState('')

  // Order items list
  const [items, setItems] = useState([
    {
      productId: '',
      name: '',
      size: 'M',
      price: '',
      qty: 1,
      img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&h=120&fit=crop&auto=format&q=80',
    },
  ])

  const [deliveryFee, setDeliveryFee] = useState(250)
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)')

  useEffect(() => {
    const custs = getCustomers()
    const prods = getProducts()
    setAvailableCustomers(custs)
    setAvailableProducts(prods)

    if (custs.length > 0) {
      handleSelectExistingCustomer(custs[0].id, custs)
    }
    if (prods.length > 0) {
      handleSelectProduct(0, prods[0].id, prods)
    }
  }, [])

  const handleSelectExistingCustomer = (custId, list = availableCustomers) => {
    setSelectedCustomerOption(custId)
    const found = list.find((c) => c.id === custId)
    if (found) {
      setName(found.name)
      setPhone(found.phone)
      setCity(found.city)
      setAddress(found.address)
    }
  }

  const handleSelectProduct = (index, prodId, list = availableProducts) => {
    const found = list.find((p) => p.id === prodId)
    if (!found) return

    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              productId: found.id,
              name: found.title,
              price: found.price,
              img: found.images?.[0] || item.img,
              size: found.variants?.[0]?.name || 'Standard',
            }
          : item
      )
    )
  }

  const handleUpdateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleAddItem = () => {
    const defaultProd = availableProducts[0]
    setItems((prev) => [
      ...prev,
      {
        productId: defaultProd?.id || '',
        name: defaultProd?.title || 'Custom Item',
        size: defaultProd?.variants?.[0]?.name || 'M',
        price: defaultProd?.price || 2500,
        qty: 1,
        img:
          defaultProd?.images?.[0] ||
          'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ])
  }

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  // Calculate totals
  const subtotal = items.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 1),
    0
  )
  const grandTotal = subtotal + Number(deliveryFee)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || items.length === 0) return

    onSubmit({
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        address: address.trim() || `${city}, Pakistan`,
        notes: 'Manual order entered via dashboard',
      },
      items: items.map((it) => ({
        ...it,
        price: Number(it.price),
        qty: Number(it.qty),
      })),
      subtotal,
      deliveryFee: Number(deliveryFee),
      discount: 0,
      total: grandTotal,
      status: 'pending',
      paymentMethod,
      isPaid: !paymentMethod.includes('COD'),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-xs">
      {/* ── 1. Customer Selection Mode (Existing vs New) ───────────── */}
      <div className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <User size={14} className="text-primary" />
            <span>Customer Details</span>
          </span>

          <div className="flex rounded-xl border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => setCustomerMode('existing')}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                customerMode === 'existing'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Existing Customer
            </button>
            <button
              type="button"
              onClick={() => {
                setCustomerMode('new')
                setName('')
                setPhone('')
                setAddress('')
              }}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                customerMode === 'new'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              + New Customer
            </button>
          </div>
        </div>

        {/* Existing Customer Dropdown */}
        {customerMode === 'existing' && (
          <FormField label="Select Registered Customer">
            <select
              value={selectedCustomerOption}
              onChange={(e) => handleSelectExistingCustomer(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground font-semibold focus-visible:outline-2 focus-visible:outline-ring"
            >
              {availableCustomers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name} ({cust.phone}) • {cust.city} {cust.totalSpent >= 15000 ? '★ VIP' : ''}
                </option>
              ))}
            </select>
          </FormField>
        )}

        {/* Customer Input Fields */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <FormField label="Customer Name" required>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ayesha Khan"
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
          </FormField>

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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Delivery City" required>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Lahore, Karachi"
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
          </FormField>

          <FormField label="Full Street Address">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House #, Street, Phase / Block"
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
          </FormField>
        </div>
      </div>

      {/* ── 2. Ordered Products Multi-Item Builder ─────────────────── */}
      <div className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Package size={14} className="text-primary" />
            <span>Order Line Items ({items.length})</span>
          </span>

          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <Plus size={13} />
            <span>Add Another Product</span>
          </button>
        </div>

        <div className="space-y-3 pt-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-3 space-y-3 relative shadow-xs"
            >
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-destructive p-1 rounded-md"
                  title="Remove Item"
                >
                  <Trash2 size={13} />
                </button>
              )}

              {/* Product Selector Dropdown */}
              <div className="pr-6">
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Select Product from Catalog
                </label>
                <select
                  value={item.productId}
                  onChange={(e) => handleSelectProduct(index, e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3 py-1.5 text-foreground font-semibold focus-visible:outline-2 focus-visible:outline-ring text-xs"
                >
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — ₨ {p.price?.toLocaleString()} ({p.stock} in stock)
                    </option>
                  ))}
                </select>
              </div>

              {/* Size & Quantity & Price row */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-muted-foreground mb-1">
                    Variant / Size
                  </label>
                  <input
                    type="text"
                    value={item.size}
                    onChange={(e) =>
                      handleUpdateItem(index, 'size', e.target.value)
                    }
                    placeholder="e.g. M / Black"
                    className="w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-muted-foreground mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      handleUpdateItem(index, 'qty', e.target.value)
                    }
                    className="w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-foreground font-bold text-center focus-visible:outline-2 focus-visible:outline-ring"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-muted-foreground mb-1">
                    Unit Price (₨)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      handleUpdateItem(index, 'price', e.target.value)
                    }
                    className="w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-foreground font-bold focus-visible:outline-2 focus-visible:outline-ring"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Payment Method & Delivery Summary ───────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Payment Method">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground font-medium focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
            <option value="Bank Transfer (Paid)">Bank Transfer (Advance Paid)</option>
            <option value="Debit Card">Debit / Credit Card</option>
          </select>
        </FormField>

        <FormField label="Delivery Fee (₨)">
          <input
            type="number"
            min="0"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(e.target.value)}
            placeholder="250"
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground font-bold focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>
      </div>

      {/* Total Calculation Bar */}
      <div className="rounded-xl border border-border bg-card p-3 flex items-center justify-between font-heading">
        <span className="text-xs text-muted-foreground font-medium">
          Subtotal (₨ {subtotal.toLocaleString()}) + Delivery (₨ {Number(deliveryFee).toLocaleString()})
        </span>
        <div className="text-right">
          <span className="text-xs text-muted-foreground block text-[10px]">Grand Total:</span>
          <span className="text-base font-extrabold text-foreground">
            ₨ {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Form Bottom Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-border sticky bottom-0 bg-card py-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border bg-muted px-4 py-2 font-semibold text-muted-foreground hover:bg-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2 font-semibold text-primary-foreground shadow-xs hover:shadow-md"
        >
          Create Order (₨ {grandTotal.toLocaleString()})
        </button>
      </div>
    </form>
  )
}

export default Orders
