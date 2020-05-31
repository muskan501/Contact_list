const express=require('express');
const path=require('path');
const port=6700;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware1
// app.use(function(req,res,next)
// {
//     req.myName="muskan";
//     //console.log('Middleware 1 called');
//     next();
// });

// //middleware2
// app.use(function(req,res,next)
// {
//     console.log("My name from MV2 ",req.myName);
//     //console.log('Middleware 2 called');
//     next();
// });

var contactList=[
    {
        name:"Muskan",
        phone:"2222222222",
        dob:"1997/03/22",
        email:"muskan123@gmail.com"
    },
    {
        name:"Riya",
        phone:"3333333333",
        dob:"1999/03/02",
        email:"riya123@gmail.com"
    },
    {
        name:"Captian",
        phone:"4545454545",
        dob:"1998/03/29",
        email:"captain123@gmail.com"
    }

]

app.get('/',function(req,res)
{
   // console.log("My name from get route ",req.myName);
    //console.log(__dirname);
    // res.send('<h1>Cool, it is running! or is it?</h1>');

    Contact.find({},function(err,contact)
    {
        if(err)
        {
            console.log('Error in fetching contact');
            return;
        }
        return res.render('home',{
            title:"Phone Book",
            contact_list:contact
        });
    });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let us play with ejs"
    });
});

app.post('/contact_list',function(req,res){
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // return res.redirect('practice');
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

   // contactList.push(req.body);

   Contact.create({
       name: req.body.name,
       phone: req.body.phone,
       dob:req.body.birthday,
       email:req.body.email
   } , function(err,newContact)
   {
       if(err)
       {
           console.log('Error in creating contact!');
           return;
       }
       console.log('******',newContact);
       return res.redirect('/');
   });

    //return res.redirect('back');
});

//For deleting contact
app.get('/delete-contact',function(req,res)
{
    //get the query from url from index.js
   // let phone=req.query.phone;

   //get the id from query in url
   let id=req.query.id;

    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1)
    // {
    //     contactList.splice(contactIndex,1);
    // }

    //find contact in database by id and delete it
   
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
        console.log('Error in deleting an object');
        return;
        }
        return res.redirect('back');
    });
   

});

app.get('/form',function(req,res)
{
    return res.render('form',{

    })
})

app.get('/edit',function(req,res)
{
    return res.render('edit',{

    })
})


app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running the server');
    }
    console.log('Server is running on port: ',port);
    
})
