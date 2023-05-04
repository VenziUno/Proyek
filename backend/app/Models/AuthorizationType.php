<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthorizationType extends Model
{
    use HasFactory;
    protected $table = 'authorization_types';
    protected $guarded = [];

    // public function Authorizations() {
    //     return $this->hasMany(Authorization::class, 'authorization_types_id','id');
    // }
}
