var home = function(req, res){
  res.render("home", {heading_text: '"Welcome to <b>KittiCat!</b>"'});
};

module.exports.home = home;