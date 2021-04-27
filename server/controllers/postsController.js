import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js'; 

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`Not found id : ${_id}`);
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`Not found id : ${_id}`);
    }

    await PostMessage.findByIdAndDelete(_id);

    res.status(200).json({ message: `Success delete id : ${_id}` });
};

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`Not found id : ${_id}`);
    }

    try {
        const post = await PostMessage.findById(_id);
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 },  { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
