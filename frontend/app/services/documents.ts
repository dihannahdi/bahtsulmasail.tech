import axios from 'axios';
import { Session } from 'next-auth';

export async function getDocuments(session?: Session) {
  const res = await axios.get('/api/documents/', {
    headers: session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {},
  });
  return res.data;
}

export async function uploadDocument(formData: FormData, session?: Session) {
  const res = await axios.post('/api/documents/upload/', formData, {
    headers: {
      ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

export async function getOcrStatus(id: string, session?: Session) {
  const res = await axios.get(`/api/documents/${id}/ocr_status/`, {
    headers: session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {},
  });
  return res.data;
}
