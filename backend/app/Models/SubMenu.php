<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubMenu extends Model
{
    use HasFactory;
    protected $table = 'sub_menus';
    protected $guarded = [];
    protected $fillable = ['id','name','menu_id'];

    public function menus()
    {
        return $this->belongsTo(Menu::class,'menu_id');
    }

    public function authorization()
    {
        return $this->hasMany(Authorization::class, 'sub_menu_id');
    }
}
