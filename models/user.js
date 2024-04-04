const mongoose=require('mongoose');


const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    devices:{
        items:[
            {
                productId:{
                    type:Schema.Types.ObjectId,
                    ref:'Device',
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }

            }
        ]
    }

})
userSchema.methods.addDevice = function(device) {
    const cartProductIndex = this.devices.items.findIndex(cp => {
      return cp.deviceId.toString() === device._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.devices.items];
  
    if (cartProductIndex >= 0) {
      newQuantity = this.devices.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        deviceId: device._id,
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
  };

userSchema.methods.addDevice=function(deviceId){
    this.devices.items.push(deviceId);
}
module.exports=mongoose.model('User',userSchema);