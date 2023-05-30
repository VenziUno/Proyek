<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $table = 'profiles';
    protected $guarded = [];
    protected $fillable = [
        'photo',
        'religion',
        'place_of_birth',
        'date_of_birth',
        'phone_number',
        'address',
        'province',
        'city',
        'districts',
        'portal_code',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
