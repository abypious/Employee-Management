package com.example.employee_management.dto;

public class DashboardStats {
    private long totalEmployees;
    private long totalDepartments;
    private double monthlyPayroll;
    private long pendingLeaves;

    public DashboardStats(long totalEmployees, long totalDepartments, double monthlyPayroll, long pendingLeaves) {
        this.totalEmployees = totalEmployees;
        this.totalDepartments = totalDepartments;
        this.monthlyPayroll = monthlyPayroll;
        this.pendingLeaves = pendingLeaves;
    }

    public long getTotalEmployees() { return totalEmployees; }
    public long getTotalDepartments() { return totalDepartments; }
    public double getMonthlyPayroll() { return monthlyPayroll; }
    public long getPendingLeaves() { return pendingLeaves; }
}
