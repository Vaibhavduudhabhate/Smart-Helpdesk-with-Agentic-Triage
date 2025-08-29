import React from 'react'
import NewTicket from '../../components/CreateTicket'
import TicketList from '../../components/TicketList'
import TicketDetail from '../../components/TicketDetailReply'

export const UserDashboard = () => {
  return (
    <div>
      <NewTicket />
      <TicketList />
      <TicketDetail />
    </div>
  )
}
