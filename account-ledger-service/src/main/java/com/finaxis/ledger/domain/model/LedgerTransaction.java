package com.finaxis.ledger.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;
import java.time.OffsetDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LedgerTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String correlationId;

    private String description;

    @Column(name = "transaction_date")
    private OffsetDateTime transactionDate;

    @Builder.Default
    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL)
    private List<JournalEntry> entries = new ArrayList<>();
}
