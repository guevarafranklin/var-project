<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TeamAssignmentController extends Controller
{
    public function show(Team $team)
    {
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

    public function assign(Request $request, Team $team)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);
        // Do not allow assignment if user has any active team
        $hasActive = User::where('id', $data['user_id'])
            ->whereHas('teams', function ($q) {
                $q->where('team_user.status', 'active');
            })->exists();
        if ($hasActive) {
            return back()->with('error', 'User is already assigned to another team. Mark them in transfer first.');
        }

        // Assign to this team
        $team->users()->syncWithoutDetaching([$data['user_id'] => ['status' => 'active']]);

        // Remove previous in_transfer record(s) from other teams
    DB::table('team_user')
            ->where('user_id', $data['user_id'])
            ->where('team_id', '!=', $team->id)
            ->where('status', 'in_transfer')
            ->delete();
        return back()->with('success', 'User assigned');
    }

    public function unassign(Team $team, User $user)
    {
        $team->users()->detach($user->id);
        return back()->with('success', 'User unassigned');
    }

    public function transfer(Team $team, User $user)
    {
    // Toggle to in_transfer so they'll appear in available list elsewhere
    $team->users()->updateExistingPivot($user->id, ['status' => 'in_transfer']);
        return back()->with('success', 'User marked in transfer');
    }
}
