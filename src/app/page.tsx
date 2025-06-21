import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, MapPin, Infinity, Phone, Twitter } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Infinity className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline tracking-tight">Connectify</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We are Connectify, a team dedicated to creating seamless and intuitive digital experiences. Our passion is to connect people and businesses through beautifully designed and highly functional web applications.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <a href="mailto:contact@connectify.com" className="hover:text-primary transition-colors">contact@connectify.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>+1 (234) 567-890</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>123 Connectify Lane, Webville, USA</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 border-t border-border/50 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Connectify. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
