package com.smartpos.backend.repository;

import com.smartpos.backend.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
}