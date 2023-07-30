<<<<<<< HEAD
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class CheckForLogPermission
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
        if (!Auth::user()->hasPermissionTo('system_log_view')) {
            return redirect('/');
        }
        set_active_menu('admin/module/core/tools');
        return $next($request);
    }
}
=======
<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class CheckForLogPermission
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
        if (!Auth::user()->hasPermissionTo('system_log_view')) {
            return redirect('/');
        }
        set_active_menu('admin/module/core/tools');
        return $next($request);
    }
}
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
