import { ProjectList } from '@/components/projects/ProjectList';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const sortedProjects = [...projects].sort(
    (a, b) =>
      b.currentFunding / b.fundingGoal - a.currentFunding / a.fundingGoal
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-20 md:py-32">
        <h1 className="font-headline text-5xl md:text-8xl font-bold mb-6 tracking-tighter">
          Bring Your Tech Ideas to <span className="text-primary">Life</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Optimus is the ultimate launchpad for developers. Get the funding you
          need to build innovative projects, supported by a passionate community.
        </p>
        <div className="mb-10 flex justify-center">
            <Image 
                src="https://placehold.co/700x400.png"
                width={700}
                height={400}
                alt="AI robot"
                data-ai-hint="robot technology"
                className="rounded-lg shadow-2xl shadow-primary/20"
            />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300">
            <Link href="/projects/new">
              Start a Project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#projects">Explore Projects</Link>
          </Button>
        </div>
      </section>

      <section id="projects" className="py-12">
        <h2 className="text-4xl font-bold font-headline mb-10 text-center">
          Trending Projects
        </h2>
        <ProjectList projects={sortedProjects} />
      </section>
    </div>
  );
}
