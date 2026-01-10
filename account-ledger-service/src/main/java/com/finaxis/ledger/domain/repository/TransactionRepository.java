package com.finaxis.ledger.domain.repository;

import com.finaxis.ledger.domain.model.LedgerTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<LedgerTransaction, UUID> {
    Optional<LedgerTransaction> findByCorrelationId(String correlationId);
}
