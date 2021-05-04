const { red } = require('colors')
const Transaction = require('../models/Transaction')

//@desc Get all transactions
//@route GET /api/v1/transactions
//@access public

exports.getTransactions = async (req, res, next) => {
    try{ 
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })

    } catch (err) {
        return res.status(500).json({
            success: false, 
            error: "Something went wrong"
        })
    }
}

//@desc Add all transactions
//@route POST /api/v1/transactions
//@access public

exports.addTransactions = async (req, res, next) => {
    try {
        const {text, amount} = req.body //What the fuck does this do?

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message); //error message within schema
            return res.status(400).json({
                success: false,
                error: message
            })
        } else {
            return res.status(500).json({
                success: false, 
                error: 'Server Error'
            });
        }
    }
}

//@desc Delete all transactions
//@route DELETE /api/v1/transactions/:id
//@access public

exports.deleteTransactions = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id); //req.params.id to access whatever is passed in
        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transactions found'
            })
        } else {
            await transaction.remove();
            return res.status(200).json({
                success: true, 
                data: {}
            })
        }
    } catch(err) {
        return res.status(500).json({
            success: false, 
            error: "Something went wrong"
        })
    }
}

