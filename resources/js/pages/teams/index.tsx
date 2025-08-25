import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

type Team = { id: number; name: string };
type Sbu = { id: number; name: string };

export default function TeamsIndex({ sbu, teams }: { sbu: Sbu; teams: Team[] }) {
    const { data, setData, post, processing, reset } = useForm({ name: '' });
    return (
        <AppLayout breadcrumbs={[{ title: 'SBUs', href: '/admin/sbus' }, { title: sbu.name, href: `/admin/sbus/${sbu.id}/teams` }]}> 
            <Head title={`Teams - ${sbu.name}`} />
            <div className="p-4 space-y-4">
                <form onSubmit={(e) => { e.preventDefault(); post(`/admin/sbus/${sbu.id}/teams`, { onSuccess: () => reset() }); }} className="flex gap-2">
                    <input className="border px-2 py-1 rounded w-64" placeholder="New team name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <button className="btn" disabled={processing}>Create</button>
                </form>
                <ul className="space-y-2">
                    {teams.map((t) => (
                        <li key={t.id} className="flex items-center justify-between border rounded p-2">
                            <div>{t.name}</div>
                            <div className="flex gap-3">
                                <Link className="text-blue-600 underline" href={`/admin/sbus/${sbu.id}/teams/${t.id}`}>Open</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
