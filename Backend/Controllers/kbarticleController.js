import kbarticalModel from "../Model/kbarticalModel.js";

export const kbsearchController = async(req ,res) =>{
    try {
    const query = req.query.query || "";
    const regex = new RegExp(query, "i"); // case-insensitive search
    const articles = await kbarticalModel.find({
      $or: [{ title: regex }, { body: regex }, { tags: regex }],
    }).sort({ updatedAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const addNewKbController = async(req,res)=>{
    try {
        const { title, body, tags, status } = req.body;
        const article = new kbarticalModel({ title, body, tags, status });
        await article.save();
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const upadteKbController = async(req,res)=>{
    try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteKbController = async(req,res)=>{
    try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}