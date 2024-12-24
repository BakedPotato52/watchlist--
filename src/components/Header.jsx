'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu, User, ArrowLeft, Mic } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {isSearching ? (
          <form onSubmit={handleSearch} className="flex items-center flex-1 gap-2 px-2">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setIsSearching(false)}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search YouTube"
                className="w-full pl-4 pr-8 h-10 bg-secondary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Mic className="h-5 w-5" />
              <span className="sr-only">Voice search</span>
            </Button>
          </form>
        ) : (
          <>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <Link href="/" className="flex items-center space-x-2 ml-2">
                <span className="font-bold">YouTube Clone</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => setIsSearching(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <form onSubmit={handleSearch} className="hidden sm:flex items-center max-w-md mx-4">
                <div className="relative w-full">
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-4 pr-10 w-full bg-secondary rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Mic className="h-5 w-5" />
                  <span className="sr-only">Voice search</span>
                </Button>
              </form>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

