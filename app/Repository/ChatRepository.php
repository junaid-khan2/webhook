<?php

namespace App\Repository;

use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class ChatRepository
{
    public function getUserMessages(int $senderId, int $receiverId){
        return Message::whereIn('sender_id',[$senderId, $receiverId])
                        ->whereIn('receiver_id',[$senderId, $receiverId])
                        ->get();
    }

    public function getResentUserWithMessage(int $senderId): array
    {
        DB::statement("SET sql_mode=''");
        $resentMassages =  Message::where(function ($query) use ($senderId){
            $query->where('sender_id', $senderId)
            ->orWhere('receiver_id', $senderId);
        })->groupBy('sender_id', 'receiver_id')
        ->select('sender_id','receiver_id','message')
        ->orderBy('id', 'desc')
        ->limit(30)
        ->get();

       

        return $this->getfilterRecentMessages($resentMassages, $senderId);
    }

    public function sendMessage(array $data): Message
    {
        return Message::create($data);
    }

    public function getfilterRecentMessages(Collection  $resentMassages, int $senderId): array
    {
        $resentUserWithMessages = [];
        $usedUserIds = [];
        foreach ($resentMassages as $message) {
            $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
            if(!in_array( $userId, $usedUserIds)){
                $resentUserWithMessages[] = [
                    'user_id'=>$userId,
                    'message'=>$message->message
                ];

                $usedUserIds[] = $userId;
            }
           
        }
        foreach ($resentUserWithMessages as $key => $userMessage) {
            $resentUserWithMessages[$key]['name'] = User::where('id', $userMessage['user_id'])->value('name') ?? '';
        }
        return $resentUserWithMessages;
    }
  
}
