'use client'

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { menuItems } from "./sidebarItems"

export function Sidebar({ className, isCollapsed = false }) {
    const [open, setOpen] = useState(false)

    const renderMenuItem = (item, index) => {
        const IconComponent = item.icon
        return (
            <li key={`mobile-item-${item.label}-${index}`} className={index >= 3 ? "lg:hidden" : ""}>
                <Link
                    href={item.href || '#'}
                    className="flex flex-col items-center justify-center gap-1 p-2 text-gray-500 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 rounded-md"
                    aria-label={item.label}
                    onClick={() => setOpen(false)}
                >
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                    <span className="text-xs">{item.label}</span>
                </Link>
            </li>
        )
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={cn("pb-12 hidden sm:block", className)}>
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">

                        <div className="space-y-1">
                            {menuItems.map((section, sectionIndex) => (
                                <div key={`section-${section.title}-${sectionIndex}`} className="mb-6">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-muted-foreground">
                                        {section.title}
                                    </h2>
                                    <ScrollArea className="px-1">
                                        <div className="space-y-1">
                                            {section.items.map((item, itemIndex) => {
                                                const IconComponent = item.icon
                                                return (
                                                    <Button
                                                        key={`desktop-item-${item.label}-${itemIndex}`}
                                                        variant="ghost"
                                                        className="w-full justify-start"
                                                        asChild
                                                    >
                                                        <Link href={item.href || '#'}>
                                                            <IconComponent className="mr-2 h-4 w-4" />
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    </ScrollArea>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50" aria-label="Mobile Navigation">
                <ul className="flex justify-around items-center h-16">
                    {menuItems.flatMap(section => section.items).slice(0, 3).map((item, index) => renderMenuItem(item, index))}
                    <li key="more-options">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="More options" className="w-full flex h-full">
                                    <div className="flex flex-col items-center justify-center gap-1 p-2 text-gray-500 transition-colors duration-200">
                                        <MoreHorizontal className="w-6 h-6" />
                                        <span className="text-xs mt-1">More</span>
                                    </div>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80dvh]">
                                <nav aria-label="More Navigation Options">
                                    <ul className="grid grid-cols-3 gap-4 pt-4">
                                        {menuItems.flatMap(section => section.items).slice(3).map((item, index) => renderMenuItem(item, index + 3))}
                                    </ul>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </li>
                </ul>
            </nav>
        </>
    )
}

