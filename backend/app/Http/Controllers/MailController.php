<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use PDF;

class MailController extends Controller
{
    public function send_email(Request $request){

        $data["email"]=$request->email;
        $data["client_name"]=$request->name;
        $data["messages"]=$request->message;
        $data["completed"]=$request->data;
        $data["subject"]='Wash&Go';
 
        $pdf = PDF::loadView('test', $data);
 
        try{
            Mail::send('emails.mail', $data, function($message)use($data,$pdf) {
            $message->to($data["email"], $data["client_name"])
            ->subject($data["subject"])
            ->attachData($pdf->output(), "report.pdf");
            });
        }catch(JWTException $exception){
            $this->serverstatuscode = "0";
            $this->serverstatusdes = $exception->getMessage();
        }
        if (Mail::failures()) {
             $this->statusdesc  =   "Error sending mail";
             $this->statuscode  =   "0";
 
        }else{
 
           $this->statusdesc  =   "Message sent Succesfully";
           $this->statuscode  =   "1";
        }

        return response()->json(compact('this'));
    }
}
