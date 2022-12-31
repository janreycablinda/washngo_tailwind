<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::get('me', 'App\Http\Controllers\AuthController@me');
    Route::post('request_password', 'App\Http\Controllers\AuthController@request_password');
    Route::post('check_email', 'App\Http\Controllers\AuthController@check_email');
    Route::post('check_verification_code', 'App\Http\Controllers\AuthController@check_verification_code');
    Route::post('change_forgot_password', 'App\Http\Controllers\AuthController@change_forgot_password');
    
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'option'

], function ($router) {

    Route::get('get_roles', 'App\Http\Controllers\OptionController@get_roles');
    Route::post('add_roles', 'App\Http\Controllers\OptionController@add_roles');
    Route::post('edit_roles', 'App\Http\Controllers\OptionController@edit_roles');
    Route::post('delete_roles', 'App\Http\Controllers\OptionController@delete_roles');
    
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'action'

], function ($router) {

    Route::post('add_user', 'App\Http\Controllers\UserController@add_user');
    Route::get('get_users', 'App\Http\Controllers\UserController@get_users');
    Route::get('get_user/{id}', 'App\Http\Controllers\UserController@get_user');
    Route::post('update_users', 'App\Http\Controllers\UserController@update_users');
    Route::post('delete_users', 'App\Http\Controllers\UserController@delete_users');
    
    Route::get('get_branch', 'App\Http\Controllers\BranchController@get_branch');
    Route::post('delete_branch', 'App\Http\Controllers\BranchController@delete_branch');
    Route::post('add_branch', 'App\Http\Controllers\BranchController@add_branch');
    Route::post('update_branch', 'App\Http\Controllers\BranchController@update_branch');

    Route::get('get_owners', 'App\Http\Controllers\OwnerController@get_owners');
    Route::post('add_owner', 'App\Http\Controllers\OwnerController@add_owner');
    Route::post('delete_owner', 'App\Http\Controllers\OwnerController@delete_owner');
    Route::post('update_owner', 'App\Http\Controllers\OwnerController@update_owner');
    
    Route::get('get_members/{id}', 'App\Http\Controllers\MemberController@get_members');
    Route::post('get_members_count', 'App\Http\Controllers\MemberController@get_members_count');
    
    Route::get('get_size', 'App\Http\Controllers\SizeController@get_size');
    Route::get('get_unit/{id}', 'App\Http\Controllers\UnitController@get_unit');
    Route::post('add_unit', 'App\Http\Controllers\UnitController@add_unit');
    Route::delete('delete_unit/{id}', 'App\Http\Controllers\UnitController@delete_unit');

    Route::get('get_expenses/{id}', 'App\Http\Controllers\ExpensesController@get_expenses');
    Route::post('get_expenses_count', 'App\Http\Controllers\ExpensesController@get_expenses_count');
    Route::post('add_expenses', 'App\Http\Controllers\ExpensesController@add_expenses');
    Route::post('update_expenses', 'App\Http\Controllers\ExpensesController@update_expenses');
    Route::delete('delete_expenses/{id}', 'App\Http\Controllers\ExpensesController@delete_expenses');
    
    Route::get('get_size_id/{id}', 'App\Http\Controllers\SizeController@get_size_id');
    
    Route::get('get_category', 'App\Http\Controllers\OptionController@get_category');
    

    Route::get('get_vehicle', 'App\Http\Controllers\VehicleController@get_vehicle');
    Route::post('add_vehicle', 'App\Http\Controllers\VehicleController@add_vehicle');
    Route::post('delete_vehicle', 'App\Http\Controllers\VehicleController@delete_vehicle');
    Route::post('update_vehicle', 'App\Http\Controllers\VehicleController@update_vehicle');
    
    Route::get('get_services', 'App\Http\Controllers\ServicesController@get_services');
    Route::post('add_services', 'App\Http\Controllers\ServicesController@add_services');
    Route::post('find_services', 'App\Http\Controllers\ServicesController@find_services');
    
    Route::post('save_variant', 'App\Http\Controllers\ServicesController@save_variant');
    Route::get('get_variant/{id}', 'App\Http\Controllers\ServicesController@get_variant');
    Route::post('delete_services', 'App\Http\Controllers\ServicesController@delete_services');
    Route::post('update_custom_services', 'App\Http\Controllers\ServicesController@update_custom_services');
    
    Route::post('find_property', 'App\Http\Controllers\MemberController@find_property');

    Route::get('get_waiting/{id}', 'App\Http\Controllers\TransactionController@get_waiting');
    Route::get('restore_transaction/{id}', 'App\Http\Controllers\TransactionController@restore_transaction');
    Route::get('get_completed', 'App\Http\Controllers\TransactionController@get_completed');
    Route::get('check_first_trans/{id}', 'App\Http\Controllers\TransactionController@check_first_trans');
    Route::get('get_inprogress', 'App\Http\Controllers\TransactionController@get_inprogress');
    Route::post('get_property', 'App\Http\Controllers\TransactionController@get_property');
    Route::post('get_info', 'App\Http\Controllers\TransactionController@get_info');
    Route::post('add_transaction', 'App\Http\Controllers\TransactionController@add_transaction');
    Route::post('update_transaction', 'App\Http\Controllers\TransactionController@update_transaction');
    Route::delete('delete_transaction/{id}', 'App\Http\Controllers\TransactionController@delete_transaction');
    Route::delete('delete_transaction_for_reg/{id}/{member_id}', 'App\Http\Controllers\TransactionController@delete_transaction');
    
    Route::post('submit_payment', 'App\Http\Controllers\TransactionController@submit_payment');
    Route::post('start_wash', 'App\Http\Controllers\TransactionController@start_wash');
    Route::post('edit_washboy', 'App\Http\Controllers\TransactionController@edit_washboy');
    Route::post('submit_completed', 'App\Http\Controllers\TransactionController@submit_completed');
    
    Route::get('get_chart/{year}', 'App\Http\Controllers\TransactionController@get_chart');
    
    Route::get('get_washboy/{id}', 'App\Http\Controllers\WashboyController@get_washboy');
    Route::get('search_washboy/{branch}/{id}', 'App\Http\Controllers\WashboyController@search_washboy');
    Route::get('wash_history/{branch}/{id}', 'App\Http\Controllers\WashboyController@wash_history');
    Route::get('get_attendance/{id}', 'App\Http\Controllers\WashboyController@get_attendance');
    Route::post('save_attendance', 'App\Http\Controllers\WashboyController@save_attendance');
    Route::get('find_attendance/{id}/{date}', 'App\Http\Controllers\WashboyController@find_attendance');
    Route::get('find_salary/{id}/{date}', 'App\Http\Controllers\SalaryController@find_salary');
    
    
    Route::post('get_sales', 'App\Http\Controllers\TransactionController@get_sales');
    Route::get('get_deleted_transaction', 'App\Http\Controllers\TransactionController@get_deleted_transaction');

    Route::post('get_permission', 'App\Http\Controllers\PermissionController@get_permission');
    Route::get('get_permission_details/{id}', 'App\Http\Controllers\PermissionController@get_permission_details');
    Route::post('submit_element_permission', 'App\Http\Controllers\PermissionController@submit_element_permission');
    
    Route::get('get_transaction_last', 'App\Http\Controllers\TransactionController@get_transaction_last');
    
    Route::get('get_new_member_no', 'App\Http\Controllers\TransactionController@get_new_member_no');
    
    Route::post('add_edit_services', 'App\Http\Controllers\TransactionController@add_edit_services');

    Route::post('update_services', 'App\Http\Controllers\TransactionController@update_services');
    
    
    Route::post('add_washboy', 'App\Http\Controllers\WashboyController@add_washboy');
    Route::post('update_washboy', 'App\Http\Controllers\WashboyController@update_washboy');
    Route::post('delete_washboy', 'App\Http\Controllers\WashboyController@delete_washboy');
    
    Route::get('find_note/{id}', 'App\Http\Controllers\NoteController@find_note');
    Route::post('add_note', 'App\Http\Controllers\NoteController@add_note');
    Route::post('delete_note', 'App\Http\Controllers\NoteController@delete_note');
    Route::get('get_note/{id}', 'App\Http\Controllers\NoteController@get_note');
    
    Route::get('get_target/{id}', 'App\Http\Controllers\TargetController@get_target');
    Route::post('update_target', 'App\Http\Controllers\TargetController@update_target');
    Route::post('check_if_first_trans', 'App\Http\Controllers\TransactionController@check_if_first_trans');
    
    Route::post('add_member', 'App\Http\Controllers\MemberController@add_member');
    Route::post('update_member', 'App\Http\Controllers\MemberController@update_member');
    Route::post('renew_member', 'App\Http\Controllers\MemberController@renew_member');
    Route::get('delete_members/{id}', 'App\Http\Controllers\MemberController@delete_members');
    Route::get('member_profile/{branch}/{id}', 'App\Http\Controllers\MemberController@member_profile');
    Route::get('delete_property_member/{id}', 'App\Http\Controllers\MemberController@delete_property_member');
    Route::get('member_property/{branch}/{id}/{vehicle_id}', 'App\Http\Controllers\MemberController@member_property');
    
    Route::get('get_personelcategory', 'App\Http\Controllers\PersonelCategoryController@get_personelcategory');

    Route::get('get_completed_transaction', 'App\Http\Controllers\TransactionController@get_completed_transaction');

    Route::post('get_customers', 'App\Http\Controllers\CustomerController@get_customers');
    
    Route::post('send_email', 'App\Http\Controllers\MailController@send_email');
    
    Route::post('update_profile', 'App\Http\Controllers\UserController@update_profile');
    Route::post('update_password', 'App\Http\Controllers\UserController@update_password');
    Route::post('update_picture', 'App\Http\Controllers\UserController@update_picture');
    
    Route::post('find_report', 'App\Http\Controllers\ReportController@find_report');

    Route::post('update_permission', 'App\Http\Controllers\PermissionController@update_permission');
    Route::post('find_incentives', 'App\Http\Controllers\IncentivesController@find_incentives');
    Route::post('add_incentives', 'App\Http\Controllers\IncentivesController@add_incentives');
    Route::get('get_incentives/{id}', 'App\Http\Controllers\IncentivesController@get_incentives');
    Route::delete('delete_incentives/{id}', 'App\Http\Controllers\IncentivesController@delete_incentives');
    
    Route::get('get_shift/{id}', 'App\Http\Controllers\ShiftController@get_shift');
    Route::post('add_shift', 'App\Http\Controllers\ShiftController@add_shift');
    Route::put('update_shift', 'App\Http\Controllers\ShiftController@update_shift');
    Route::delete('delete_shift/{id}', 'App\Http\Controllers\ShiftController@delete_shift');

    Route::get('get_discount/{id}', 'App\Http\Controllers\DiscountController@get_discount');
    Route::post('add_discount', 'App\Http\Controllers\DiscountController@add_discount');
    Route::put('update_discount', 'App\Http\Controllers\DiscountController@update_discount');
    Route::delete('delete_discount/{id}', 'App\Http\Controllers\DiscountController@delete_discount');

    Route::get('get_item_category/{id}', 'App\Http\Controllers\ItemCategoryController@get_item_category');
    Route::post('add_category', 'App\Http\Controllers\ItemCategoryController@add_category');
    Route::delete('delete_category/{id}', 'App\Http\Controllers\ItemCategoryController@delete_category');
    
    Route::get('get_item', 'App\Http\Controllers\ItemController@get_item');
    Route::post('add_item', 'App\Http\Controllers\ItemController@add_item');
    Route::put('update_item', 'App\Http\Controllers\ItemController@update_item');
    Route::delete('delete_item/{id}', 'App\Http\Controllers\ItemController@delete_item');

    Route::get('get_stockin/{id}', 'App\Http\Controllers\StockinController@get_stockin');
    Route::post('add_stockin', 'App\Http\Controllers\StockinController@add_stockin');
    Route::put('update_stockin', 'App\Http\Controllers\StockinController@update_stockin');
    Route::delete('delete_stockin/{id}', 'App\Http\Controllers\StockinController@delete_stockin');

    // Route::get('get_stockout/{id}', 'App\Http\Controllers\StockoutController@get_stockout');
    // Route::post('add_stockout', 'App\Http\Controllers\StockoutController@add_stockout');
    // Route::post('check_stockout', 'App\Http\Controllers\StockoutController@check_stockout');
    // Route::put('update_stockout', 'App\Http\Controllers\StockoutController@update_stockout');
    // Route::delete('delete_stockout/{id}', 'App\Http\Controllers\StockoutController@delete_stockout');
    
    Route::get('get_notification/{id}', 'App\Http\Controllers\NotificationController@get_notification');
    Route::put('update_notification', 'App\Http\Controllers\NotificationController@update_notification');
    Route::put('read_notification', 'App\Http\Controllers\NotificationController@read_notification');

    Route::get('search_member/{branch}/{name}', 'App\Http\Controllers\MemberController@search_member');
    
    Route::resource('purchase_request', 'App\Http\Controllers\PurchaseRequestController');
    Route::get('pr_no', 'App\Http\Controllers\PurchaseRequestController@pr_no');

    Route::resource('operation_purchase_order', 'App\Http\Controllers\OperationPurchaseOrderController');
    Route::put('operation_purchase_order_status/{id}', 'App\Http\Controllers\OperationPurchaseOrderController@operation_purchase_order_status');
    Route::put('operation_purchase_order_convert_status/{id}', 'App\Http\Controllers\OperationPurchaseOrderController@operation_purchase_order_convert_status');
    Route::get('po_no', 'App\Http\Controllers\OperationPurchaseOrderController@po_no');

    Route::resource('operation_delivery_receipt', 'App\Http\Controllers\OperationDeliveryReceiptController');
    Route::put('operation_delivery_receipt_status/{id}', 'App\Http\Controllers\OperationDeliveryReceiptController@operation_purchase_order_status');
    Route::put('operation_delivery_receipt_completed/{id}', 'App\Http\Controllers\OperationDeliveryReceiptController@operation_delivery_receipt_completed');
    
    Route::resource('operation_inventory', 'App\Http\Controllers\OperationInventoryController');
    
    Route::resource('purchase_order', 'App\Http\Controllers\PurchaseOrderController');
    Route::put('purchase_order_delivered/{id}', 'App\Http\Controllers\PurchaseOrderController@purchase_order_delivered');

    Route::resource('inventory', 'App\Http\Controllers\InventoryController');

    Route::resource('delivery_receipt', 'App\Http\Controllers\DeliveryReceiptController');
    Route::put('update_delivery_receipt_status/{id}', 'App\Http\Controllers\DeliveryReceiptController@update_delivery_receipt_status');
    
    
    Route::get('get_main_vehicle', 'App\Http\Controllers\VehicleController@get_main_vehicle');
    Route::get('get_main_services', 'App\Http\Controllers\ServicesController@get_main_services');
    Route::get('get_main_discount', 'App\Http\Controllers\DiscountController@get_main_discount');
    
    
    Route::post('sync_vehicle', 'App\Http\Controllers\VehicleController@sync_vehicle');
    Route::post('sync_services', 'App\Http\Controllers\ServicesController@sync_services');
    Route::post('sync_discount', 'App\Http\Controllers\DiscountController@sync_discount');
    
    Route::resource('payments', 'App\Http\Controllers\PaymentController');

    Route::resource('companies', 'App\Http\Controllers\CompanyController');
    
    Route::resource('activity_log', 'App\Http\Controllers\ActivityLogController');

    Route::resource('stockout', 'App\Http\Controllers\StockoutController');
    
    Route::get('check_inventory', 'App\Http\Controllers\InventoryController@check_inventory');

    Route::put('update_notifier/{id}', 'App\Http\Controllers\OperationInventoryController@update_notifier');
    
    Route::get('notifier_operation_inventory', 'App\Http\Controllers\OperationInventoryController@notifier_operation_inventory');

    Route::get('notifier_inventory', 'App\Http\Controllers\InventoryController@notifier_inventory');
    
});
