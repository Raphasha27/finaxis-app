package com.finaxis.fraud.application.service;

import com.finaxis.fraud.domain.dto.FraudDecision;
import com.finaxis.fraud.domain.rule.FraudRule;
import com.finaxis.shared.event.PaymentInitiatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FraudService {

    private final List<FraudRule> rules;

    public FraudDecision evaluate(PaymentInitiatedEvent event) {
        log.info("Evaluating fraud for transaction: {}", event.getTransactionId());

        List<String> violations = rules.stream()
                .filter(rule -> rule.isFlagged(event))
                .map(FraudRule::getRuleName)
                .collect(Collectors.toList());

        if (violations.isEmpty()) {
            return FraudDecision.approve();
        }

        log.warn("Fraud detected for transaction: {}. Rules violated: {}", 
                event.getTransactionId(), violations);
        
        return FraudDecision.reject("Manual review required due to rule violations", violations);
    }
}
