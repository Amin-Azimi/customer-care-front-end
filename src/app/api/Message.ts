export type Ticket = {
  id: number;
  subject: string;
  status: 'unresolved' | 'resolved';
  createdAt: Date;
};

export type Message = {
  id: number;
  senderType: 'operator' | 'customer';
  senderId: string;
  text: string;
  createdAt: Date;
};

export type BulkSend = {
  id: number;
  message: string;
  senderId: string;
  status: 'completed' | 'failed' | 'in_progress';
  updateAt: Date;
};

export type BulkSendDetail= Omit<BulkSend,'senderId'> &{
  successCount: number;
  failureCount: number;
  pendingCount: number;
  tickets:{
    id: number;
    status: 'failed' | 'pending' | 'sent'
  }[];
};

export type ResponseBody<T>={
  data: T[];
}
