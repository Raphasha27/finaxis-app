package com.finaxis.fraud.domain.rule;

import com.finaxis.shared.event.PaymentInitiatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import java.time.Duration;

@Component
@RequiredArgsConstructor
public class VelocityRule implements FraudRule {
    
    private final StringRedisTemplate redisTemplate;
    private static final int MAX_TX_PER_MINUTE = 5;

    @Override
    public boolean isFlagged(PaymentInitiatedEvent event) {
        String key = "velocity:" + event.getSourceAccountId();
        String countStr = redisTemplate.opsForValue().get(key);
        int count = countStr == null ? 0 : Integer.parseInt(countStr);

        if (count >= MAX_TX_PER_MINUTE) {
            return true;
        }

        redisTemplate.opsForValue().increment(key);
        if (count == 0) {
            Duration timeout = Duration.ofMinutes(1);
            if (timeout != null) {
                redisTemplate.expire(key, timeout);
            }
        }
        return false;
    }

    @Override
    public String getRuleName() {
        return "HIGH_VELOCITY_DETECTION";
    }
}
