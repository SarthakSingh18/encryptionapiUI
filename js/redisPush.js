const redis=require("redis");
const redisClient=redis.createClient({       //must change hostname according to dockerswarm file
    host:'localhost',
    port:6379
}) 

redisClient.on("error",function(){
    console.log("error");
})

module.exports={
redishPushKey: function(key){
    redisClient.set(key,1);
}
}