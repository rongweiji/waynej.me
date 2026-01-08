import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export function ContentCard({ post }) {
  // Truncate description to make it concise (first 150 characters)
  const conciseDescription = post.description?.length > 150
    ? post.description.substring(0, 150) + "..."
    : post.description

  return (
    <Card className="overflow-hidden w-full transition-all duration-300 hover:shadow-lg">
      {/* Image Section with Overlay */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-100 dark:bg-gray-800">
        {post.gif ? (
          <img
            src={post.gif}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <Image
            src={post.image || '/placeholder-image.jpg'}
            alt={post.title}
            layout="fill"
            objectFit="contain"
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Title and Badge Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <CardTitle className="text-xl font-bold text-white leading-tight">
            {post.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white backdrop-blur-sm text-xs">
              {post.type}
            </Badge>
            <span className="text-xs text-white/90">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {conciseDescription}
        </p>

        {/* Tags */}
        {post.tag && post.tag.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tag.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Links */}
        {post.urls && Object.keys(post.urls).length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {Object.entries(post.urls).map(([key, url]) => (
              <Link
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black dark:text-white hover:text-white dark:hover:text-black border border-black dark:border-white rounded-md hover:bg-black dark:hover:bg-white transition-colors"
              >
                {key}
                <ExternalLink className="h-3 w-3" />
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
