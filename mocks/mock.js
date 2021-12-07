const banner = require('./banner.json');

module.exports = (req,res,next) => {

    console.log(req);
    console.log(res);
    console.log(next);

    return {
        banner
    }
}