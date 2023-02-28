$bank_bal = mainaccount.balance;

ifThen(drcr == 'credit' && status == "Credited" && final == true,
    $new_bal = $bank_bal + amount;
    record\update("Mainaccount", mainaccountId,
    'balance', $new_bal
    )
);
ifThen(drcr == 'debit' && status == "Debited" && final == true,
    $new_bal = $bank_bal - amount;
    record\update("Mainaccount", mainaccountId, 
    'balance', $new_bal
    )
);