fs = require('fs')
data = require('./data.json')

exports.index = function(req,res){
    recipes = data.recipes
    
    for(recipe in recipes)
        recipes[recipe].id = recipe

    return res.render('admin/list', {recipes})
}

exports.create = function(req,res){
    return res.render('admin/create')
}

exports.show = function(req,res){
    const recipeId = req.params.id
    const recipe = data.recipes[recipeId]

    return res.render('admin/show',{recipe})
}

exports.edit = function(req,res){
    const recipeId = req.params.id
    const recipe = data.recipes[recipeId]

    return res.render('admin/edit', {recipe})
}

exports.post = function(req,res){

    for(key of Object.keys(req.body)){
        if(req.body[key] == "" && key != "information"){
            
            res.send(key)
        }
    }
    
    let {image, title, author, ingredients, preparation, information} = req.body

    data.recipes.push({image, title, author, ingredients, preparation, information})

    fs.writeFile('backend/data.json',JSON.stringify(data,null,2), function(err){
        if(err) return res.send('fail writing file')

        return res.redirect('/admin/recipes')
    })
}

exports.put = function(req,res){
    let {id} = req.body
    let index = 0

    foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(recipe.id == id){
            index=foundIndex
            return true
        }
    })

    

    //check if number of fields on req.body equals number on data.recipes
    if(Object.keys(data.recipes[index]).length != Object.keys(req.body).length) return res.send('Receita incompleta')

    if(!foundRecipe) return res.send('Id de Receita não encontrado')
    
    recipe = {
        ...foundRecipe,
        ...req.body
    }

    data.recipes[index] = recipe

    fs.writeFile('backend/data.json',JSON.stringify(data,null,2), function(err){
        if(err) return res.send('fail writing file')

        return res.redirect('/admin/recipes')
    })
}

exports.delete = function(req,res){
    const {id} = req.body

    filterRecipes = data.recipes.filter(function(recipe, foundIndex){
        return recipe.id != id
    })

    data.recipes = filterRecipes

    fs.writeFile('backend/data.json',JSON.stringify(data,null,2), function(err){
        if(err) return res.send('fail deleting file')

        return res.redirect('/admin/recipes')
    })
}
