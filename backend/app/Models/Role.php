<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $table = 'roles';
    public $incrementing = false;
    protected $guarded = [];
    protected $fillable = ['id','name','status'];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }

    public function authorization()
    {
        return $this->hasMany(Authorization::class, 'role_id');
    }
}
