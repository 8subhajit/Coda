import { ProjectForm } from '@/components/projects/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
            Launch Your Next <span className="text-primary">Big Idea</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fill out the form below to get your project in front of thousands of
            potential backers.
          </p>
        </div>
        <ProjectForm />
      </div>
    </div>
  );
}
