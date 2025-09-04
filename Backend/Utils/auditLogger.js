import AuditLog from "../Model/auditLog.js";

export const logAuditEvent = async ({ traceId, ticketId, step, data }) => {
  await AuditLog.create({
    traceId,
    ticketId,
    step,
    data,
  });
};
