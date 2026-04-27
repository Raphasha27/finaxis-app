package com.finaxis.payment.infrastructure.outbox;

import com.finaxis.payment.domain.model.OutboxEvent;
import com.finaxis.payment.domain.repository.OutboxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class OutboxWorker {

    private final OutboxRepository outboxRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Scheduled(fixedDelay = 5000)
    public void processOutbox() {
        List<OutboxEvent> events = outboxRepository.findByProcessedAtIsNull();
        if (events.isEmpty()) return;

        log.info("Processing {} outbox events...", events.size());

        for (OutboxEvent event : events) {
            try {
                // In a real system, we'd map eventType to a specific Kafka topic
                String aggregateId = event.getAggregateId();
                String payload = event.getPayload();
                if (aggregateId != null && payload != null) {
                    kafkaTemplate.send("payment-events", aggregateId, payload);
                }
                
                event.setProcessedAt(OffsetDateTime.now());
                outboxRepository.save(event);
                log.info("Successfully processed outbox event: {}", event.getId());
            } catch (Exception e) {
                log.error("Failed to process outbox event: {}", event.getId(), e);
            }
        }
    }
}
