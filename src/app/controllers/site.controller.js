
class SiteController {
    // HttpRequestMethod:[Get] - route: "/"
    index(req, res, next) {
        return res.render('home');
    }
    // [Get] route: "/search"
    search(req, res, next) {
        return res.render('search');
    }
}

module.exports = new SiteController;