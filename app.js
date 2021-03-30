const express=require('express');
const app=express();
const port=process.env.PORT || 3000;
const path=require('path');
const indexRouter=require('./routes/indexRouter');
const signRouter=require('./routes/signupRouter');
const signupDeatilsRouter=require('./routes/signupDetails');
app.use(express.urlencoded());
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/',indexRouter);
app.use(express.json());
app.use('/register',signRouter);
app.use('/signupDetails',signupDeatilsRouter);
app.get("/login",(req,res)=>{
      res.render('login',{title:'Success',data:"you are registered"});
})
app.get("*",(req,res)=>{
      res.render('data',{title:'Error 404',data:"You hit end of internet please check your url"});
})
app.post("*",(req,res)=>{
      res.render('data',{title:'Error 404',data:"You hit end of internet please check your url"});
})
app.listen(port,()=>{
      console.log(`listening at ${port}`);
})