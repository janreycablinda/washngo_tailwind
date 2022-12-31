<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\OperationInventory;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Builder;

class CheckStock extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:stock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Artisan to check product stocks';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $get = OperationInventory::whereRaw('notifier >= available_qty')->get();

        foreach($get as $key => $inventory){
            $find_user = User::whereHas('role.permissions', function (Builder $query) {
                $query->where('permission_id', 269);
            })->where('branch_id', $inventory['branch_id'])->get();
            foreach($find_user as $user){
                $ifexist = Notification::where('user_id', $user['id'])->whereDate('created_at', Carbon::today())->first();
                if(!$ifexist){
                    $new_notif = new Notification;
                    $new_notif->message = $key . 'test';
                    $new_notif->link = '#';
                    $new_notif->icon = 'cil-pencil';
                    $new_notif->status = 'read';
                    $new_notif->for = 'product';
                    $new_notif->type = 'product';
                    $new_notif->user_id = $user['id'];
                    $new_notif->branch_id = $inventory['branch_id'];
                    $new_notif->save();
                }
            }
        }
    }
}
