<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Exceptions\InvalidSignatureException;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Models\User;
use URL;
use Mail;
use Carbon\Carbon;
use Arr;
use App\Models\PermissionRole;

class AuthController extends Controller
{

    var $keyResolver;
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'check_email', 'request_password', 'check_verification_code', 'change_forgot_password']]);

        $this->keyResolver = function () {
            return App::make('config')->get('app.key');
        };
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['username', 'password'], 'remember');

        if (! $token = auth()->claims(['role' => 'role'])->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $permissions = PermissionRole::with('permission')->where('role_id', auth()->user()->role_id)->get();

        return response()->json(['access_token' => $token, 'permissions' => $permissions, 'user' => auth()->user()]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $get = User::where('id', auth()->user()->id)->with('role.permissions.permission', 'branch')->first();
        return response()->json($get);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(true);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function request_password(Request $request){
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();
        if($user){
            $random = rand(111111, 999999);
            $user->verification_code = $random;
            if($user->save()){
                $data["email"]=$user->email;
                $data["client_name"]=$user->name;
                $data["link"]=$random;
                $data["subject"]='Wash&Go - Forgot Password';
                $data["messages"]='You have requested a password reset. To set a new password, use the verification code below.';

                Mail::send('emails.forgot', $data, function($message)use($data) {
                    $message->to($data["email"], $data["client_name"])
                    ->subject($data["subject"]);
                });

                return 'success';
            }else{
                return 404;
            }
        }else{
            return 'Email not found!';
        }
        
    }

    public function check_email(Request $request){
        
        $user = User::where('email', $request->email)->first();

        if($user){
            return 200;
        }else{
            return 404;
        }
    }

    public function check_verification_code(Request $request){
        $user = User::where('email', $request->email)->where('verification_code', $request->code)->first();
        if(!empty($user)){
            return 'Valid';
        }else{
            return 'Invalid';
        }
    }

    public function change_forgot_password(Request $request)
    {
        $update = User::where('email', $request->form['email'])->update([
            'password' => bcrypt($request->password_form['password']),
            'verification_code' => null
        ]);

        return 'success';
    }
}
