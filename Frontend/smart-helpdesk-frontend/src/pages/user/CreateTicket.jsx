import { useState } from "react";
import { createTicket } from "../../api/api";

export default function CreateTicket() {
  const [form, setForm] = useState({ title: "", description: "", category: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(form);
      alert("Ticket created!");
    } catch {
      alert("Failed to create ticket");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2"
        >
          <option value="">Select Category</option>
          <option value="billing">Billing</option>
          <option value="tech">Tech</option>
          <option value="shipping">Shipping</option>
        </select>
        <button type="submit" className="bg-green-600 text-white p-2">
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
