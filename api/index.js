import Fastify from "fastify";
import cors from "@fastify/cors"
import mongoose from "mongoose";
import {DataModel,DataModel2} from "./dataModel.js"

const fastify = Fastify({logger:true});
fastify.register(cors, {
    origin: true
})

fastify.get("/",async (request,reply)=>{
    return {hello:"world"};
});
let uri="mongodb+srv://lekshmipg:souparnika@cluster0.qtjjcqm.mongodb.net/DevOpsDB?retryWrites=true&w=majority";
mongoose.connect(uri);

fastify.post('/data', async (request, reply) => {
    const existingData = await DataModel.findOne({ key: "store" })
    if (existingData) {
        existingData.data = request.body.data
        await existingData.save()
    } else {
        const data = new DataModel({ data: request.body.data })
        await data.save()
    }
    reply.code(201).send({ message: "Success" });
})
fastify.get("/data",async(request,reply)=>{
 const data = await DataModel.findOne({key:"store"});
 let result= data.data;
 reply.code(200).send({data:result});
})
fastify.post('/store', async (request, reply) => {
    console.log(request.body.data1);
    const existingData = await DataModel2.findOne({username:request.body.data1})
    if (existingData) {
       existingData.password = request.body.data2;
        await existingData.save();
    } else {
        const data = new DataModel2({ username: request.body.data1,password:request.body.data2 })
        await data.save()
    }
    reply.code(201).send({ message: "Success" });
})
fastify.post("/check",async(request,reply)=>{
    const data = await DataModel2.findOne({username:request.body.data1});
    let result= data.password;
    if(request.body.data2==result){
        reply.code(200).send({message:"Login Successful"});
    }
    else
    {
        reply.code(400).send({message:"Check your username & Password"});
    }
    // console.log(result);
    // reply.code(200).send({data:result});
   })
const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();