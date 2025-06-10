# Technical Specifications: BahtsulMasail.tech Enhanced Architecture

## System Overview

This document provides detailed technical specifications for implementing the enhanced BahtsulMasail.tech architecture, including API designs, database schemas, algorithmic implementations, and deployment configurations.

## 1. Enhanced Database Schema

### Core Entities

```sql
-- Enhanced Document/Masail Model
CREATE TABLE masail_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    content TEXT,
    category VARCHAR(100) NOT NULL,
    complexity_score DECIMAL(3,2) DEFAULT 0.0,
    urgency_level VARCHAR(20) DEFAULT 'standard',
    workflow_track VARCHAR(20) DEFAULT 'standard',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'submitted',
    submitter_id UUID REFERENCES users(id),
    metadata JSONB,
    embedding VECTOR(768), -- For semantic search
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scholar Profiles with Expertise Mapping
CREATE TABLE scholar_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    madzhab VARCHAR(50),
    expertise_areas TEXT[],
    authority_score DECIMAL(4,2) DEFAULT 0.0,
    availability_status VARCHAR(20) DEFAULT 'available',
    participation_history JSONB,
    verification_status VARCHAR(20) DEFAULT 'pending',
    blockchain_address VARCHAR(66), -- Ethereum address for verification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Argument Mapping System
CREATE TABLE argument_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    masail_id UUID REFERENCES masail_documents(id),
    parent_id UUID REFERENCES argument_nodes(id),
    node_type VARCHAR(20) NOT NULL, -- 'claim', 'evidence', 'rebuttal', 'synthesis'
    content TEXT NOT NULL,
    scholar_id UUID REFERENCES scholar_profiles(id),
    confidence_score DECIMAL(3,2),
    support_count INTEGER DEFAULT 0,
    position_vector VECTOR(128), -- For argument similarity
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Precedent Linkage System
CREATE TABLE precedent_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_masail_id UUID REFERENCES masail_documents(id),
    target_precedent_id UUID REFERENCES masail_documents(id),
    link_type VARCHAR(30), -- 'direct_precedent', 'analogous_case', 'contrasting_view'
    similarity_score DECIMAL(4,3),
    reasoning TEXT,
    verified_by UUID REFERENCES scholar_profiles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consensus Tracking
CREATE TABLE consensus_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    masail_id UUID REFERENCES masail_documents(id),
    scholar_id UUID REFERENCES scholar_profiles(id),
    position VARCHAR(20), -- 'support', 'oppose', 'abstain', 'conditional'
    confidence_level DECIMAL(3,2),
    reasoning TEXT,
    vote_weight DECIMAL(3,2) DEFAULT 1.0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blockchain Verification Records
CREATE TABLE blockchain_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    masail_id UUID REFERENCES masail_documents(id),
    transaction_hash VARCHAR(66) NOT NULL,
    block_number BIGINT,
    contract_address VARCHAR(42),
    ipfs_hash VARCHAR(59), -- Content hash on IPFS
    consensus_level INTEGER,
    participating_scholars UUID[],
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Indexing Strategy

```sql
-- Performance optimization indexes
CREATE INDEX idx_masail_category ON masail_documents(category);
CREATE INDEX idx_masail_status ON masail_documents(status);
CREATE INDEX idx_masail_embedding ON masail_documents USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_scholar_expertise ON scholar_profiles USING gin(expertise_areas);
CREATE INDEX idx_argument_masail ON argument_nodes(masail_id);
CREATE INDEX idx_precedent_source ON precedent_links(source_masail_id);
CREATE INDEX idx_consensus_masail ON consensus_records(masail_id);
```

## 2. AI/ML Pipeline Architecture

### Semantic Search Implementation

```python
# Enhanced semantic search with multilingual support
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

class EnhancedSemanticSearch:
    def __init__(self):
        # Multilingual model supporting Arabic
        self.encoder = SentenceTransformer('sentence-transformers/paraphrase-multilingual-mpnet-base-v2')
        self.arabic_encoder = SentenceTransformer('aubmindlab/bert-base-arabertv02')
        self.index = None
        self.document_ids = []
        
    def build_index(self, documents):
        """Build FAISS index for efficient similarity search"""
        embeddings = []
        self.document_ids = []
        
        for doc in documents:
            # Detect language and use appropriate encoder
            if self.is_arabic_text(doc.content):
                embedding = self.arabic_encoder.encode(doc.content)
            else:
                embedding = self.encoder.encode(doc.content)
            
            embeddings.append(embedding)
            self.document_ids.append(doc.id)
        
        embeddings = np.array(embeddings)
        
        # Create FAISS index
        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatIP(dimension)  # Inner product for cosine similarity
        
        # Normalize embeddings for cosine similarity
        faiss.normalize_L2(embeddings)
        self.index.add(embeddings)
        
    def search(self, query, top_k=10, filters=None):
        """Semantic search with optional filters"""
        if self.is_arabic_text(query):
            query_embedding = self.arabic_encoder.encode([query])
        else:
            query_embedding = self.encoder.encode([query])
            
        faiss.normalize_L2(query_embedding)
        
        # Search in FAISS index
        scores, indices = self.index.search(query_embedding, top_k * 2)  # Get more for filtering
        
        results = []
        for score, idx in zip(scores[0], indices[0]):
            doc_id = self.document_ids[idx]
            if self.apply_filters(doc_id, filters):
                results.append({
                    'document_id': doc_id,
                    'similarity_score': float(score),
                    'rank': len(results) + 1
                })
                
                if len(results) >= top_k:
                    break
                    
        return results
    
    def is_arabic_text(self, text):
        """Detect if text is primarily Arabic"""
        arabic_chars = sum(1 for c in text if '\u0600' <= c <= '\u06FF')
        return arabic_chars / len(text) > 0.3 if text else False
```

### Complexity Scoring Algorithm

```python
class ComplexityAnalyzer:
    def __init__(self):
        self.precedent_threshold = 0.8
        self.variance_threshold = 0.7
        
    def calculate_complexity_score(self, masail):
        """
        Calculate complexity score based on multiple factors
        Returns score between 0.0 (simple) and 1.0 (highly complex)
        """
        factors = {
            'precedent_availability': self._assess_precedent_coverage(masail),
            'cross_madzhab_variance': self._analyze_school_differences(masail),
            'contemporary_relevance': self._assess_modern_context(masail),
            'stakeholder_impact': self._evaluate_community_impact(masail),
            'textual_complexity': self._analyze_language_complexity(masail)
        }
        
        # Weighted combination
        weights = {
            'precedent_availability': 0.3,
            'cross_madzhab_variance': 0.25,
            'contemporary_relevance': 0.2,
            'stakeholder_impact': 0.15,
            'textual_complexity': 0.1
        }
        
        complexity_score = sum(
            factors[factor] * weights[factor] 
            for factor in factors
        )
        
        return min(complexity_score, 1.0)
    
    def _assess_precedent_coverage(self, masail):
        """Check availability and clarity of existing precedents"""
        similar_cases = self.find_similar_precedents(masail.content)
        
        if not similar_cases:
            return 1.0  # No precedents = high complexity
            
        # Calculate average similarity and consensus levels
        avg_similarity = np.mean([case.similarity_score for case in similar_cases])
        avg_consensus = np.mean([case.consensus_level for case in similar_cases])
        
        # Higher similarity and consensus = lower complexity
        precedent_strength = (avg_similarity * avg_consensus) / 100
        return max(0.0, 1.0 - precedent_strength)
    
    def _analyze_school_differences(self, masail):
        """Analyze potential variance across different madzhabs"""
        category_variance = self.get_category_variance(masail.category)
        keyword_variance = self.analyze_controversial_keywords(masail.content)
        
        return min(1.0, (category_variance + keyword_variance) / 2)
    
    def determine_workflow_track(self, complexity_score, urgency_level):
        """Determine appropriate workflow track"""
        if urgency_level == 'emergency':
            return 'emergency'
        elif complexity_score < 0.3:
            return 'expedited'
        elif complexity_score > 0.7:
            return 'comprehensive'
        else:
            return 'standard'
```

### Expert Matching System

```python
class ExpertMatchingEngine:
    def __init__(self):
        self.expertise_model = SentenceTransformer('all-MiniLM-L6-v2')
        
    def recommend_experts(self, masail, max_experts=7):
        """
        Recommend experts using multi-criteria optimization
        """
        # Get all available scholars
        available_scholars = self.get_available_scholars()
        
        # Calculate scores for each scholar
        scored_scholars = []
        for scholar in available_scholars:
            score_components = {
                'expertise_match': self._calculate_expertise_match(masail, scholar),
                'authority_score': scholar.authority_score / 100,  # Normalize to 0-1
                'availability': self._get_availability_score(scholar),
                'diversity_value': self._calculate_diversity_value(scholar, scored_scholars)
            }
            
            # Weighted combination
            total_score = (
                0.4 * score_components['expertise_match'] +
                0.3 * score_components['authority_score'] +
                0.2 * score_components['availability'] +
                0.1 * score_components['diversity_value']
            )
            
            scored_scholars.append({
                'scholar': scholar,
                'total_score': total_score,
                'score_breakdown': score_components
            })
        
        # Sort by score and apply diversity constraints
        scored_scholars.sort(key=lambda x: x['total_score'], reverse=True)
        
        return self._apply_diversity_constraints(scored_scholars, max_experts)
    
    def _calculate_expertise_match(self, masail, scholar):
        """Calculate semantic similarity between masail and scholar expertise"""
        masail_embedding = self.expertise_model.encode(masail.content)
        expertise_text = ' '.join(scholar.expertise_areas)
        expertise_embedding = self.expertise_model.encode(expertise_text)
        
        similarity = np.dot(masail_embedding, expertise_embedding) / (
            np.linalg.norm(masail_embedding) * np.linalg.norm(expertise_embedding)
        )
        
        return max(0.0, similarity)
    
    def _apply_diversity_constraints(self, scored_scholars, max_experts):
        """Ensure madzhab diversity while maintaining quality"""
        selected = []
        madzhab_counts = {}
        
        for scholar_data in scored_scholars:
            scholar = scholar_data['scholar']
            madzhab = scholar.madzhab
            
            # Limit per madzhab to ensure diversity
            max_per_madzhab = max(1, max_experts // 4)  # At least 1, max 25% each
            
            if madzhab_counts.get(madzhab, 0) < max_per_madzhab:
                selected.append(scholar_data)
                madzhab_counts[madzhab] = madzhab_counts.get(madzhab, 0) + 1
                
                if len(selected) >= max_experts:
                    break
        
        return selected
```

## 3. Consensus Algorithm Implementation

```python
class ConsensusEngine:
    def __init__(self):
        self.minimum_participation = 3  # Minimum scholars for valid consensus
        self.time_decay_factor = 0.95  # Decay factor for older votes
        
    def calculate_consensus_metrics(self, masail_id):
        """Calculate comprehensive consensus metrics"""
        votes = self.get_consensus_records(masail_id)
        
        if len(votes) < self.minimum_participation:
            return {
                'consensus_level': 0,
                'confidence': 0,
                'participation_rate': len(votes),
                'status': 'insufficient_participation'
            }
        
        # Time-weighted scoring
        current_time = datetime.now()
        weighted_votes = []
        
        for vote in votes:
            time_diff = (current_time - vote.timestamp).days
            time_weight = self.time_decay_factor ** time_diff
            
            weighted_votes.append({
                'position': vote.position,
                'confidence': vote.confidence_level,
                'scholar_weight': vote.vote_weight,
                'time_weight': time_weight,
                'final_weight': vote.vote_weight * time_weight
            })
        
        # Calculate weighted consensus
        position_scores = self._calculate_position_scores(weighted_votes)
        consensus_level = self._determine_consensus_level(position_scores)
        confidence = self._calculate_confidence(weighted_votes, consensus_level)
        
        return {
            'consensus_level': consensus_level,
            'confidence': confidence,
            'position_breakdown': position_scores,
            'participation_rate': len(votes),
            'status': self._determine_status(consensus_level, confidence)
        }
    
    def _calculate_position_scores(self, weighted_votes):
        """Calculate scores for each position"""
        position_totals = {'support': 0, 'oppose': 0, 'abstain': 0, 'conditional': 0}
        total_weight = sum(vote['final_weight'] for vote in weighted_votes)
        
        for vote in weighted_votes:
            position_totals[vote['position']] += vote['final_weight']
        
        # Normalize to percentages
        return {
            position: (total / total_weight * 100) if total_weight > 0 else 0
            for position, total in position_totals.items()
        }
    
    def _determine_consensus_level(self, position_scores):
        """Determine overall consensus level (0-100)"""
        support_score = position_scores['support']
        conditional_score = position_scores['conditional'] * 0.7  # Partial support
        
        total_positive = support_score + conditional_score
        
        # Consensus thresholds
        if total_positive >= 85:
            return min(100, total_positive)
        elif total_positive >= 60:
            return int(total_positive * 0.8)  # Moderate consensus
        else:
            return int(total_positive * 0.5)  # Weak consensus
```

## 4. Blockchain Integration

### Smart Contract Implementation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BahtsulMasailRegistry is AccessControl, ReentrancyGuard {
    bytes32 public constant SCHOLAR_ROLE = keccak256("SCHOLAR_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");
    
    struct Fatwa {
        bytes32 id;
        string ipfsHash;
        address[] scholars;
        uint256 timestamp;
        bytes32[] precedentHashes;
        uint8 consensusLevel;
        uint8 participationCount;
        bool isImmutable;
        mapping(address => bool) scholarSignatures;
    }
    
    struct Scholar {
        string name;
        string credentials;
        string madzhab;
        uint256 authorityScore;
        bool isVerified;
        uint256 verificationDate;
    }
    
    mapping(bytes32 => Fatwa) public fatwas;
    mapping(address => Scholar) public scholars;
    mapping(bytes32 => bytes32[]) public precedentLinks;
    
    event FatwaProposed(bytes32 indexed id, string ipfsHash, uint256 timestamp);
    event FatwaFinalized(bytes32 indexed id, uint8 consensusLevel, uint256 timestamp);
    event ScholarVerified(address indexed scholar, string name, uint256 timestamp);
    event ScholarSignature(bytes32 indexed fatwaId, address indexed scholar, uint256 timestamp);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MODERATOR_ROLE, msg.sender);
    }
    
    function verifyScholar(
        address scholarAddress,
        string memory name,
        string memory credentials,
        string memory madzhab,
        uint256 authorityScore
    ) external onlyRole(MODERATOR_ROLE) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(authorityScore <= 100, "Authority score must be <= 100");
        
        scholars[scholarAddress] = Scholar({
            name: name,
            credentials: credentials,
            madzhab: madzhab,
            authorityScore: authorityScore,
            isVerified: true,
            verificationDate: block.timestamp
        });
        
        _grantRole(SCHOLAR_ROLE, scholarAddress);
        emit ScholarVerified(scholarAddress, name, block.timestamp);
    }
    
    function proposeFatwa(
        bytes32 _id,
        string memory _ipfsHash,
        bytes32[] memory _precedentHashes
    ) external onlyRole(SCHOLAR_ROLE) {
        require(fatwas[_id].timestamp == 0, "Fatwa ID already exists");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        Fatwa storage newFatwa = fatwas[_id];
        newFatwa.id = _id;
        newFatwa.ipfsHash = _ipfsHash;
        newFatwa.timestamp = block.timestamp;
        newFatwa.precedentHashes = _precedentHashes;
        newFatwa.consensusLevel = 0;
        newFatwa.participationCount = 0;
        newFatwa.isImmutable = false;
        
        // Link precedents
        for (uint i = 0; i < _precedentHashes.length; i++) {
            precedentLinks[_id].push(_precedentHashes[i]);
        }
        
        emit FatwaProposed(_id, _ipfsHash, block.timestamp);
    }
    
    function signFatwa(bytes32 _fatwaId) external onlyRole(SCHOLAR_ROLE) {
        Fatwa storage fatwa = fatwas[_fatwaId];
        require(fatwa.timestamp > 0, "Fatwa does not exist");
        require(!fatwa.isImmutable, "Fatwa is already finalized");
        require(!fatwa.scholarSignatures[msg.sender], "Scholar already signed");
        
        fatwa.scholarSignatures[msg.sender] = true;
        fatwa.scholars.push(msg.sender);
        fatwa.participationCount++;
        
        emit ScholarSignature(_fatwaId, msg.sender, block.timestamp);
    }
    
    function finalizeFatwa(
        bytes32 _fatwaId,
        uint8 _consensusLevel
    ) external onlyRole(MODERATOR_ROLE) {
        Fatwa storage fatwa = fatwas[_fatwaId];
        require(fatwa.timestamp > 0, "Fatwa does not exist");
        require(!fatwa.isImmutable, "Fatwa is already finalized");
        require(_consensusLevel >= 51, "Insufficient consensus level");
        require(fatwa.participationCount >= 3, "Insufficient participation");
        
        fatwa.consensusLevel = _consensusLevel;
        fatwa.isImmutable = true;
        
        emit FatwaFinalized(_fatwaId, _consensusLevel, block.timestamp);
    }
    
    function getFatwaDetails(bytes32 _fatwaId) external view returns (
        string memory ipfsHash,
        address[] memory scholars,
        uint256 timestamp,
        uint8 consensusLevel,
        uint8 participationCount,
        bool isImmutable
    ) {
        Fatwa storage fatwa = fatwas[_fatwaId];
        return (
            fatwa.ipfsHash,
            fatwa.scholars,
            fatwa.timestamp,
            fatwa.consensusLevel,
            fatwa.participationCount,
            fatwa.isImmutable
        );
    }
    
    function getPrecedentLinks(bytes32 _fatwaId) external view returns (bytes32[] memory) {
        return precedentLinks[_fatwaId];
    }
}
```

### Web3 Integration Service

```python
from web3 import Web3
import json
import ipfshttpclient
from eth_account import Account

class BlockchainIntegrationService:
    def __init__(self, rpc_url, contract_address, private_key):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.account = Account.from_key(private_key)
        
        # Load contract ABI (from compilation)
        with open('contracts/BahtsulMasailRegistry.json', 'r') as f:
            contract_data = json.load(f)
            
        self.contract = self.w3.eth.contract(
            address=contract_address,
            abi=contract_data['abi']
        )
        
        # IPFS client for content storage
        self.ipfs = ipfshttpclient.connect('/ip4/127.0.0.1/tcp/5001')
    
    def store_fatwa_content(self, fatwa_content):
        """Store fatwa content on IPFS and return hash"""
        fatwa_json = json.dumps(fatwa_content, ensure_ascii=False)
        result = self.ipfs.add_json(fatwa_json)
        return result
    
    def propose_fatwa_on_blockchain(self, fatwa_id, content, precedent_ids=None):
        """Propose a new fatwa on the blockchain"""
        # Store content on IPFS
        ipfs_hash = self.store_fatwa_content(content)
        
        # Convert precedent IDs to bytes32
        precedent_hashes = [
            self.w3.keccak(text=pid).hex() for pid in (precedent_ids or [])
        ]
        
        # Create transaction
        function = self.contract.functions.proposeFatwa(
            self.w3.keccak(text=fatwa_id).hex(),
            ipfs_hash,
            precedent_hashes
        )
        
        # Build transaction
        transaction = function.build_transaction({
            'from': self.account.address,
            'gas': 500000,
            'gasPrice': self.w3.eth.gas_price,
            'nonce': self.w3.eth.get_transaction_count(self.account.address),
        })
        
        # Sign and send transaction
        signed_txn = self.account.sign_transaction(transaction)
        tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        
        # Wait for confirmation
        receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        
        return {
            'transaction_hash': tx_hash.hex(),
            'block_number': receipt.blockNumber,
            'ipfs_hash': ipfs_hash,
            'gas_used': receipt.gasUsed
        }
    
    def finalize_fatwa(self, fatwa_id, consensus_level):
        """Finalize a fatwa with consensus level"""
        function = self.contract.functions.finalizeFatwa(
            self.w3.keccak(text=fatwa_id).hex(),
            consensus_level
        )
        
        transaction = function.build_transaction({
            'from': self.account.address,
            'gas': 200000,
            'gasPrice': self.w3.eth.gas_price,
            'nonce': self.w3.eth.get_transaction_count(self.account.address),
        })
        
        signed_txn = self.account.sign_transaction(transaction)
        tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        
        return self.w3.eth.wait_for_transaction_receipt(tx_hash)
    
    def verify_fatwa_authenticity(self, fatwa_id):
        """Verify fatwa exists and retrieve its details from blockchain"""
        fatwa_hash = self.w3.keccak(text=fatwa_id).hex()
        
        try:
            result = self.contract.functions.getFatwaDetails(fatwa_hash).call()
            
            return {
                'ipfs_hash': result[0],
                'scholars': result[1],
                'timestamp': result[2],
                'consensus_level': result[3],
                'participation_count': result[4],
                'is_immutable': result[5],
                'verified': True
            }
        except Exception as e:
            return {'verified': False, 'error': str(e)}
```

## 5. API Specifications

### REST API Endpoints

```python
# Django REST Framework Views
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

class MasailViewSet(viewsets.ModelViewSet):
    queryset = MasailDocument.objects.all()
    serializer_class = MasailDocumentSerializer
    
    @action(detail=False, methods=['post'])
    def semantic_search(self, request):
        """Advanced semantic search with filters"""
        query = request.data.get('query', '')
        filters = request.data.get('filters', {})
        top_k = request.data.get('top_k', 10)
        
        # Use semantic search service
        search_service = SemanticSearchService()
        results = search_service.search(query, top_k, filters)
        
        # Enrich results with additional metadata
        enriched_results = []
        for result in results:
            document = MasailDocument.objects.get(id=result['document_id'])
            enriched_results.append({
                'document': MasailDocumentSerializer(document).data,
                'similarity_score': result['similarity_score'],
                'rank': result['rank']
            })
        
        return Response({
            'results': enriched_results,
            'total_found': len(enriched_results),
            'query': query
        })
    
    @action(detail=True, methods=['get'])
    def get_precedents(self, request, pk=None):
        """Get relevant precedents for a masail"""
        masail = self.get_object()
        precedent_engine = PrecedentRecommendationEngine()
        precedents = precedent_engine.find_relevant_precedents(masail)
        
        return Response({
            'precedents': [
                {
                    'document': MasailDocumentSerializer(p[0]).data,
                    'relevance_score': p[1]
                }
                for p in precedents
            ]
        })
    
    @action(detail=True, methods=['post'])
    def submit_consensus_vote(self, request, pk=None):
        """Submit a consensus vote from a scholar"""
        masail = self.get_object()
        scholar = request.user.scholar_profile
        
        vote_data = {
            'masail_id': masail.id,
            'scholar_id': scholar.id,
            'position': request.data.get('position'),
            'confidence_level': request.data.get('confidence_level'),
            'reasoning': request.data.get('reasoning')
        }
        
        # Create or update consensus record
        consensus_record, created = ConsensusRecord.objects.update_or_create(
            masail_id=masail.id,
            scholar_id=scholar.id,
            defaults=vote_data
        )
        
        # Recalculate consensus metrics
        consensus_engine = ConsensusEngine()
        metrics = consensus_engine.calculate_consensus_metrics(masail.id)
        
        return Response({
            'vote_recorded': True,
            'consensus_metrics': metrics
        })

class ScholarRecommendationView(APIView):
    def post(self, request):
        """Get scholar recommendations for a masail"""
        masail_id = request.data.get('masail_id')
        max_experts = request.data.get('max_experts', 7)
        
        masail = MasailDocument.objects.get(id=masail_id)
        matching_engine = ExpertMatchingEngine()
        recommendations = matching_engine.recommend_experts(masail, max_experts)
        
        return Response({
            'recommendations': [
                {
                    'scholar': ScholarProfileSerializer(r['scholar']).data,
                    'total_score': r['total_score'],
                    'score_breakdown': r['score_breakdown']
                }
                for r in recommendations
            ]
        })

class ArgumentMappingView(APIView):
    def get(self, request, masail_id):
        """Get argument mapping for a masail"""
        mapping_engine = ArgumentationEngine()
        argument_map = mapping_engine.get_argument_structure(masail_id)
        
        return Response(argument_map)
    
    def post(self, request, masail_id):
        """Add new argument node"""
        node_data = {
            'masail_id': masail_id,
            'parent_id': request.data.get('parent_id'),
            'node_type': request.data.get('node_type'),
            'content': request.data.get('content'),
            'scholar_id': request.user.scholar_profile.id
        }
        
        argument_node = ArgumentNode.objects.create(**node_data)
        
        # Update argument mapping
        mapping_engine = ArgumentationEngine()
        updated_map = mapping_engine.update_argument_structure(masail_id)
        
        return Response({
            'node_created': True,
            'node_id': argument_node.id,
            'updated_map': updated_map
        })

class BlockchainIntegrationView(APIView):
    def post(self, request):
        """Publish fatwa to blockchain"""
        masail_id = request.data.get('masail_id')
        masail = MasailDocument.objects.get(id=masail_id)
        
        # Check consensus requirements
        consensus_engine = ConsensusEngine()
        metrics = consensus_engine.calculate_consensus_metrics(masail_id)
        
        if metrics['consensus_level'] < 51:
            return Response(
                {'error': 'Insufficient consensus for blockchain publication'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Publish to blockchain
        blockchain_service = BlockchainIntegrationService()
        result = blockchain_service.propose_fatwa_on_blockchain(
            masail_id, 
            masail.to_dict()
        )
        
        # Store blockchain record
        BlockchainRecord.objects.create(
            masail_id=masail.id,
            transaction_hash=result['transaction_hash'],
            block_number=result['block_number'],
            ipfs_hash=result['ipfs_hash'],
            consensus_level=metrics['consensus_level']
        )
        
        return Response({
            'published': True,
            'transaction_hash': result['transaction_hash'],
            'ipfs_hash': result['ipfs_hash']
        })
```

## 6. Real-time Collaboration Features

### WebSocket Implementation

```python
# Django Channels consumers for real-time features
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class DeliberationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.masail_id = self.scope['url_route']['kwargs']['masail_id']
        self.room_group_name = f'deliberation_{self.masail_id}'
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data['type']
        
        if message_type == 'new_argument':
            await self.handle_new_argument(data)
        elif message_type == 'consensus_vote':
            await self.handle_consensus_vote(data)
        elif message_type == 'typing_indicator':
            await self.handle_typing_indicator(data)
    
    async def handle_new_argument(self, data):
        # Save argument to database
        argument = await self.create_argument_node(data)
        
        # Broadcast to group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'argument_added',
                'argument': {
                    'id': argument.id,
                    'content': argument.content,
                    'node_type': argument.node_type,
                    'scholar_name': argument.scholar.user.get_full_name(),
                    'timestamp': argument.created_at.isoformat()
                }
            }
        )
    
    async def handle_consensus_vote(self, data):
        # Update consensus
        metrics = await self.update_consensus(data)
        
        # Broadcast updated consensus
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'consensus_updated',
                'metrics': metrics
            }
        )
    
    async def argument_added(self, event):
        await self.send(text_data=json.dumps({
            'type': 'argument_added',
            'argument': event['argument']
        }))
    
    async def consensus_updated(self, event):
        await self.send(text_data=json.dumps({
            'type': 'consensus_updated',
            'metrics': event['metrics']
        }))
    
    @database_sync_to_async
    def create_argument_node(self, data):
        return ArgumentNode.objects.create(
            masail_id=self.masail_id,
            content=data['content'],
            node_type=data['node_type'],
            scholar_id=data['scholar_id']
        )
    
    @database_sync_to_async
    def update_consensus(self, data):
        consensus_engine = ConsensusEngine()
        return consensus_engine.calculate_consensus_metrics(self.masail_id)
```

This technical specification provides a comprehensive foundation for implementing the enhanced BahtsulMasail.tech architecture with modern AI/ML capabilities, blockchain verification, and real-time collaboration features while maintaining the scholarly rigor required for Islamic jurisprudence.