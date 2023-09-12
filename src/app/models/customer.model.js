
const mongoose = require('mongoose');
const { testConn, customerConn } = require('../../configs/mongoose.config');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const account = new schema({
    balance: {
        type: String,
        maxLength: 50,
        required: true,
        lowcase: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    value: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const customer = new schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    accountId: {
        type: schema.Types.ObjectId,
        ref: 'account'
    },
    username: {
        type: String,
        maxLength: 50,
        required: true,
        lowcase: true,
        unique: true
    },
    status: {type: String},
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 20,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
}, {
    timestamps: true
});

const priod = new schema({
    year: {
        type: Date,
        required: true,
    },
    quarter: {
        type: Date,
        required: true,
    },
    month: {
        type: Date,
        required: true,
    },
    day: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

const financeIndex = new schema({
    priodId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: 'priod'
    },
    ROA: {
        type: Number,
        required: true,
    },
    ROE: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
    profit: {
        type: Number,
        required: true,
    },
    PE: {
        type: Number,
        required: true,
    },
    BVPS: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const product = new schema({
    financeId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: 'finance'
    },
    productName: {
        type: String,
        required: true,
    },
    priceCurrent: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const order = new schema({
    orderDate: {
        type: Date,
        required: true
    },
    accountId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: 'account'
    },
    productId: {
        type: schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    saleperson: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

// Hashing password before saving password

customer.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hashSync(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
})

// Check password when login
customer.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        next(error)
    }
}


// customer database
const Account = customerConn.model('account', account);
const Customer = customerConn.model('customer', customer);
const FinanceIndex = customerConn.model('financeIndex', financeIndex);
const Order = customerConn.model('order', order);
const Product = customerConn.model('product', product);
const Priod = customerConn.model('priod', priod);

// test database
const CustomerTest = testConn.model('customer', customer);

module.exports = { 
    Account,
    Customer,
    FinanceIndex,
    Order,
    Product,
    Priod,
    CustomerTest
};