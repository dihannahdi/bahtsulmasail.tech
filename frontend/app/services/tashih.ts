import { authService } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface TaqrirKhass {
  id: string;
  document: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: string;
  status_name: string;
  reviewer?: string;
  review_notes?: string;
  review_date?: string;
  metadata: any;
  document_title: string;
}

interface TaqrirJamai {
  id: string;
  document: string;
  title: string;
  content: string;
  taqrir_khass: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  status: string;
  status_name: string;
  metadata: any;
  document_title: string;
  reviews: TaqrirJamaiReview[];
  taqrir_khass_count: number;
}

interface TaqrirJamaiReview {
  id: string;
  taqrir_jamai: string;
  reviewer: string;
  review_notes: string;
  review_date: string;
  is_approved: boolean;
}

interface DocumentTashihSummary {
  document_id: string;
  document_title: string;
  verification_status: string;
  taqrir_khass_count: number;
  pending_reviews_count: number;
  completed_reviews_count: number;
  has_taqrir_jamai: boolean;
  taqrir_jamai_count: number;
  created_at: string;
  updated_at: string;
}

interface TashihStatistics {
  documents_awaiting_verification: number;
  documents_verified: number;
  documents_rejected: number;
  total_taqrir_khass: number;
  pending_taqrir_khass_reviews: number;
  completed_taqrir_khass_reviews: number;
  total_taqrir_jamai: number;
  taqrir_jamai_needing_reviews: number;
}

interface ReviewQueue {
  pending_taqrir_khass: TaqrirKhass[];
  pending_taqrir_jamai: TaqrirJamai[];
}

class TashihService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Dashboard endpoints
  async getDocumentsAwaitingVerification(): Promise<DocumentTashihSummary[]> {
    const response = await fetch(`${API_BASE_URL}/tashih/dashboard/documents-awaiting-verification/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getMyReviewQueue(): Promise<ReviewQueue> {
    const response = await fetch(`${API_BASE_URL}/tashih/dashboard/my-review-queue/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTashihStatistics(): Promise<TashihStatistics> {
    const response = await fetch(`${API_BASE_URL}/tashih/dashboard/statistics/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // TaqrirKhass endpoints
  async getTaqrirKhassList(params?: { document?: string; status?: string; page?: number }): Promise<any> {
    const searchParams = new URLSearchParams();
    if (params?.document) searchParams.append('document', params.document);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());

    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-khass/?${searchParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTaqrirKhass(id: string): Promise<TaqrirKhass> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-khass/${id}/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createTaqrirKhass(data: {
    document: string;
    title: string;
    content: string;
    metadata?: any;
  }): Promise<TaqrirKhass> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-khass/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async reviewTaqrirKhass(id: string, data: {
    review_notes: string;
    status: string;
  }): Promise<TaqrirKhass> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-khass/${id}/review/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async getTaqrirKhassByDocument(documentId: string): Promise<TaqrirKhass[]> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-khass/by-document/${documentId}/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // TaqrirJamai endpoints
  async getTaqrirJamaiList(params?: { document?: string; status?: string; page?: number }): Promise<any> {
    const searchParams = new URLSearchParams();
    if (params?.document) searchParams.append('document', params.document);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());

    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-jamai/?${searchParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTaqrirJamai(id: string): Promise<TaqrirJamai> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-jamai/${id}/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createTaqrirJamai(data: {
    document: string;
    title: string;
    content: string;
    taqrir_khass: string[];
    metadata?: any;
  }): Promise<TaqrirJamai> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-jamai/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async reviewTaqrirJamai(id: string, data: {
    review_notes: string;
    is_approved: boolean;
  }): Promise<TaqrirJamaiReview> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-jamai/${id}/review/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async getTaqrirJamaiByDocument(documentId: string): Promise<TaqrirJamai[]> {
    const response = await fetch(`${API_BASE_URL}/tashih/taqrir-jamai/by-document/${documentId}/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Verification Status endpoints
  async getVerificationStatuses(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/tashih/verification-statuses/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }
}

export const tashihService = new TashihService();
export type { TaqrirKhass, TaqrirJamai, TaqrirJamaiReview, DocumentTashihSummary, TashihStatistics, ReviewQueue }; 