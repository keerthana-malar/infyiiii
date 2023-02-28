balance = user.userbalance;
workingdays = user.workingdays;
basicsalary = user.basicsalary;
leaveTaken = user.leavetaken;
name = user.userName;

$perMonthId = array\at(user.empMpsIds, 0);
$perYearId = array\at(user.empYpsIds, 0);

$wd31 = (31 - leaveTaken);
$wd30 = (30 - leaveTaken);
$wd29 = (29 - leaveTaken);
$wd28 = (28 - leaveTaken);

$perDay31 = (basicsalary / $wd31) * $wd31;
$perDay30 = (basicsalary / $wd30) * $wd30;
$perDay29 = (basicsalary / $wd29) * $wd29;
$perDay28 = (basicsalary / $wd28) * $wd28;

$totalSalary31 = ($perDay31 + incentive) - balance;
$totalSalary30 = ($perDay30 + incentive) - balance;
$totalSalary29 = ($perDay29 + incentive) - balance;
$totalSalary28 = ($perDay28 + incentive) - balance;

ifThen(
    month == 'January' ||
    month == 'March' ||
    month == 'May' ||
    month == 'July' ||
    month == 'August' ||
    month == 'October' ||
    month == 'December',
    totalsalary = $totalSalary31;
    ifThen(
    salarystatus == 'approved' && final == true,
        record\update('User', userId , 
        'workingdays' , 0,
        'userbalance' , 0,
        'advance', 0,
        'expense', 0,
        'leavetaken' , 0,
        'overtime', 0,
        'latetime', 0,
        'permissiontaken', 0,
        'yearlysalary', user.yearlysalary + totalsalary,
        'salary', totalsalary,
        'yearlyincentive', user.yearlyincentive + incentive,
        'incentive', incentive
    );
    record\update("EmpMp",$perMonthId, 
    'salary', totalsalary, 
    'incentive', incentive
    );
    record\update("EmpYp",$perYearId, 
    'salary', user.yearlysalary + totalsalary, 
    'incentive', user.yearlyincentive + incentive
    );
)
);

ifThen(
    month == 'April' ||
    month == 'June' || 
    month == 'September' ||
    month =='November', 
    
    totalsalary = $totalSalary30;
    ifThen(
    salarystatus == 'approved' && final == true,
        record\update('User', userId , 
        'workingdays' , 0,
        'userbalance' , 0,
        'advance', 0,
        'expense', 0,
        'leavetaken' , 0,
        'overtime', 0,
        'latetime', 0,
        'permissiontaken', 0,
        'yearlysalary', user.yearlysalary + totalsalary,
        'salary', totalsalary,
        'yearlyincentive', user.yearlyincentive + incentive,
        'incentive', incentive
    );
    record\update("EmpMp",$perMonthId, 
    'salary', totalsalary, 
    'incentive', incentive
    );
    record\update("EmpYp",$perYearId, 
    'salary', user.yearlysalary + totalsalary, 
    'incentive', user.yearlyincentive + incentive
    );
)
    );
    
ifThen(
    month == 'February' && leapyear == 'Yes', 
    totalsalary = $totalSalary29;
    ifThen(
    salarystatus == 'approved' && final == true,
        record\update('User', userId , 
        'workingdays' , 0,
        'userbalance' , 0,
        'advance', 0,
        'expense', 0,
        'leavetaken' , 0,
        'overtime', 0,
        'latetime', 0,
        'permissiontaken', 0,
        'yearlysalary', user.yearlysalary + totalsalary,
        'salary', totalsalary,
        'yearlyincentive', user.yearlyincentive + incentive,
        'incentive', incentive
    );
    record\update("EmpMp",$perMonthId, 
    'salary', totalsalary, 
    'incentive', incentive
    );
    record\update("EmpYp",$perYearId, 
    'salary', user.yearlysalary + totalsalary, 
    'incentive', user.yearlyincentive + incentive
    );
)
);

ifThen(
    month == 'February' && leapyear == 'No', 
    totalsalary = $totalSalary28;
    ifThen(
    salarystatus == 'approved' && final == true,
        record\update('User', userId , 
        'workingdays' , 0,
        'userbalance' , 0,
        'advance', 0,
        'expense', 0,
        'leavetaken' , 0,
        'overtime', 0,
        'latetime', 0,
        'permissiontaken', 0,
        'yearlysalary', user.yearlysalary + totalsalary,
        'salary', totalsalary,
        'yearlyincentive', user.yearlyincentive + incentive,
        'incentive', incentive
    );
    record\update("EmpMp",$perMonthId, 
    'salary', totalsalary, 
    'incentive', incentive
    );
    record\update("EmpYp",$perYearId, 
    'salary', user.yearlysalary + totalsalary, 
    'incentive', user.yearlyincentive + incentive
    );
)
);

ifThen(
    salarystatus == 'approved' && final == true && month == 'December',
    record\update('User', userId ,
    'yearlyworkingdays' , 0,
    'leavetakenyearly', 0,
    'yearlypermissiontime', 0,
    'overtimeyearly', 0,
    'latetimeyearly', 0,
    'yearlyadvance', 0,
    'yearlyexpense', 0,
    'yearlysalary', 0,
    'yearlyincentive', 0
    )
);