package com.example.employee_management.controller;

import com.example.employee_management.dto.DashboardStats;
import com.example.employee_management.repository.EmployeeRepository;
import com.example.employee_management.repository.DepartmentRepository;
import com.example.employee_management.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    @GetMapping("/stats")
    public DashboardStats getDashboardStats() {
        long totalEmployees = employeeRepository.count();
        long totalDepartments = departmentRepository.count();

        // Sum salaries
        double monthlyPayroll = employeeRepository.findAll()
                .stream()
                .mapToDouble(emp -> emp.getSalary())
                .sum();

        // Count pending leaves
        long pendingLeaves = leaveRepository.countByStatus("PENDING");

        return new DashboardStats(totalEmployees, totalDepartments, monthlyPayroll, pendingLeaves);
    }
}
