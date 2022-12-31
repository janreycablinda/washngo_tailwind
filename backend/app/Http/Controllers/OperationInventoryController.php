<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OperationInventory;

class OperationInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get = OperationInventory::with('item.item_variations.unit', 'branch')->where('branch_id', auth()->user()->branch_id)->get();

        return response()->json($get);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return response()->json($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function update_notifier(Request $request, $id)
    {
        $update = OperationInventory::find($id)->update([
            'notifier' => $request->notifier
        ]);

        return response()->json(true);
    }

    public function notifier_operation_inventory()
    {
        $get = OperationInventory::with('item.item_variations.unit')->whereRaw('notifier >= available_qty')->get();

        return response()->json($get);
    }
}
