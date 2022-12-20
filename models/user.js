const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const roles = ['admin', 'customer', 'client'];

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return this.isNew;
        },
        select: false
    },
    role: {
        type: String,
        enum: roles,
        default: 'customer'
    },
    hasRootAccess: {
        type: Boolean,
        default: false
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
        select: false
    }
}, {
    timestamps: true,
    statics: {
        roles: roles,
        async authenticate(email, password) {
            const user = await this.findOne({ email: email }).select('password');
            if(user) {
                if(await comparePassword(password, user.password)) {
                    return user;
                }
            }
            return false;
        },
    },
});

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) user.password = await hashPassword(user.password);
    next();
})

module.exports = mongoose.model("User", userSchema);