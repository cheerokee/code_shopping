<?php
declare(strict_types=1);
namespace CodeShopping\Models;

use CodeShopping\Firebase\FirebaseSync;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserProfile extends Model
{
    use FirebaseSync;

    const BASE_PATH     = "app/public";
    const DIR_USERS = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';
    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = ['phone_number', 'photo'];

    public static function createTokenToChangePhoneNumber(UserProfile $profile, $phoneNumber): string {
        $token = base64_encode($phoneNumber);
        $profile->phone_number_token_to_change = $token;
        $profile->save();

        return $token;
    }

    public static function saveProfile(User $user, array $data) : UserProfile
    {
        if(array_key_exists('photo', $data)){
            self::deletePhoto($user->profile);
            $data['photo'] = UserProfile::getPhotoHashName($data['photo']);
        }

        $user->profile->fill($data)->save();

        return $user->profile;
    }

    public static function updatePhoneNumber($token): UserProfile
    {
        $profile = (new UserProfile)->where('phone_number_token_to_change', $token)->firstOrFail();
        $phoneNumber = base64_decode($token);
        $profile->phone_number = $phoneNumber;
        $profile->phone_number_token_to_change = null;
        $profile->save();
        return $profile;
    }

    private static function getPhotoHashName(UploadedFile $photo = null)
    {
        return $photo ? $photo->hashName() : null;
    }

    private static  function deletePhoto(UserProfile $profile)
    {
        if(!$profile->photo){
            return;
        }

        $dir = self::photoDir();
        Storage::disk('public')->delete("{$dir}/{$profile->photo}");
    }

    public static function  photoPath()
    {
        $path = self::USER_PHOTO_PATH;
        return storage_path($path);
    }

    public static function uploadPhoto(UploadedFile $photo = null)
    {
        if(!$photo){
            return;
        }

        $dir = self::photoDir();
        $photo->store($dir,['disk' => 'public']);
    }

    public static function deleteFile(UploadedFile $photo = null)
    {
        if(!$photo){
            return;
        }

        $path = self::photoPath();
        $photoPath = "{$path}/{$photo->hashName()}";
        if(file_exists($photoPath)){
            \File::delete($photoPath);
        }
    }

    public static function photoDir()
    {
        $dir = self::DIR_USER_PHOTO;
        return $dir;
    }

    public function getPhotoUrlAttribute(){
        return $this->photo ?
            asset("storage/{$this->photo_url_base}") : $this->photo_url_base;//Serve para criar caminhos
    }

    public function getPhotoUrlBaseAttribute()
    {
        $path = self::photoDir();

        return $this->photo ?
            "{$path}/{$this->photo}" : 'https://secure.gravatar.com/avatar/8d0153955da67e7593b0cca28e3ed75.jpg?s=150&r=g&d=mm';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function syncFbSet()
    {
        $this->user->syncFbSetCustom();
    }
}
