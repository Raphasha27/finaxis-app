package com.finaxis.payment.application.saga;

import com.finaxis.shared.event.PaymentInitiatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentSagaOrchestrator {

    private final com.finaxis.payment.domain.repository.OutboxRepository outboxRepository;
    private final com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    @Transactional
    public void initiateTransfer(UUID sourceId, UUID destId, BigDecimal amount) {
        String transactionId = UUID.randomUUID().toString();
        log.info("Initiating Payment Saga via Outbox: {} | Source: {} -> Dest: {}", transactionId, sourceId, destId);

        // 1. Publish Event via Outbox (Atomic with DB transaction)
        try {
            PaymentInitiatedEvent event = PaymentInitiatedEvent.builder()
                    .transactionId(transactionId)
                    .sourceAccountId(sourceId)
                    .destinationAccountId(destId)
                    .amount(amount)
                    .currency("ZAR")
                    .status("INITIATED")
                    .build();

            com.finaxis.payment.domain.model.OutboxEvent outboxEntry = com.finaxis.payment.domain.model.OutboxEvent.builder()
                    .aggregateType("PAYMENT")
                    .aggregateId(transactionId)
                    .eventType("PaymentInitiated")
                    .payload(objectMapper.writeValueAsString(event))
                    .createdAt(java.time.OffsetDateTime.now())
                    .build();

            outboxRepository.save(outboxEntry);
            log.info("Payment event saved to Outbox. Worker will pick it up.");
        } catch (Exception e) {
            log.error("Failed to save payment to outbox", e);
            throw new RuntimeException("Payment initiation failed");
        }
    }

    // Handlers for Success/Failure from other services would go here
    // public void handleLedgerSuccess(LedgerSuccessEvent event) { ... }
    // public void handleFraudFailure(FraudFailureEvent event) { ... }
}
