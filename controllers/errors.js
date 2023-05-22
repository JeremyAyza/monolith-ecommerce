exports.get404Error = (req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

  // Using Pug template engine
  res.status(404).render("404", {
    pageTitle: "Pagina no encontrada - 404",
    path: "/admin",
  });
};