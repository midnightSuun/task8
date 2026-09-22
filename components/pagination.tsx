import Link from "next/link"

type Props = {
  page: number
  limit: number
  totalPages: number
  path: string
  search?: string
}

type PageItem = number | "ellipsis"

type ChevronProps = {
  direction: "left" | "right"
}

const getVisiblePages = (page: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const visible = new Set<number>([1, totalPages, page])

  if (page > 1) visible.add(page - 1)
  if (page < totalPages) visible.add(page + 1)

  if (page <= 3) {
    visible.add(2)
    visible.add(3)
    visible.add(4)
  }

  if (page >= totalPages - 2) {
    visible.add(totalPages - 1)
    visible.add(totalPages - 2)
    visible.add(totalPages - 3)
  }

  const sorted = [...visible]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((left, right) => left - right)

  return sorted.flatMap((value, index) => {
    const previous = sorted[index - 1]

    if (index > 0 && value - previous > 1) {
      return ["ellipsis", value]
    }

    return [value]
  })
}

const Chevron = ({ direction }: ChevronProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="size-4"
  >
    {direction === "left" ? (
      <path
        fillRule="evenodd"
        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    )}
  </svg>
)

const segmentClassName =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1.5 border-l border-zinc-200 px-3 text-sm font-medium transition-colors first:border-l-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:border-zinc-700"

export const Pagination = ({
  page,
  limit,
  totalPages,
  path,
  search = "",
}: Props) => {
  if (totalPages < 1) return null

  const pages = getVisiblePages(page, totalPages)

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams({
      page: String(nextPage),
      limit: String(limit),
    })

    if (search) params.set("search", search)

    return `${path}?${params.toString()}`
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-4 sm:flex-row dark:border-zinc-800"
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Page{" "}
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {page}
        </span>
        <span className="mx-1.5 text-zinc-300 dark:text-zinc-600">/</span>
        {totalPages}
      </p>

      <div className="inline-flex overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {page > 1 ? (
          <Link
            href={buildHref(page - 1)}
            aria-label="Previous page"
            className={`${segmentClassName} text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800`}
          >
            <Chevron direction="left" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={`${segmentClassName} cursor-not-allowed text-zinc-300 dark:text-zinc-600`}
          >
            <Chevron direction="left" />
            <span className="hidden sm:inline">Previous</span>
          </span>
        )}

        {pages.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`${segmentClassName} cursor-default text-zinc-400 dark:text-zinc-500`}
              >
                …
              </span>
            )
          }

          const isCurrent = item === page

          if (isCurrent) {
            return (
              <span
                key={item}
                aria-current="page"
                className={`${segmentClassName} border-l-blue-500 bg-blue-500 font-semibold text-white`}
              >
                {item}
              </span>
            )
          }

          return (
            <Link
              key={item}
              href={buildHref(item)}
              aria-label={`Page ${item}`}
              className={`${segmentClassName} text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800`}
            >
              {item}
            </Link>
          )
        })}

        {page < totalPages ? (
          <Link
            href={buildHref(page + 1)}
            aria-label="Next page"
            className={`${segmentClassName} text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800`}
          >
            <span className="hidden sm:inline">Next</span>
            <Chevron direction="right" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={`${segmentClassName} cursor-not-allowed text-zinc-300 dark:text-zinc-600`}
          >
            <span className="hidden sm:inline">Next</span>
            <Chevron direction="right" />
          </span>
        )}
      </div>
    </nav>
  )
}
