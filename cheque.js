$bank_bal = mainaccount.balance;

//Credit
ifThen(drcr == 'credit' && status == 'credited' && final = true,
    $new_bal = $bank_bal + amount;
    record\create('BankAccounts', 'name', name,
        'date', date,
        'drcr', 'credit',
        'fromto', 'account',
        'accountId', accountId,
        'amount', amount,
        'status', status
    );
    record\update('Mainaccount', mainaccountId,
        'balance', $new_bal
    )
);
//Debit
ifThen(drcr == 'debit' && status == 'debited' && final = true,
    $new_bal = $bank_bal - amount;
    record\create('BankAccounts', 'name', name,
        'date', date,
        'drcr', 'debit',
        'fromto', 'account',
        'accountId', accountId,
        'amount', amount,
        'status', status
    );
    record\update('Mainaccount', mainaccountId,
        'balance', $new_bal
    )
);