<<<<<<< HEAD
<?php


namespace App\Traits;


trait HasStatus
{
    public function getStatusBadgeAttribute(){
        switch ($this->status){
            case "publish": return "success";
            case "draft":  return "secondary";
        }
    }
    public function getStatusTextAttribute(){
        switch ($this->status){
            case "publish": return __("Publish");
            case "draft":  return __("Draft");
        }
    }
}
=======
<?php


namespace App\Traits;


trait HasStatus
{
    public function getStatusBadgeAttribute(){
        switch ($this->status){
            case "publish": return "success";
            case "draft":  return "secondary";
        }
    }
    public function getStatusTextAttribute(){
        switch ($this->status){
            case "publish": return __("Publish");
            case "draft":  return __("Draft");
        }
    }
}
>>>>>>> f2da181bf26f6c90054eda27a9fd71fca74d52f7
