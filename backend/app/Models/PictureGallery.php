<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PictureGallery extends Model
{
    use HasFactory;
    protected $table = 'picture_galleries';
    public $incrementing = false;
    protected $guarded = [];
    protected $fillable = ['id','file','title','desc','category_galleri_id'];

    public function categoryGallery()
    {
        return $this->belongsTo(CategoryGallery::class,'category_galleri_id');
    }
}
