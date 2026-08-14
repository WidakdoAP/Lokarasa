<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();
        $email = $googleUser->getEmail();

        if (!$email) {
            return redirect()
                ->route('login')
                ->withErrors(['email' => 'Email is required']);
        }

        $user = DB::transaction(function () use ($googleUser): User {
            $socialAccount = SocialAccount::where('provider', 'google')
                ->where('provider_id', $googleUser->getId())
                ->first();

            if ($socialAccount) {
                return $socialAccount->user;
            }

            $user = User::where('email', $googleUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'email_verified_at' => now(),
                    'avatar' => $googleUser->getAvatar(),
                    'password' => null,
                ]);
            }

            $user->socialAccounts()->create([
                'provider' => 'google',
                'provider_id' => $googleUser->getId(),
            ]);

            return $user;
        });

        Auth::login($user);
        $request->session()->regenerate();
        return redirect()->intended(route('/'));
    }
}
