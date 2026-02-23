import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { projectsData } from '@/data/projectsData';
import ProjectClient from './ProjectClient';

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const projectId = parseInt(id) || 1;

    // Find the project data
    const project = projectsData.find(p => p.id === projectId);

    if (!project) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-medium tracking-tight mb-4">Project Not Found</h1>
                        <Link href="/#portfolio" className="underline hover:opacity-70 transition-opacity">Return to Portfolio</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white text-black pt-48 md:pt-56 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1800px] mx-auto">
                    <BackButton />

                    <ProjectClient project={project} />
                </div>
            </main>
            <Footer theme="dark" />
        </>
    );
}
