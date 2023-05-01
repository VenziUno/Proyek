<?php
    namespace App\Helpers;

    class Helper
    {
        public static function IDGenerator($model,$trow,$length=3,$prefix){
            $data = $model::orderBy('id','desc')->first();
            if(!$data){
                $og_length = $length;
                $last_Number = '';
            }else{
                $code = substr($data->$trow, strlen($prefix)+1);
                $actial_last_length = ($code/1)*1;
                $increment_last_number = $actial_last_length+1;
                $last_number_length = strlen($increment_last_number);
                $og_length = $length - $last_number_length;
                $last_Number = $increment_last_number;
            }
            $zeros = "";
            for($i=0;$i<$og_length;$i++){
                $zeros="0";
            }
            return $prefix.$zeros.$last_Number;
        }
    }
?>
