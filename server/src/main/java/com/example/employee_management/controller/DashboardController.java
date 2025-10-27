package com.example.employee_management.controller;

import com.example.employee_management.dto.DashboardStats;
import com.example.employee_management.repository.EmployeeRepository;
import com.example.employee_management.repository.DepartmentRepository;
import com.example.employee_management.repository.LeaveRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final LeaveRepository leaveRepository;

    public DashboardController(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, LeaveRepository leaveRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.leaveRepository = leaveRepository;
    }

    @GetMapping("/stats")
    public DashboardStats getDashboardStats() {
        long totalEmployees = employeeRepository.count();
        long totalDepartments = departmentRepository.count();
        double monthlyPayroll = employeeRepository.findAll().stream()
                .mapToDouble(emp -> emp.getSalary())
                .sum();
        long pendingLeaves = leaveRepository.countByStatus("Pending");

        return new DashboardStats(totalEmployees, totalDepartments, monthlyPayroll, pendingLeaves);
    }
}
