<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShiftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('timetable_type');
            $table->integer('working_calculated');
            $table->integer('late_allowance');
            $table->integer('start_worktime');
            $table->integer('end_worktime');
            $table->time('valid_checkin_from');
            $table->time('valid_checkin_to');
            $table->time('valid_checkout_from');
            $table->time('valid_checkout_to');
            $table->integer('default_incentives');
            $table->unsignedBigInteger('branch_id');
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
        Schema::dropIfExists('shifts');
    }
}
