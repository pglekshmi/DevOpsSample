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

const DataModel = mongoose.model("inputs",dataSchema);
export default DataModel;