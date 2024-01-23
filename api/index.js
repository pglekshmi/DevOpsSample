import Fastify from "fastify";
import mongoose from "mongoose";
import DataModel from "./dataModel.js"

const fastify = Fastify({logger:true});

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
const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();