<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Authorization extends Model
{
    use HasFactory;
    protected $table = 'authorizations';
    protected $guarded = [];
    protected $fillable = ['id', 'role_id', 'menu_id', 'sub_menu_id', 'authorization_type_id' ];

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function subMenu()
    {
        return $this->belongsTo(SubMenu::class, 'sub_menu_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
    public function authorizationType()
    {
        return $this->belongsTo(AuthorizationTypes::class, 'authorization_type_id');
    }
}
