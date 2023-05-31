<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    protected $table = 'menus';
    protected $guarded = [];
    protected $fillable = ['id','name'];

    public function subMenus()
    {
        return $this->hasMany(SubMenu::class);
    }

    public function authorization()
    {
        return $this->hasMany(Authorization::class, 'menu_id');
    }

}
