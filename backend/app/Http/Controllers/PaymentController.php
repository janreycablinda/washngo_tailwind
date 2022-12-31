<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchasePayment;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $new = new PurchasePayment;
        $new->dr_id = $request->dr_id;
        $new->amount = $request->amount;
        $new->bank = $request->bank;
        $new->check_name = $request->check_name;
        $new->check_no = $request->check_no;
        $new->user_id = auth()->user()->id;
        $new->payment_method = $request->payment_method;
        $new->save();

        return response()->json($new->load('user'));
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
        $update = PurchasePayment::find($id)->update([
            'amount' => $request->amount,
            'bank' => $request->bank,
            'check_name' => $request->check_name,
            'check_no' => $request->check_no,
            'payment_method' => $request->payment_method,
            'user_id' => auth()->user()->id
        ]);

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
        $delete = PurchasePayment::find($id)->delete();
        
        return response()->json($id);
    }
}
