'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu, User, ArrowLeft, Mic, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ConstState } from '../app/context/authProvider'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const searchInputRef = useRef(null)
  const router = useRouter()

  const { user, setUser } = ConstState()

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleVoiceSearch = () => {
    setIsListening(true)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        setIsListening(false)
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }
      recognition.onerror = () => {
        setIsListening(false)
      }
      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser.')
      setIsListening(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const handleLogout = () => {
    setUser(null)
    // Implement logout logic here (e.g., clear tokens, redirect to login page)
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
                ref={searchInputRef}
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={handleVoiceSearch}
              disabled={isListening}
            >
              <Mic className={`h-5 w-5 ${isListening ? 'text-red-500' : ''}`} />
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
                    ref={searchInputRef}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-10 top-1/2 transform -translate-y-1/2"
                      onClick={clearSearch}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={handleVoiceSearch}
                  disabled={isListening}
                >
                  <Mic className={`h-5 w-5 ${isListening ? 'text-red-500' : ''}`} />
                  <span className="sr-only">Voice search</span>
                </Button>
              </form>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => router.push('/signin')}>
                  <User className="h-5 w-5" />
                  <span className="sr-only">User account</span>
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      {(isSearching || searchQuery) && recentSearches.length > 0 && (
        <div className="container bg-background border-t">
          <ul className="py-2">
            {recentSearches.map((search, index) => (
              <li key={index} className="px-4 py-2 hover:bg-secondary cursor-pointer" onClick={() => setSearchQuery(search)}>
                <Search className="h-4 w-4 inline-block mr-2" />
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
