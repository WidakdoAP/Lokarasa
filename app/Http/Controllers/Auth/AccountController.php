<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('profile', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'google_connected' => $user->socialAccounts()
                    ->where('provider', 'google')
                    ->exists(),
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:2',
                'max:50',
            ],

            'avatar' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);

        // Always update the name.
        $user->name = $validated['name'];
    
        // ONLY change the avatar when a new file was uploaded.
        if ($request->hasFile('avatar')) {
            if (
                $user->avatar &&
                !str_starts_with($user->avatar, 'http')
            ) {
                Storage::disk('public')->delete(
                    str_replace('/storage/', '', $user->avatar)
                );
            }
    
            $path = $request->file('avatar')->store(
                'avatars',
                'public'
            );
    
            $user->avatar = Storage::url($path);
        }
    
        $user->save();
    
        return back()->with(
            'success',
            'Your profile has been updated successfully.'
        );
    }
}