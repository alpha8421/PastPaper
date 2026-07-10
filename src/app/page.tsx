import { HomeExplorer } from '@/components/HomeExplorer';
import { getSubjects } from '@/lib/catalog';

export default async function HomePage() {
  const subjects = await getSubjects();

  return <HomeExplorer initialSubjects={subjects} />;
}
