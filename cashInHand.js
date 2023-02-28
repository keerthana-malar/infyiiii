$cashblnc = mainaccount.balance;

ifThen(drcr == 'credit' && status == 'credited' && final == true,
    $newbalance = $cashblnc + amount;
    record\update('Mainaccount', mainaccountId, 'balance', $newbalance)
);

ifThen(drcr == 'debit' && status == 'debited' && final == true,
    $newbalance = $cashblnc - amount;
    record\update('Mainaccount', mainaccountId, 'balance', $newbalance)
);