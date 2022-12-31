<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperationDeliveryReceiptItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operation_delivery_receipt_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dr_id');
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('variation_id');
            $table->integer('qty');
            $table->softDeletes();
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
        Schema::dropIfExists('operation_delivery_receipt_items');
    }
}
