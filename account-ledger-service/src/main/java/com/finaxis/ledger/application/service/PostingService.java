package com.finaxis.ledger.application.service;

import com.finaxis.ledger.domain.model.Account;
import com.finaxis.ledger.domain.model.JournalEntry;
import com.finaxis.ledger.domain.model.LedgerTransaction;
import com.finaxis.ledger.domain.repository.AccountRepository;
import com.finaxis.ledger.domain.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostingService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    @Transactional
    public LedgerTransaction postTransaction(String correlationId, String description, 
                                            UUID debitAccountId, UUID creditAccountId, BigDecimal amount) {
        
        // 1. Idempotency Check
        return transactionRepository.findByCorrelationId(correlationId)
                .orElseGet(() -> executePosting(correlationId, description, debitAccountId, creditAccountId, amount));
    }

    private LedgerTransaction executePosting(String correlationId, String description, 
                                            UUID debitAccountId, UUID creditAccountId, BigDecimal amount) {
        
        // 2. Fetch Accounts
        UUID dId = debitAccountId;
        UUID cId = creditAccountId;
        if (dId == null || cId == null) throw new IllegalArgumentException("Account IDs cannot be null");

        Account debitAccount = accountRepository.findById(dId)
                .orElseThrow(() -> new RuntimeException("Debit account not found"));
        Account creditAccount = accountRepository.findById(cId)
                .orElseThrow(() -> new RuntimeException("Credit account not found"));

        // 3. Logic: Update Balances
        debitAccount.debit(amount);
        creditAccount.credit(amount);

        // 4. Record Transaction
        LedgerTransaction tx = LedgerTransaction.builder()
                .correlationId(correlationId)
                .description(description)
                .transactionDate(OffsetDateTime.now())
                .build();

        JournalEntry debitEntry = JournalEntry.builder()
                .transaction(tx)
                .accountId(debitAccountId)
                .amount(amount.negate())
                .entryType(JournalEntry.EntryType.DEBIT)
                .createdAt(OffsetDateTime.now())
                .build();

        JournalEntry creditEntry = JournalEntry.builder()
                .transaction(tx)
                .accountId(creditAccountId)
                .amount(amount)
                .entryType(JournalEntry.EntryType.CREDIT)
                .createdAt(OffsetDateTime.now())
                .build();

        tx.getEntries().add(debitEntry);
        tx.getEntries().add(creditEntry);

        // 5. Save all (Cascade handles entries)
        accountRepository.save(debitAccount);
        accountRepository.save(creditAccount);
        return transactionRepository.save(tx);
    }
}
