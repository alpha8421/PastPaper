import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Admin dashboard</p>
          <h1 className="text-3xl font-semibold">Bulk import and metadata correction</h1>
        </div>
        <Button variant="outline">Secure admin</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bulk import</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Provider adapter name" />
            <Input placeholder="Source directory or API endpoint" />
            <Button>Run synchronization</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Subject" />
            <Input placeholder="Topic" />
            <Input placeholder="Subtopic" />
            <Button variant="secondary">Save metadata</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
