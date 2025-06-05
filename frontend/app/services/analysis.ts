import axios from 'axios';
import { Session } from 'next-auth';

// Fetch semantic analysis result for a document
export async function getSemanticAnalysis(documentId: string, session?: Session) {
  const res = await axios.get(`/api/analysis/semantic_results`, {
    params: { task_id: documentId },
    headers: session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {},
  });
  return res.data;
}

// Fetch argument analysis result for a document
export async function getArgumentAnalysis(documentId: string, session?: Session) {
  const res = await axios.get(`/api/analysis/argument_results`, {
    params: { task_id: documentId },
    headers: session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {},
  });
  return res.data;
}

// (Future) Fetch citation detection result for a document
export async function getCitationAnalysis(documentId: string, session?: Session) {
  const res = await axios.get(`/api/analysis/citation_results`, {
    params: { task_id: documentId },
    headers: session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {},
  });
  return res.data;
}

// (Future) Fetch knowledge graph result for a document
export async function getKnowledgeGraph(documentId: string, session?: Session) {
  const res = await axios.get(`/api/analysis/knowledge_graph_results`, {
    params: { task_id: documentId },
    headers: session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {},
  });
  return res.data;
}
