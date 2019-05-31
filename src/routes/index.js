const express = require('express');
const expressRouter = express.Router();
const { isLoggedIn } = require('../lib/helper_auth');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('you_api');

expressRouter.get('/', isLoggedIn, (req, res) => {
    res.render('index');
});

expressRouter.get('/news', isLoggedIn, (req, resul, next) => {
    
    newsapi.v2.everything({
        q: 'general',
        language: 'de',
        page: 3
      }).then(res=>{
          console.log(res.articles[2].title);
        var news2= res.articles;
        resul.render('apinews', { news2 })
        console.log(res.articles);
          
        
      })
    .catch(function(error) {
      console.log(error)
    })
    
});

expressRouter.post('/buscar', isLoggedIn, (req, resul, next) => {
    let busqueda=req.body.busqueda;
    let pais=req.body.pais;
    newsapi.v2.everything({
        q: busqueda,
        language: pais,
        page: 3
      }).then(res=>{
          console.log(res.articles[2].title);
        var news2= res.articles;
        resul.render('apinews', { news2 })
        console.log(res.articles);
          
        
      })
    .catch(function(error) {
      console.log(error)
    })
    
});



module.exports = expressRouter;