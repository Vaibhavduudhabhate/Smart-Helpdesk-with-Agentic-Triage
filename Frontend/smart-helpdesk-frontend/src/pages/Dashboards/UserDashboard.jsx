import React, { useState } from 'react'
import NewTicket from '../../components/CreateTicket.jsx'
import TicketList from '../../components/TicketList.jsx'

export const UserDashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTicketCreated = () => {
    setRefresh(prev => !prev);
  };
  return (
    <div>
      <NewTicket onTicketCreated={handleTicketCreated}/>
      <TicketList refresh={refresh} />
    </div>
  )
}
