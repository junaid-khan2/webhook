<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        // echo "working";
        return Inertia::render('Chat/Chat');
    }
}
