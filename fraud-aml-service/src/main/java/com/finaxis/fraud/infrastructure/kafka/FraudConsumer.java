package com.finaxis.fraud.infrastructure.kafka;

import com.finaxis.shared.event.PaymentInitiatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FraudConsumer {

    private final com.finaxis.fraud.application.service.FraudService fraudService;

    @KafkaListener(topics = "payment-initiated", groupId = "fraud-group")
    public void consume(PaymentInitiatedEvent event) {
        log.info("Processing sophisticated screening for: {}", event.getTransactionId());
        
        com.finaxis.fraud.domain.dto.FraudDecision decision = fraudService.evaluate(event);
        
        if (decision.isApproved()) {
            log.info("Transaction {} PASSED fraud checks.", event.getTransactionId());
        } else {
            log.error("Transaction {} FAILED fraud checks. Reason: {}", 
                    event.getTransactionId(), decision.getReason());
            // Here you would publish a 'FraudDetectedEvent' to trigger reversals/blocks
        }
    }
}
