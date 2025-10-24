package com.example.employee_management.repository;

import com.example.employee_management.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    long countByStatus(String status); // to count pending leaves
}
