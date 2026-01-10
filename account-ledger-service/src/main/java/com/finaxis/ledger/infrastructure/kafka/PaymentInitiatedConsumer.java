package com.finaxis.ledger.infrastructure.kafka;

import com.finaxis.ledger.application.service.PostingService;
import com.finaxis.shared.event.PaymentInitiatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class PaymentInitiatedConsumer {

    private final PostingService postingService;

    @KafkaListener(topics = "payment-initiated", groupId = "ledger-group")
    public void handlePaymentInitiated(PaymentInitiatedEvent event) {
        log.info("Received PaymentInitiatedEvent for Transaction: {}", event.getTransactionId());
        
        try {
            postingService.postTransaction(
                event.getTransactionId(), 
                "Transfer from " + event.getSourceAccountId() + " to " + event.getDestinationAccountId(),
                event.getSourceAccountId(),
                event.getDestinationAccountId(),
                event.getAmount()
            );
            log.info("Ledger posting successful for transaction: {}", event.getTransactionId());
            // Here you would publish a 'LedgerSuccessEvent' back to Kafka
        } catch (Exception e) {
            log.error("Failed to post ledger for transaction: {}", event.getTransactionId(), e);
            // Here you would publish a 'LedgerFailureEvent' for Saga compensation
        }
    }
}
