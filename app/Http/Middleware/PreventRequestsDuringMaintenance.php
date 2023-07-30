<<<<<<< HEAD
<?php

    namespace App\Http\Middleware;

    use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

    class PreventRequestsDuringMaintenance extends Middleware
    {
        /**
         * The URIs that should be reachable while maintenance mode is enabled.
         *
         * @var array
         */
        protected $except = [
            //
        ];
=======
<?php

    namespace App\Http\Middleware;

    use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

    class PreventRequestsDuringMaintenance extends Middleware
    {
        /**
         * The URIs that should be reachable while maintenance mode is enabled.
         *
         * @var array
         */
        protected $except = [
            //
        ];
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
    }