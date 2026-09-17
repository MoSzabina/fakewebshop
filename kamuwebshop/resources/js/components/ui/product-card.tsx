import { Link, router } from '@inertiajs/react'
import { ShoppingCart } from 'lucide-react'
import { useTranslations } from '@/hooks/useTranslation';

interface ProductCardProps {
  slug: string
  category: string
  name: string
  price: string
  image?: string
  showCartButton?: boolean
}

function ProductCard({
  slug,
  category,
  name,
  price,
  image,
  showCartButton = true,
}: ProductCardProps) {
  const { __ } = useTranslations();

  return (
    <div className="overflow-hidden rounded border border-rule bg-white transition-[box-shadow] duration-150 hover:shadow-[0_4px_20px_rgba(28,25,23,0.09)]">
      <Link href={`/products/${slug}`} className="block">
        <div className="flex items-center justify-center bg-sage-light">
          {image ? (
            <img
              src={image?.startsWith('/') ? image : `/storage/images/${image}`}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[11px] font-medium tracking-[0.08em] text-sage">
              PRODUCT IMAGE
            </span>
          )}
        </div>
      </Link>

      <div className="px-[20px] py-[18px]">
        <div className="mb-[6px] text-[11px] font-medium tracking-[0.08em] text-sage">
          {__(category)}
        </div>

        <div className="mb-[4px] text-[15px] font-medium text-ink">
          {__(name)}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[14px] text-ink-mid">
            {price}
          </div>

          {showCartButton && (
            <button
              type="button"
              onClick={() =>
                router.post(`/cart/add/${slug}`, {}, {
                  preserveScroll: true,
                })
              }
              className="flex size-8 items-center justify-center rounded-[3px] border border-rule text-[18px] font-light text-ink transition-colors hover:bg-sage-light"
              aria-label={__("Add to cart")}
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ProductCard }
