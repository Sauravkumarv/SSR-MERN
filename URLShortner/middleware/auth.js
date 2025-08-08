const { getUser, setUser } = require("../services/auth");

async function restricToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");

  const user = await getUser(userUid);

  console.log(user);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req,res,next) {
  const userUid = req.cookies?.uid;

  const user = await getUser(userUid);

  req.user = user;
  next();
}

module.exports = {restricToLoggedinUserOnly,checkAuth};
