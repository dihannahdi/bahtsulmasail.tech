import { useQuery } from '@tanstack/react-query';
import { getSemanticAnalysis, getArgumentAnalysis } from '../services/analysis';
import { Session } from 'next-auth';

export function useSemanticAnalysis(documentId: string, session?: Session) {
  return useQuery(['semantic-analysis', documentId], () => getSemanticAnalysis(documentId, session), {
    enabled: !!documentId,
  });
}

export function useArgumentAnalysis(documentId: string, session?: Session) {
  return useQuery(['argument-analysis', documentId], () => getArgumentAnalysis(documentId, session), {
    enabled: !!documentId,
  });
}
