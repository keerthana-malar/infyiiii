name = createdBy.userName;
balance = createdBy.userbalance;

$perMonthId = array\at(createdBy.empMpsIds, 0);
$perYearId = array\at(createdBy.empYpsIds, 0);

ifThen(
    status == 'approved' && final == true,
    $balanceCur = createdBy.userbalance - amount;
    balance = $balanceCur;
    $expenseAmt = createdBy.expense + amount;
    $expenseAmtYear = createdBy.yearlyexpense + amount;
    record\update('User', createdById , 
        'userbalance', balance, 
        'expense', $expenseAmt,
        'yearlyexpense', $expenseAmtYear
    );
    record\update('EmpMp', $perMonthId,
        'expense', $expenseAmt
    );
    record\update('EmpYp', $perYearId,
        'expense', $expenseAmtYear
    );
);