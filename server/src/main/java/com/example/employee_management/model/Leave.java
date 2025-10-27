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
@Table(name = "leaves")
public class Leave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private LocalDate startDate;
    private LocalDate endDate;
    private String type; 
    private String status; 
    private String reason;

    public Leave() { }

    public Leave(Employee employee, LocalDate startDate, LocalDate endDate, String type, String status, String reason) {
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
        this.status = status;
        this.reason = reason;
    }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate( LocalDate startDate ) {this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate( LocalDate endDate ) {this.endDate = endDate; }

    public String getType() { return type; }
    public void setType( String type ) {this.type = type; }
    
    public String getStatus() { return status; }
    public void setStatus( String status ) {this.status = status; }

    public String getReason() { return reason; }
    public void setReason( String reason ) {this.reason = reason; }
}
