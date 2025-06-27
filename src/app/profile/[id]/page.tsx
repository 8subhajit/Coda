import { notFound } from 'next/navigation';
import Image from 'next/image';
import { users, projects, contributions } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectList } from '@/components/projects/ProjectList';
import { Github, Twitter, Linkedin, Mail, Computer } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  const createdProjects = projects.filter((p) => p.creatorId === user.id);
  const backedContributions = contributions.filter((c) => c.backerId === user.id);
  const backedProjectIds = new Set(backedContributions.map((c) => c.projectId));
  const backedProjects = projects.filter((p) => backedProjectIds.has(p.id));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="mb-8 bg-card/50">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          <Avatar className="h-32 w-32 text-5xl border-4 border-primary/50">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold font-headline">{user.name}</h1>
            <p className="text-muted-foreground mt-2 max-w-xl">{user.bio}</p>
            <div className="flex justify-center md:justify-start gap-3 mt-4">
              {user.githubUrl && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={user.githubUrl}>
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {user.twitterUrl && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={user.twitterUrl}>
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {user.linkedinUrl && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={user.linkedinUrl}>
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              )}
               <Button variant="outline" size="icon" asChild>
                  <Link href={`mailto:${user.name.replace(' ','').toLowerCase()}@email.com`}>
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="created">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="created">
            Created Projects ({createdProjects.length})
          </TabsTrigger>
          <TabsTrigger value="backed">
            Backed Projects ({backedProjects.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="created" className="mt-6">
          {createdProjects.length > 0 ? (
            <ProjectList projects={createdProjects} />
          ) : (
            <div className="text-center py-20 bg-card/50 border-dashed border-2 border-border/50 rounded-lg">
                <Computer size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-4">It looks like you haven't created any projects.</p>
                <Button asChild className="mt-4">
                    <Link href="/projects/new">Start Your First Project</Link>
                </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="backed" className="mt-6">
          {backedProjects.length > 0 ? (
            <ProjectList projects={backedProjects} />
          ) : (
             <div className="text-center py-20 bg-card/50 border-dashed border-2 border-border/50 rounded-lg">
                <Computer size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nothing Backed</h3>
                <p className="text-muted-foreground mb-4">Explore projects and support developers!</p>
                <Button asChild className="mt-4">
                    <Link href="/">Explore Projects</Link>
                </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
