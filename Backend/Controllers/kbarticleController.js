import kbarticalModel from "../Model/kbarticalModel.js";

export const kbListController = async (req, res) => {
  try {
    const articles = await kbarticalModel.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching KB articles", error: err.message });
  }
}

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
    // Pick only allowed fields from req.body
    const updates = {};
    const allowedFields = ["title", "body", "tags", "status"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updated = await kbarticalModel.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "KB Article not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteKbController = async(req,res)=>{
    try {
    await kbarticalModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}