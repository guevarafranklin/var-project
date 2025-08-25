import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function SbusIndex({ sbus }: { sbus: Array<{ id: number; name: string }> }) {
    const { data, setData, post, processing, reset } = useForm({ name: '' });
    const { props } = usePage<{ auth: { isAdmin: boolean } }>();
    const isAdmin = props.auth?.isAdmin;

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
                            <div className="flex items-center gap-3">
                                <div>{s.name}</div>
                                {isAdmin && (
                                    <>
                                        <Link as="button" method="put" href={`/admin/sbus/${s.id}`} data={{ name: prompt('New SBU name', s.name) ?? s.name }} className="text-amber-700 underline">Edit</Link>
                                        <Link as="button" method="delete" href={`/admin/sbus/${s.id}`} className="text-red-600 underline" onBefore={() => confirm('Delete this SBU and all its teams?')}>Delete</Link>
                                    </>
                                )}
                            </div>
                            <Link className="text-blue-600 underline" href={`/admin/sbus/${s.id}/teams`}>Manage teams</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
