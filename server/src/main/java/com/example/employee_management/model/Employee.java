package com.example.employee_management.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String jobTitle;
    private Double salary;
    private LocalDate dateOfJoining;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private String address;
    private LocalDate dateOfBirth;

    private String gender; 
    private String maritalStatus; 

    private String emergencyContact; 

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = true)
    private Employee manager; 

    public Employee() {}

    public Employee(String name, String email, String phone, String jobTitle, Double salary, LocalDate dateOfJoining,
                    Department department, String address, LocalDate dateOfBirth, String gender, String maritalStatus,
                    String emergencyContact, Employee manager) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.salary = salary;
        this.dateOfJoining = dateOfJoining;
        this.department = department;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.emergencyContact = emergencyContact;
        this.manager = manager;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }

    public LocalDate getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public Employee getManager() { return manager; }
    public void setManager(Employee manager) { this.manager = manager; }
}
