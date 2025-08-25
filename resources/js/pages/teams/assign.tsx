import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

type User = { id: number; full_name?: string; name?: string; email: string; pivot?: { status: 'active' | 'in_transfer' } };
type Team = { id: number; name: string; sbu: { id: number; name: string } };

export default function TeamAssign({ team, assigned, available }: { team: Team; assigned: User[]; available: User[] }) {
    const { data, setData, post, processing, reset } = useForm<{ user_id: number | '' }>({ user_id: '' });

    return (
    <AppLayout breadcrumbs={[{ title: 'SBUs', href: '/admin/sbus' }, { title: team.sbu.name, href: `/admin/sbus/${team.sbu.id}/teams` }, { title: team.name, href: `/admin/sbus/${team.sbu.id}/teams/${team.id}` }]}> 
            <Head title={`Assign - ${team.name}`} />
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div className="font-semibold">Assigned users</div>
                    <ul className="space-y-2">
                        {assigned.map((u) => (
                            <li key={u.id} className="flex items-center justify-between border rounded p-2">
                                <div>
                                    <div className="font-medium">{u.full_name || u.name} <span className="text-xs text-gray-500">({u.email})</span></div>
                                    {u.pivot?.status === 'in_transfer' && <div className="text-xs text-amber-600">In transfer</div>}
                                </div>
                                <div className="flex items-center gap-3">
                                    {u.pivot?.status !== 'in_transfer' && (
                                        <Link as="button" method="post" href={`/admin/sbus/${team.sbu.id}/teams/${team.id}/transfer/${u.id}`} className="text-blue-600 underline">Transfer</Link>
                                    )}
                                    <Link as="button" method="delete" href={`/admin/sbus/${team.sbu.id}/teams/${team.id}/assign/${u.id}`} className="text-red-600 underline">Remove</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-3">
                    <div className="font-semibold">Available users</div>
                    <form onSubmit={(e) => { e.preventDefault(); post(`/admin/sbus/${team.sbu.id}/teams/${team.id}/assign`, { onSuccess: () => reset() }); }} className="flex gap-2">
                        <select className="border rounded px-2 py-1 min-w-64" value={data.user_id} onChange={(e) => setData('user_id', Number(e.target.value))}>
                            <option value="">Select user</option>
                            {available.map((u) => (
                                <option key={u.id} value={u.id}>{u.full_name || u.name} - {u.email}</option>
                            ))}
                        </select>
                        <button className="btn" disabled={processing || !data.user_id}>Assign</button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
