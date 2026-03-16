<?php

namespace App\Models;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $appends = ['joined_at'];
    protected $fillable = [
        'fullname',
        'username',
        'location',
        'avatar',
        'bio',
        'website',
        'github',
        'tiwtter',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJoinedAtAttribute()
    {
        $date = Carbon::make($this->created_at);

        return $date->format('d M Y');

    }

}
