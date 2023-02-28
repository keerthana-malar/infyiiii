name = createdBy.userName;

days = datetime\diff(to,from, "days") + 1;

$current_dt = datetime\now();

$wd = createdBy.workingdays; 
$lt = createdBy.leavetaken + days ;
$pt = createdBy.permissiontaken;
$ot = createdBy.overtime;
$la = createdBy.latetime;
$ad = creadtedBy.advance;
$ex = createdBy.expense;
$sa = createdBy.salary;
$in = createdBy.incentive;

$lty = createdBy.leavetakenyearly + days;

$mo = datetime\format($current_dt, 'Asia/Kolkata', 'MM' );

$yr = datetime\format($current_dt, 'Asia/Kolkata', 'YYYY');

$per_id = array\at(createdBy.empMpsIds, 0);
$pery_id = array\at(createdBy.empYpsIds, 0);


ifThen( status=='Approved',
    //1
    record\update('User', createdById , 'leavetaken', $lt,
    'leavetakenyearly', $lty
    );
    //2
    ifThenElse(
    $wd == "0" && $lt <= days,
    record\create('EmpMp',
        'name', name,
        'userId', createdById,
        'month', $mo,
        'year', $yr,
        'workingdays', $wd,
        'leaveTaken', $lt,
        'permissionTime', $pt,
        'overTime', $ot,
        'lateTime', $la,
        'advance', $ad,
        'expense', $ex,
        'salary', $sa,
        'incentive', $in
    ),
    record\update('EmpMp', $per_id,
        'leaveTaken', $lt,
    )
    );
    //3
    ifThenElse( $mo == "01" && $wd == "0" && $lt <= days,
    record\create('EmpYp',
        'name', name,
        'userId', createdById,
        'year', $yr,
        'workingdays', $wd,
        'leavetaken', $lty,
        'permissiontime', $pt,
        'overtime', $ot,
        'latetime', $la,
        'advance', $ad,
        'expense', $ex,
        'salary', $sa,
        'incentive', $in
    ),
    record\update('EmpYp', $pery_id,
        'leavetaken', $lty
    )
    )
    );
    
    