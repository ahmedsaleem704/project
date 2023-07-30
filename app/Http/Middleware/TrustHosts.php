<<<<<<< HEAD
<?php

    namespace App\Http\Middleware;

    use Illuminate\Http\Middleware\TrustHosts as Middleware;

    class TrustHosts extends Middleware
    {
        /**
         * Get the host patterns that should be trusted.
         *
         * @return array
         */
        public function hosts()
        {
            return [
                $this->allSubdomainsOfApplicationUrl(),
            ];
        }
=======
<?php

    namespace App\Http\Middleware;

    use Illuminate\Http\Middleware\TrustHosts as Middleware;

    class TrustHosts extends Middleware
    {
        /**
         * Get the host patterns that should be trusted.
         *
         * @return array
         */
        public function hosts()
        {
            return [
                $this->allSubdomainsOfApplicationUrl(),
            ];
        }
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
    }