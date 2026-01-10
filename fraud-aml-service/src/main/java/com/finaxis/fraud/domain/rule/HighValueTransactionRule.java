package com.finaxis.fraud.domain.rule;

import com.finaxis.shared.event.PaymentInitiatedEvent;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class HighValueTransactionRule implements FraudRule {
    private static final BigDecimal THRESHOLD = new BigDecimal("50000"); // 50k Limit

    @Override
    public boolean isFlagged(PaymentInitiatedEvent event) {
        return event.getAmount().compareTo(THRESHOLD) > 0;
    }

    @Override
    public String getRuleName() {
        return "HIGH_VALUE_TRANSACTION";
    }
}
