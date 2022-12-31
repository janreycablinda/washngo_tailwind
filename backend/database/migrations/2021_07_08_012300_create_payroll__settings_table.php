<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayrollSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payroll__settings', function (Blueprint $table) {
            $table->id();
            $table->integer('timetable_type');
            $table->integer('working_hours');
            $table->integer('start_worktime');
            $table->integer('end_worktime');
            $table->integer('late_allowance');
            $table->time('valid_checkin_from');
            $table->time('valid_checkin_to');
            $table->time('valid_checkout_from');
            $table->time('valid_checkout_to');
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
        Schema::dropIfExists('payroll__settings');
    }
}
