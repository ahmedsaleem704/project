<<<<<<< HEAD
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class UserStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param  string|null $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $user = Auth::user();
        if ($user) {
            switch ($user->status) {
                case "blocked":
                    Auth::guard()->logout();
                    $request->session()->invalidate();
                    return redirect('login')->with('error', 'Your account has been blocked');
                    break;
                case "deleted":
                    Auth::guard()->logout();
                    $request->session()->invalidate();
                    return redirect('login')->with('error', 'Your account has been blocked');
            }
        }
        return $next($request);
    }
=======
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class UserStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param  string|null $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $user = Auth::user();
        if ($user) {
            switch ($user->status) {
                case "blocked":
                    Auth::guard()->logout();
                    $request->session()->invalidate();
                    return redirect('login')->with('error', 'Your account has been blocked');
                    break;
                case "deleted":
                    Auth::guard()->logout();
                    $request->session()->invalidate();
                    return redirect('login')->with('error', 'Your account has been blocked');
            }
        }
        return $next($request);
    }
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
}