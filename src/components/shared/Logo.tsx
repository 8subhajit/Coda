import Link from 'next/link';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-xl font-bold font-headline text-foreground hover:text-primary transition-colors',
        className
      )}
    >
      <Bot className="h-6 w-6 text-primary" />
      <span>Optimus</span>
    </Link>
  );
}
