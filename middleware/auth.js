/**
 * Created by home on 2016/12/31.
 */

//auth页面，检验是否登录等
module.exports = {
    authorized: (req, res, next) => {
          if (!req.session.user) {
              // req.flash('error', '未已登录');
              return res.redirect('/login');
          }
          next();
      },
    unauthorized: (req, res, next) => {
          if (req.session.user) {
              // req.flash('error', '已登录');
              return res.redirect('back');
          }
          next();
      }
};