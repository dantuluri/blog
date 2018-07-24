var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {

    function getCount()
    {
        return axios.get('https://data.suryad.com/api/blogs/count')
            .then(response => {

              console.log("num blogs "+response.data.count);
               return response.data.count;
            })
            .catch(error => {
              console.log(error);
            });
    }

    function getBlogs()
    {
        return axios.get('https://data.suryad.com/api/blogs')
          .then(response => {

            console.log("blog content ");
            var json = response.data;
        for( var k = 0; k < json.length; k++) {
            var evt1 = new Date(json[k]["date"]);
            json[k]["date"] = evt1.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
        }
        json.reverse();
            console.log(response.data);
            return response.data;
          })
          .catch(error => {
            console.log(error);
          });
    }

    axios.all([getCount(), getBlogs()])
      .then(axios.spread(function (cnt, blg) {
          console.log("IN AXIOS: "+cnt);
          console.log("IN AXIOS: "+blg);
          res.render('index', {
              apiCount: cnt,
              apiBlog: blg
          });
      }));




});

router.get('/about', function(req , res){
  res.render('about');
});

router.get('/:id', function(req , res){
    console.log(req.params.id);
    var id = req.params.id;
    // res.render(req.params.id/post);
    res.render(__dirname + '/../' + id + '/post');
});

module.exports = router;
