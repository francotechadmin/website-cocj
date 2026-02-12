"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo and brand */}
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/uploads/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="hidden md:block font-bold text-base text-gray-900 dark:text-white transition-colors">
                {header.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {header.nav!.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item!.href!}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200">
                      {item!.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? 'Close Menu' : 'Open Menu'}
              className="relative z-20 p-2 lg:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 size-6 duration-200" />
              <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="in-data-[state=active]:block lg:hidden hidden pb-6">
            <ul className="space-y-1">
              {header.nav!.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item!.href!}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                    onClick={() => setMenuState(false)}>
                    {item!.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
