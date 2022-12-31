<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;

class PersonnelCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = ['Washboy', 'Technician', 'Store Supervisor', 'Cashier'];

        foreach ($data as $obj) {
            DB::table('personel_categories')->insert([
                'name' => $obj,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
