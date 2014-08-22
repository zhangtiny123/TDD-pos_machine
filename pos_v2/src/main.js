//TODO: Please write code in this file.
var printInventory = function (inputs) {
    var list = [];
    var pay_list;
    var free_list;
    var i = 0;
    while(i < inputs.length){
        if (has_item_in_list(list, inputs[i])){
            list[position_in_list(get_input_barcode(inputs[i]),list)].count_plus(get_input_item_number(inputs[i]));
            list[position_in_list(get_input_barcode(inputs[i]),list)].calculate_total_price();
        }
        else {
            var barcode = get_input_barcode(inputs[i]);
            var item = Item.find_by_barcode(barcode);
            var counting = new Counting(item.name, item.barcode, item.price, item.unit);
            counting.count_plus(get_input_item_number(inputs[i]));
            counting.calculate_total_price();
            list.push(counting);
        }
        i += 1;
    }

    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };

    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

    pay_list = get_pay_list(list);
    free_list = get_free_list(list);

    var print_text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' +
            pay_list+
        '----------------------\n' +
        '挥泪赠送商品：\n' +
            free_list+
        '----------------------\n' +
        '总计：' + calculate_total_payments(list) + '(元)\n' +
        '节省：' + calculate_saved_money(list) + '(元)\n' +
        '**********************';

    console.log(print_text);


};

var has_item_in_list = function(list, inputs){
    for(var j=0; j<list.length; j++){
        if (get_input_barcode(inputs) == list[j].barcode){
            return true;
        }
    }
    return false;
};

var position_in_list = function(barcode, list){
    for (var i=0; i<list.length; i++){
        if (list[i].barcode == barcode){
            return i;
        }
    }
    return null;
};

var get_pay_list = function(list){
    var pay_list = '';
    for (var k=0; k<list.length; k++){
        pay_list +=
            '名称：' + list[k].name + '，数量：' + list[k].count + list[k].unit +
                '，单价：' + list[k].price.toFixed(2) + '(元)，小计：' + list[k].total_price.toFixed(2) + '(元)\n'
    }
    return pay_list;
};

var get_free_list = function(list){
    var free_list = '';
    for (var k1=0; k1<list.length; k1++){
        if(list[k1].promotion_number != 0){
            free_list +=
                '名称：' + list[k1].name + '，数量：' + list[k1].promotion_number + list[k1].unit + '\n'
        }
    }
    return free_list;
};

var calculate_total_payments = function(counting_list) {
    var total_payments = 0;
    for(var i=0; i<counting_list.length; i++){
        total_payments += counting_list[i].total_price;
    }
    return total_payments.toFixed(2);
};

var calculate_saved_money = function(counting_list) {
    var saved_money = 0;
    for(var i=0; i<counting_list.length; i++){
        if(counting_list[i].promotion_number != 0){
            saved_money += counting_list[i].price * counting_list[i].promotion_number;
        }
    }
    return saved_money.toFixed(2);
}

var get_input_barcode = function(input_item) {
    return input_item.length == 10 ? input_item : input_item.slice(0,10);
};

var get_input_item_number = function(input_item) {
    return input_item.length == 10 ? 1 : parseInt(input_item.slice(11,input_item.length));
};