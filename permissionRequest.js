name = createdBy.name;
$fromTime = datetime\addMinutes(fromtime, 330);
$toTime = datetime\addMinutes(totime, 330);
$perTime = datetime\diff($fromTime, $toTime, "minutes")+ 120;
$curDay = datetime\format(datetime\now(), "Asia/Kolkata", "DD");
$currMonth = datetime\format(datetime\now(), "Asia/Kolkata", "MM");
$empM_id = array\at(createdBy.empMpsIds, 0);
$empY_id = array\at(createdBy.empYpsIds, 0);

ifThen(status == "Approved" && final == true,
    //1
    record\update("User", createdById,
        "permissiontaken", createdBy.permissiontaken + $perTime,
        "yearlypermissiontime", createdBy.yearlypermissiontime + $perTime
    );
    //2
    ifThen($currMonth != 02,
        ifThenElse($curDay == 30 || $curDay == 31,
            record\update("EmpMp", $empM_id,
                "permissionTime", empMp.permissionTime + $perTime
            ),
            record\update("EmpMp", $empM_id,
                "permissionTime", createdBy.permissiontaken + $perTime
            )
        )
    );
    //3
    ifThen($currMonth == 02,
        ifThenElse($curDay == 28 || $curDay == 29,
            record\update("EmpMp", $empM_id,
                "permissionTime", empMp.permissionTime + $perTime
            ),
            record\update("EmpMp", $empM_id,
                "permissionTime", createdBy.permissiontaken + $perTime
            )
        )
    );
    //4
    ifThenElse($currMonth == 12, 
        ifThenElse($curDay == 31,
            record\update("EmpYp", $empY_id,
                "permissiontime", empYp.permissiontime + $perTime
            ),
            record\update("EmpYp", $empY_id,
                "permissiontime", createdBy.yearlypermissiontime + $perTime
            )
        ), 
        record\update("EmpYp", $empY_id,
            "permissiontime", createdBy.yearlypermissiontime + $perTime
        )
    )
);