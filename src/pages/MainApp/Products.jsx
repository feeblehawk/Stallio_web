import React, { useState, useEffect, useMemo } from 'react'
import {
  Plus,
  LayoutGrid,
  List,
  Edit3,
  Trash2,
  Copy,
  Package,
  Sparkles,
  TrendingUp,
  X,
  Eye,
  EyeOff,
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
  ImageUpload,
  ProductCard,
  EmptyState,
  useToast,
} from '../../components/ui'
import { useStore } from '../../contexts/StoreContext'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  duplicateProduct,
  toggleProductStatus,
  adjustStock,
  calculateInventoryStats,
  CATEGORIES,
} from '../../services/productService'

const STOCK_TABS = [
  { id: 'all', label: 'All Products' },
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Drafts' },
  { id: 'low', label: 'Low Stock (< 5)' },
  { id: 'out', label: 'Out of Stock' },
]

export const Products = () => {
  const toast = useToast()
  const { formatPrice, currencySymbol } = useStore()
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [stockFilter, setStockFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  // Drawer / Dialog states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Load products on mount
  useEffect(() => {
    setProducts(getProducts())
  }, [])

  // Dynamic statistics
  const stats = useMemo(() => {
    return calculateInventoryStats(products)
  }, [products])

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())

      // Category
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory

      // Stock status tab
      let matchesStock = true
      if (stockFilter === 'low') matchesStock = p.stock > 0 && p.stock < 5
      else if (stockFilter === 'out') matchesStock = p.stock === 0
      else if (stockFilter === 'active') matchesStock = p.status === 'active'
      else if (stockFilter === 'draft') matchesStock = p.status === 'draft'

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, searchQuery, selectedCategory, stockFilter])

  // Handlers
  const handleOpenCreateDrawer = () => {
    setEditingProduct(null)
    setIsDrawerOpen(true)
  }

  const handleOpenEditDrawer = (product) => {
    setEditingProduct(product)
    setIsDrawerOpen(true)
  }

  const handleToggleStatus = (id, e) => {
    e?.stopPropagation()
    const updated = toggleProductStatus(id)
    if (updated) {
      setProducts(getProducts())
      toast.success(
        `Product marked as ${updated.status === 'active' ? 'Active' : 'Draft'}`
      )
    }
  }

  const handleAdjustStock = (id, delta, e) => {
    e?.stopPropagation()
    const updated = adjustStock(id, delta)
    if (updated) {
      setProducts(getProducts())
    }
  }

  const handleDuplicate = (id, e) => {
    e?.stopPropagation()
    const duplicated = duplicateProduct(id)
    if (duplicated) {
      setProducts(getProducts())
      toast.success(`Created duplicate "${duplicated.title}"`)
    }
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id)
      setProducts(getProducts())
      setDeleteTarget(null)
      toast.success('Product deleted from catalog')
    }
  }

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData)
      toast.success('Product updated successfully')
    } else {
      createProduct(formData)
      toast.success('New product published to catalog')
    }
    setProducts(getProducts())
    setIsDrawerOpen(false)
  }

  // Category Tabs config with counts
  const categoryTabs = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      id: cat,
      label: cat,
      count:
        cat === 'All'
          ? products.length
          : products.filter((p) => p.category === cat).length,
    }))
  }, [products])

  // Table columns definition for List View
  const tableColumns = useMemo(
    () => [
      {
        key: 'title',
        label: 'Product',
        render: (_, product) => (
          <div className="flex items-center gap-3">
            <img
              src={
                product.images?.[0] ||
                'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&h=120&fit=crop&auto=format&q=80'
              }
              alt={product.title}
              className="h-10 w-10 shrink-0 rounded-xl border border-border object-cover"
            />
            <div className="min-w-0">
              <div className="font-bold text-foreground text-sm line-clamp-1 font-heading">
                {product.title}
              </div>
              <div className="text-[11px] text-muted-foreground line-clamp-1">
                {product.variants?.length > 0
                  ? `${product.variants.length} variants (${product.variants.map((v) => v.name).join(', ')})`
                  : product.subtitle || 'Standard item'}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'sku',
        label: 'SKU & Category',
        render: (_, product) => (
          <div>
            <span className="font-mono text-xs text-foreground">
              {product.sku}
            </span>
            <div className="text-[11px] text-muted-foreground">
              {product.category}
            </div>
          </div>
        ),
      },
      {
        key: 'price',
        label: 'Price & Margin',
        render: (_, product) => {
          const profit = product.costPerItem
            ? product.price - product.costPerItem
            : null
          const margin = profit
            ? Math.round((profit / product.price) * 100)
            : null

          return (
            <div>
              <div className="font-bold text-foreground font-heading">
                {formatPrice(product.price)}
              </div>
              {margin !== null && (
                <div className="text-[11px] text-[var(--success)] font-medium">
                  {margin}% margin
                </div>
              )}
            </div>
          )
        },
      },
      {
        key: 'stock',
        label: 'Inventory',
        render: (_, product) => (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => handleAdjustStock(product.id, -1, e)}
              className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              -
            </button>
            <span
              className={`min-w-7 text-center font-bold ${
                product.stock === 0
                  ? 'text-destructive'
                  : product.stock < 5
                  ? 'text-[var(--warning)]'
                  : 'text-foreground'
              }`}
            >
              {product.stock}
            </span>
            <button
              type="button"
              onClick={(e) => handleAdjustStock(product.id, 1, e)}
              className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              +
            </button>
          </div>
        ),
      },
      {
        key: 'status',
        label: 'Status',
        render: (_, product) => (
          <StatusBadge
            status={product.status === 'active' ? 'active' : 'draft'}
            size="sm"
          />
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        className: 'text-right',
        render: (_, product) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => handleOpenEditDrawer(product)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              title="Edit Product"
            >
              <Edit3 size={15} />
            </button>
            <button
              type="button"
              onClick={(e) => handleDuplicate(product.id, e)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              title="Duplicate"
            >
              <Copy size={15} />
            </button>
            <button
              type="button"
              onClick={() => setDeleteTarget(product)}
              className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"
              title="Delete Product"
            >
              <Trash2 size={15} />
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
        title="Products"
        subtitle="Manage your inventory, pricing, variants, and storefront visibility."
        actions={
          <button
            type="button"
            onClick={handleOpenCreateDrawer}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-150 hover:shadow-md hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Product</span>
          </button>
        }
      />

      {/* ── 1. Top KPI Summary Strip using StatCard ─────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total Products"
          value={stats.total}
          badge={`${stats.active} live`}
          period="Catalog size"
          icon={Package}
        />
        <StatCard
          label="Total Units in Stock"
          value={stats.totalStock}
          period="Available inventory"
        />
        <StatCard
          label="Low Stock Alerts"
          value={stats.lowStock}
          badge={stats.lowStock > 0 ? 'Restock' : undefined}
          period="Items < 5 units"
        />
        <StatCard
          label="Inventory Value"
          value={`₨ ${stats.totalValue.toLocaleString()}`}
          period="Retail volume"
        />
      </div>

      {/* ── 2. Category & Stock Filter Tabs ─────────────────────────── */}
      <div className="space-y-3">
        {/* Category Pills */}
        <FilterTabs
          tabs={categoryTabs}
          activeTab={selectedCategory}
          onSelectTab={setSelectedCategory}
          variant="pills"
        />

        {/* Search, Stock Filter & View Mode Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
          {/* Stock Filter Underline Tabs */}
          <FilterTabs
            tabs={STOCK_TABS}
            activeTab={stockFilter}
            onSelectTab={setStockFilter}
            variant="underline"
          />

          {/* Search & View Switcher */}
          <div className="flex items-center gap-2.5">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title, SKU…"
              className="w-full sm:w-60"
            />

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-border bg-card p-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Product Presentation (Visual Grid vs. DataTable) ─────── */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          description={
            searchQuery || selectedCategory !== 'All' || stockFilter !== 'all'
              ? 'Try resetting your search query or filters.'
              : 'Your store has no products yet. Add your first item to start selling.'
          }
          actionLabel={
            searchQuery || selectedCategory !== 'All' || stockFilter !== 'all'
              ? 'Reset Filters'
              : 'Add First Product'
          }
          onAction={() => {
            if (
              searchQuery ||
              selectedCategory !== 'All' ||
              stockFilter !== 'all'
            ) {
              setSearchQuery('')
              setSelectedCategory('All')
              setStockFilter('all')
            } else {
              handleOpenCreateDrawer()
            }
          }}
        />
      ) : viewMode === 'grid' ? (
        /* Visual Grid using reusable ProductCard */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleOpenEditDrawer}
              onDelete={() => setDeleteTarget(product)}
              onToggleStatus={handleToggleStatus}
              onAdjustStock={handleAdjustStock}
              onDuplicate={(e) => handleDuplicate(product.id, e)}
            />
          ))}
        </div>
      ) : (
        /* Dense List using reusable DataTable */
        <DataTable
          columns={tableColumns}
          data={filteredProducts}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* ── 4. Slide-Over "Add / Edit Product" Drawer ────────────────── */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        subtitle={
          editingProduct
            ? 'Update product pricing, inventory, and imagery.'
            : 'Add a new listing to your live storefront.'
        }
        size="xl"
      >
        <ProductDrawerForm
          initialData={editingProduct}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveProduct}
        />
      </Drawer>

      {/* ── 5. Reusable ConfirmDialog for Deletion ───────────────────── */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This will permanently remove it from your live store.`}
        confirmLabel="Delete Product"
        variant="danger"
      />
    </div>
  )
}

/**
 * Product Form Content for the Drawer
 */
const ProductDrawerForm = ({ initialData, onClose, onSave }) => {
  const isEditing = !!initialData

  const [title, setTitle] = useState(initialData?.title || '')
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '')
  const [category, setCategory] = useState(initialData?.category || 'Apparel')
  const [price, setPrice] = useState(initialData?.price || '')
  const [compareAtPrice, setCompareAtPrice] = useState(
    initialData?.compareAtPrice || ''
  )
  const [costPerItem, setCostPerItem] = useState(initialData?.costPerItem || '')
  const [stock, setStock] = useState(initialData?.stock ?? 10)
  const [sku, setSku] = useState(initialData?.sku || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [status, setStatus] = useState(initialData?.status || 'active')
  const [images, setImages] = useState(
    initialData?.images || [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=700&fit=crop&auto=format&q=80',
    ]
  )
  const [variants, setVariants] = useState(
    initialData?.variants || [
      { name: 'Small', stock: 3 },
      { name: 'Medium', stock: 4 },
      { name: 'Large', stock: 3 },
    ]
  )

  // Margins
  const numPrice = Number(price) || 0
  const numCost = Number(costPerItem) || 0
  const profit = numPrice > 0 && numCost > 0 ? numPrice - numCost : null
  const margin = profit ? Math.round((profit / numPrice) * 100) : null

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { name: 'New Size / Color', stock: 5 }])
  }

  const handleUpdateVariant = (index, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    )
  }

  const handleRemoveVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !price) return

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      category,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      costPerItem: costPerItem ? Number(costPerItem) : null,
      stock: Number(stock),
      sku: sku.trim(),
      description: description.trim(),
      status,
      images,
      variants,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo Uploader using ImageUpload Component */}
      <ImageUpload
        images={images}
        onChange={setImages}
        maxImages={6}
        label="Product Photos"
        helper="First image acts as your primary storefront cover."
      />

      {/* General Details with FormField */}
      <div className="space-y-3">
        <FormField label="Product Title" required>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Oversized Heavyweight Cotton Tee"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>

        <FormField label="Subtitle / Materials" optional>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g. 240 GSM 100% Organic Raw Cotton"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="SKU Code" optional>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="e.g. STL-APP-001"
              className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring font-mono"
            />
          </FormField>
        </div>

        <FormField label="Description" optional>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe product details, fit, and sizing advice…"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring resize-none"
          />
        </FormField>
      </div>

      {/* Pricing & Financial Margins */}
      <div className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Pricing & Margin Analysis
          </span>
          {margin !== null && (
            <span className="text-xs font-bold text-[var(--success)]">
              {margin}% Margin ({formatPrice(profit)} Profit)
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label={`Price (${currencySymbol})`} required>
            <input
              type="number"
              required
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="3200"
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs sm:text-sm font-bold text-foreground focus-visible:outline-2 focus-visible:outline-ring font-heading"
            />
          </FormField>

          <FormField label={`Compare (${currencySymbol})`} optional>
            <input
              type="number"
              min="0"
              value={compareAtPrice}
              onChange={(e) => setCompareAtPrice(e.target.value)}
              placeholder="3800"
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
          </FormField>

          <FormField label={`Cost / Item (${currencySymbol})`} optional>
            <input
              type="number"
              min="0"
              value={costPerItem}
              onChange={(e) => setCostPerItem(e.target.value)}
              placeholder="1400"
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
          </FormField>
        </div>
      </div>

      {/* Inventory & Status */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Total Stock Units">
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm font-bold text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </FormField>

        <FormField label="Store Visibility">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs sm:text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="active">Active (Visible)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </FormField>
      </div>

      {/* Variants Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Variants (Sizes / Colors)
          </label>
          <button
            type="button"
            onClick={handleAddVariant}
            className="text-xs font-semibold text-primary hover:underline"
          >
            + Add Option
          </button>
        </div>

        <div className="space-y-2">
          {variants.map((v, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={v.name}
                onChange={(e) =>
                  handleUpdateVariant(idx, 'name', e.target.value)
                }
                placeholder="Variant name (e.g. Small / Olive)"
                className="flex-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
              <input
                type="number"
                min="0"
                value={v.stock}
                onChange={(e) =>
                  handleUpdateVariant(idx, 'stock', Number(e.target.value))
                }
                placeholder="Stock"
                className="w-20 rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring font-mono text-center"
              />
              <button
                type="button"
                onClick={() => handleRemoveVariant(idx)}
                className="p-1.5 text-muted-foreground hover:text-destructive"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Storefront URL Preview */}
      <div className="rounded-xl border border-border bg-card p-3 text-xs space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Storefront Preview URL
        </span>
        <div className="font-mono text-primary truncate">
          stallio.shop/denzen-thrift/
          {title
            ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            : 'product-slug'}
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border sticky bottom-0 bg-card py-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0"
        >
          {isEditing ? 'Save Changes' : 'Publish Product'}
        </button>
      </div>
    </form>
  )
}

export default Products
