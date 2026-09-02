import React, { useState, useEffect, useMemo } from 'react'
import { LayoutGrid, Plus, Edit3, Trash2,Layers, Star, Package, } from 'lucide-react'
import {PageHeader, StatCard, Drawer, ConfirmDialog, FormField, SearchInput, ImageUpload, EmptyState, useToast,
} from '../../components/ui'
import { getCategories, createCategory, updateCategory, deleteCategory, toggleFeaturedCategory,
} from '../../services/categoryService'

export const Categories = () => {
  const toast = useToast()
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Drawer & Dialog states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return categories
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
    )
  }, [categories, searchQuery])

  const stats = useMemo(() => {
    const total = categories.length
    const featured = categories.filter((c) => c.isFeatured).length
    const totalItemsAssigned = categories.reduce(
      (sum, c) => sum + (c.itemCount || 0),
      0
    )
    return { total, featured, totalItemsAssigned }
  }, [categories])

  const handleOpenCreate = () => {
    setEditingCategory(null)
    setIsDrawerOpen(true)
  }

  const handleOpenEdit = (category) => {
    setEditingCategory(category)
    setIsDrawerOpen(true)
  }

  const handleToggleFeatured = (id, e) => {
    e?.stopPropagation()
    const updated = toggleFeaturedCategory(id)
    if (updated) {
      setCategories(getCategories())
      toast.success(
        updated.isFeatured
          ? `Pinned "${updated.name}" to storefront hero`
          : `Unpinned "${updated.name}"`
      )
    }
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteCategory(deleteTarget.id)
      setCategories(getCategories())
      setDeleteTarget(null)
      toast.success('Collection deleted')
    }
  }

  const handleSaveCategory = (data) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, data)
      toast.success('Collection updated')
    } else {
      createCategory(data)
      toast.success('New collection created')
    }
    setCategories(getCategories())
    setIsDrawerOpen(false)
  }

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <PageHeader
        title="Categories & Drops"
        subtitle="Organize your catalog into seasonal collections and featured storefront drops."
        actions={
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md transition-all"
          >
            <Plus size={15} />
            <span>Add Collection</span>
          </button>
        }
      />

      {/* ── 1. Top KPI Summary Strip ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Total Collections"
          value={stats.total}
          period="Organized categories"
          icon={Layers}
        />
        <StatCard
          label="Featured on Storefront"
          value={stats.featured}
          badge="Pinned"
          period="Shown on storefront home"
          icon={Star}
        />
        <StatCard
          label="Catalog Products Linked"
          value={stats.totalItemsAssigned}
          period="Total mapped products"
          icon={Package}
        />
      </div>

      {/* ── 2. Search & Controls Bar ─────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search categories & collections…"
          className="w-full sm:w-72"
        />
      </div>

      {/* ── 3. Categories Visual Grid ────────────────────────────────── */}
      {filteredCategories.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No collections found"
          description={
            searchQuery
              ? `No collection matching "${searchQuery}".`
              : 'Create your first seasonal drop or product collection.'
          }
          actionLabel={searchQuery ? 'Clear Search' : 'Add First Collection'}
          onAction={() => {
            if (searchQuery) setSearchQuery('')
            else handleOpenCreate()
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-200 hover:border-border/80 hover:shadow-md"
            >
              {/* Cover Banner */}
              <div className="relative aspect-16/9 w-full overflow-hidden bg-muted">
                <img
                  src={
                    cat.coverImage ||
                    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop&auto=format&q=80'
                  }
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Featured Star Badge */}
                {cat.isFeatured && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground backdrop-blur-md">
                    <Star size={11} className="fill-current" />
                    <span>Featured Drop</span>
                  </span>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(cat)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-foreground shadow-md transition-transform hover:scale-105"
                    title="Edit Collection"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleToggleFeatured(cat.id, e)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-md transition-transform hover:scale-105 ${
                      cat.isFeatured ? 'text-amber-500' : 'text-foreground'
                    }`}
                    title={cat.isFeatured ? 'Unpin' : 'Pin to Storefront'}
                  >
                    <Star size={15} className={cat.isFeatured ? 'fill-current' : ''} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(cat)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive text-destructive-foreground shadow-md transition-transform hover:scale-105"
                    title="Delete Collection"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-foreground font-heading line-clamp-1">
                      {cat.name}
                    </h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground shrink-0">
                      {cat.itemCount || 0} products
                    </span>
                  </div>
                  {cat.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-border/80 pt-3 text-[11px] text-muted-foreground">
                  <span className="font-mono text-primary truncate">
                    stallio.shop/store/{cat.slug}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(cat)}
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Manage →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 4. Slide-Over Category Drawer ───────────────────────────── */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingCategory ? 'Edit Collection' : 'Create Collection'}
        subtitle={
          editingCategory
            ? 'Update collection banner and storefront settings.'
            : 'Add a new seasonal drop or product category.'
        }
        size="md"
      >
        <CategoryDrawerForm
          initialData={editingCategory}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveCategory}
        />
      </Drawer>

      {/* ── 5. Delete Confirm Dialog ─────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Collection?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? Products inside this category will remain in your catalog.`}
        confirmLabel="Delete Collection"
        variant="danger"
      />
    </div>
  )
}

const CategoryDrawerForm = ({ initialData, onClose, onSave }) => {
  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false)
  const [images, setImages] = useState(
    initialData?.coverImage ? [initialData.coverImage] : []
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    onSave({
      name: name.trim(),
      slug:
        slug.trim() ||
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      description: description.trim(),
      isFeatured,
      coverImage:
        images[0] ||
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop&auto=format&q=80',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-xs">
      <ImageUpload
        images={images}
        onChange={setImages}
        maxImages={1}
        label="Collection Cover Banner"
        helper="Upload a horizontal 16:9 banner image."
      />

      <FormField label="Collection Name" required>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (!initialData) {
              setSlug(
                e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)+/g, '')
              )
            }
          }}
          placeholder="e.g. Summer Drop ‘26"
          className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </FormField>

      <FormField label="URL Slug" optional helper="Your storefront collection link">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="summer-drop-26"
          className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground font-mono focus-visible:outline-2 focus-visible:outline-ring"
        />
      </FormField>

      <FormField label="Description" optional>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description for mobile shoppers…"
          className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring resize-none"
        />
      </FormField>

      {/* Featured Toggle Card */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-3.5">
        <div>
          <span className="font-bold text-foreground text-xs block">
            Pin as Featured Drop
          </span>
          <span className="text-[11px] text-muted-foreground">
            Display prominently on your store home page
          </span>
        </div>
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="h-4 w-4 rounded-md accent-primary"
        />
      </div>

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
          {initialData ? 'Save Changes' : 'Create Collection'}
        </button>
      </div>
    </form>
  )
}

export default Categories
