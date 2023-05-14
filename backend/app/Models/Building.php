<?php

namespace App\Models;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    use HasFactory;
    protected $table = 'buildings';
    public $incrementing = false;
    protected $guarded = [];
    protected $fillable = ['id','name','floor','tall','wide','long','status'];

    public function rooms()
    {
        return $this->hasMany(Room::class, 'building_id');
    }
}
