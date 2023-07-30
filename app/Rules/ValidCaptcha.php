<<<<<<< HEAD
<?php

namespace App\Rules;

use App\Helpers\ReCaptchaEngine;
use Illuminate\Contracts\Validation\Rule;

class ValidCaptcha implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!$value or !ReCaptchaEngine::verify($value)) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('Please verify captcha.');
    }
}
=======
<?php

namespace App\Rules;

use App\Helpers\ReCaptchaEngine;
use Illuminate\Contracts\Validation\Rule;

class ValidCaptcha implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!$value or !ReCaptchaEngine::verify($value)) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('Please verify captcha.');
    }
}
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
