<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryGallery extends Model
{
    use HasFactory;
    protected $table = 'category_galleries';
    public $incrementing = false;
    protected $guarded = [];
    protected $fillable = ['id','name'];

    public function pictureGallery()
    {
        return $this->hasMany(PictureGallery::class, 'category_galleries_id');
    }

    public function videoGallery()
    {
        return $this->hasMany(VideoGallery::class, 'category_galleries_id');
    }
}
