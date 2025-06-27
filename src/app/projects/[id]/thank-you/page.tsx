import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { ThankYouForm } from '@/components/projects/ThankYouForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ThankYouPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  // In a real app, you'd protect this route to ensure only the project creator can access it.
  // For now, we'll assume access is granted.

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="mb-4">
            <Link href={`/projects/${project.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {project.name}
            </Link>
        </Button>
        <ThankYouForm projectId={project.id} />
      </div>
    </div>
  );
}
