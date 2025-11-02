"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Youtube, Mail, BookOpen } from "lucide-react"

import { useProfile } from "@/hooks/useProfile"
import { useContent } from "@/hooks/useContent"
import { devLog } from '@/utils/devLogger';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ContentCard } from "@/components/ContentCard"
import { ProfileNavigation } from "@/components/ProfileNavigation"

const HomePage = () => {
  const [selectedTypes, setSelectedTypes] = useState([])

  const { profile, isLoading: profileLoading, error: profileError } = useProfile()
  const { content, isLoading: contentLoading, error: contentError } = useContent()

  devLog('HomePage: profile', profile);
  devLog('HomePage: content', content);

  if (profileLoading || contentLoading) {
    devLog('HomePage: Still loading');
    return <div>Loading...</div>
  }
  if (profileError || contentError) {
    devLog('HomePage: Error', profileError || contentError);
    return <div>Error: {profileError || contentError}</div>
  }
  if (!profile || !content || !Array.isArray(content.posts)) {
    devLog('HomePage: No data or invalid data format');
    return <div>No data found or invalid data format</div>
  }

  // Filter content based on selected types
  const filteredContent = selectedTypes.length > 0
    ? content.posts.filter(post => selectedTypes.includes(post.type))
    : content.posts

  // Sort by date
  const sortedContent = [...filteredContent].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  // Get all unique types including 'Product'
  const uniqueTypes = Array.from(new Set(content.posts.map(post => post.type)))

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ProfileNavigation profile={profile} />
      <header className="w-full flex justify-center">
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl">
          {/* Left side - Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 shadow-lg border-4 border-white dark:border-gray-800">
              <AvatarImage src={profile.avatar} alt={profile.Name} />
              <AvatarFallback>{profile.Name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Right side - Info and Links */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold">{profile.Name}</h1>
            <p className="text-xl text-muted-foreground">
              {profile.Description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {profile.Github && (
                <Link href={profile.Github}>
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
              )}
              {profile.LinkedIn && (
                <Link href={profile.LinkedIn}>
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
              )}
              {profile.Youtube && (
                <Link href={profile.Youtube}>
                  <Button variant="ghost" size="icon">
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </Button>
                </Link>
              )}
              {profile.Blog && (
                <Link href={profile.Blog}>
                  <Button variant="ghost" size="icon">
                    <BookOpen className="h-5 w-5" />
                    <span className="sr-only">Blog</span>
                  </Button>
                </Link>
              )}
              {profile.Email && (
                <Link href={`mailto:${profile.Email}`}>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className="mx-auto" style={{ width: '70%' }}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">Content</h2>
              <div className="space-x-2">
                {uniqueTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedTypes.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedContent.map(post => (
              <ContentCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
