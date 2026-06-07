'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * Lazy YouTube embed — shows thumbnail until clicked, then loads iframe.
 * Avoids blocking LCP and saves ~500 KB of YouTube JS until user opts in.
 *
 * Reference: paulirish.com/lite-youtube-embed pattern.
 */
export function LiteYoutube({
  videoId,
  title,
  className = '',
}: {
  videoId: string
  title: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className={`h-full w-full border-0 ${className}`}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Přehrát video: ${title}`}
      className={`group relative h-full w-full overflow-hidden bg-ink-deep ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-2xl shadow-brand/50 transition-transform group-hover:scale-110 md:h-16 md:w-16">
          <Play className="ml-0.5 h-5 w-5 fill-current md:h-6 md:w-6" />
        </div>
      </div>
    </button>
  )
}
