<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthorizationTypes extends Model
{
    use HasFactory;
    protected $table = 'authorization_types';
    protected $guarded = [];
    protected $fillable = ['id', 'name'];

    public function authorization()
    {
        return $this->hasMany(Authorization::class, 'authorization_type_id');
    }
}
