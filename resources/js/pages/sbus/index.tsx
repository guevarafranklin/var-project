import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function SbusIndex({ sbus }: { sbus: Array<{ id: number; name: string }> }) {
    const { data, setData, post, processing, reset } = useForm({ name: '' });

    return (
        <AppLayout breadcrumbs={[{ title: 'SBUs', href: '/admin/sbus' }]}> 
            <Head title="SBUs" />
            <div className="p-4 space-y-4">
                <form onSubmit={(e) => { e.preventDefault(); post('/admin/sbus', { onSuccess: () => reset() }); }} className="flex gap-2">
                    <input className="border px-2 py-1 rounded w-64" placeholder="New SBU name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <button className="btn" disabled={processing}>Create</button>
                </form>
                <ul className="space-y-2">
                    {sbus.map((s) => (
                        <li key={s.id} className="flex items-center justify-between border rounded p-2">
                            <div>{s.name}</div>
                            <Link className="text-blue-600 underline" href={`/admin/sbus/${s.id}/teams`}>Manage teams</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
