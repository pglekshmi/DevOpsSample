import mongoose from "mongoose";
const dataSchema = mongoose.Schema({
    key:{
        type:String,
        default:"store",
    },
    data:{
        type:String,
        required: true,
    }
});
const dataSchema2 = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

export const DataModel = mongoose.model("inputs",dataSchema);//mongoose.model(table name,schema)

export const DataModel2 = mongoose.model("login",dataSchema2);