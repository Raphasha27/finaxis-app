package com.finaxis.fraud.domain.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class FraudDecision {
    private boolean approved;
    private String reason;
    private int riskScore;
    private List<String> flaggedRules;

    public static FraudDecision approve() {
        return FraudDecision.builder()
                .approved(true)
                .reason("Cleared all automated checks")
                .riskScore(0)
                .build();
    }

    public static FraudDecision reject(String reason, List<String> rules) {
        return FraudDecision.builder()
                .approved(false)
                .reason(reason)
                .flaggedRules(rules)
                .riskScore(100)
                .build();
    }
}
