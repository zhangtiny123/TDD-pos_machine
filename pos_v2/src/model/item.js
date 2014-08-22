function Item(barcode, name, unit, price) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
}

Item.find_by_barcode = function(barcode){
    var items = loadAllItems();
    for (var i=0; i<items.length; i++) {
        if (items[i].barcode == barcode) {
            return items[i];
        }
    }
    return null;
};



