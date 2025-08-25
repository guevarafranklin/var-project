import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

type User = {
    id: number;
    full_name: string;
    position?: string | null;
    phone?: string | null;
    country?: string | null;
    email: string;
};

export default function UsersIndex({ users }: { users: User[] }) {
    const { data, setData, post, processing, reset } = useForm({
        full_name: '',
        position: '',
        phone: '',
        country: '',
        email: '',
        password: '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Users', href: '/admin/users' }]}> 
            <Head title="Users" />
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <form onSubmit={(e) => { e.preventDefault(); post('/admin/users', { onSuccess: () => reset() }); }} className="space-y-2 border rounded p-4">
                    <div className="font-semibold">Create user</div>
                    <input className="input" placeholder="Full name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />
                    <input className="input" placeholder="Position" value={data.position} onChange={(e) => setData('position', e.target.value)} />
                    <input className="input" placeholder="Phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                    <input className="input" placeholder="Country" value={data.country} onChange={(e) => setData('country', e.target.value)} />
                    <input className="input" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    <input className="input" type="password" placeholder="Password (optional)" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                    <button className="btn" disabled={processing}>Create</button>
                </form>
                <div className="space-y-2">
                    <div className="font-semibold">Users</div>
                    <table className="min-w-full text-sm border rounded">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Position</th>
                                <th className="p-2 text-left">Phone</th>
                                <th className="p-2 text-left">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-2">{u.full_name}</td>
                                    <td className="p-2">{u.email}</td>
                                    <td className="p-2">{u.position}</td>
                                    <td className="p-2">{u.phone}</td>
                                    <td className="p-2">{u.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
