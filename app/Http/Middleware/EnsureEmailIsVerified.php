<<<<<<< HEAD
<?php

	namespace App\Http\Middleware;

	use Closure;
	use Illuminate\Support\Facades\Redirect;
	use Illuminate\Contracts\Auth\MustVerifyEmail;

	class EnsureEmailIsVerified
	{
		/**
		 * Handle an incoming request.
		 *
		 * @param  \Illuminate\Http\Request  $request
		 * @param  \Closure  $next
		 * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
		 */
		public function handle($request, Closure $next)
		{
            $mustVerify = setting_item('enable_verify_email_register_user');
            if($mustVerify==1){
                if (auth()->check() and ($request->user() instanceof MustVerifyEmail &&
                        ! $request->user()->hasVerifiedEmail())) {
                    if(!$request->user()->hasPermissionTo('dashboard_access')){
                    return $request->expectsJson()
                        ? abort(403, 'Your email address is not verified.')
                        : Redirect::route('verification.notice');
                    }

                }
			}

			return $next($request);
		}
	}
=======
<?php

	namespace App\Http\Middleware;

	use Closure;
	use Illuminate\Support\Facades\Redirect;
	use Illuminate\Contracts\Auth\MustVerifyEmail;

	class EnsureEmailIsVerified
	{
		/**
		 * Handle an incoming request.
		 *
		 * @param  \Illuminate\Http\Request  $request
		 * @param  \Closure  $next
		 * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
		 */
		public function handle($request, Closure $next)
		{
            $mustVerify = setting_item('enable_verify_email_register_user');
            if($mustVerify==1){
                if (auth()->check() and ($request->user() instanceof MustVerifyEmail &&
                        ! $request->user()->hasVerifiedEmail())) {
                    if(!$request->user()->hasPermissionTo('dashboard_access')){
                    return $request->expectsJson()
                        ? abort(403, 'Your email address is not verified.')
                        : Redirect::route('verification.notice');
                    }

                }
			}

			return $next($request);
		}
	}
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
