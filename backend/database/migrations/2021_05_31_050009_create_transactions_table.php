<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('branch_id');
            $table->unsignedBigInteger('labor_id')->nullable();
            $table->unsignedBigInteger('property_id')->nullable();
            $table->unsignedBigInteger('vehicle_id')->nullable();
            $table->string('work_order')->nullable();
            $table->string('name')->nullable();
            $table->string('contact_no')->nullable();
            $table->string('plate_no')->nullable();
            $table->time('time_comsumed')->nullable();
            $table->datetime('start_wash')->nullable();
            $table->string('transaction_type');
            $table->date('transaction_date')->nullable();
            $table->string('status');
            $table->string('points');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
