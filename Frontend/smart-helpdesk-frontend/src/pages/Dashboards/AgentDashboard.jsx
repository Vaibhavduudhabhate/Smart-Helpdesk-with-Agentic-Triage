// pages/Dashboard.jsx
import { useState } from "react";
import TicketList from "../../components/TicketListAgent.jsx";
import TicketDetail from "../../components/TicketDetailAgent.jsx";


export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="flex">
      {/* <Sidebar onNavigate={() => {}} /> */}
      {!selectedTicket ? (
        <TicketList onSelect={setSelectedTicket} />
      ) : (
        <TicketDetail ticketId={selectedTicket} onBack={() => setSelectedTicket(null)} />
      )}
    </div>
  );
}
