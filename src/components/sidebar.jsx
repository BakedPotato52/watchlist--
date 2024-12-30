import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Compass, Library, History, PlaySquare, Clock, ThumbsUp, Film, Gamepad, Music2, Newspaper, Trophy, Flame, ShoppingBag } from 'lucide-react'

export function Sidebar({ className, isCollapsed = false }) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4 border-left border-gray-200">
                <div className="px-3 py-2 divide-y divide-gray-200">
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <Home className="mr-2 h-4 w-4" />
                            {!isCollapsed && "Home"}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Compass className="mr-2 h-4 w-4" />
                            {!isCollapsed && "Explore"}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Library className="mr-2 h-4 w-4" />
                            {!isCollapsed && "Library"}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <History className="mr-2 h-4 w-4" />
                            {!isCollapsed && "History"}
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        {!isCollapsed && "Categories"}
                    </h2>
                    <ScrollArea className="h-[300px] px-1">
                        <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start">
                                <Film className="mr-2 h-4 w-4" />
                                {!isCollapsed && "Movies"}
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Gamepad className="mr-2 h-4 w-4" />
                                {!isCollapsed && "Gaming"}
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Music2 className="mr-2 h-4 w-4" />
                                {!isCollapsed && "Music"}
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Newspaper className="mr-2 h-4 w-4" />
                                {!isCollapsed && "News"}
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Trophy className="mr-2 h-4 w-4" />
                                {!isCollapsed && "Sports"}
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Flame className="mr-2 h-4 w-4" />
                                {!isCollapsed && "Trending"}
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                {!isCollapsed && "Shopping"}
                            </Button>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

