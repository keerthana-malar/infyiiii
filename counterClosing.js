amt2000 = 2000 * note2000;
amt500  = 500  * note500;
amt200  = 200  * note200;
amt100  = 100  * note100;
amt50   = 50   * note50;
amt20   = 20   * note20;
amt10   = 10   * note10;
amt5    = 5    * note5;

name = branch.name;
cash = amt2000 + amt500 + amt200 + amt100 + amt50 + amt20 + amt10 + amt5;
netCash = cash + cardMachine - fixedPettyCash ;




$stage1 = (totalSales - deliverySales);
$stage2 = $stage1 - expenses;
$stage3 = $stage2 - netCash;
shortage = $stage3;
overAllBalance = $stage3;
toAccountsDepartment = (cash - nextDayPettyCash) + outdoorSales;