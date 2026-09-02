import { Link } from '@inertiajs/react'

interface ProductCardProps {
  slug: string
  category: string
  name: string
  price: string
  image?: string
}

function ProductCard({
  slug,
  category,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="block overflow-hidden rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] transition-[box-shadow] duration-150 hover:shadow-[0_4px_20px_rgba(28,25,23,0.09)]"
    >
      <div className="flex h-[160px] items-center justify-center bg-[var(--color-sage-light)]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[11px] font-medium tracking-[0.08em] text-[var(--color-sage)]">
            PRODUCT IMAGE
          </span>
        )}
      </div>

      <div className="px-[20px] py-[18px]">
        <div className="mb-[6px] text-[11px] font-medium tracking-[0.08em] text-[var(--color-sage)]">
          {category}
        </div>

        <div className="mb-[4px] text-[15px] font-medium text-[var(--color-ink)]">
          {name}
        </div>

        <div className="text-[14px] text-[var(--color-ink-mid)]">
          {price}
        </div>
      </div>
    </Link>
  )
}

export { ProductCard }
