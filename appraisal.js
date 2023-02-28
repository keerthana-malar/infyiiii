name = user.userName;
totalovertime = user.overtimeyearly;
totallate = user.latetimeyearly;
totalleavetaken = user.leavetakenyearly;
$new_sal = user.basicsalary + amount;

ifThen(
    status == "Approved" && final == true, 
    record\update('User', userId, 'basicsalary', $new_sal);
);