<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sbu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SbuController extends Controller
{
    public function index()
    {
        return Inertia::render('sbus/index', [
            'sbus' => Sbu::query()->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);
        Sbu::create($data);
        return back()->with('success', 'SBU created');
    }

    public function update(Request $request, Sbu $sbu)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);
        $sbu->update($data);
        return back()->with('success', 'SBU updated');
    }

    public function destroy(Sbu $sbu)
    {
        $sbu->delete();
        return back()->with('success', 'SBU removed');
    }
}
