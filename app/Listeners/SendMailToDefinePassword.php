<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\UserCreatedEvent;
use CodeShopping\Notifications\MyResetPassword;
use Illuminate\Support\Facades\Password;

class SendMailToDefinePassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreatedEvent  $event
     * @return void
     */
    public function handle(UserCreatedEvent $event)
    {
        $user = $event->getUser();
        $token = Password::broker()->createToken($user);

        //Chamada de notificação padrão laravel
        $user->sendPasswordResetNotification($token);
        //Chamada de notificação customizada com conteudo traduzido e tudo mais.
        //$user->notify(new MyResetPassword($token));
    }
}
