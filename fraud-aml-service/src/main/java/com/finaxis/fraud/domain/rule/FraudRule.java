package com.finaxis.fraud.domain.rule;

import com.finaxis.shared.event.PaymentInitiatedEvent;

public interface FraudRule {
    boolean isFlagged(PaymentInitiatedEvent event);
    String getRuleName();
}
