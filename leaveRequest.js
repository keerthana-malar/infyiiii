name = createdBy.name;

//Check in Time
$checkin_d = datetime\today();
$checkin_t = "09:45:00";
$checkin_dt = string\concatenate($checkin_d," ", $checkin_t);

//Check out Time
$checkout_t = "11:00:00";
$checkout_dt = string\concatenate($checkin_d," ", $checkout_t);

//Current Date Time Month
$current_dt = datetime\now();
$dateCur = datetime\format($current_dt, 'Asia/Kolkata', 'DD' );
$monthCur = "01";
$yearCur = datetime\format($current_dt, 'Asia/Kolkata', 'YYYY');

//get User Details
$workingDays = createdBy.workingdays + 1;
$workingDaysYear = createdBy.yearlyworkingdays + 1;
$leaveTaken = createdBy.leavetaken;
$leaveTakenYear = createdBy.leavetakenyearly;
$permissionTime = createdBy.permissiontaken;
$permissionTimeYear = createdBy.yearlypermissiontime;
$advanceAmt = createdBy.advance;
$advanceAmtYear = createdBy.yearlyadvance;
$expenseAmt = createdBy.expense;
$expenseAmtYear = createdBy.yearlyexpense;
$salaryAmt = 0;
$salaryAmtYear = createdBy.yearlysalary;
$incentiveAmt = 0;
$incentiveAmtYear = createdBy.yearlyincentive;

// CheckIn
ifThenElse( attendancetype == "checkin",
        //1
        checkintime = $current_dt;
        //2
        $late_time = datetime\diff(checkintime , $checkin_dt , "minutes") + 330;
        //3
        ifThen(
            $late_time > 0 ,
            late = string\concatenate($late_time ," minutes Late")
        );
        //4
        $lateTime = createdBy.latetime + $late_time;
        $lateTimeYear = createdBy.latetimeyearly + $late_time;
        //5
        record\update('User', createdById ,
        'workingdays' , $workingDays, 
        'yearlyworkingdays' , $workingDaysYear,
        'latetime', $lateTime,
        'latetimeyearly', $lateTimeYear
        );
        //6
        ifThenElse( $workingDays <= "1" && $leaveTaken == "0",
                record\create('EmpMp',
                    'name', name,
                    'userId', createdById,
                    'month', $monthCur,
                    'year', $yearCur,
                    'workingdays', $workingDays,
                    'leaveTaken', $leaveTaken,
                    'permissionTime', $permissionTime,
                    'overTime', $overTime,
                    'lateTime', $lateTime,
                    'advance', $advanceAmt,
                    'expense', $expenseAmt,
                    'salary', $salaryAmt,
                    'incentive', $incentiveAmt
                ),
                $perMonthId = array\at(createdBy.empMpsIds, 0);
                record\update('EmpMp', $perMonthId, 
                    'workingdays', $workingDays,
                    'lateTime', $lateTime
                )
        );
        //7
        ifThenElse( $monthCur == "01" && $leaveTakenYear == "0" && $workingDaysYear <= "1",
                record\create('EmpYp',
                    'name', name,
                    'userId', createdById,
                    'year', $yearCur,
                    'workingdays', $workingDaysYear,
                    'leavetaken', $leaveTakenYear,
                    'permissiontime', $permissionTimeYear,
                    'overtime', $overTime,
                    'latetime', $lateTimeYear,
                    'advance', $advanceAmtYear,
                    'expense', $expenseAmtYear,
                    'salary', $salaryAmtYear,
                    'incentive', $incentiveAmtYear
                ),
                $perYearId = array\at(createdBy.empYpsIds, 0);
                record\update('EmpYp', $perYearId, 
                    'workingdays', $workingDaysYear,
                    'latetime', $lateTimeYear
                )
        ),
        
        $perMonthId = array\at(createdBy.empMpsIds, 0);
        $perYearId = array\at(createdBy.empYpsIds, 0);
        //1
        checkouttime = $current_dt;
        //2
        $over_time = datetime\diff(checkouttime , $checkout_dt , 'minutes')  + 330;
        //3
        ifThen(
            $over_time > 0,
            overtime = string\concatenate($over_time," minutes overtime")
        );
        //4
        $overTime = createdBy.overtime + $over_time;
        $overTimeYear = createdBy.overtimeyearly + $over_time;
        //5
        record\update('User', createdById , 
            'overtime', $overTime,
            'overtimeyearly', $overTimeYear
        );
        //6
        record\update('EmpMp', $perMonthId, 
            'overTime', $overTime
        );
        //7
        record\update('EmpYp', $perYearId, 
            'overtime', $overTimeYear
        )
);

ifThen(
    workingfrom == "office", 
    locationStreet = "hari Complex";
    locationCity = "Coimbatore";
    locationState = "Tamilnadu";
    locationPostalCode = 641035;
    );
    
ifThen(
    workingfrom == "outside", 
    locationStreet = account.billingAddressStreet;
    locationCity = account.billingAddressCity;
    locationCountry = account.billingAddressCountry
    locationPostalCode = account.billingAddressPostalCode;
    locationState = account.billingAddressState;
    ); 
