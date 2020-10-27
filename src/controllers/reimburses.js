exports.getReimburse = (req, res, next) => {
    res.json(
        {
            success: true,
            messages: 'Get data reimburse',
            data: {

            }
        }
    );
    next();
}

exports.createReimburse = (req, res, next) => {
    res.json(
        {
            success: true,
            messages: 'Create reimburse success',
            data: {
                id: 1,
                name: 'XXX',
                amount: 70000
            }
        }
    );
    next();
}

exports.listReimburses = (req, res, next) => {
    res.json(
        {
            success: true,
            messages: 'List data reimburses',
            data: {
            
            }
        }
    );
    next();
}

exports.editReimburse = (req, res, next) => {
    res.json(
        {
            success: true,
            messages: 'Update data reimburse',
            data: {

            }
        }
    );
    next();
}

exports.deleteReimburse = (req, res, next) => {
    res.json(
        {
            success: true,
            messages: 'Delete data reimburse',
            data: {

            }
        }
    );
    next();
}