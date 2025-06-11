import Task from "../models/task.model.js";
import mongoose from "mongoose";

export const getTasks = async (req,res)=>{
    try{
      const tasks = await Task.find({ user: req.user._id }); // only user's tasks
      res.status(200).json({success:true, data:tasks});
    }
    catch(error){
        console.log("error in fetching tasks : "+error);
        res.status(500).json({success:false, message:"Internal server error"});
   }
}

export const updateTask= async (req,res)=>{
    const taskId = req.params.id;
    const taskBody = req.body;

    if(mongoose.Types.ObjectId.isValid(taskId) === false){
        return res.status(404).json({message:"Invalid task ID"});
    }

    try{
        const updatedTask = await Task.findOneAndUpdate(
          { _id: taskId, user: req.user._id }, // only update user's own task
          taskBody,
          {new:true}
        );
        if(!updatedTask) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({success:true, data:updatedTask});
    }
    catch(error){
        console.log("error in updating task : "+error);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const createTask = async (req,res)=>{

    const taskBody = req.body;
    if(!req.body.title || !req.body.description|| !req.body.dueDate){
        return res.status(400).json({message:"Please add title, description and due date"});
    }

    const newTask = new Task({ ...taskBody, user: req.user._id }); // associate with user

    try{
        await newTask.save();
        res.status(201).json({success:true, data:newTask});
    }
    catch(error){
        console.log("error in creating task : "+error);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const deleteTask = async (req,res)=>{
    const taskId = req.params.id;

    try{
        const task = await Task.findOneAndDelete({ _id: taskId, user: req.user._id }); // only delete user's own task
        if(!task) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({success:true, message:"Task deleted successfully"});
    }
    catch(error){
        console.log("error in deleting task : "+error);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const getSingleTask = async (req,res)=>{
    const taskId = req.params.id;

    if(mongoose.Types.ObjectId.isValid(taskId) === false){
        return res.status(404).json({message:"Invalid task ID"});
    }

    try{
        const task = await Task.findOne({ _id: taskId, user: req.user._id }); // only user's own task
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({success:true, data:task});
    }
    catch(error){
        console.log("error in fetching single task : "+error);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}