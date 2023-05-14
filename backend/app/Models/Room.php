<?php

namespace App\Models;
use App\Models\Building;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $table = 'rooms';
    public $incrementing = false;
    protected $guarded = [];

    public function buildings()
    {
        return $this->belongsTo(Building::class , 'building_id');
    }
}
