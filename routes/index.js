
function getLocale() {
    if (typeof window === 'undefined' || navigator == null || navigator.language == null) {
        return 'es-AR'
    }
  
    if (navigator.languages != null) {
        return navigator.languages[0];
    }
  
    return navigator.language
  }
  

class Routes {
    static _dateString(date) {
        date = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const locale = getLocale();
    
        const dateStr = date.toLocaleDateString(locale, options);
    
        return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }

    static init(app, apiGhost) {
        //Routes
        app.get('/', async function (req, res) {
            try{
                console.log('en la home');
            const posts = await apiGhost.posts.browse({ limit: 4, include: 'tags,authors' });  
            res.render('index', {
                posts: posts.map(post => ({...post, published_at: Routes._dateString(post.published_at)}))
            });     
            }catch(err){
                res.render(`404 not found ${err}`);
            }  
        })
        
        app.get('/downloads', function (req, res) {
            res.render('downloads');
        })

        app.get('/noticias',async function (req, res) {
            try{
                const posts = await apiGhost.posts.browse({ limit: 5, include: 'tags,authors' });  
                res.render('noticias', {
                    posts: posts
                });     
            }catch(err){
                res.render('notfound');
            }  
        })

        app.get('/aboutus', function (req, res) {
            res.render('aboutus');
        })
        
        app.get('*', function (req, res) {
            res.render('notfound');
        })
    }
}

module.exports = Routes