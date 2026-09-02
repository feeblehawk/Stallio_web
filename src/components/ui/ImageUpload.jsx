import React, { useState } from 'react'
import { UploadCloud, X, Image as ImageIcon, Link as LinkIcon, Plus } from 'lucide-react'

/**
 * ImageUpload
 * Photo uploader supporting drag-and-drop, image URL input, and multi-thumbnail management
 */
export const ImageUpload = ({
  images = [],
  onChange,
  maxImages = 6,
  label = 'Product Images',
  helper = 'Add up to 6 photos. The first photo is your storefront cover.',
}) => {
  const [urlInput, setUrlInput] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const handleAddUrl = () => {
    if (urlInput.trim() && images.length < maxImages) {
      onChange([...images, urlInput.trim()])
      setUrlInput('')
    }
  }

  const handleRemoveImage = (index) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validImages = files.filter((f) => f.type.startsWith('image/'))
    if (!validImages.length) return

    validImages.forEach((file) => {
      if (images.length >= maxImages) return
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange((prev) =>
            prev.length < maxImages ? [...prev, event.target.result] : prev
          )
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold text-foreground">{label}</label>
        <span className="text-[11px] text-muted-foreground">
          {images.length} / {maxImages} uploaded
        </span>
      </div>

      {/* Grid of existing photos */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl border border-border bg-muted overflow-hidden shadow-xs"
            >
              <img
                src={src}
                alt={`Uploaded ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {index === 0 && (
                <span className="absolute bottom-1.5 left-1.5 rounded-md bg-foreground/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-background backdrop-blur-xs">
                  Cover
                </span>
              )}

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                aria-label="Remove image"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          ))}

          {images.length < maxImages && (
            <label
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`flex flex-col items-center justify-center aspect-square rounded-2xl border border-dashed cursor-pointer transition-all ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-muted/30 hover:bg-muted/60'
              }`}
            >
              <Plus size={20} className="text-muted-foreground mb-1" />
              <span className="text-[10px] font-semibold text-muted-foreground">
                Add More
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}

      {/* Empty Dropzone */}
      {images.length === 0 && (
        <label
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[0.99]'
              : 'border-border bg-muted/20 hover:bg-muted/40'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
            <UploadCloud size={24} strokeWidth={2} />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-foreground font-heading">
            Click to upload or drag and drop
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            PNG, JPG, WebP up to 10MB
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      )}

      {/* Paste Image URL Fallback */}
      <div className="flex gap-2 pt-1">
        <div className="relative flex-1">
          <LinkIcon
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddUrl()
              }
            }}
            placeholder="Or paste public image URL…"
            className="w-full rounded-xl border border-border bg-card pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>
        <button
          type="button"
          onClick={handleAddUrl}
          disabled={!urlInput.trim() || images.length >= maxImages}
          className="rounded-xl border border-border bg-muted px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent disabled:opacity-50"
        >
          Add URL
        </button>
      </div>

      {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
    </div>
  )
}

export default ImageUpload
