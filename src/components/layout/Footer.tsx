import { Logo } from '@/components/shared/Logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-transparent mt-20">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Optimus. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter />
            </Link>
            <Link
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
