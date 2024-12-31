import { Home, Compass, Library, History, Film, Gamepad, Music2, Newspaper, Trophy, Flame, ShoppingBag } from 'lucide-react'

export const menuItems = [
    {
        title: 'Main',
        items: [
            {
                label: 'Home',
                icon: Home,
                href: '/'
            },
            {
                label: 'Explore',
                icon: Compass,
                href: '/explore'
            },
            {
                label: 'Library',
                icon: Library,
                href: '/library'
            },
            {
                label: 'History',
                icon: History,
                href: '/history'
            },
        ],
    },
    {
        title: 'Categories',
        items: [
            {
                label: 'Movies',
                icon: Film,
                href: '/movies'
            },
            {
                label: 'Gaming',
                icon: Gamepad,
                href: '/gaming'
            },
            {
                label: 'Music',
                icon: Music2,
                href: '/music'
            },
            {
                label: 'News',
                icon: Newspaper,
                href: '/news'
            },
            {
                label: 'Sports',
                icon: Trophy,
                href: '/sports'
            },
            {
                label: 'Trending',
                icon: Flame,
                href: '/trending'
            },
            {
                label: 'Shopping',
                icon: ShoppingBag,
                href: '/shopping'
            },
        ],
    },
]
