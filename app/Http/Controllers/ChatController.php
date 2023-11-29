<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repository\ChatRepository;
use App\Events\MessageSent;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function __construct(private ChatRepository $chat) {
        $this->chat = $chat;
    }
    public function index(Request $request, ?int $reciverId = null)
    {
        $messages = empty($reciverId) ? [] : $this->chat->getUserMessages((int) $request->user()->id, (int) $reciverId);
        return Inertia::render('Chat/Chat',[
            'messages' => $messages,
            'recentMessages' => $this->chat->getResentUserWithMessage($request->user()->id),
            'receiver'=> User::find($reciverId)
        ]);
    }

    public function store(Request $request, ?int $reciverId = null)
    {
        $request->validate([
            'message'=>'required|string',
        ]);
        if(empty($reciverId)){
            return;
        }

        try {
            $this->chat->sendMessage([
                'sender_id'=> (int) $request->user()->id,
                'receiver_id'=>$reciverId,
                'message'=>$request->message
            ]);

            event(new MessageSent($messages));

            return Redirect::route('chat.index',$reciverId);
        } catch (\Throwable $th) {
            return Redirect::route('chat.index',$reciverId);
        }
        
    }
}
