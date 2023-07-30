<<<<<<< HEAD
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
	protected $except = [
		//
		'*/gateway_callback/*'
	];
}
=======
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
	protected $except = [
		//
		'*/gateway_callback/*'
	];
}
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
