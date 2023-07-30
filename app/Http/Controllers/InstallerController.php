<<<<<<< HEAD
<?php


namespace App\Http\Controllers;


class InstallerController extends Controller
{

    public function redirectToRequirement(){
        return redirect(route('LaravelInstaller::requirements'));
    }
    public function redirectToWizard(){
        return redirect(route('LaravelInstaller::environmentWizard'));
    }
}
=======
<?php


namespace App\Http\Controllers;


class InstallerController extends Controller
{

    public function redirectToRequirement(){
        return redirect(route('LaravelInstaller::requirements'));
    }
    public function redirectToWizard(){
        return redirect(route('LaravelInstaller::environmentWizard'));
    }
}
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
