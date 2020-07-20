const data = require('./data.json')

//index
exports.index = function(req,res){
    recipes = data.recipes
    for(recipe in recipes)
        recipes[recipe].id = recipe

    return res.render('user/index', {recipes})
}

//receitas
exports.recipes = function(req,res){
    recipes = data.recipes
    for(recipe in recipes)
        recipes[recipe].id = recipe

    return res.render('user/recipes',{recipes})
}

//sobre
exports.about = function(req,res){
    return res.render('user/about')
}

//detalhes
exports.show = function(req,res){
    
    const recipeIndex = req.params.index
    const recipe = data.recipes[recipeIndex]
    return res.render('user/show',{recipe})
}

