const model = require('../models/trade');

exports.index = (req, res, next) => {
    model.find()
        .then(trades => res.render('./trade/trades.ejs', { trades }))
        .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./trade/newTrade.ejs');
};

exports.create = (req, res, next) => {
    let trade = new model(req.body);
    trade.save()
        .then(trade => res.redirect('/trades'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        })

};

exports.show = (req, res, next) => {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('This is an invalid trade item id.');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
        .then(trade => {
            if (trade) {
                res.render('./trade/trade.ejs', { trade });
            } else {
                let err = new Error('Cannot find a trade item with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err))
};

exports.edit = (req, res, next) => {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('This is an invalid trade item id.');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
        .then(trade => {
            if (trade) {
                res.render('./trade/edit.ejs', { trade });
            } else {
                let err = new Error('Cannot find a trade item with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err))
};

exports.update = (req, res, next) => {
    let trade = req.body;
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('This is an invalid trade item id.');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, trade, { useFindAndModify: false, runValidators: true })
        .then(trade => {
            if (trade) {
                res.redirect('/trades/' + id);
            } else {
                let err = new Error('Cannot find a trade item with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('This is an invalid trade item id.');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(trade => {
            if (trade) {
                res.redirect('/trades');
            } else {
                let err = new Error('Cannot find a trade item with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};