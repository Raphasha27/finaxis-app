package com.finaxis.ledger.integration;

import com.finaxis.ledger.application.service.PostingService;
import com.finaxis.ledger.domain.model.Account;
import com.finaxis.ledger.domain.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Testcontainers
public class LedgerConcurrencyTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private PostingService postingService;

    @Autowired
    private AccountRepository accountRepository;

    @Test
    void testAtomicPosting() {
        // Setup 2 accounts
        UUID senderId = UUID.randomUUID();
        UUID receiverId = UUID.randomUUID();

        Account sAcc = Account.builder()
                .id(senderId)
                .accountNumber("SENDER-001")
                .balance(new BigDecimal("1000.00"))
                .currency("ZAR")
                .status(Account.AccountStatus.ACTIVE)
                .customerId(UUID.randomUUID())
                .build();
        Objects.requireNonNull(sAcc);
        accountRepository.save(sAcc);

        Account rAcc = Account.builder()
                .id(receiverId)
                .accountNumber("RECEIVER-001")
                .balance(new BigDecimal("0.00"))
                .currency("ZAR")
                .status(Account.AccountStatus.ACTIVE)
                .customerId(UUID.randomUUID())
                .build();
        Objects.requireNonNull(rAcc);
        accountRepository.save(rAcc);

        // Perform Transfer
        postingService.postTransaction(
                UUID.randomUUID().toString(),
                "Integration Test Transfer",
                senderId,
                receiverId,
                new BigDecimal("250.00")
        );

        // Assert balances
        Account sender = accountRepository.findById(Objects.requireNonNull(senderId)).orElseThrow();
        Account receiver = accountRepository.findById(Objects.requireNonNull(receiverId)).orElseThrow();

        assertEquals(new BigDecimal("750.0000"), sender.getBalance());
        assertEquals(new BigDecimal("250.0000"), receiver.getBalance());
    }
}
