package com.finaxis.ledger.infrastructure.web;

import com.finaxis.ledger.application.service.PostingService;
import com.finaxis.ledger.domain.model.LedgerTransaction;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ledger")
@RequiredArgsConstructor
public class LedgerController {

    private final PostingService postingService;

    @PostMapping("/post")
    public ResponseEntity<LedgerTransaction> post(@RequestBody TransactionRequest request) {
        LedgerTransaction tx = postingService.postTransaction(
                request.getCorrelationId(),
                request.getDescription(),
                request.getDebitAccountId(),
                request.getCreditAccountId(),
                request.getAmount()
        );
        return ResponseEntity.ok(tx);
    }

    @Data
    public static class TransactionRequest {
        private String correlationId;
        private String description;
        private UUID debitAccountId;
        private UUID creditAccountId;
        private BigDecimal amount;
    }
}
