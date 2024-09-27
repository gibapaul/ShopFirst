const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user',
    },
    cart:{
        type: Array,
        default: []
    },
    address:[{type: mongoose.Types.ObjectId, ref: 'Address'}],
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Product'}],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
    passwordChangeAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    },

},{
    timestamps: true
});
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next(); // Chỉ băm nếu mật khẩu đã thay đổi
    const salt = await bcrypt.genSalt(10); // Sử dụng hàm bất đồng bộ
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Tiến tới bước tiếp theo
})

//Export the model
module.exports = mongoose.model('User', userSchema);
