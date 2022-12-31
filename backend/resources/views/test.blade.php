
<!DOCTYPE html>
<html>
<head>
 <title>Laravel 8 Send Email Example</title>
</head>
<body>
<style type="text/css">
table {
    font-size:12px;
    width:100%;
}
th{
    padding-left:5px;
    padding-right:5px;
}
td {
    text-align:center;
}
</style>
 <div style="text-align:center;">
 <img src="img/logo.png">
 </div>
 <table class="table">
    <tr>
        <th>Date</th>
        <th>Work Order</th>
        <th>Card No.</th>
        <th>Name</th>
        <th>Car Model</th>
        <th>Plate No.</th>
        <th>Transaction Type</th>
        <th>Amount</th>
    </tr>
    @foreach ($completed as $complete)
    <tr>
        <td>{{ $complete['transaction_date'] }}</td>
        <td>{{ $complete['work_order'] }}</td>
        <td>{{ $complete['member']['card_no'] }}</td>
        <td>{{ $complete['name'] }}</td>
        <td>
        @if($complete['transaction_type'] == 'member')
        {{ $complete['property']['vehicle']['vehicle_name'] }}
        @else
        {{ $complete['vehicle']['vehicle_name'] }}
        @endif
        </td>
        <td>{{ $complete['plate_no'] }}</td>
        <td>{{ $complete['transaction_type'] }}</td>
        <td>₱{{ $complete['payment']['total'] }}</td>
    </tr>
    @endforeach
 </table>
</body>
</html>