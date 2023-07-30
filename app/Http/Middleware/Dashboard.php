<<<<<<< HEAD
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Dashboard
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
        if (!Auth::check() or !Auth::user()->hasPermissionTo('dashboard_access')) {
            return redirect('/');
        }
        return $next($request);
    }
}
=======
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Dashboard
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
        if (!Auth::check() or !Auth::user()->hasPermissionTo('dashboard_access')) {
            return redirect('/');
        }
        return $next($request);
    }
}
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
