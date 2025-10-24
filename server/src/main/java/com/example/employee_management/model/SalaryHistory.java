package com.example.employee_management.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "salary_history")
public class SalaryHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private LocalDate month; // 2025-10-01
    private double amount;

    public SalaryHistory() { }

    public SalaryHistory(Employee employee, LocalDate month, double amount) {
        this.employee = employee;
        this.month = month;
        this.amount = amount;
    }

    public LocalDate getMonth() { return month; }
    public void setMonth( LocalDate month ) {this.month = month; }

    public double getAmount() { return amount; }
    public void setAmount( double amount ) {this.amount = amount; }
}
