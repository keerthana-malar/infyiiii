$item_price = qty * price;

//GST Calculations

ifThen(
    tax == 'with', 
    
    ifThen(
        gst == 'IGST@0.25%'||'GST@0.25%', 
        $gst_amt = ($item_price * 0.25)/100;
        gstamount = $gst_amt
    );
        
    ifThen(
        gst == 'IGST@3%'||'GST@3%', 
        $gst_amt = ($item_price * 3)/100;
        gstamount = $gst_amt
    );
    
    ifThen(
        gst == 'IGST@5%'||'GST@5%', 
        $gst_amt = ($item_price * 5)/100;
        gstamount = $gst_amt
    );
    
    ifThen(
        gst == 'IGST@12%'||'GST@12%', 
        $gst_amt = ($item_price * 12)/100;
        gstamount = $gst_amt
    );
    
    ifThen(
        gst == 'IGST@18%'||'GST@18%', 
        $gst_amt = ($item_price * 18)/100;
        gstamount = $gst_amt
    );
    
    ifThen(
        gst == 'IGST@28%'||'GST@28%', 
        $gst_amt = ($item_price * 28)/100;
        gstamount = $gst_amt
    );
    
    );
    
    //Total
    
    totalamount = $item_price + gstamount - discountamount;
    balance = totalamount - received;
    
    