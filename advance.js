name = user.userName;
balance = user.userbalance;

$perMonthId = array\at(user.empMpsIds, 0);
$perYearId = array\at(user.empYpsIds, 0);

ifThen(
    status == 'Approved' && final == true,
    $balanceCur = user.userbalance + advanceAmount;
    balance = $balanceCur;
    $advanceAmt = user.advance + advanceAmount;
    $advanceAmtYear = user.yearlyadvance + advanceAmount;
    record\update('User', userId,
        'userbalance', balance, 
        'advance', $advanceAmt,
        'yearlyadvance', $advanceAmtYear
    );
    record\update('EmpMp', $perMonthId,
        'advance', $advanceAmt
    );
    record\update('EmpYp', $perYearId,
        'advance', $advanceAmtYear
    )
    );