<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sbu;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index(Sbu $sbu)
    {
        $sbu->load('teams');
        return Inertia::render('teams/index', [
            'sbu' => $sbu,
            'teams' => $sbu->teams()->latest()->get(),
        ]);
    }

    public function store(Request $request, Sbu $sbu)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);
        $sbu->teams()->create($data);
        return back()->with('success', 'Team created');
    }

    public function show(Sbu $sbu, Team $team)
    {
        // Ensure the team belongs to the given SBU
        abort_if($team->sbu_id !== $sbu->id, 404);

        $assigned = $team->users()->withPivot('status')->get();

        // Available: users who are not actively assigned to any team and not already attached to this team
        $available = User::query()
            ->whereDoesntHave('teams', function ($q) {
                $q->where('team_user.status', 'active');
            })
            ->whereDoesntHave('teams', function ($q) use ($team) {
                $q->where('teams.id', $team->id);
            })
            ->get();

        return Inertia::render('teams/assign', [
            'team' => $team->load('sbu'),
            'assigned' => $assigned,
            'available' => $available,
        ]);
    }

    public function update(Request $request, Team $team)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);
        $team->update($data);
        return back()->with('success', 'Team updated');
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return back()->with('success', 'Team removed');
    }
}
