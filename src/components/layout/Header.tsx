'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Explore' },
  { href: '/projects/new', label: 'Start a Project' },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
      <div className="container flex h-20 items-center">
        <div className="mr-auto md:mr-4 flex items-center">
          <div className="md:hidden mr-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 bg-background/95 backdrop-blur-lg">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border/50">
                    <Logo />
                  </div>
                  <nav className="flex flex-col gap-1 p-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'text-lg font-medium rounded-md px-3 py-2 transition-colors',
                          pathname === link.href
                            ? 'bg-secondary text-foreground'
                            : 'text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t border-border/50">
                    <Button asChild className="w-full">
                      <Link href="/profile/1">Sign In</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex">
            <Logo />
          </div>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-2 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-md transition-colors',
                pathname === link.href
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-4 ml-auto">
          <Button asChild className="hidden md:inline-flex" variant="outline">
            <Link href="/profile/1">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
