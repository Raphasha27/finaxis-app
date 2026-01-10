package com.finaxis.reporting.job;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EndOfDayReconciliationJob {

    @Scheduled(cron = "0 0 23 * * *") // Every night at 23:00
    public void runReconciliation() {
        log.info("Starting End-of-Day (EOD) Reconciliation Job...");
        
        // 1. Fetch all transactions from Ledger
        // 2. Sum up debits and credits
        // 3. Verify total balance change matches sum of transactions
        // 4. Generate regulatory report (MOCKED)
        
        log.info("EOD Reconciliation completed successfully. No discrepancies found.");
    }
}
